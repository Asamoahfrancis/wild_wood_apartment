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
exports.LeasePeriodController = void 0;
const LeasePeriod_1 = __importDefault(require("../Models/LeasePeriod"));
exports.LeasePeriodController = {
    CreateLeasePeriod: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const LeasePeriodData = req.body;
            const newLeasePeriodData = new LeasePeriod_1.default(LeasePeriodData);
            const savedLeasePeriodData = yield newLeasePeriodData.save();
            res.status(201).send({ savedLeasePeriodData });
        }
        catch (error) {
            next(error);
        }
    }),
    GetAllLeasePeriod: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const AllLease = yield LeasePeriod_1.default.find();
            res.status(200).send({ payload: AllLease });
        }
        catch (error) {
            next(error);
        }
    }),
    GetSingleLeasePeriod: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const leadsPeriodId = req.params.id;
            const leaseIDExist = LeasePeriod_1.default.exists({ _id: leadsPeriodId });
            if (!leaseIDExist) {
                res.status(400).send({ message: "invalid lease id" });
                return;
            }
            const AllLease = yield LeasePeriod_1.default.findOne({ _id: leadsPeriodId });
            res.status(200).send({ payload: AllLease });
        }
        catch (error) {
            next(error);
        }
    }),
    UpdateLeasePeriod: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const leaseID = req.params.id;
            const isMatch = yield LeasePeriod_1.default.exists({ _id: leaseID });
            if (!isMatch) {
                res.status(404).send({ message: "no lease LeasePeriod match found" });
                return;
            }
            const updatedLease = yield LeasePeriod_1.default.findOne({ _id: leaseID });
            if (!updatedLease) {
                res.status(404).json({ message: "Lease not found" });
                return;
            }
            const permittedUpadteValues = [
                "LeasePeriodInterval",
                "LeasePeriodStatus",
            ];
            const ObjectKeys = Object.keys(req.body);
            const isValidToUpadte = ObjectKeys.every((leaseData) => permittedUpadteValues.includes(leaseData));
            if (!isValidToUpadte) {
                res.status(404).send({ message: "key entered Lease Period not valid" });
                return;
            }
            permittedUpadteValues.forEach((data) => {
                if (req.body[data]) {
                    updatedLease[data] = req.body[data];
                }
            });
            yield updatedLease.save();
            res.status(200).send({ payload: updatedLease });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=LeasePeriodController.js.map