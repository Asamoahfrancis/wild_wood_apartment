import express from "express";
import { CompanyInformationController } from "../Controllers/CompanyInformation";
import AuthMiddleware from "../../Middlewares/AuthMiddleware";

export const CompanyInformationRouter = express.Router();

CompanyInformationRouter.post("/signup", CompanyInformationController.SignUp);
CompanyInformationRouter.get(
  "/company/one",
  AuthMiddleware,
  CompanyInformationController.CompanyData
);

CompanyInformationRouter.post("/signin", CompanyInformationController.SignIn);

CompanyInformationRouter.put(
  "/company",
  AuthMiddleware,
  CompanyInformationController.UpdateInformation
);

export default CompanyInformationRouter;
