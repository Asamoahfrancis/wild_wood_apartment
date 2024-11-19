import express from "express";
import { LeasePeriodController } from "../Controllers/LeasePeriodController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
const LeasePeriodRouter = express.Router();

LeasePeriodRouter.post(
  "/lease-period",
  AuthMiddleware,
  LeasePeriodController.CreateLeasePeriod
);
LeasePeriodRouter.get(
  "/lease-period/:id",
  AuthMiddleware,
  LeasePeriodController.GetSingleLeasePeriod
);
LeasePeriodRouter.get(
  "/lease-period",
  AuthMiddleware,
  LeasePeriodController.GetAllLeasePeriod
);
LeasePeriodRouter.put(
  "/lease-period/:id",
  AuthMiddleware,
  LeasePeriodController.UpdateLeasePeriod
);

export default LeasePeriodRouter;
