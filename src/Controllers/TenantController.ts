import { Request, Response, NextFunction } from "express";
import Tenant from "../Models/Tenant";

interface TenantControllerType {
  PostTenant: (req: Request, res: Response, next: NextFunction) => void;
  GetTenant: (req: Request, res: Response, next: NextFunction) => void;
  GetSingleTenant: (req: Request, res: Response, next: NextFunction) => void;
  UpdateTenant: (req: Request, res: Response, next: NextFunction) => void;
  DeleteTenant: (req: Request, res: Response, next: NextFunction) => void;
}

export const TenantController: TenantControllerType = {
  // Create a new tenant
  PostTenant: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const tenantData = req.body;
      const newTenant = new Tenant(tenantData);
      const savedTenant = await newTenant.save();
      res.status(201).json(savedTenant);
    } catch (error) {
      next(error);
    }
  },

  // Get all tenants
  GetTenant: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("jwt:", req.headers);
      const tenants = await Tenant.find()
        .populate("LeasePeriodKey")
        .populate({
          path: "ApartmentKey",
          populate: { path: "ApartmentComplexKey RoomFeeKey" },
        })
        .populate("RoleKey")
        .populate({
          path: "TenantPaymentHistoryKey",
          populate: {
            path: "TenantKey TenantPaymentKey",
          },
        });
      res.status(200).json(tenants);
    } catch (error) {
      next(error);
    }
  },

  // Get a single tenant by ID
  GetSingleTenant: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const tenantId = req.params.id;
      const tenant = await Tenant.findById(tenantId)
        .populate("LeasePeriodKey")
        .populate({
          path: "ApartmentKey",
          populate: { path: "ApartmentComplexKey RoomFeeKey" },
        })
        .populate("RoleKey")
        .populate({
          path: "TenantPaymentHistoryKey",
          populate: {
            path: "TenantKey TenantPaymentKey",
          },
        });
      if (!tenant) {
        res.status(404).json({ message: "Tenant not found" });
        return;
      }
      res.status(200).json(tenant);
    } catch (error) {
      next(error);
    }
  },

  // Update a tenant by ID
  UpdateTenant: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const tenantId = req.params.id;

      const updatedTenant = await Tenant.findOne({ _id: tenantId });

      if (!updatedTenant) {
        res.status(404).json({ message: "Tenant not found" });
        return;
      }

      const legalUpdateData: (keyof any)[] = [
        "TenantPhone",
        "TenantEmail",
        "LeasePeriodKey",
        "ApartmentKey",
        "RoleKey",
        "TenantPaymentHistoryKey",
      ];

      const ObjectKeys = Object.keys(req.body);

      const isMatch = ObjectKeys.every((tenantData) =>
        legalUpdateData.includes(tenantData as keyof any)
      );
      if (!isMatch) {
        res.status(400).json({
          message: "Make sure you update with the correct information",
        });
        return;
      }
      legalUpdateData.forEach((key) => {
        if (req.body[key]) {
          (updatedTenant as any)[key] = req.body[key];
        }
      });
      await updatedTenant.save();
      res.status(200).json({ message: "Update successful", updatedTenant });
    } catch (error) {
      next(error);
    }
  },

  // Delete a tenant by ID
  DeleteTenant: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const tenantId = req.params.id;
      const deletedTenant = await Tenant.findByIdAndDelete(tenantId);
      if (!deletedTenant) {
        res.status(404).json({ message: "Tenant not found" });
        return;
      }
      res.status(200).json({ message: "Tenant deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
