import express from "express";
import { RoleController } from "../Controllers/RolesController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

const RoleRouter = express.Router();

RoleRouter.post("/role", AuthMiddleware, RoleController.PostRole);

RoleRouter.get("/role", AuthMiddleware, RoleController.GetRole);

RoleRouter.get("/role/:id", AuthMiddleware, RoleController.GetSingleRole);

RoleRouter.put("/role/:id", AuthMiddleware, RoleController.UpdateRole);

RoleRouter.delete("/role/:id", AuthMiddleware, RoleController.DeleteRole);

export default RoleRouter;
