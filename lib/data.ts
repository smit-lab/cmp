import ProjectModel from "@/models/Project";
import UserModel from "@/models/User";

import dbConnect from "@/utils/dbConnect";

import mongoose from "mongoose";

import {
  ClientData,
  ProjectsData,
  fetchClientWithProjects,
  fetchProjectWithClient,
} from "./definitions";

import { unstable_noStore as noStore } from "next/cache";

export async function fetchClientsData() {
  try {
    await dbConnect();
    const data = await UserModel.aggregate([
      { $match: { role: "client" } },
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "clientId",
          as: "projects",
        },
      },
      { $unwind: { path: "$projects", preserveNullAndEmptyArrays: true } },
      { $match: { "projects.payment_status": "success" } },
      {
        $group: {
          _id: "$_id",
          name: {
            $first: "$fullname.firstname",
          },
          email: {
            $first: "$email",
          },
          status: {
            $first: "$isActive",
          },
          last_updated: {
            $first: "$projects.updatedAt",
          },
          totalSpend: {
            $sum: "$projects.price",
          },
        },
      },
      { $sort: { last_updated: -1 } },
    ]);
    const transformedData: ClientData[] = data.map((client) => ({
      ...client,
      _id: client._id.toString(),
      // name: client.name,
      // email: client.email,
      // status: client.status,
      // last_updated: client.last_updated,
      // totalSpend: client.totalSpend,
    }));
    return transformedData;
  } catch (error) {
    console.error("Failed to fetch client data", error);
    throw new Error("Failed to fetch client data");
  }
}

export async function fetchAllProjectsData() {
  try {
    await dbConnect();
    const data = await ProjectModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "clientId",
          foreignField: "_id",
          as: "clientData",
        },
      },
      {
        $unwind: {
          path: "$clientData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          status: 1,
          "clientData._id": 1,
          "clientData.fullname.firstname": 1,
          "clientData.email": 1,
          price: 1,
          payment_status: 1,
          updatedAt: 1,
        },
      },
      { $sort: { updatedAt: -1, status: -1 } },
    ]);
    const transformedData: ProjectsData[] = data.map((client) => ({
      ...client,
      _id: client._id.toString(),
      // updatedAt: new Date(client.updatedAt),
      clientData: {
        _id: client.clientData._id.toString(),
        fullname: { firstname: client.clientData.fullname.firstname },
        email: client.clientData.email,
      },
    }));
    return transformedData;
  } catch (error) {
    console.error();
    console.error("Failed to fetch client data", error);
    throw new Error("Failed to fetch client data");
  }
}

export async function fetchProjectData(
  _id: string
): Promise<fetchProjectWithClient | null> {
  noStore();
  try {
    await dbConnect();
    const data: fetchProjectWithClient[] | null = await ProjectModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "clientId",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $unwind: {
          path: "$client",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "client.createdAt": 0,
          "client.updatedAt": 0,
          "client._id": 0,
          "client.role": 0,
          "client.isActive": 0,
        },
      },
    ]);
    if (!data) {
      console.error("Project not found");
      return null;
    }
    return data[0];
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}

export async function fetchClientData(
  _id: string
): Promise<fetchClientWithProjects | null> {
  try {
    await dbConnect();
    const data: fetchClientWithProjects[] = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "clientId",
          as: "projects",
        },
      },
      {
        $project: {
          "projects.clientId": 0,
          "projects.project_steps": 0,
          "projects.payment_link_generated_on": 0,
          "projects.payment_link": 0,
          "projects.paid_on": 0,
          "projects.createdAt": 0,
        },
      },
    ]);
    const serializedData: fetchClientWithProjects = {
      ...data[0],
      projects: data[0].projects.map((project) => ({
        ...project,
        _id: project._id.toString(),
        completed_on: new Date(project.completed_on),
        updatedAt: new Date(project.updatedAt),
      })),
    };
    console.log("Serialized", data);

    if (!data) {
      console.error("Client not found");
      return null;
    }
    return serializedData;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}

