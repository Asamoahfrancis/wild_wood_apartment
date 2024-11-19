import { Response, Request, NextFunction } from "express";
import RoomFee from "../Models/RoomFee";
interface RoomFeeType {
  CreateRoomFee: (req: Request, res: Response, next: NextFunction) => void;
}

export const RoomFeeController: RoomFeeType = {
  CreateRoomFee: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RoomFeePayload = req.body;
      const newRoomFee = new RoomFee(RoomFeePayload);
      const savedRoomFee = await newRoomFee.save();
      res.status(201).send({ savedRoomFee });
    } catch (error) {
      next(error);
    }
  },
};
