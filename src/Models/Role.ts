import mongoose, { Schema, Document } from "mongoose";
interface RoleType extends Document {
  RoleType: string;
  CompanyInformationKey: mongoose.Schema.Types.ObjectId;
}

const RoleSchema = new Schema<RoleType>(
  {
    RoleType: {
      type: String,
      required: [true, "RoleType is required"],
    },
    CompanyInformationKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyInformation",
      required: [true, "CompanyInformationKey is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model<RoleType>("Role", RoleSchema);

export default Role;
