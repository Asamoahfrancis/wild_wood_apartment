import express from "express";
import { FileUploadController } from "../Controllers/FileUpload";

const FileUpload = express.Router();

FileUpload.post("/upload", FileUploadController.UploadFile);

export default FileUpload;
//hello
