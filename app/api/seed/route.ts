import { dbConnect } from "@/lib/utils";
import ProjectModel from "@/models/Project";
import { NextResponse } from "next/server";

const users = [
  {
    fullname: { firstname: "John", lastname: "Doe" },
    email: "john.doe@example.com",
    role: "client",
    isActive: true,
  },
  {
    fullname: { firstname: "Jane", lastname: "Smith" },
    email: "jane.smith@example.com",
    role: "client",
    isActive: true,
  },
  {
    fullname: { firstname: "Alice", lastname: "Johnson" },
    email: "alice.johnson@example.com",
    role: "client",
    isActive: false,
  },
  {
    fullname: { firstname: "Bob", lastname: "Brown" },
    email: "bob.brown@example.com",
    role: "client",
    isActive: false,
  },
  {
    fullname: { firstname: "Charlie", lastname: "Williams" },
    email: "charlie.williams@example.com",
    role: "client",
    isActive: true,
  },
  {
    fullname: { firstname: "Daisy", lastname: "Miller" },
    email: "daisy.miller@example.com",
    role: "client",
    isActive: true,
  },
  {
    fullname: { firstname: "Ethan", lastname: "Davis" },
    email: "ethan.davis@example.com",
    role: "client",
    isActive: false,
  },
  {
    fullname: { firstname: "Fiona", lastname: "Garcia" },
    email: "fiona.garcia@example.com",
    role: "client",
    isActive: true,
  },
  {
    fullname: { firstname: "George", lastname: "Martinez" },
    email: "george.martinez@example.com",
    role: "client",
    isActive: false,
  },
  {
    fullname: { firstname: "Hannah", lastname: "Rodriguez" },
    email: "hannah.rodriguez@example.com",
    role: "client",
    isActive: true,
  },
];

