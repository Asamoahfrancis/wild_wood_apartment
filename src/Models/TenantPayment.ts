import mongoose, { Schema, Document } from "mongoose";

interface TenantPaymentType extends Document {
  TenantPaymentAmount: number;
  TenantPaymentTime: Date;
  TenantPaymentIsLate: string;
}

const TenantPaymentSchema = new Schema<TenantPaymentType>(
  {
    TenantPaymentAmount: {
      type: Number,
      required: [true, "TenantPaymentAmount is required"],
    },
    TenantPaymentTime: {
      type: Date,
      required: [true, "TenantPaymentTime is required"],
    },
    TenantPaymentIsLate: {
      type: String,
      required: [true, "TenantPaymentIsLate is required"],
      enum: ["Late", "Not Late"],
    },
  },
  {
    timestamps: true,
  }
);

const TenantPayment = mongoose.model<TenantPaymentType>(
  "TenantPayment",
  TenantPaymentSchema
);

export default TenantPayment;
