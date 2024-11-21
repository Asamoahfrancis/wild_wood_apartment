import express from "express";
import { CompanyInformationController } from "../Controllers/CompanyInformation";
import AuthMiddleware from "../../Middlewares/AuthMiddleware";

export const CompanyInformationRouter = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a Company
 *     description: This is used to create a new Company for the apartment complex.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - CompanyName
 *               - CompanyEmail
 *               - CompanyPassword
 *               - CompanyLogo
 *               - CompanyAddress
 *               - CompanyPhone
 *             properties:
 *               CompanyName:
 *                 type: string
 *                 description: "The name of the company"
 *               CompanyLogo:
 *                 type: string
 *                 description: "Optional company logo"
 *               CompanyAddress:
 *                 type: string
 *                 description: "The address of the company"
 *               CompanyPhone:
 *                 type: string
 *                 description: "The phone number of the company"
 *               CompanyEmail:
 *                 type: string
 *                 format: email
 *                 description: "The email address of the company"
 *               CompanyPassword:
 *                 type: string
 *                 format: password
 *                 description: "The password for the company account"
 *               CompanyConfirmPassword:
 *                 type: string
 *                 format: password
 *                 description: "Must match the CompanyPassword"
 *     responses:
 *       201:
 *         description: Company was created successfully.
 *       404:
 *         description: Failed to create a Company.
 *       500:
 *         description: Internal server error.
 */

CompanyInformationRouter.post("/signup", CompanyInformationController.SignUp);

/**
 * @swagger
 * /company/one:
 *   get:
 *     summary: Get  Company Account
 *     security:
 *       - bearerAuth: []
 *     description: This is used to Get  Company account for the apartment complex.
 *     tags:
 *       - Company Information
 *     responses:
 *       201:
 *         description: Company was signin successfully.
 *       404:
 *         description: Failed to signin a Company.
 *       500:
 *         description: Internal server error.
 */
CompanyInformationRouter.get(
  "/company/one",
  AuthMiddleware,
  CompanyInformationController.CompanyData
);

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in a Company
 *     description: Authenticate a company and receive a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - CompanyEmail
 *               - CompanyPassword
 *             properties:
 *               CompanyEmail:
 *                 type: string
 *                 format: email
 *                 description: "The email of the company"
 *               CompanyPassword:
 *                 type: string
 *                 format: password
 *                 description: "The password for the company account"
 *     responses:
 *       200:
 *         description: Successfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: "JWT token"
 *       401:
 *         description: Invalid credentials
 */

CompanyInformationRouter.post("/signin", CompanyInformationController.SignIn);

/**
 * @swagger
 * /company:
 *   put:
 *     summary: update a Company
 *     description: This is used to Update a new Company for the apartment complex.
 *     tags:
 *       - Company Information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CompanyName:
 *                 type: string
 *                 description: "The name of the company"
 *               CompanyLogo:
 *                 type: string
 *                 description: "Optional company logo"
 *               CompanyAddress:
 *                 type: string
 *                 description: "The address of the company"
 *               CompanyPhone:
 *                 type: string
 *                 description: "The phone number of the company"
 *               CompanyEmail:
 *                 type: string
 *                 format: email
 *                 description: "The email address of the company"
 *     responses:
 *       200:
 *         description: Company was Updated successfully.
 *       404:
 *         description: Failed to Update a Company.
 *       400:
 *         description: Make sure you update with the correct information.
 *       500:
 *         description: Internal server error.
 */

CompanyInformationRouter.put(
  "/company",
  AuthMiddleware,
  CompanyInformationController.UpdateInformation
);

export default CompanyInformationRouter;
