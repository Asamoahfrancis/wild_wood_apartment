"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProblemController_1 = require("../Controllers/ProblemController");
const AuthMiddleware_1 = __importDefault(require("../Middlewares/AuthMiddleware"));
const ProblemRouter = express_1.default.Router();
ProblemRouter.post("/problem", AuthMiddleware_1.default, ProblemController_1.ProblemController.CreateProblem);
ProblemRouter.get("/problem", AuthMiddleware_1.default, ProblemController_1.ProblemController.GetAllProblem);
ProblemRouter.get("/problem/:id", AuthMiddleware_1.default, ProblemController_1.ProblemController.GetSingleProblem);
ProblemRouter.put("/problem/:id", AuthMiddleware_1.default, ProblemController_1.ProblemController.UpdateProblem);
exports.default = ProblemRouter;
//# sourceMappingURL=ProblemRoute.js.map