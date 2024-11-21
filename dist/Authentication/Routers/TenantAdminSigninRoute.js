"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TenantAdminSigninController_1 = require("../Controllers/TenantAdminSigninController");
const AuthMiddleware_1 = __importDefault(require("../../Middlewares/AuthMiddleware"));
const TenantAdminSigninRouter = express_1.default.Router();
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
TenantAdminSigninRouter.post("/tenant-signin", AuthMiddleware_1.default, TenantAdminSigninController_1.TenantAdminController.TenantSigin);
exports.default = TenantAdminSigninRouter;
//# sourceMappingURL=TenantAdminSigninRoute.js.map