const projects = [
  {
    name: "Daisy Project 1",
    price: 2000,
    status: "draft",
    payment_link: null,
    payment_status: "pending",
    payment_link_generated_on: null,
    completed_on: null,
    paid_on: null,
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef943",
  },
  {
    name: "Daisy Project 2",
    price: 1500,
    status: "complete",
    payment_link: "razorpay.me/daisy",
    payment_status: "success",
    payment_link_generated_on: new Date(Date.UTC(2024, 0o4, 17)).toISOString(),
    completed_on: new Date(Date.UTC(2024, 0o4, 17)).toISOString(),
    paid_on: new Date(Date.UTC(2024, 0o4, 17)).toISOString(),
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef943",
    createdAt: new Date(Date.UTC(2024, 0o4, 0o5)).toISOString(),
    updatedAt: new Date(Date.UTC(2024, 0o4, 17)).toISOString(),
  },
  {
    name: "Daisy Project 3",
    price: 2500,
    status: "complete",
    payment_link: "razorpay.me/daisy",
    payment_status: "success",
    payment_link_generated_on: new Date(Date.UTC(2024, 0o3, 20)).toISOString(),
    completed_on: new Date(Date.UTC(2024, 0o3, 20)).toISOString(),
    paid_on: new Date(Date.UTC(2024, 0o3, 20)).toISOString(),
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef943",
    createdAt: new Date(Date.UTC(2024, 0o3, 0o5)).toISOString(),
    updatedAt: new Date(Date.UTC(2024, 0o3, 20)).toISOString(),
  },
  {
    name: "John Project 1",
    price: 500,
    status: "complete",
    payment_link: "razorpay.me/john",
    payment_status: "success",
    payment_link_generated_on: new Date(Date.UTC(2024, 0o3, 0o6)).toISOString(),
    completed_on: new Date(Date.UTC(2024, 0o3, 0o6)).toISOString(),
    paid_on: new Date(Date.UTC(2024, 0o3, 8)).toISOString(),
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef93e",
    createdAt: new Date(Date.UTC(2024, 0o2, 20)).toISOString(),
    updatedAt: new Date(Date.UTC(2024, 0o3, 8)).toISOString(),
  },
  {
    name: "John Project 2",
    price: 3500,
    status: "complete",
    payment_link: "razorpay.me/john",
    payment_status: "success",
    payment_link_generated_on: new Date(Date.UTC(2024, 0o3, 18)).toISOString(),
    completed_on: new Date(Date.UTC(2024, 0o3, 18)).toISOString(),
    paid_on: new Date(Date.UTC(2024, 0o3, 18)).toISOString(),
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef93e",
    createdAt: new Date(Date.UTC(2024, 0o3, 8)).toISOString(),
    updatedAt: new Date(Date.UTC(2024, 0o3, 18)).toISOString(),
  },
  {
    name: "Jane Project 1",
    price: 6500,
    status: "complete",
    payment_link: "razorpay.me/jane",
    payment_status: "success",
    payment_link_generated_on: new Date(Date.UTC(2024, 0o2, 15)).toISOString(),
    completed_on: new Date(Date.UTC(2024, 0o2, 15)).toISOString(),
    paid_on: new Date(Date.UTC(2024, 0o2, 15)).toISOString(),
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef93f",
    createdAt: new Date(Date.UTC(2024, 0o2, 8)).toISOString(),
    updatedAt: new Date(Date.UTC(2024, 0o2, 15)).toISOString(),
  },
  {
    name: "Jane Project 2",
    price: 950,
    status: "complete",
    payment_link: "razorpay.me/jane",
    payment_status: "success",
    payment_link_generated_on: new Date(Date.UTC(2024, 0o2, 10)).toISOString(),
    completed_on: new Date(Date.UTC(2024, 0o2, 10)).toISOString(),
    paid_on: new Date(Date.UTC(2024, 0o2, 10)).toISOString(),
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef93f",
    createdAt: new Date(Date.UTC(2024, 0o1, 26)).toISOString(),
    updatedAt: new Date(Date.UTC(2024, 0o2, 10)).toISOString(),
  },
  {
    name: "Alice Project 1",
    price: 2950,
    status: "complete",
    payment_link: "razorpay.me/alice",
    payment_status: "success",
    payment_link_generated_on: new Date(Date.UTC(2024, 0o1, 12)).toISOString(),
    completed_on: new Date(Date.UTC(2024, 0o1, 12)).toISOString(),
    paid_on: new Date(Date.UTC(2024, 0o1, 12)).toISOString(),
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef940",
    createdAt: new Date(Date.UTC(2024, 0o1, 10)).toISOString(),
    updatedAt: new Date(Date.UTC(2024, 0o1, 12)).toISOString(),
  },
  {
    name: "Alice Project 2",
    price: 4440,
    status: "complete",
    payment_link: "razorpay.me/alice",
    payment_status: "success",
    payment_link_generated_on: new Date(Date.UTC(2024, 0o1, 20)).toISOString(),
    completed_on: new Date(Date.UTC(2024, 0o1, 20)).toISOString(),
    paid_on: new Date(Date.UTC(2024, 0o1, 20)).toISOString(),
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef940",
    createdAt: new Date(Date.UTC(2024, 0o1, 12)).toISOString(),
    updatedAt: new Date(Date.UTC(2024, 0o1, 20)).toISOString(),
  },
  {
    name: "Bob Project 1",
    price: 440,
    status: "complete",
    payment_link: "razorpay.me/alice",
    payment_status: "success",
    payment_link_generated_on: new Date(Date.UTC(2024, 0o0, 15)).toISOString(),
    completed_on: new Date(Date.UTC(2024, 0o0, 15)).toISOString(),
    paid_on: new Date(Date.UTC(2024, 0o0, 15)).toISOString(),
    project_steps: [
      {
        title: "Step 1",
        description: "Description of Step 1",
      },
      {
        title: "Step 2",
        description: "Description of Step 2",
      },
    ],
    clientId: "664d7aebd47e0b552d3ef941",
    createdAt: new Date(Date.UTC(2024, 0o0, 0o7)).toISOString(),
    updatedAt: new Date(Date.UTC(2024, 0o0, 15)).toISOString(),
  },
];

export async function GET() {
  try {
    dbConnect();
    // await UserModel.deleteMany({});
    // await UserModel.insertMany(users);
    await ProjectModel.deleteMany({});
    await ProjectModel.insertMany(projects);
    console.log("Users inserted");
    return NextResponse.json({ message: "Users inserted" }, { status: 200 });
  } catch (error) {
    console.error("Failed to insert data", error);
    return NextResponse.json(
      { message: "Faile to insert data" },
      { status: 500 }
    );
  }
}
