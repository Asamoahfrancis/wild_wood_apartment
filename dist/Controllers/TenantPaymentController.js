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
const TenantPayment_1 = __importDefault(require("../Models/TenantPayment"));
exports.TenantPaymentController = {
    CreateTenantPayment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const TenantPaymentPayload = req.body;
            const newTenantPayment = new TenantPayment_1.default(TenantPaymentPayload);
            const saveTenantPayment = yield newTenantPayment.save();
            res.status(201).send({ saveTenantPayment });
        }
        catch (error) {
            next(error);
        }
    }),
    GetAllTenantPayment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const GetAllPayment = yield TenantPayment_1.default.find();
            res.status(201).send({ payload: GetAllPayment });
        }
        catch (error) {
            next(error);
        }
    }),
    GetSingleTenantPayment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tenantPaymentId = req.params.id;
            if (!tenantPaymentId) {
                res.status(404).send({ message: "Error occurred id is invalid" });
                return;
            }
            const idExist = yield TenantPayment_1.default.exists({ _id: tenantPaymentId });
            if (!idExist) {
                res.status(404).send({ message: "ID doex not exist" });
                return;
            }
            const actualTenantPayemntData = yield TenantPayment_1.default.findOne({
                _id: tenantPaymentId,
            });
            if (!actualTenantPayemntData) {
                res.status(404).send({ message: "Tenant Paymant does not exist" });
                return;
            }
            res.status(200).send({ payload: actualTenantPayemntData });
        }
        catch (error) {
            next(error);
        }
    }),
    UpdateTenantPayment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tenantPaymentId = req.params.id;
            if (!tenantPaymentId) {
                res.status(404).send({ message: "Error occurred id is invalid" });
                return;
            }
            const idExist = yield TenantPayment_1.default.exists({ _id: tenantPaymentId });
            if (!idExist) {
                res.status(404).send({ message: "ID doex not exist" });
                return;
            }
            const actualTenantPayemntData = yield TenantPayment_1.default.findOne({
                _id: tenantPaymentId,
            });
            if (!actualTenantPayemntData) {
                res.status(404).send({ message: "Tenant Paymant does not exist" });
                return;
            }
            const permittedUpdateData = [
                "TenantPaymentAmount",
                "TenantPaymentTime",
                "TenantPaymentIsLate",
            ];
            const objectKeys = Object.keys(req.body);
            const isContaining = objectKeys.every((data) => permittedUpdateData.includes(data));
            if (!isContaining) {
                res.status(404).send({ message: "please update the correct keys" });
                return;
            }
            permittedUpdateData.forEach((data) => {
                if (req.body[data]) {
                    actualTenantPayemntData[data] = req.body[data];
                }
            });
            yield actualTenantPayemntData.save();
            res.status(200).send({
                message: "updated successfully",
                payload: actualTenantPayemntData,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=TenantPaymentController.js.map