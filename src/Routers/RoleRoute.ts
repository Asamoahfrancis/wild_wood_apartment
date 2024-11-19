import express from "express";
import { RoleController } from "../Controllers/RolesController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

const RoleRouter = express.Router();

RoleRouter.post("/role", AuthMiddleware, RoleController.PostRole);

RoleRouter.get("/role", RoleController.GetRole);

RoleRouter.get("/role/:id", RoleController.GetSingleRole);

RoleRouter.put("/role/:id", RoleController.UpdateRole);

RoleRouter.delete("/role/:id", RoleController.DeleteRole);

export default RoleRouter;
