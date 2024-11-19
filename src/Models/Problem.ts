import mongoose, { Schema, Document } from "mongoose";

interface ProblemType extends Document {
  ProblemDescription: string;
  ProblemType: string;
}

const ProblemSchema = new Schema<ProblemType>(
  {
    ProblemDescription: {
      type: String,
      required: [true, "ProblemDescription is required"],
    },
    ProblemType: {
      type: String,
      required: [true, "ProblemType is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model<ProblemType>("Problem", ProblemSchema);

export default Problem;
