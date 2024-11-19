import express from "express";
import { MaintainceFeeController } from "../Controllers/MaintainceFeeController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
const MaintainceFeeRouter = express.Router();

MaintainceFeeRouter.post(
  "/maintaince",
  AuthMiddleware,
  MaintainceFeeController.CreateMaintainceFee
);

MaintainceFeeRouter.get(
  "/maintaince",
  MaintainceFeeController.GetAllMaintainceFee
);
MaintainceFeeRouter.get(
  "/maintaince/:id",
  MaintainceFeeController.GetSingleMaintainceFee
);
MaintainceFeeRouter.put(
  "/maintaince/:id",
  MaintainceFeeController.UpdateMaintainceFee
);
export default MaintainceFeeRouter;
