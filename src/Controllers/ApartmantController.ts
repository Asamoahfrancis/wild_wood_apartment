import { Response, Request, NextFunction } from "express";
import Apartment from "../Models/Apartment";
import { CustomRequest } from "../Middlewares/AuthMiddleware";
interface ApartmentType {
  CreateApartment: (req: Request, res: Response, next: NextFunction) => void;
  GetApartment: (req: Request, res: Response, next: NextFunction) => void;
  GetSingleApartment: (req: Request, res: Response, next: NextFunction) => void;
  UpadateApartment: (req: Request, res: Response, next: NextFunction) => void;
}

export const ApartmentController: ApartmentType = {
  CreateApartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apartmentPayload = req.body;
      const newApartment = new Apartment(apartmentPayload);

      const savednewApartmentData = await newApartment.save();
      res.status(201).send({ savednewApartmentData });
    } catch (error) {
      next(error);
    }
  },
  GetApartment: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { ApartmentKey } = req.adminTenantData;

      const getApartment = await Apartment.findOne({ _id: ApartmentKey });
      let ApartmentComplexKey_;
      if (getApartment) {
        ApartmentComplexKey_ = getApartment.ApartmentComplexKey;
      }
      const allApartment = await Apartment.find({
        ApartmentComplexKey: ApartmentComplexKey_,
      });
      res.status(201).send({ payload: allApartment });
    } catch (error) {
      next(error);
    }
  },
  GetSingleApartment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const apartId = req.params.id;
      const isExist = await Apartment.exists({ _id: apartId });
      if (!isExist) {
        res.status(404).send({ message: "apartment does not exist" });
        return;
      }
      const foundApartment = await Apartment.findOne({ _id: apartId });
      if (!foundApartment) {
        res.status(404).send({ message: "apartment  not found" });
        return;
      }
      res.status(201).send({ payload: foundApartment });
    } catch (error) {
      next(error);
    }
  },
  UpadateApartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apartId = req.params.id;
      const isExist = await Apartment.exists({ _id: apartId });
      if (!isExist) {
        res.status(404).send({ message: "apartment does not exist" });
        return;
      }
      const foundApartment = await Apartment.findOne({ _id: apartId });
      if (!foundApartment) {
        res.status(404).send({ message: "apartment  not found" });
        return;
      }
      const permittedUpdate = [
        "ApartmentComplexKey",
        "RoomFeeKey",
        "ApartmentName",
      ];
      const objectKeys = Object.keys(req.body);

      const ismatch = objectKeys.every((data) =>
        permittedUpdate.includes(data)
      );
      if (!ismatch) {
        res.status(404).send({ message: "no keys contains non allowed keys" });
        return;
      }

      permittedUpdate.forEach((data) => {
        if (req.body[data]) {
          (foundApartment as any)[data] = req.body[data];
        }
      });

      await foundApartment.save();
      res
        .status(201)
        .send({ message: "Updated successfully", payload: foundApartment });
    } catch (error) {
      next(error);
    }
  },
};
