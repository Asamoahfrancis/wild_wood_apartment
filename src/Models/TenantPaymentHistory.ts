import mongoose, { Schema, Document } from "mongoose";
import Tenant from "./Tenant";
import TenantPayment from "./TenantPayment";
interface TenantPaymentHistoryType extends Document {
  TenantKey: mongoose.Schema.Types.ObjectId;
  TenantPaymentKey: mongoose.Schema.Types.ObjectId;
}

const TenantPaymentHistorySchema = new Schema<TenantPaymentHistoryType>(
  {
    TenantKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: [true, "TenantKey is required"],
    },
    TenantPaymentKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TenantPayment",
      required: [true, "TenantPaymentKey is required"],
    },
  },
  {
    timestamps: true,
  }
);

TenantPaymentHistorySchema.pre("save", async function (next) {
  const TenantPaymentHistoryData = this;
  if (TenantPaymentHistoryData.TenantKey) {
    const TenantExits = await Tenant.exists({
      _id: TenantPaymentHistoryData.TenantKey,
    });
    if (!TenantExits) {
      throw new Error("The specified Tenant  does not exist.");
    }
  }
  if (TenantPaymentHistoryData.TenantPaymentKey) {
    const TenantPaymentHistoryExits = await TenantPayment.exists({
      _id: TenantPaymentHistoryData.TenantPaymentKey,
    });
    if (!TenantPaymentHistoryExits) {
      throw new Error("The specified Tenant Payment History does not exist.");
    }
  }

  next();
});

const TenantPaymentHistory = mongoose.model<TenantPaymentHistoryType>(
  "TenantPaymentHistory",
  TenantPaymentHistorySchema
);

export default TenantPaymentHistory;
