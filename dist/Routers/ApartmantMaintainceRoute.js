"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApartmantMaintainceController_1 = require("../Controllers/ApartmantMaintainceController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const ApartmantMaintainceRouter = express_1.default.Router();
ApartmantMaintainceRouter.post("/apartment-maintance-fee", AuthMiddleware_1.default, ApartmantMaintainceController_1.ApartmantMaintainceController.CreateApartmantMaintainceFee);
exports.default = ApartmantMaintainceRouter;
//# sourceMappingURL=ApartmantMaintainceRoute.js.map