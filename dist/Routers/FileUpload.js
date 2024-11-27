"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FileUpload_1 = require("../Controllers/FileUpload");
const FileUpload = express_1.default.Router();
FileUpload.post("/file", FileUpload_1.FileUploadController.UploadFile);
exports.default = FileUpload;
//# sourceMappingURL=FileUpload.js.map