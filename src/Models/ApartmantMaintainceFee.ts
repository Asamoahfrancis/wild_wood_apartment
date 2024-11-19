import mongoose, { Schema, Document } from "mongoose";
import Apartment from "./Apartment";
import MaintainceFee from "./MaintainceFee";
interface ApartmantMaintainceFeeType extends Document {
  MaintenanceKey: mongoose.Schema.Types.ObjectId;
  ApartmentKey: mongoose.Schema.Types.ObjectId;
}

const ApartmantMaintainceFeeSchema = new Schema<ApartmantMaintainceFeeType>(
  {
    ApartmentKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: [true, "ApartmentKey is required"],
    },
    MaintenanceKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaintainceFee",
      required: [true, "MaintenanceKey is required"],
    },
  },
  {
    timestamps: true,
  }
);

ApartmantMaintainceFeeSchema.pre("save", async function (next) {
  const ApartmantMaintainceFeeData = this;
  if (ApartmantMaintainceFeeData.ApartmentKey) {
    const isExistApartmentKey = await Apartment.exists({
      _id: ApartmantMaintainceFeeData.ApartmentKey,
    });
    if (!isExistApartmentKey) {
      throw new Error("The specified ApartmentKey  does not exist.");
    }
  }
  if (ApartmantMaintainceFeeData.MaintenanceKey) {
    const isExistMaintenanceKey = await MaintainceFee.exists({
      _id: ApartmantMaintainceFeeData.MaintenanceKey,
    });
    if (!isExistMaintenanceKey) {
      throw new Error("The specified MaintenanceKey  does not exist.");
    }
  }
  next();
});

const ApartmantMaintainceFee = mongoose.model<ApartmantMaintainceFeeType>(
  "ApartmantMaintainceFee",
  ApartmantMaintainceFeeSchema
);

export default ApartmantMaintainceFee;
