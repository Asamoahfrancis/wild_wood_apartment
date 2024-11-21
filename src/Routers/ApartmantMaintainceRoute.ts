import express from "express";
import { ApartmantMaintainceController } from "../Controllers/ApartmantMaintainceController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
const ApartmantMaintainceRouter = express.Router();

/**
 * @swagger
 * /apartment-maintance-fee:
 *   post:
 *     summary: Create an Apartment Maintance Fee
 *     description: This is used to create  an Apartment Maintance Fee for the apartment complex.
 *     tags:
 *       - Apartment Maintance Fee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ApartmentKey
 *               - MaintenanceKey
 *             properties:
 *               ApartmentKey:
 *                 type: string
 *                 description: "The key of the Apartment"
 *               MaintenanceKey:
 *                 type: string
 *                 description: "The key of  the Maintenance"
 *     responses:
 *       201:
 *         description: Apartment Maintance Fee was created successfully.
 *       404:
 *         description: Failed to create Apartment Maintance Fee.
 *       500:
 *         description: Internal server error.
 */
ApartmantMaintainceRouter.post(
  "/apartment-maintance-fee",
  AuthMiddleware,
  ApartmantMaintainceController.CreateApartmantMaintainceFee
);

export default ApartmantMaintainceRouter;
