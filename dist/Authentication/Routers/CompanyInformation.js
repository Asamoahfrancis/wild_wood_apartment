"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyInformationRouter = void 0;
const express_1 = __importDefault(require("express"));
const CompanyInformation_1 = require("../Controllers/CompanyInformation");
const AuthMiddleware_1 = __importDefault(require("../../Middlewares/AuthMiddleware"));
exports.CompanyInformationRouter = express_1.default.Router();
exports.CompanyInformationRouter.post("/signup", CompanyInformation_1.CompanyInformationController.SignUp);
exports.CompanyInformationRouter.get("/company/one", AuthMiddleware_1.default, CompanyInformation_1.CompanyInformationController.CompanyData);
exports.CompanyInformationRouter.post("/signin", CompanyInformation_1.CompanyInformationController.SignIn);
exports.CompanyInformationRouter.put("/company", AuthMiddleware_1.default, CompanyInformation_1.CompanyInformationController.UpdateInformation);
exports.default = exports.CompanyInformationRouter;
//# sourceMappingURL=CompanyInformation.js.map