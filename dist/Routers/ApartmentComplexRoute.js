"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApartmentComplexController_1 = require("../Controllers/ApartmentComplexController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const ApartmentComplexRouter = express_1.default.Router();
/**
 * @swagger
 * /apartment-complex:
 *   post:
 *     summary: Create an Apartment Complex
 *     description: This is used to create  an Apartment Complex.
 *     tags:
 *       - Apartment Complex
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ApartmentComplexAddress
 *             properties:
 *               ApartmentComplexAddress:
 *                 type: string
 *                 description: "The key of the Apartment Complex"
 *     responses:
 *       201:
 *         description: Apartment Complex Fee was created successfully.
 *       404:
 *         description: Failed to create Apartment Complex.
 *       500:
 *         description: Internal server error.
 */
ApartmentComplexRouter.post("/apartment-complex", AuthMiddleware_1.default, ApartmentComplexController_1.ApartmentComplexController.CreateApartmentComplex);
/**
 * @swagger
 * /apartment-complex/{id}:
 *   get:
 *     summary: Get a single Apartment Complex
 *     description: Retrieve details of a specific apartment complex by its ID.
 *     tags:
 *       - Apartment Complex
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the apartment complex
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apartment Complex retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 ApartmentComplexAddress:
 *                   type: string
 *                   description: "The address of the apartment complex."
 *       404:
 *         description: Apartment Complex not found.
 *       500:
 *         description: Internal server error.
 */
ApartmentComplexRouter.get("/apartment-complex/:id", ApartmentComplexController_1.ApartmentComplexController.GetSingleApartmentComplex);
/**
 * @swagger
 * /apartment-complex:
 *   get:
 *     summary: Get a All Apartment Complex
 *     description: Retrieve All  apartment complex .
 *     tags:
 *       - Apartment Complex
 *     responses:
 *       200:
 *         description: Apartment Complex retrieved successfully.
 *       404:
 *         description: Apartment Complex not found.
 *       500:
 *         description: Internal server error.
 */
ApartmentComplexRouter.get("/apartment-complex", ApartmentComplexController_1.ApartmentComplexController.GetAllApartmentComplex);
/**
 * @swagger
 * /apartment-complex/{id}:
 *   put:
 *     summary: update Apartment Complex
 *     description: This is used to Update a new Apartment complex.
 *     tags:
 *       - Apartment Complex
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the apartment complex
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ApartmentComplexAddress
 *             properties:
 *               ApartmentComplexAddress:
 *                 type: string
 *                 description: "The name of the ApartmentComplexAddress"
 *     responses:
 *       200:
 *         description: Apartment ComplexAddress was Updated successfully.
 *       404:
 *         description: Failed to Update a Apartment Complex Address.
 *       400:
 *         description: Make sure you update with the correct information.
 *       500:
 *         description: Internal server error.
 */
ApartmentComplexRouter.put("/apartment-complex/:id", ApartmentComplexController_1.ApartmentComplexController.UpdateApartmentComplex);
exports.default = ApartmentComplexRouter;
//# sourceMappingURL=ApartmentComplexRoute.js.map