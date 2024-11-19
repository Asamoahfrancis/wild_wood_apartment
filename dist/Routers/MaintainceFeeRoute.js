"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MaintainceFeeController_1 = require("../Controllers/MaintainceFeeController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const MaintainceFeeRouter = express_1.default.Router();
MaintainceFeeRouter.post("/maintaince", AuthMiddleware_1.default, MaintainceFeeController_1.MaintainceFeeController.CreateMaintainceFee);
MaintainceFeeRouter.get("/maintaince", MaintainceFeeController_1.MaintainceFeeController.GetAllMaintainceFee);
MaintainceFeeRouter.get("/maintaince/:id", MaintainceFeeController_1.MaintainceFeeController.GetSingleMaintainceFee);
MaintainceFeeRouter.put("/maintaince/:id", MaintainceFeeController_1.MaintainceFeeController.UpdateMaintainceFee);
exports.default = MaintainceFeeRouter;
//# sourceMappingURL=MaintainceFeeRoute.js.map