import mongoose, { Schema, Document } from "mongoose";

interface FileUploadType extends Document {
  url: string;
}

const FileUploadSchema = new Schema<FileUploadType>(
  {
    url: {
      type: String,
      required: [true, "url is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const FileUpload = mongoose.model<FileUploadType>(
  "FileUpload",
  FileUploadSchema
);

export default FileUpload;
