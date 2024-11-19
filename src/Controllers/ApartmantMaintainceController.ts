import { Response, Request, NextFunction } from "express";
import ApartmantMaintainceFee from "../Models/ApartmantMaintainceFee";
interface ApartmantMaintainceFeeType {
  CreateApartmantMaintainceFee: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

export const ApartmantMaintainceController: ApartmantMaintainceFeeType = {
  CreateApartmantMaintainceFee: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ApartmantMaintainceFeePayload = req.body;
      const newApartmantMaintainceFee = new ApartmantMaintainceFee(
        ApartmantMaintainceFeePayload
      );

      const savedApartmantMaintainceFee =
        await newApartmantMaintainceFee.save();
      res.status(201).send({ savedApartmantMaintainceFee });
    } catch (error) {
      next(error);
    }
  },
};
