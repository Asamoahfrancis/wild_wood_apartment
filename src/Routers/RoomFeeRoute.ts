import express from "express";
import { RoomFeeController } from "../Controllers/RoomFeeController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

const RoomFeeRouter = express.Router();

RoomFeeRouter.post(
  "/room-fee",
  AuthMiddleware,
  RoomFeeController.CreateRoomFee
);

export default RoomFeeRouter;
