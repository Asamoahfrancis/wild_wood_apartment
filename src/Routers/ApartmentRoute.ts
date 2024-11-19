import express from "express";
import { ApartmentController } from "../Controllers/ApartmantController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

const ApartmentRouter = express.Router();

ApartmentRouter.post(
  "/apartment",
  AuthMiddleware,
  ApartmentController.CreateApartment
);
ApartmentRouter.get(
  "/apartment",
  AuthMiddleware,
  ApartmentController.GetApartment
);
ApartmentRouter.put(
  "/apartment/:id",
  AuthMiddleware,
  ApartmentController.UpadateApartment
);
ApartmentRouter.get("/apartment/:id", ApartmentController.GetSingleApartment);
export default ApartmentRouter;
