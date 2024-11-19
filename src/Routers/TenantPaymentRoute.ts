import express from "express";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
import { TenantPaymentController } from "../Controllers/TenantPaymentController";
const TenantPaymentRouter = express.Router();

TenantPaymentRouter.post(
  "/tenant-payment",
  AuthMiddleware,
  TenantPaymentController.CreateTenantPayment
);
TenantPaymentRouter.get(
  "/tenant-payment",
  AuthMiddleware,
  TenantPaymentController.GetAllTenantPayment
);
TenantPaymentRouter.get(
  "/tenant-payment/:id",
  AuthMiddleware,
  TenantPaymentController.GetSingleTenantPayment
);

TenantPaymentRouter.put(
  "/tenant-payment/:id",
  AuthMiddleware,
  TenantPaymentController.UpdateTenantPayment
);

export default TenantPaymentRouter;
