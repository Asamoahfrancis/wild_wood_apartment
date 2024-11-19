import mongoose, { Schema, Document } from "mongoose";

interface ApartmentComplexType extends Document {
  ApartmentComplexAddress: string;
  CompanyInformation: mongoose.Schema.Types.ObjectId;
}

const ApartmentComplexSchema = new Schema<ApartmentComplexType>(
  {
    ApartmentComplexAddress: {
      type: String,
      required: [true, "ApartmentComplexAddress is required"],
    },
  },
  {
    timestamps: true,
  }
);

const ApartmentComplex = mongoose.model<ApartmentComplexType>(
  "ApartmentComplex",
  ApartmentComplexSchema
);

export default ApartmentComplex;
