import express from "express";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
import { TenantPaymentController } from "../Controllers/TenantPaymentHistorycontroller";

const TenantPaymentHistoryRouter = express.Router();

TenantPaymentHistoryRouter.post(
  "/tenant-payment-history",
  AuthMiddleware,
  TenantPaymentController.CreateTenantPaymentHistory
);

TenantPaymentHistoryRouter.get(
  "/tenant-payment-history",
  AuthMiddleware,
  TenantPaymentController.GetTenantPaymentHistory
);

TenantPaymentHistoryRouter.get(
  "/tenant-payment-history/:id",
  AuthMiddleware,
  TenantPaymentController.GetSingleTenantPaymentHistory
);

export default TenantPaymentHistoryRouter;
