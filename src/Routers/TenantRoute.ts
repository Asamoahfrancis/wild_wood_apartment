import express from "express";
import { TenantController } from "../Controllers/TenantController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

const TenantRouter = express.Router();

/**
 * @swagger
 * /tenants:
 *   post:
 *     summary: Create a tenant
 *     description: This is used to create a new tenant for the apartment complex.
 *     tags:
 *       - Tenants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TenantFirstName:
 *                 type: string
 *               TenantMiddleName:
 *                 type: string
 *               TenantLastName:
 *                 type: string
 *               TenantEmail:
 *                 type: string
 *               TenantPhone:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tenant was created successfully.
 *       404:
 *         description: Failed to create a tenant.
 */
TenantRouter.post("/tenants", AuthMiddleware, TenantController.PostTenant);

/**
 * @swagger
 * /tenants:
 *   get:
 *     summary: Retrieve all tenants
 *     tags:
 *       - Tenants
 *     responses:
 *       200:
 *         description: A list of tenants.
 */
TenantRouter.get("/tenants", AuthMiddleware, TenantController.GetTenant);

/**
 * @swagger
 * /tenants/{id}:
 *   get:
 *     summary: Get a single tenant
 *     tags:
 *       - Tenants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tenant to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single tenant.
 *       404:
 *         description: Tenant not found.
 */
TenantRouter.get(
  "/tenants/:id",
  AuthMiddleware,
  TenantController.GetSingleTenant
);

/**
 * @swagger
 * /tenants/{id}:
 *   put:
 *     summary: Update a tenant
 *     tags:
 *       - Tenants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tenant to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TenantFirstName:
 *                 type: string
 *               TenantMiddleName:
 *                 type: string
 *               TenantLastName:
 *                 type: string
 *               TenantEmail:
 *                 type: string
 *               TenantPhone:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tenant updated successfully.
 *       404:
 *         description: Tenant not found.
 */
TenantRouter.put("/tenants/:id", AuthMiddleware, TenantController.UpdateTenant);

/**
 * @swagger
 * /tenants/{id}:
 *   delete:
 *     summary: Delete a tenant
 *     tags:
 *       - Tenants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tenant to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tenant deleted successfully.
 *       404:
 *         description: Tenant not found.
 */
TenantRouter.delete(
  "/tenants/:id",
  AuthMiddleware,
  TenantController.DeleteTenant
);

export default TenantRouter;
