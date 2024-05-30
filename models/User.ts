import { Model, Schema, model, models } from "mongoose";

import { type User } from "@/lib/definitions";

const UserSchema: Schema<User> = new Schema(
  {
    fullname: {
      firstname: { type: String, required: [true, "Firstname is required"] },
      lastname: { type: String, default: undefined },
    },
    email: { type: String, required: [true, "Email is required"] },
    role: { type: String, default: "client" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
UserSchema.index({ _id: 1, role: 1 });
const UserModel =
  (models?.User as Model<User>) || model<User>("User", UserSchema);

export default UserModel;
