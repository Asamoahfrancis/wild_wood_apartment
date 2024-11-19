import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import Role from "../../Models/Role";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET as string;

interface CompanyAuthenticationType extends Document {
  CompanyName: string;
  CompanyLogo: string;
  CompanyAddress: string;
  CompanyPhone: string;
  CompanyEmail: string;
  CompanyPassword: string;
  CompanyForgetPassword?: string;
  CompanyConfirmPassword?: string;
  _confirmPassword?: string;
  CompanyRole: mongoose.Schema.Types.ObjectId;
  GenerateAuthToken: () => Promise<string>;
  tokens: Array<{ token: string }>;
}

interface CompanyAuthenticationModel extends Model<CompanyAuthenticationType> {
  FindByCredentials(
    Email: string,
    Password: string
  ): Promise<CompanyAuthenticationType>;
}
const CompanyAuthenticationTypeSchema = new Schema<CompanyAuthenticationType>(
  {
    CompanyName: {
      type: String,
      required: [true, "CompanyName is required"],
      unique: true,
      trim: true,
    },
    CompanyLogo: {
      type: String,
      required: [true, "CompanyLogo is required"],
    },
    CompanyAddress: {
      type: String,
      required: [true, "CompanyAddress is required"],
      trim: true,
    },
    CompanyPhone: {
      type: String,
      required: [true, "CompanyPhone is required"],
      trim: true,
      validate: {
        validator: (v: string) => /^\+?[1-9]\d{1,14}$/.test(v),
        message: "Invalid phone number format",
      },
    },
    CompanyEmail: {
      type: String,
      required: [true, "CompanyEmail is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
        message: "Invalid email format",
      },
    },
    CompanyPassword: {
      type: String,
      required: [true, "CompanyPassword is required"],
    },
    CompanyForgetPassword: {
      type: String,
    },
    CompanyRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      // required: [true, "CompanyRole is required"],
    },
    tokens: [
      {
        token: {
          type: String,
          required: [true, "Token is Required"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

CompanyAuthenticationTypeSchema.virtual("CompanyConfirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value: string) {
    this._confirmPassword = value;
  });

CompanyAuthenticationTypeSchema.pre("save", async function (next) {
  const Companyuser = this as CompanyAuthenticationType;

  if (Companyuser.CompanyRole) {
    const roleExists = await Role.exists({ _id: Companyuser.CompanyRole });
    if (!roleExists) {
      throw new Error("The specified CompanyRole does not exist.");
    }
  }

  if (Companyuser.isModified("CompanyPassword")) {
    if (Companyuser.CompanyConfirmPassword !== Companyuser.CompanyPassword) {
      throw new Error("CompanyConfirmPassword must match CompanyPassword");
    }

    Companyuser.CompanyPassword = await bcrypt.hash(
      Companyuser.CompanyPassword,
      8
    );
  }

  next();
});

//static methods
CompanyAuthenticationTypeSchema.statics.FindByCredentials = async function (
  Email: string,
  Password: string
): Promise<CompanyAuthenticationType> {
  const companyData = await this.findOne({ CompanyEmail: Email });

  if (!companyData) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(Password, companyData.CompanyPassword);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return companyData;
};

//methods

CompanyAuthenticationTypeSchema.methods.GenerateAuthToken = async function () {
  const companyData = this;
  const token = jwt.sign({ _id: companyData._id.toString() }, secret);
  companyData.tokens = companyData.tokens.concat({ token: token });
  await companyData.save();
  return token;
};
const CompanyInformation = mongoose.model<CompanyAuthenticationType>(
  "CompanyInformation",
  CompanyAuthenticationTypeSchema
) as CompanyAuthenticationModel;

export default CompanyInformation;
