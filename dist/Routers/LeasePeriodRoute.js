"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LeasePeriodController_1 = require("../Controllers/LeasePeriodController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const LeasePeriodRouter = express_1.default.Router();
LeasePeriodRouter.post("/lease-period", AuthMiddleware_1.default, LeasePeriodController_1.LeasePeriodController.CreateLeasePeriod);
LeasePeriodRouter.get("/lease-period/:id", AuthMiddleware_1.default, LeasePeriodController_1.LeasePeriodController.GetSingleLeasePeriod);
LeasePeriodRouter.get("/lease-period", AuthMiddleware_1.default, LeasePeriodController_1.LeasePeriodController.GetAllLeasePeriod);
LeasePeriodRouter.put("/lease-period/:id", AuthMiddleware_1.default, LeasePeriodController_1.LeasePeriodController.UpdateLeasePeriod);
exports.default = LeasePeriodRouter;
//# sourceMappingURL=LeasePeriodRoute.js.map