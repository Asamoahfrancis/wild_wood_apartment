import { Request, Response, NextFunction } from "express";
import Tenant from "../Models/Tenant";
import { CustomRequest } from "../Middlewares/AuthMiddleware";
import Role from "../Models/Role";

interface TenantControllerType {
  PostTenant: (req: Request, res: Response, next: NextFunction) => void;
  GetTenant: (req: Request, res: Response, next: NextFunction) => void;
  GetSingleTenant: (req: Request, res: Response, next: NextFunction) => void;
  UpdateTenant: (req: Request, res: Response, next: NextFunction) => void;
  DeleteTenant: (req: Request, res: Response, next: NextFunction) => void;
}

export const TenantController: TenantControllerType = {
  PostTenant: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const tenantData = req.body;
      const { companyData, adminTenantData } = req;

      if (!tenantData.RoleKey) {
        res.status(400).send({ message: "RoleKey is required" });
        return;
      }

      const getRoleType = await Role.findOne({ _id: tenantData.RoleKey });
      if (!getRoleType) {
        res.status(404).send({ message: "Invalid RoleKey provided" });
        return;
      }

      if (companyData) {
        if (getRoleType.RoleType !== "Tenant Administrator") {
          res.status(403).send({
            message: "Only Tenant Administrators can create Tenants",
          });
          return;
        }
        if (!tenantData.TenantPassword) {
          res.status(403).send({
            message: "Provide a default Password for Tenant Admin",
          });
          return;
        }
      } else if (adminTenantData) {
        if (getRoleType.RoleType !== "Tenant") {
          res.status(403).send({
            message: "Only Admins can create Tenant Administrators",
          });
          return;
        }
      } else {
        res.status(403).send({
          message: "Unauthorized: Invalid user type",
        });
        return;
      }

      const newTenant = new Tenant(tenantData);
      const savedTenant = await newTenant.save();

      res.status(201).send(savedTenant);
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
      // console.log("jwt:", req.headers);
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
