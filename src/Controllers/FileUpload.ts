import { Response, Request, NextFunction } from "express";
import Busboy from "busboy";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
interface FileUploadType {
  UploadFile: (req: Request, res: Response, next: NextFunction) => void;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Replace with your API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your API secret
});

export const FileUploadController = {
  UploadFile: (req: Request, res: Response, next: NextFunction) => {
    const bb = Busboy({ headers: req.headers });
    const uploadedFiles: Array<{ url: string; name: string }> = [];

    bb.on(
      "file",
      (
        fieldname: any,
        file: any,
        filename: any,
        encoding: any,
        mimetype: any
      ) => {
        console.log(`Uploading: ${filename}`);

        const cloudinaryStream = cloudinary.uploader.upload_stream(
          { folder: "uploads" }, // Optional: Specify folder in Cloudinary
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return res
                .status(500)
                .send({ message: "File upload failed", error });
            }

            if (result) {
              uploadedFiles.push({
                url: result.secure_url,
                name: result.original_filename,
              });
              console.log(`Uploaded to Cloudinary: ${result.secure_url}`);
            }
          }
        );

        // Pipe file stream to Cloudinary
        file.pipe(cloudinaryStream);
      }
    );

    bb.on("field", (fieldname, val) => {
      console.log(`Field [${fieldname}]: value: ${val}`);
    });

    bb.on("close", () => {
      console.log("Done parsing form!");
      res
        .status(201)
        .send({ message: "Files uploaded successfully", files: uploadedFiles });
    });

    req.pipe(bb);
  },
};
