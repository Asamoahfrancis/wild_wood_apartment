import mongoose, { Schema, Document } from "mongoose";
import ApartmentComplex from "./ApartmentComplex";
import RoomFee from "./RoomFee";
import ApartmantMaintainceFee from "./ApartmantMaintainceFee";

interface ApartmentType extends Document {
  ApartmentComplexKey: mongoose.Schema.Types.ObjectId;
  ApartmentName: string;
  RoomFeeKey: mongoose.Schema.Types.ObjectId;
  ApartmentMaintainceFeeKey: mongoose.Schema.Types.ObjectId;
}

const ApartmentSchema = new Schema<ApartmentType>(
  {
    ApartmentComplexKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApartmentComplex",
      required: [true, "ApartmentComplexKey is required"],
    },
    RoomFeeKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomFee",
      required: [true, "RoomKeyKey is required"],
    },
    ApartmentName: {
      type: String,
      required: [true, "ApartmentName is required"],
      unique: true,
    },
    ApartmentMaintainceFeeKey: {
      ref: "ApartmantMaintainceFee",
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ApartmentSchema.pre("save", async function (next) {
  const apartmentData = this;
  if (apartmentData.ApartmentComplexKey) {
    const newApartment = await ApartmentComplex.exists({
      _id: apartmentData.ApartmentComplexKey,
    });
    if (!newApartment) {
      throw new Error("The specified ApartmentComplex Key does not exist.");
    }
  }

  if (apartmentData.RoomFeeKey) {
    const newRoomFeeKey = await RoomFee.exists({
      _id: apartmentData.RoomFeeKey,
    });
    if (!newRoomFeeKey) {
      throw new Error("The specified  RoomFeeKey does not exist.");
    }
  }
  if (apartmentData.ApartmentMaintainceFeeKey) {
    const newApartmentMaintainceFeeKey = await ApartmantMaintainceFee.exists({
      _id: apartmentData.ApartmentMaintainceFeeKey,
    });
    if (!newApartmentMaintainceFeeKey) {
      throw new Error(
        "The specified  Apartment MaintainceFee Key does not exist."
      );
    }
  }

  next();
});

const Apartment = mongoose.model<ApartmentType>("Apartment", ApartmentSchema);

export default Apartment;
