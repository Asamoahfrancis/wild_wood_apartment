import express from "express";
import { ProblemController } from "../Controllers/ProblemController";
import AuthMiddleware from "../Middlewares/AuthMiddleware";
const ProblemRouter = express.Router();

ProblemRouter.post("/problem", AuthMiddleware, ProblemController.CreateProblem);
ProblemRouter.get("/problem", AuthMiddleware, ProblemController.GetAllProblem);
ProblemRouter.get(
  "/problem/:id",
  AuthMiddleware,
  ProblemController.GetSingleProblem
);
ProblemRouter.put(
  "/problem/:id",
  AuthMiddleware,
  ProblemController.UpdateProblem
);

export default ProblemRouter;
