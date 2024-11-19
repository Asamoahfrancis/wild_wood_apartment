import { Request, Response, NextFunction } from "express";
import Role from "../Models/Role";

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
      const { RoleType } = req.body;
      const newRole = new Role({ RoleType });
      const savedRole = await newRole.save();
      res.status(201).json(savedRole);
    } catch (error) {
      next(error);
    }
  },

  GetRole: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const roles = await Role.find();
      res.status(200).json(roles);
    } catch (error) {
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
        res.status(404).json({ message: "Role not found" });
        return;
      }
      res.status(200).json(role);
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
        res.status(404).json({ message: "Role not found" });
        return;
      }
      res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
