import mongoose, { Schema, Document } from "mongoose";

interface RoomFeeType extends Document {
  RoomFeePrice: number;
  RoomFeeSize: string;
  RoomFeeStipend: string;
}

const ApartmentComplexSchema = new Schema<RoomFeeType>(
  {
    RoomFeePrice: {
      type: Number,
      required: [true, "RoomFeePrice is required"],
    },
    RoomFeeSize: {
      type: String,
      required: [true, "RoomFeeSize is required"],
    },
    RoomFeeStipend: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const RoomFee = mongoose.model<RoomFeeType>("RoomFee", ApartmentComplexSchema);

export default RoomFee;
