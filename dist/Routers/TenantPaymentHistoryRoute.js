"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const TenantPaymentHistorycontroller_1 = require("../Controllers/TenantPaymentHistorycontroller");
const TenantPaymentHistoryRouter = express_1.default.Router();
TenantPaymentHistoryRouter.post("/tenant-payment-history", AuthMiddleware_1.default, TenantPaymentHistorycontroller_1.TenantPaymentController.CreateTenantPaymentHistory);
TenantPaymentHistoryRouter.get("/tenant-payment-history", AuthMiddleware_1.default, TenantPaymentHistorycontroller_1.TenantPaymentController.GetTenantPaymentHistory);
TenantPaymentHistoryRouter.get("/tenant-payment-history/:id", AuthMiddleware_1.default, TenantPaymentHistorycontroller_1.TenantPaymentController.GetSingleTenantPaymentHistory);
exports.default = TenantPaymentHistoryRouter;
//# sourceMappingURL=TenantPaymentHistoryRoute.js.map