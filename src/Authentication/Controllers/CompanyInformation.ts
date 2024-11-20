import { Request, Response, NextFunction } from "express";
import CompanyInformation from "../Model/CompanyInformation";
import { CustomRequest } from "../../Middlewares/AuthMiddleware";
import { send } from "process";

interface CompanyInformationType {
  SignUp: (req: Request, res: Response, next: NextFunction) => void;
  SignIn: (req: Request, res: Response, next: NextFunction) => void;
  CompanyData: (req: Request, res: Response, next: NextFunction) => void;
  UpdateInformation: (req: Request, res: Response, next: NextFunction) => void;
  ForgotPassword: (req: Request, res: Response, next: NextFunction) => void;
  ResetPassword: (req: Request, res: Response, next: NextFunction) => void;
  UpdatePassword: (req: Request, res: Response, next: NextFunction) => void;
}

export const CompanyInformationController = {
  SignUp: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const CompanyData = req.body;
      const newCompanyData = new CompanyInformation(CompanyData);
      const savedTenant = await newCompanyData.save();
      const token = await newCompanyData?.GenerateAuthToken();

      res.status(201).json({ savedTenant, token: token });
    } catch (error) {
      next(error);
    }
  },
  SignIn: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const companyInfor = await CompanyInformation.FindByCredentials(
        req.body.CompanyEmail,
        req.body.CompanyPassword
      );
      const token = await companyInfor?.GenerateAuthToken();
      res.status(200).send({ payload: companyInfor, token: token });
    } catch (error) {
      next(error);
    }
  },
  CompanyData: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.companyData) {
        res.status(404).send({ message: "Company Data is not available" });
        return;
      }
      res.status(200).send(req.companyData);
    } catch (error) {
      next(error);
    }
  },
  UpdateInformation: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const companyData = req.companyData;
      if (!companyData) {
        res.status(404).json({ message: "companyData not found" });
        return;
      }

      const legalUpdateData: (keyof any)[] = [
        "CompanyName",
        "CompanyLogo",
        "CompanyAddress",
        "CompanyPhone",
        "CompanyEmail",
        "CompanyRole",
      ];

      const ObjectKeys = Object.keys(req.body);

      const isMatch = ObjectKeys.every((companydataKeys) =>
        legalUpdateData.includes(companydataKeys as keyof any)
      );

      if (!isMatch) {
        res.status(400).json({
          message: "Make sure you update with the correct information",
        });
        return;
      }

      legalUpdateData.forEach((key) => {
        if (req.body[key]) {
          (companyData as any)[key] = req.body[key];
        }
      });

      await companyData.save();
      res.status(200).json({ message: "Update successful", companyData });
    } catch (error) {
      next(error);
    }
  },
};
