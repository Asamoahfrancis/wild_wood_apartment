import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CompanyInformation from "../Authentication/Model/CompanyInformation";
import Tenant from "../Models/Tenant";

dotenv.config();

export interface CustomRequest extends Request {
  companyData?: any;
  adminTenantData?: any;
  token?: string;
}

const AuthMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const secret = process.env.JWT_SECRET as string;

    const token = req.header("Authorization")?.replace("Bearer", "").trim();
    if (!token) {
      res.status(401).json({ message: "Authorization token is missing" });
      return;
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    const { _id } = decoded;

    const tenantUser = await Tenant.findOne({
      _id,
      "TenantTokens.token": token,
    }).populate("RoleKey");

    if (tenantUser) {
      req.adminTenantData = tenantUser;
      req.token = token;
      next();
      return;
    }

    const companyUser = await CompanyInformation.findOne({
      _id,
      "tokens.token": token,
    });

    if (companyUser) {
      req.companyData = companyUser;
      req.token = token;
      next();
      return;
    }

    res.status(404).json({ message: "User not found or unauthorized" });
  } catch (error: any) {
    console.error("AuthMiddleware error:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export default AuthMiddleware;
