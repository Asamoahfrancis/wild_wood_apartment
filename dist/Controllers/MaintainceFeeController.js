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
exports.MaintainceFeeController = void 0;
const MaintainceFee_1 = __importDefault(require("../Models/MaintainceFee"));
exports.MaintainceFeeController = {
    CreateMaintainceFee: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const MaintenceFeePayload = req.body;
            const newMaintainceFee = new MaintainceFee_1.default(MaintenceFeePayload);
            const savedMaintenceFee = yield newMaintainceFee.save();
            res.status(201).send({ savedMaintenceFee });
        }
        catch (error) {
            next(error);
        }
    }),
    GetAllMaintainceFee: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const AllMaintence = yield MaintainceFee_1.default.find();
            res.status(201).send({ payload: AllMaintence });
        }
        catch (error) {
            next(error);
        }
    }),
    GetSingleMaintainceFee: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const maintainceId = req.params.id;
            if (!maintainceId) {
                res.status(404).send({ message: "please provide a maintance params" });
                return;
            }
            const isMatch = yield MaintainceFee_1.default.exists({ _id: maintainceId });
            if (!isMatch) {
                res
                    .status(404)
                    .send({ message: "please provide a maintance params that is valid" });
                return;
            }
            const foundMaintance = yield MaintainceFee_1.default.findOne({ _id: maintainceId });
            if (!foundMaintance) {
                res.status(404).send({ message: "no miantance found" });
                return;
            }
            res.status(201).send({ payload: foundMaintance });
        }
        catch (error) {
            next(error);
        }
    }),
    UpdateMaintainceFee: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const maintainceId = req.params.id;
            if (!maintainceId) {
                res.status(404).send({ message: "please provide a maintance params" });
                return;
            }
            const isMatch = yield MaintainceFee_1.default.exists({ _id: maintainceId });
            if (!isMatch) {
                res
                    .status(404)
                    .send({ message: "please provide a maintance params that is valid" });
                return;
            }
            const foundMaintance = yield MaintainceFee_1.default.findOne({ _id: maintainceId });
            if (!foundMaintance) {
                res.status(404).send({ message: "no miantance found" });
                return;
            }
            const permittedEdit = [
                "MaintainceFeeResolutionDate",
                "MaintainceFeeExpense",
                "MaintainceFeeProblemKey",
            ];
            const objectData = Object.keys(req.body);
            const isOk = objectData.every((data) => permittedEdit.includes(data));
            if (!isOk) {
                res.status(404).send({ message: "please only update data provided" });
                return;
            }
            permittedEdit.forEach((data) => {
                if (req.body[data]) {
                    foundMaintance[data] = req.body[data];
                }
            });
            yield foundMaintance.save();
            res
                .status(201)
                .send({ message: "Updated successfully", payload: foundMaintance });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=MaintainceFeeController.js.map