import { type ObjectId } from "mongoose";

export type User = {
  fullname: { firstname: string; lastname?: string | undefined };
  email: string;
  role: "admin" | "client";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Status = "draft" | "in-progress" | "complete";

export type Project = {
  name: string;
  price: number;
  status: "draft" | "in-progress" | "complete";
  payment_link: string | null;
  payment_status: "pending" | "failed" | "success";
  payment_link_generated_on: Date | null;
  completed_on: Date | null;
  paid_on: Date;
  createdAt: Date;
  updatedAt: Date;
  clientId: ObjectId;
  project_steps: {
    title: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
};

export type ProjectStep = {
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type recentPaymentData = {
  firstname: string;
  name: string;
  price: number;
};

export type ClientData = {
  _id: string;
  name: string;
  email: string;
  status: boolean;
  last_updated: Date;
  totalSpend: number;
};

export type ProjectsData = {
  _id: string;
  name: string;
  price: number;
  status: "draft" | "in-progress" | "complete";
  payment_status: "pending" | "failed" | "success";
  updatedAt: Date;
  clientData: { _id: string; fullname: { firstname: string }; email: string };
};

export type summaryCard = {
  cardTitle: string;
  cardIcon: React.ElementType;
  cardContentTitle: string;
  cardContentSubTitle?: string;
};

export type fetchProjectWithClient = Project & {
  client: {
    fullname: { firstname: string; lastname?: string };
    email: string;
  };
};

export type clientPageColumn = {
  _id: string;
  name: string;
  price: number;
  status: string;
  payment_status: string;
  completed_on: Date | null;
  updatedAt: Date;
};

export type fetchClientWithProjects = {
  _id: string;
  fullname: { firstname: string; lastname?: string };
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  projects: {
    _id: string;
    name: string;
    price: number;
    status: string;
    payment_status: string;
    completed_on: Date;
    updatedAt: Date;
  }[];
};
