"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoomFeeController_1 = require("../Controllers/RoomFeeController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const RoomFeeRouter = express_1.default.Router();
RoomFeeRouter.post("/room-fee", AuthMiddleware_1.default, RoomFeeController_1.RoomFeeController.CreateRoomFee);
exports.default = RoomFeeRouter;
//# sourceMappingURL=RoomFeeRoute.js.map