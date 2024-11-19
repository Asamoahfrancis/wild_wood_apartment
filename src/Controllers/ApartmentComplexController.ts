import { Response, Request, NextFunction } from "express";
import ApartmentComplex from "../Models/ApartmentComplex";
interface ApartmentComplexType {
  CreateApartmentComplex: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  GetAllApartmentComplex: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  GetSingleApartmentComplex: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  UpdateApartmentComplex: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

export const ApartmentComplexController: ApartmentComplexType = {
  CreateApartmentComplex: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const apartmentComplexPayload = req.body;
      const newApartmentComplex = new ApartmentComplex(apartmentComplexPayload);
      const savedApartmentComplex = await newApartmentComplex.save();
      res.status(201).send({ savedApartmentComplex });
    } catch (error) {
      next(error);
    }
  },
  GetAllApartmentComplex: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const AllApartmentComplex = await ApartmentComplex.find();

      res.status(200).send({ payload: AllApartmentComplex });
    } catch (error) {
      next(error);
    }
  },
  GetSingleApartmentComplex: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const IDapartmentComplex = req.params.id;
      const isExist = await ApartmentComplex.exists({
        _id: IDapartmentComplex,
      });
      if (!isExist) {
        res
          .status(404)
          .send({ message: "Apartment Complex id is not does not exist" });
        return;
      }
      const AllApartmentComplex = await ApartmentComplex.findOne();

      res.status(200).send({ payload: AllApartmentComplex });
    } catch (error) {
      next(error);
    }
  },
  UpdateApartmentComplex: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const IDapartmentComplex = req.params.id;
      const isExist = await ApartmentComplex.exists({
        _id: IDapartmentComplex,
      });
      if (!isExist) {
        res
          .status(404)
          .send({ message: "Apartment Complex id is not does not exist" });
        return;
      }

      const foundApartmentComlex = await ApartmentComplex.findOne({
        _id: IDapartmentComplex,
      });
      if (!foundApartmentComlex) {
        res.status(404).send({ message: "Apartment Complex not found" });
        return;
      }
      const PermitUpdate = "ApartmentComplexAddress";
      const ObjectAddress = Object.keys(req.body).join().trim();

      const isPermitted = ObjectAddress === PermitUpdate;

      if (!isPermitted) {
        res.status(404).send({ message: "This key is not valid for update" });
        return;
      }
      foundApartmentComlex.ApartmentComplexAddress =
        req.body.ApartmentComplexAddress;
      const response = await foundApartmentComlex.save();

      res.status(200).send({ payload: response });
    } catch (error) {
      next(error);
    }
  },
};
