"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApartmantController_1 = require("../Controllers/ApartmantController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const ApartmentRouter = express_1.default.Router();
ApartmentRouter.post("/apartment", AuthMiddleware_1.default, ApartmantController_1.ApartmentController.CreateApartment);
ApartmentRouter.get("/apartment", AuthMiddleware_1.default, ApartmantController_1.ApartmentController.GetApartment);
ApartmentRouter.put("/apartment/:id", AuthMiddleware_1.default, ApartmantController_1.ApartmentController.UpadateApartment);
ApartmentRouter.get("/apartment/:id", ApartmantController_1.ApartmentController.GetSingleApartment);
exports.default = ApartmentRouter;
//# sourceMappingURL=ApartmentRoute.js.map