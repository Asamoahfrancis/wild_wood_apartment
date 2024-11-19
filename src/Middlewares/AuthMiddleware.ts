import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CompanyInformation from "../Authentication/Model/CompanyInformation";
dotenv.config();

export interface CustomRequest extends Request {
  companyData?: any;
  token?: any;
}

const AuthMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const secret = process.env.JWT_SECRET as string;
    const token = req
      .header("Authorization")
      ?.replace("Bearer", "")
      .trim() as string;

    // console.log("Token Data : ", token);
    const decoded: any = jwt.verify(token, secret);
    const companyUSer = await CompanyInformation.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!companyUSer) {
      throw new Error("Company does not exist");
    }
    req.companyData = companyUSer;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};

export default AuthMiddleware;