export async function fetchDashboardData() {
  try {
    await dbConnect();

    const today = new Date();
    const first_day = new Date(today);
    first_day.setDate(1);

    const monthlyEarningPromise = ProjectModel.aggregate([
      {
        $match: {
          payment_status: "success",
          paid_on: { $ne: null },
        },
      },
      {
        $project: {
          month: { $month: "$paid_on" },
          year: { $year: "$paid_on" },
          price: 1,
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          totalPaid: {
            $sum: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: {
            // Format the name field with month names
            $switch: {
              branches: [
                {
                  case: { $eq: ["$_id.month", 1] },
                  then: "Jan",
                },
                {
                  case: { $eq: ["$_id.month", 2] },
                  then: "Feb",
                },
                {
                  case: { $eq: ["$_id.month", 3] },
                  then: "Mar",
                },
                {
                  case: { $eq: ["$_id.month", 4] },
                  then: "Apr",
                },
                {
                  case: { $eq: ["$_id.month", 5] },
                  then: "May",
                },
                {
                  case: { $eq: ["$_id.month", 6] },
                  then: "Jun",
                },
                {
                  case: { $eq: ["$_id.month", 7] },
                  then: "Jul",
                },
                {
                  case: { $eq: ["$_id.month", 8] },
                  then: "Aug",
                },
                {
                  case: { $eq: ["$_id.month", 9] },
                  then: "Sep",
                },
                {
                  case: { $eq: ["$_id.month", 10] },
                  then: "Oct",
                },
                {
                  case: { $eq: ["$_id.month", 11] },
                  then: "Nov",
                },
                {
                  case: { $eq: ["$_id.month", 12] },
                  then: "Dec",
                },
              ],
              default: "Unknown",
            },
          },
          monthNum: "$_id.month",
          paid: "$totalPaid",
        },
      },
      {
        $sort: {
          monthNum: 1,
        },
      },
    ]);

    const recentPaymentsPromise: Promise<recentPaymentDataProps[]> =
      ProjectModel.aggregate([
        {
          $match: {
            payment_status: "success",
            paid_on: {
              $gte: first_day,
              $lte: today,
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "clientId",
            foreignField: "_id",
            as: "client",
          },
        },
        {
          $unwind: {
            path: "$client",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            name: 1,
            price: 1,
            "client.email": 1,
          },
        },
      ]);

    const thisMonthEarningPromise: Promise<thisMonthEarningDataProps[]> =
      ProjectModel.aggregate([
        {
          $match: {
            payment_status: "success",
            paid_on: { $gte: first_day, $lte: today },
          },
        },
        { $group: { _id: "$payment_status", earned: { $sum: "$price" } } },
      ]);

    const thisYearEarningPromise = ProjectModel.aggregate([
      {
        $match: {
          payment_status: "success",
          $expr: {
            $eq: [{ $year: "$paid_on" }, 2024],
          },
        },
      },
      {
        $project: {
          price: 1,
          year: { $year: "$paid_on" },
        },
      },
      {
        $group: {
          _id: "$year",
          earned: {
            $sum: "$price",
          },
        },
      },
    ]);

    const allTimeEarningPromise = ProjectModel.aggregate([
      {
        $match: {
          payment_status: "success",
        },
      },
      {
        $project: {
          price: 1,
          payment_status: 1,
        },
      },
      {
        $group: {
          _id: "$payment_status",
          earned: {
            $sum: "$price",
          },
        },
      },
    ]);

    const totalClientsCountPromise: Promise<totalClientsCountDataProps> =
      UserModel.countDocuments({
        role: "client",
      });

    const data = await Promise.all([
      monthlyEarningPromise,
      recentPaymentsPromise,
      thisMonthEarningPromise,
      thisYearEarningPromise,
      allTimeEarningPromise,
      totalClientsCountPromise,
    ]);

    const [
      monthlyEarningData,
      recentPaymentsData,
      thisMonthEarningData,
      thisYearEarningData,
      allTimeEarningData,
      totalClientsCountData,
    ] = data;

    return {
      monthlyEarningData,
      recentPaymentsData,
      thisMonthEarningData,
      thisYearEarningData,
      allTimeEarningData,
      totalClientsCountData,
    };
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}

type recentPaymentDataProps = {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  client: { email: string };
};
type thisMonthEarningDataProps = { _id: string; earned: number };
type totalClientsCountDataProps = number;
