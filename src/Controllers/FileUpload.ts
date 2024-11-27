import { Response, Request, NextFunction } from "express";
import Busboy from "busboy";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary, UploadStream } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const FileUploadController = {
  UploadFile: (req: Request, res: Response, next: NextFunction) => {
    const bb = Busboy({ headers: req.headers });
    const uploadPromises: Array<Promise<{ url: string; name: string }>> = [];

    bb.on(
      "file",
      (
        fieldname: any,
        file: { pipe: (arg0: UploadStream) => void },
        filename: any,
        encoding: any,
        mimetype: any
      ) => {
        // console.log(`Uploading file: ${filename}`);

        const uploadPromise = new Promise<{ url: string; name: string }>(
          (resolve, reject) => {
            const cloudinaryStream = cloudinary.uploader.upload_stream(
              { folder: "uploads" },
              (error, result) => {
                if (error) {
                  console.error("Cloudinary upload error:", error);
                  return reject(
                    new Error(error.message || "Cloudinary upload failed")
                  );
                }

                if (result) {
                  resolve({
                    url: result.secure_url,
                    name: result.original_filename,
                  });
                }
              }
            );

            file.pipe(cloudinaryStream);
          }
        );

        uploadPromises.push(uploadPromise);
      }
    );

    bb.on("field", (fieldname, val) => {
      console.log(`Received field [${fieldname}]: ${val}`);
    });

    bb.on("close", async () => {
      try {
        const uploadedFiles = await Promise.all(uploadPromises);
        // console.log("All files uploaded successfully:", uploadedFiles);
        res.status(201).json({
          message: "Files uploaded successfully",
          files: uploadedFiles,
        });
      } catch (error: any) {
        console.error("File upload process encountered an error:", error);
        res.status(500).json({
          message: "File upload failed",
          error: error.message || "Unknown error occurred",
        });
      }
    });

    req.pipe(bb);
  },
};
