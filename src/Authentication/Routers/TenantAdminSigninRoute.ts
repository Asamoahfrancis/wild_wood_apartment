import express from "express";
import { TenantAdminController } from "../Controllers/TenantAdminSigninController";
import AuthMiddleware from "../../Middlewares/AuthMiddleware";

const TenantAdminSigninRouter = express.Router();

/**
 * @swagger
 * /tenant-signin:
 *   post:
 *     summary: Signin a Tenant
 *     description: This is used to Signin a new Tenant for the apartment complex.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - TenantPhone
 *               - TenantPassword
 *             properties:
 *               TenantPhone:
 *                 type: string
 *                 description: "The name of the company"
 *               TenantPassword:
 *                 type: string
 *                 description: "Optional company logo"
 *     responses:
 *       201:
 *         description: Company was created successfully.
 *       404:
 *         description: Failed to create a Company.
 *       500:
 *         description: Internal server error.
 */

TenantAdminSigninRouter.post(
  "/tenant-signin",
  AuthMiddleware,
  TenantAdminController.TenantSigin
);

export default TenantAdminSigninRouter;
