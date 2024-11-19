"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const TenantPaymentController_1 = require("../Controllers/TenantPaymentController");
const TenantPaymentRouter = express_1.default.Router();
TenantPaymentRouter.post("/tenant-payment", AuthMiddleware_1.default, TenantPaymentController_1.TenantPaymentController.CreateTenantPayment);
TenantPaymentRouter.get("/tenant-payment", AuthMiddleware_1.default, TenantPaymentController_1.TenantPaymentController.GetAllTenantPayment);
TenantPaymentRouter.get("/tenant-payment/:id", AuthMiddleware_1.default, TenantPaymentController_1.TenantPaymentController.GetSingleTenantPayment);
TenantPaymentRouter.put("/tenant-payment/:id", AuthMiddleware_1.default, TenantPaymentController_1.TenantPaymentController.UpdateTenantPayment);
exports.default = TenantPaymentRouter;
//# sourceMappingURL=TenantPaymentRoute.js.map