import { Request, Response, NextFunction } from "express";
import LeasePeriod from "../Models/LeasePeriod";
interface LeasePeriodType {
  CreateLeasePeriod: (req: Request, res: Response, next: NextFunction) => void;
  GetAllLeasePeriod: (req: Request, res: Response, next: NextFunction) => void;
  GetSingleLeasePeriod: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  UpdateLeasePeriod: (req: Request, res: Response, next: NextFunction) => void;
}
export const LeasePeriodController: LeasePeriodType = {
  CreateLeasePeriod: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const LeasePeriodData = req.body;
      const newLeasePeriodData = new LeasePeriod(LeasePeriodData);
      const savedLeasePeriodData = await newLeasePeriodData.save();
      res.status(201).send({ savedLeasePeriodData });
    } catch (error) {
      next(error);
    }
  },
  GetAllLeasePeriod: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const AllLease = await LeasePeriod.find();
      res.status(200).send({ payload: AllLease });
    } catch (error) {
      next(error);
    }
  },
  GetSingleLeasePeriod: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const leadsPeriodId = req.params.id;
      const leaseIDExist = LeasePeriod.exists({ _id: leadsPeriodId });
      if (!leaseIDExist) {
        res.status(400).send({ message: "invalid lease id" });
        return;
      }
      const AllLease = await LeasePeriod.findOne({ _id: leadsPeriodId });
      res.status(200).send({ payload: AllLease });
    } catch (error) {
      next(error);
    }
  },
  UpdateLeasePeriod: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const leaseID = req.params.id;
      const isMatch = await LeasePeriod.exists({ _id: leaseID });
      if (!isMatch) {
        res.status(404).send({ message: "no lease LeasePeriod match found" });
        return;
      }
      const updatedLease = await LeasePeriod.findOne({ _id: leaseID });
      if (!updatedLease) {
        res.status(404).json({ message: "Lease not found" });
        return;
      }

      const permittedUpadteValues = [
        "LeasePeriodInterval",
        "LeasePeriodStatus",
      ];
      const ObjectKeys = Object.keys(req.body);

      const isValidToUpadte = ObjectKeys.every((leaseData) =>
        permittedUpadteValues.includes(leaseData)
      );
      if (!isValidToUpadte) {
        res.status(404).send({ message: "key entered Lease Period not valid" });
        return;
      }

      permittedUpadteValues.forEach((data) => {
        if (req.body[data]) {
          (updatedLease as any)[data] = req.body[data];
        }
      });
      await updatedLease.save();
      res.status(200).send({ payload: updatedLease });
    } catch (error) {
      next(error);
    }
  },
};
