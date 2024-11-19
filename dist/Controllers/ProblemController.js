"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemController = void 0;
const Problem_1 = __importDefault(require("../Models/Problem"));
exports.ProblemController = {
    CreateProblem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ProblemPayload = req.body;
            const newProblem = new Problem_1.default(ProblemPayload);
            const saveProblem = yield newProblem.save();
            res.status(201).send({ saveProblem });
        }
        catch (error) {
            next(error);
        }
    }),
    GetAllProblem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allProblems = yield Problem_1.default.find();
            res.status(201).send({ payload: allProblems });
        }
        catch (error) {
            next(error);
        }
    }),
    GetSingleProblem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const problemID = req.params.id;
            if (!problemID) {
                res.status(404).send({ message: "params is invalid" });
                return;
            }
            const isMatch = yield Problem_1.default.exists({ _id: problemID });
            if (!isMatch) {
                res.status(404).send({ message: "problem id did not match" });
                return;
            }
            const FoundTheOne = yield Problem_1.default.findOne({ _id: problemID });
            if (!FoundTheOne) {
                res.status(404).send({ message: "no problem found" });
                return;
            }
            res.status(200).send({ payload: FoundTheOne });
        }
        catch (error) {
            next(error);
        }
    }),
    UpdateProblem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const problemID = req.params.id;
            if (!problemID) {
                res.status(404).send({ message: "params is invalid" });
                return;
            }
            const isMatch = yield Problem_1.default.exists({ _id: problemID });
            if (!isMatch) {
                res.status(404).send({ message: "problem id did not match" });
                return;
            }
            const FoundTheOne = yield Problem_1.default.findOne({ _id: problemID });
            if (!FoundTheOne) {
                res.status(404).send({ message: "no problem found" });
                return;
            }
            const PermitedUpadte = ["ProblemDescription", "ProblemType"];
            const objectKeys = Object.keys(req.body);
            const isTrue = objectKeys.every((data) => PermitedUpadte.includes(data));
            if (!isTrue) {
                res
                    .status(404)
                    .send({ messga: "please provide a valid keys to update" });
                return;
            }
            PermitedUpadte.forEach((data) => {
                if (req.body[data]) {
                    FoundTheOne[data] = req.body[data];
                }
            });
            yield FoundTheOne.save();
            res
                .status(201)
                .send({ message: "Updated successfully", payload: FoundTheOne });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=ProblemController.js.map