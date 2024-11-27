"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.FileUploadController = {
    UploadFile: (req, res, next) => {
        const bb = (0, busboy_1.default)({ headers: req.headers });
        const uploadPromises = [];
        bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
            // console.log(`Uploading file: ${filename}`);
            const uploadPromise = new Promise((resolve, reject) => {
                const cloudinaryStream = cloudinary_1.v2.uploader.upload_stream({ folder: "uploads" }, (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return reject(new Error(error.message || "Cloudinary upload failed"));
                    }
                    if (result) {
                        resolve({
                            url: result.secure_url,
                            name: result.original_filename,
                        });
                    }
                });
                file.pipe(cloudinaryStream);
            });
            uploadPromises.push(uploadPromise);
        });
        bb.on("field", (fieldname, val) => {
            console.log(`Received field [${fieldname}]: ${val}`);
        });
        bb.on("close", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const uploadedFiles = yield Promise.all(uploadPromises);
                // console.log("All files uploaded successfully:", uploadedFiles);
                res.status(201).json({
                    message: "Files uploaded successfully",
                    files: uploadedFiles,
                });
            }
            catch (error) {
                console.error("File upload process encountered an error:", error);
                res.status(500).json({
                    message: "File upload failed",
                    error: error.message || "Unknown error occurred",
                });
            }
        }));
        req.pipe(bb);
    },
};
//# sourceMappingURL=FileUpload.js.map