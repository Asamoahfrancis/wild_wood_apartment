import { Request, Response, NextFunction } from "express";
import Role from "../Models/Role";
import { CustomRequest } from "../Middlewares/AuthMiddleware";
import mongoose from "mongoose";

interface RoleControllerType {
  PostRole: (req: Request, res: Response, next: NextFunction) => void;
  GetRole: (req: Request, res: Response, next: NextFunction) => void;
  GetSingleRole: (req: Request, res: Response, next: NextFunction) => void;
  UpdateRole: (req: Request, res: Response, next: NextFunction) => void;
  DeleteRole: (req: Request, res: Response, next: NextFunction) => void;
}

export const RoleController: RoleControllerType = {
  PostRole: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { RoleType, CompanyInformationKey } = req.body;
      const newRole = new Role({ RoleType, CompanyInformationKey });
      const savedRole = await newRole.save();
      res.status(201).json(savedRole);
    } catch (error) {
      next(error);
    }
  },

  GetRole: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Validate `companyData` and its `_id`
      if (!req.companyData || !req.companyData._id) {
        res.status(400).json({
          message: "Invalid request. Missing company data or ID.",
        });
        return;
      }

      const companyId = new mongoose.Types.ObjectId(req.companyData._id);

      const roles = await Role.find({
        CompanyInformationKey: companyId,
      }).populate("CompanyInformationKey");

      if (!roles || roles.length === 0) {
        res.status(404).json({
          message: `No roles found for company ID: ${req.companyData._id}`,
        });
        return;
      }

      res.status(200).json({
        message: "Roles retrieved successfully",
        payload: roles,
      });
    } catch (error) {
      console.error("Error fetching roles:", error);
      next(error);
    }
  },

  GetSingleRole: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const roleId = req.params.id;
      const role = await Role.findById(roleId);
      if (!role) {
        res.status(404).send({ message: "Role not found" });
        return;
      }
      res.status(200).send({ payload: role });
    } catch (error) {
      next(error);
    }
  },

  UpdateRole: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const roleId = req.params.id;
      const { RoleType } = req.body;
      const allowedToUpdate = "RoleType";
      const UpdateObjectKeys = Object.keys(req.body).join();
      if (UpdateObjectKeys !== allowedToUpdate) {
        res.status(404).json({ message: "Update role cannot be updated" });
        return;
      }
      const updatedRole = await Role.findByIdAndUpdate(
        roleId,
        { RoleType },
        { new: true, runValidators: true }
      );
      if (!updatedRole) {
        res.status(404).json({ message: "Role not found" });
        return;
      }
      res.status(200).json(updatedRole);
    } catch (error) {
      next(error);
    }
  },

  DeleteRole: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const roleId = req.params.id;
      const deletedRole = await Role.findByIdAndDelete(roleId);
      if (!deletedRole) {
        res.status(404).send({ message: "Role not found" });
        return;
      }
      res.status(200).send({ message: "Role deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
