import mongoose, { Schema, Document } from "mongoose";

interface RoleType extends Document {
  RoleType: string;
}

const RoleSchema = new Schema<RoleType>(
  {
    RoleType: {
      type: String,
      required: [true, "RoleType is required"],
      unique: true,
      enum: {
        values: ["Tenant Administrator", "Tenant"],
        message: "Roles must be one of 'Tenant Administrator', 'Tenant'",
      },
      default: "Tenant",
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model<RoleType>("Role", RoleSchema);

export default Role;
