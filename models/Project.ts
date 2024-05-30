import { Model, Schema, model, models } from "mongoose";

import { type Project, type ProjectStep } from "@/lib/definitions";

const ProjectStepsSchema: Schema<ProjectStep> = new Schema(
  {
    title: { type: String },
    description: { type: String },
  },
  { timestamps: true, _id: false }
);

const ProjectSchema: Schema<Project> = new Schema(
  {
    name: { type: String, required: [true, "Project name is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    status: { type: String, default: "draft" },
    payment_link: { type: String, default: null },
    payment_status: { type: String, default: "pending" },
    payment_link_generated_on: { type: Date, default: null },
    completed_on: { type: Date, default: null },
    paid_on: { type: Date, default: null },
    project_steps: [ProjectStepsSchema],
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

ProjectSchema.index({ client: 1 });

const ProjectModel =
  (models?.Project as Model<Project>) ||
  model<Project>("Project", ProjectSchema);

export default ProjectModel;
