import { Request, Response, NextFunction } from "express";
import Tenant from "../../Models/Tenant";
interface TenantAdminSigninType {
  TenantSigin: (req: Request, res: Response, next: NextFunction) => void;
}

export const TenantAdminController: TenantAdminSigninType = {
  TenantSigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tenantData = await Tenant.FindAuthTenants(
        req.body.TenantEmail,
        req.body.TenantPassword
      );
      const token = await tenantData.GenerateTenantTokens();
      res
        .status(200)
        .send({
          message: "Login succesfully",
          payload: tenantData,
          token: token,
        });
    } catch (error) {
      next(error);
    }
  },
};
