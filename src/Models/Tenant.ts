import mongoose, { Schema, Document } from "mongoose";
import LeasePeriod from "./LeasePeriod";
import Role from "./Role";
import TenantPaymentHistory from "./TenantPaymentHistory";
import Apartment from "./Apartment";
interface TenantType extends Document {
  TenantFirstName: string;
  TenantMiddleName: string;
  TenantLastName: string;
  TenantEmail: string;
  TenantPhone: number;
  LeasePeriodKey: mongoose.Types.ObjectId;
  ApartmentKey: mongoose.Types.ObjectId;
  RoleKey: mongoose.Types.ObjectId;
  TenantPaymentHistoryKey: mongoose.Types.ObjectId;
  TenantPassword: string;
}

const TenantSchema = new Schema<TenantType>(
  {
    TenantFirstName: {
      type: String,
      required: [true, "TenantFirstName is required"],
      trim: true,
      lowercase: true,
    },
    TenantMiddleName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    TenantLastName: {
      type: String,
      required: [true, "TenantLastName is required"],
      trim: true,
      lowercase: true,
    },
    TenantEmail: {
      type: String,
      required: [true, "TenantEmail is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    TenantPhone: {
      type: Number,
      unique: true,
      required: [true, "TenantPhone is required"],
    },
    LeasePeriodKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeasePeriod",
      required: [true, "LeasePeriodKey is required"],
    },
    ApartmentKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: [true, "ApartmentKey is required"],
    },
    RoleKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: [true, "RoleKey is required"],
    },
    TenantPaymentHistoryKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TenantPaymentHistory",
      // required: [true, "TenantPaymentHistory is required"],
    },
    TenantPassword: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

TenantSchema.pre("save", async function (next) {
  const TenantData = this;
  if (TenantData.LeasePeriodKey) {
    const leaseExits = await LeasePeriod.exists({
      _id: TenantData.LeasePeriodKey,
    });
    if (!leaseExits) {
      throw new Error("The specified LeasePeriodKey does not exist.");
    }
  }
  if (TenantData.ApartmentKey) {
    const apartmentExits = await Apartment.exists({
      _id: TenantData.ApartmentKey,
    });
    if (!apartmentExits) {
      throw new Error("The specified ApartmentKey does not exist.");
    }
  }
  if (TenantData.RoleKey) {
    const roleExits = await Role.exists({ _id: TenantData.RoleKey });
    if (!roleExits) {
      throw new Error("The specified RoleKey does not exist.");
    }
  }
  if (TenantData.TenantPaymentHistoryKey) {
    const TenantPaymentHistoryExits = await TenantPaymentHistory.exists({
      _id: TenantData.TenantPaymentHistoryKey,
    });
    if (!TenantPaymentHistoryExits) {
      throw new Error("The specified Tenant Payment History  does not exist.");
    }
  }

  if (TenantData.TenantPassword) {
    const RoleData = await Role.findOne({ _id: TenantData.RoleKey });
    if (RoleData) {
      const role = RoleData.RoleType;
      if (role !== "Tenant Administrator") {
        throw new Error("You're not a Tenant Administrator");
      }
    }
  }
  next();
});
const Tenant = mongoose.model<TenantType>("Tenant", TenantSchema);

export default Tenant;
