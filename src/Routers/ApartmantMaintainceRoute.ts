import express from "express";
import { ApartmantMaintainceController } from "../Controllers/ApartmantMaintainceController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
const ApartmantMaintainceRouter = express.Router();

ApartmantMaintainceRouter.post(
  "/apartment-maintance-fee",
  AuthMiddleware,
  ApartmantMaintainceController.CreateApartmantMaintainceFee
);

export default ApartmantMaintainceRouter;
