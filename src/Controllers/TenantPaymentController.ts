import { Response, Request, NextFunction } from "express";
import TenantPayment from "../Models/TenantPayment";
interface TenantPaymentType {
  CreateTenantPayment: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  GetAllTenantPayment: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  GetSingleTenantPayment: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  UpdateTenantPayment: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

export const TenantPaymentController: TenantPaymentType = {
  CreateTenantPayment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const TenantPaymentPayload = req.body;
      const newTenantPayment = new TenantPayment(TenantPaymentPayload);
      const saveTenantPayment = await newTenantPayment.save();
      res.status(201).send({ saveTenantPayment });
    } catch (error) {
      next(error);
    }
  },
  GetAllTenantPayment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const GetAllPayment = await TenantPayment.find();
      res.status(201).send({ payload: GetAllPayment });
    } catch (error) {
      next(error);
    }
  },
  GetSingleTenantPayment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tenantPaymentId = req.params.id;
      if (!tenantPaymentId) {
        res.status(404).send({ message: "Error occurred id is invalid" });
        return;
      }

      const idExist = await TenantPayment.exists({ _id: tenantPaymentId });
      if (!idExist) {
        res.status(404).send({ message: "ID doex not exist" });
        return;
      }

      const actualTenantPayemntData = await TenantPayment.findOne({
        _id: tenantPaymentId,
      });
      if (!actualTenantPayemntData) {
        res.status(404).send({ message: "Tenant Paymant does not exist" });
        return;
      }

      res.status(200).send({ payload: actualTenantPayemntData });
    } catch (error) {
      next(error);
    }
  },
  UpdateTenantPayment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tenantPaymentId = req.params.id;
      if (!tenantPaymentId) {
        res.status(404).send({ message: "Error occurred id is invalid" });
        return;
      }

      const idExist = await TenantPayment.exists({ _id: tenantPaymentId });
      if (!idExist) {
        res.status(404).send({ message: "ID doex not exist" });
        return;
      }

      const actualTenantPayemntData = await TenantPayment.findOne({
        _id: tenantPaymentId,
      });
      if (!actualTenantPayemntData) {
        res.status(404).send({ message: "Tenant Paymant does not exist" });
        return;
      }

      const permittedUpdateData = [
        "TenantPaymentAmount",
        "TenantPaymentTime",
        "TenantPaymentIsLate",
      ];
      const objectKeys = Object.keys(req.body);

      const isContaining = objectKeys.every((data) =>
        permittedUpdateData.includes(data)
      );
      if (!isContaining) {
        res.status(404).send({ message: "please update the correct keys" });
        return;
      }

      permittedUpdateData.forEach((data) => {
        if (req.body[data]) {
          (actualTenantPayemntData as any)[data] = req.body[data];
        }
      });

      await actualTenantPayemntData.save();

      res.status(200).send({
        message: "updated successfully",
        payload: actualTenantPayemntData,
      });
    } catch (error) {
      next(error);
    }
  },
};
