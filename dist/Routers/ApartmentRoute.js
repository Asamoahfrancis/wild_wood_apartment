"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApartmantController_1 = require("../Controllers/ApartmantController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const ApartmentRouter = express_1.default.Router();
/**
 * @swagger
 * /apartment:
 *   post:
 *     summary: Create an Apartment
 *     description: This is used to create an Apartment.
 *     tags:
 *       - Apartment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ApartmentComplexKey
 *               - RoomFeeKey
 *               - ApartmentName
 *             properties:
 *               ApartmentComplexKey:
 *                 type: string
 *                 description: The key of the Apartment Complex
 *               RoomFeeKey:
 *                 type: string
 *                 description: The key of the Room Fee
 *               ApartmentName:
 *                 type: string
 *                 description: The name of the Apartment
 *     responses:
 *       201:
 *         description: Apartment was created successfully.
 *       404:
 *         description: Failed to create Apartment.
 *       500:
 *         description: Internal server error.
 */
ApartmentRouter.post("/apartment", AuthMiddleware_1.default, ApartmantController_1.ApartmentController.CreateApartment);
/**
 * @swagger
 * /apartment:
 *   get:
 *     summary: All all Apartments
 *     description: This is used to get all Apartment.
 *     tags:
 *       - Apartment
 *     responses:
 *       200:
 *         description: Apartment was retreived successfully.
 *       404:
 *         description: Failed to retreived Apartment.
 *       500:
 *         description: Internal server error.
 */
ApartmentRouter.get("/apartment", AuthMiddleware_1.default, ApartmantController_1.ApartmentController.GetApartment);
/**
 * @swagger
 * /apartment/{id}:
 *   put:
 *     summary: update Apartment
 *     description: This is used to Update a new Apartment.
 *     tags:
 *       - Apartment
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the apartment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ApartmentComplexKey:
 *                 type: string
 *                 description: The key of the Apartment Complex
 *               RoomFeeKey:
 *                 type: string
 *                 description: The key of the Room Fee
 *               ApartmentName:
 *                 type: string
 *                 description: The name of the Apartment
 *     responses:
 *       200:
 *         description: Apartment  was Updated successfully.
 *       404:
 *         description: Failed to Update a Apartment .
 *       400:
 *         description: Make sure you update with the correct information.
 *       500:
 *         description: Internal server error.
 */
ApartmentRouter.put("/apartment/:id", AuthMiddleware_1.default, ApartmantController_1.ApartmentController.UpadateApartment);
ApartmentRouter.get("/apartment/:id", ApartmantController_1.ApartmentController.GetSingleApartment);
exports.default = ApartmentRouter;
//# sourceMappingURL=ApartmentRoute.js.map