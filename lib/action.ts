"use server";

import ProjectModel from "@/models/Project";
import User from "@/models/User";

import { Status } from "./definitions";

import dbConnect from "@/utils/dbConnect";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { generatePaymentLink } from "./razorpay-link";
import {
  addClientSchema,
  addProjectSchema,
  addStepSchema,
} from "./zod-definitions";
import { formateDateWithMilliseconds } from "@/utils/formatDate";

type projectInput = z.infer<typeof addProjectSchema>;
type clientInput = z.infer<typeof addClientSchema>;
type stepInput = z.infer<typeof addStepSchema> & { _id: string };

export async function addNewProject(formData: projectInput) {
  console.log("Form Data is:", formData);
  const parsed = addProjectSchema.safeParse(formData);
  const issuesToSend = parsed.error?.issues.map((issue) => issue.message);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      issues: issuesToSend,
    };
  }

  try {
    await dbConnect();
    const clientExist = await User.findOne({ email: formData.email });
    if (!clientExist) {
      return { message: "Client doesn't exist" };
    }
    const newProject = new ProjectModel({
      projectName: formData.projectName,
      price: formData.price,
      client: {
        firstname: clientExist.fullname.firstname,
        lastname: clientExist.fullname.lastname,
        email: formData.email,
      },
    });

    const res = await newProject.save();
    console.log("Project saved:", res);
    revalidatePath("/projects");
    return {
      message: "Data received",
      issues: issuesToSend,
    };
  } catch (error) {
    console.error("Failed to save new project:", error);
    return { message: "Failed to save new project" };
  }
}

export async function addNewClient(formData: clientInput) {
  console.log("Form:", formData);

  const parsed = addClientSchema.safeParse(formData);
  const issuesToSend = parsed.error?.issues.map((issue) => issue.message);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      issues: issuesToSend,
    };
  }

  try {
    await dbConnect();
    const existingClient = await User.findOne({ email: formData.email });
    if (existingClient) {
      return { message: "Client alreadt exist" };
    }
    const newClient = new User({
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
    });

    const res = await newClient.save();
    revalidatePath("/clients");
    console.log("New client saved", res);
    return {
      message: "Client registerd",
    };
  } catch (error) {
    console.error("Database error:", error);
    return { message: "Failed to save client" };
  }
}

export async function addNewStep(formData: stepInput) {
  console.log(formData);

  const parsed = addStepSchema.safeParse(formData);
  console.log("Parse", parsed);

  const issuesToSend = parsed.error?.issues.map((issue) => issue.message);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      issues: issuesToSend,
    };
  }

  try {
    await dbConnect();
    const existingProject = await ProjectModel.findById(formData._id);

    if (!existingProject) {
      return { message: "Project does not exist" };
    }

    existingProject.project_steps.push({
      title: formData.title,
      description: formData.description,
    });

    await existingProject.save();

    revalidatePath("/(admin)/projects/[projectId]", "page");
    return {
      message: "Step added",
    };
  } catch (error) {
    console.error("Database error:", error);
    return { message: "Failed to add new step" };
  }
}

export async function changeProjectStatus(
  status: Status,
  _id: string,
  amount: number,
  client?: { firstname: string; lastname?: string | undefined },
  email?: string
) {
  console.log("Server action", status);
  try {
    await dbConnect();
    const project = await ProjectModel.findById(_id);
    if (!project) {
      return { message: "Project does not exist" };
    }
    if (status === "complete" && !project.payment_link) {
      const razorpay_link = await generatePaymentLink({
        name: client?.firstname as string,
        email: email as string,
        mobile_number: "+917434854369",
        amount: amount,
      });
      project.payment_link = razorpay_link.short_url;
      project.payment_link_generated_on = formateDateWithMilliseconds(
        Number(razorpay_link.created_at)
      );
    }
    if (status === "complete") {
      project.completed_on = new Date(Date.now());
    }
    project.status = status;
    await project.save();

    revalidatePath("/(admin)/projects/[projectId]", "page");
  } catch (error) {
    console.error("Database error:", error);
    return { message: "Failed to add new step" };
  }
}
