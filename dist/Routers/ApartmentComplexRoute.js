"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApartmentComplexController_1 = require("../Controllers/ApartmentComplexController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const ApartmentComplexRouter = express_1.default.Router();
ApartmentComplexRouter.post("/apartment-complex", AuthMiddleware_1.default, ApartmentComplexController_1.ApartmentComplexController.CreateApartmentComplex);
ApartmentComplexRouter.get("/apartment-complex/:id", ApartmentComplexController_1.ApartmentComplexController.GetSingleApartmentComplex);
ApartmentComplexRouter.get("/apartment-complex", ApartmentComplexController_1.ApartmentComplexController.GetAllApartmentComplex);
ApartmentComplexRouter.put("/apartment-complex/:id", ApartmentComplexController_1.ApartmentComplexController.UpdateApartmentComplex);
exports.default = ApartmentComplexRouter;
//# sourceMappingURL=ApartmentComplexRoute.js.map