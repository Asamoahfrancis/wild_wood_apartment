import mongoose, { Schema, Document } from "mongoose";
import Problem from "./Problem";
interface MaintainceFeeType extends Document {
  MaintainceFeeResolutionDate: Date;
  MaintainceFeeExpense: string;
  MaintainceFeeProblemKey: mongoose.Types.ObjectId;
}

const MaintainceFeeSchema = new Schema<MaintainceFeeType>(
  {
    MaintainceFeeResolutionDate: {
      type: Date,
      required: [true, "MaintainceFeeResolutionDate is required"],
    },
    MaintainceFeeExpense: {
      type: String,
      required: [true, "MaintainceFeeExpense is required"],
    },
    MaintainceFeeProblemKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: [true, "MaintainceFeeProblemKey is required"],
    },
  },
  {
    timestamps: true,
  }
);

MaintainceFeeSchema.pre("save", async function (next) {
  const MaintainceFeeData = this;
  if (MaintainceFeeData.MaintainceFeeProblemKey) {
    const ProblemKeyFeeExist = await Problem.exists({
      _id: MaintainceFeeData.MaintainceFeeProblemKey,
    });
    if (!ProblemKeyFeeExist) {
      throw new Error("The specified ProblemKey does not exist.");
    }
  }
  next();
});

const MaintainceFee = mongoose.model<MaintainceFeeType>(
  "MaintainceFee",
  MaintainceFeeSchema
);

export default MaintainceFee;
