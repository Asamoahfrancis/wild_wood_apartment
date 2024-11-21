"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApartmantMaintainceController_1 = require("../Controllers/ApartmantMaintainceController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const ApartmantMaintainceRouter = express_1.default.Router();
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
ApartmantMaintainceRouter.post("/apartment-maintance-fee", AuthMiddleware_1.default, ApartmantMaintainceController_1.ApartmantMaintainceController.CreateApartmantMaintainceFee);
exports.default = ApartmantMaintainceRouter;
//# sourceMappingURL=ApartmantMaintainceRoute.js.map