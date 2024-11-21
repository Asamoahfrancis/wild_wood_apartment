"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RolesController_1 = require("../Controllers/RolesController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const RoleRouter = express_1.default.Router();
/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create a role
 *     description: This is used to create a new role for the apartment complex.
 *     tags:
 *       - Role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - RoleType
 *             properties:
 *               RoleType:
 *                 type: string
 *                 description: "The name of the company"
 *     responses:
 *       201:
 *         description: Role was created successfully.
 *       404:
 *         description: Failed to create a Role.
 *       500:
 *         description: Internal server error.
 */
RoleRouter.post("/role", AuthMiddleware_1.default, RolesController_1.RoleController.PostRole);
/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get All  Role
 *     security:
 *       - bearerAuth: []
 *     description: This is used to Get  Role  for the apartment complex.
 *     tags:
 *       - Role
 *     responses:
 *       201:
 *         description: Company was signin successfully.
 *       404:
 *         description: Failed to signin a Company.
 *       500:
 *         description: Internal server error.
 */
RoleRouter.get("/role", AuthMiddleware_1.default, RolesController_1.RoleController.GetRole);
/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get a single Role
 *     description: Retrieve details of a specific Role  by its ID.
 *     tags:
 *       - Role
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the Role
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role  retrieved successfully.
 *       404:
 *         description: Apartment Complex not found.
 *       500:
 *         description: Internal server error.
 */
RoleRouter.get("/role/:id", AuthMiddleware_1.default, RolesController_1.RoleController.GetSingleRole);
/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: update role
 *     description: This is used to Update a new role.
 *     tags:
 *       - Role
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the role
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - RoleType
 *             properties:
 *               RoleType:
 *                 type: string
 *                 description: "The name of the RoleType"
 *     responses:
 *       200:
 *         description: Role was Updated successfully.
 *       404:
 *         description: Failed to Update a Role.
 *       400:
 *         description: Make sure you update with the correct information.
 *       500:
 *         description: Internal server error.
 */
RoleRouter.put("/role/:id", AuthMiddleware_1.default, RolesController_1.RoleController.UpdateRole);
RoleRouter.delete("/role/:id", AuthMiddleware_1.default, RolesController_1.RoleController.DeleteRole);
exports.default = RoleRouter;
//# sourceMappingURL=RoleRoute.js.map