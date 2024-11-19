import express from "express";
import { ApartmentComplexController } from "../Controllers/ApartmentComplexController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

const ApartmentComplexRouter = express.Router();

ApartmentComplexRouter.post(
  "/apartment-complex",
  AuthMiddleware,
  ApartmentComplexController.CreateApartmentComplex
);

ApartmentComplexRouter.get(
  "/apartment-complex/:id",
  ApartmentComplexController.GetSingleApartmentComplex
);
ApartmentComplexRouter.get(
  "/apartment-complex",
  ApartmentComplexController.GetAllApartmentComplex
);

ApartmentComplexRouter.put(
  "/apartment-complex/:id",
  ApartmentComplexController.UpdateApartmentComplex
);
export default ApartmentComplexRouter;
