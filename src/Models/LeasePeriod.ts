import mongoose, { Schema, Document } from "mongoose";

interface LeasePeriodType extends Document {
  LeasePeriodStatus: string;
  LeasePeriodInterval: string;
}

const LeasePeriodSchema = new Schema<LeasePeriodType>(
  {
    LeasePeriodInterval: {
      type: String,
      required: [true, "LeasePeriodInterval is required"],
    },
    LeasePeriodStatus: {
      type: String,
      required: [true, "LeasePeriodStatus is required"],
      enum: ["active", "inactive", "terminated"],
    },
  },
  {
    timestamps: true,
  }
);

const LeasePeriod = mongoose.model<LeasePeriodType>(
  "LeasePeriod",
  LeasePeriodSchema
);

export default LeasePeriod;
