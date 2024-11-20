"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TenantAdminSigninController_1 = require("../Controllers/TenantAdminSigninController");
const AuthMiddleware_1 = __importDefault(require("../../Middlewares/AuthMiddleware"));
const TenantAdminSigninRouter = express_1.default.Router();
TenantAdminSigninRouter.post("/tenant-signin", AuthMiddleware_1.default, TenantAdminSigninController_1.TenantAdminController.TenantSigin);
exports.default = TenantAdminSigninRouter;
//# sourceMappingURL=TenantAdminSigninRoute.js.map