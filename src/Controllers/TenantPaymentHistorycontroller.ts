import { Response, Request, NextFunction } from "express";
import TenantPaymentHistory from "../Models/TenantPaymentHistory";
interface TenantPaymentHistoryType {
  CreateTenantPaymentHistory: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  GetTenantPaymentHistory: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  GetSingleTenantPaymentHistory: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

export const TenantPaymentController: TenantPaymentHistoryType = {
  CreateTenantPaymentHistory: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const TenantPaymentHistoryPayload = req.body;
      const newTenantPaymentHistory = new TenantPaymentHistory(
        TenantPaymentHistoryPayload
      );
      const savedTenantPaymentHistory = await newTenantPaymentHistory.save();
      res.status(201).send({ savedTenantPaymentHistory });
    } catch (error) {
      next(error);
    }
  },
  GetTenantPaymentHistory: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const GetallTenant = await TenantPaymentHistory.find()
        .populate("TenantKey")
        .populate("TenantPaymentKey");
      res.status(200).send({ payload: GetallTenant });
    } catch (error) {
      next(error);
    }
  },
  GetSingleTenantPaymentHistory: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const TenentPaymantHistoryID = req.params.id;
      if (!TenentPaymantHistoryID) {
        res.status(404).send({ message: "params is invalid" });
      }

      const isExits = await TenantPaymentHistory.exists({
        _id: TenentPaymantHistoryID,
      });
      if (!isExits) {
        res.status(404).send({ message: "params is does not exits" });
        return;
      }
      const TenantPayamentHistoryData = await TenantPaymentHistory.findOne({
        _id: TenentPaymantHistoryID,
      })
        .populate("TenantKey")
        .populate("TenantPaymentKey");
      if (!TenantPayamentHistoryData) {
        res.status(404).send({ payload: TenantPayamentHistoryData });
        return;
      }
      res.status(201).send({ payload: TenantPayamentHistoryData });
    } catch (error) {
      next(error);
    }
  },
};
