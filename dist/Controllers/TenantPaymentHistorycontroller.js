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
exports.TenantPaymentController = void 0;
const TenantPaymentHistory_1 = __importDefault(require("../Models/TenantPaymentHistory"));
exports.TenantPaymentController = {
    CreateTenantPaymentHistory: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const TenantPaymentHistoryPayload = req.body;
            const newTenantPaymentHistory = new TenantPaymentHistory_1.default(TenantPaymentHistoryPayload);
            const savedTenantPaymentHistory = yield newTenantPaymentHistory.save();
            res.status(201).send({ savedTenantPaymentHistory });
        }
        catch (error) {
            next(error);
        }
    }),
    GetTenantPaymentHistory: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const GetallTenant = yield TenantPaymentHistory_1.default.find()
                .populate("TenantKey")
                .populate("TenantPaymentKey");
            res.status(200).send({ payload: GetallTenant });
        }
        catch (error) {
            next(error);
        }
    }),
    GetSingleTenantPaymentHistory: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const TenentPaymantHistoryID = req.params.id;
            if (!TenentPaymantHistoryID) {
                res.status(404).send({ message: "params is invalid" });
            }
            const isExits = yield TenantPaymentHistory_1.default.exists({
                _id: TenentPaymantHistoryID,
            });
            if (!isExits) {
                res.status(404).send({ message: "params is does not exits" });
                return;
            }
            const TenantPayamentHistoryData = yield TenantPaymentHistory_1.default.findOne({
                _id: TenentPaymantHistoryID,
            })
                .populate("TenantKey")
                .populate("TenantPaymentKey");
            if (!TenantPayamentHistoryData) {
                res.status(404).send({ payload: TenantPayamentHistoryData });
                return;
            }
            res.status(201).send({ payload: TenantPayamentHistoryData });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=TenantPaymentHistorycontroller.js.map