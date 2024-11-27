"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadController = void 0;
const busboy_1 = __importDefault(require("busboy"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Replace with your API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your API secret
});
exports.FileUploadController = {
    UploadFile: (req, res, next) => {
        const bb = (0, busboy_1.default)({ headers: req.headers });
        const uploadedFiles = [];
        bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
            console.log(`Uploading: ${filename}`);
            const cloudinaryStream = cloudinary_1.v2.uploader.upload_stream({ folder: "uploads" }, // Optional: Specify folder in Cloudinary
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
            });
            // Pipe file stream to Cloudinary
            file.pipe(cloudinaryStream);
        });
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
//# sourceMappingURL=FileUpload.js.map