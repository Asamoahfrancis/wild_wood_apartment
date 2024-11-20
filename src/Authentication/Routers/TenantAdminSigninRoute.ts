import express from "express";
import { TenantAdminController } from "../Controllers/TenantAdminSigninController";
import AuthMiddleware from "../../Middlewares/AuthMiddleware";

const TenantAdminSigninRouter = express.Router();

TenantAdminSigninRouter.post(
  "/tenant-signin",
  AuthMiddleware,
  TenantAdminController.TenantSigin
);

export default TenantAdminSigninRouter;
