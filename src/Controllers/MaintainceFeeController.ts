import { Response, Request, NextFunction } from "express";
import MaintainceFee from "../Models/MaintainceFee";

interface MaintainceFeeType {
  CreateMaintainceFee: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  GetAllMaintainceFee: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  GetSingleMaintainceFee: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  UpdateMaintainceFee: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

export const MaintainceFeeController: MaintainceFeeType = {
  CreateMaintainceFee: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const MaintenceFeePayload = req.body;
      const newMaintainceFee = new MaintainceFee(MaintenceFeePayload);
      const savedMaintenceFee = await newMaintainceFee.save();
      res.status(201).send({ savedMaintenceFee });
    } catch (error) {
      next(error);
    }
  },
  GetAllMaintainceFee: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const AllMaintence = await MaintainceFee.find();
      res.status(201).send({ payload: AllMaintence });
    } catch (error) {
      next(error);
    }
  },
  GetSingleMaintainceFee: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const maintainceId = req.params.id;
      if (!maintainceId) {
        res.status(404).send({ message: "please provide a maintance params" });
        return;
      }

      const isMatch = await MaintainceFee.exists({ _id: maintainceId });
      if (!isMatch) {
        res
          .status(404)
          .send({ message: "please provide a maintance params that is valid" });
        return;
      }
      const foundMaintance = await MaintainceFee.findOne({ _id: maintainceId });
      if (!foundMaintance) {
        res.status(404).send({ message: "no miantance found" });
        return;
      }
      res.status(201).send({ payload: foundMaintance });
    } catch (error) {
      next(error);
    }
  },
  UpdateMaintainceFee: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const maintainceId = req.params.id;
      if (!maintainceId) {
        res.status(404).send({ message: "please provide a maintance params" });
        return;
      }

      const isMatch = await MaintainceFee.exists({ _id: maintainceId });
      if (!isMatch) {
        res
          .status(404)
          .send({ message: "please provide a maintance params that is valid" });
        return;
      }
      const foundMaintance = await MaintainceFee.findOne({ _id: maintainceId });
      if (!foundMaintance) {
        res.status(404).send({ message: "no miantance found" });
        return;
      }
      const permittedEdit = [
        "MaintainceFeeResolutionDate",
        "MaintainceFeeExpense",
        "MaintainceFeeProblemKey",
      ];
      const objectData = Object.keys(req.body);
      const isOk = objectData.every((data) => permittedEdit.includes(data));

      if (!isOk) {
        res.status(404).send({ message: "please only update data provided" });
        return;
      }

      permittedEdit.forEach((data) => {
        if (req.body[data]) {
          (foundMaintance as any)[data] = req.body[data];
        }
      });

      await foundMaintance.save();
      res
        .status(201)
        .send({ message: "Updated successfully", payload: foundMaintance });
    } catch (error) {
      next(error);
    }
  },
};
