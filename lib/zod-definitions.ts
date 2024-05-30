import { z } from "zod";

export const addProjectSchema = z.object({
  projectName: z.string().min(2, { message: "Project name required" }),
  price: z.string(),
  email: z.string().email(),
});

export const addClientSchema = z.object({
  firstname: z.string().min(3, { message: "Too short" }),
  lastname: z.string().optional(),
  email: z.string().email({ message: "Invalid email" }),
});

export const addStepSchema = z.object({
  title: z.string().min(2, { message: "Step title required" }),
  description: z.string().min(2, { message: "Step description required" }),
});
