"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RolesController_1 = require("../Controllers/RolesController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const RoleRouter = express_1.default.Router();
RoleRouter.post("/role", AuthMiddleware_1.default, RolesController_1.RoleController.PostRole);
RoleRouter.get("/role", AuthMiddleware_1.default, RolesController_1.RoleController.GetRole);
RoleRouter.get("/role/:id", AuthMiddleware_1.default, RolesController_1.RoleController.GetSingleRole);
RoleRouter.put("/role/:id", AuthMiddleware_1.default, RolesController_1.RoleController.UpdateRole);
RoleRouter.delete("/role/:id", AuthMiddleware_1.default, RolesController_1.RoleController.DeleteRole);
exports.default = RoleRouter;
//# sourceMappingURL=RoleRoute.js.map