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
exports.CompanyInformationController = void 0;
const CompanyInformation_1 = __importDefault(require("../Model/CompanyInformation"));
exports.CompanyInformationController = {
    SignUp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const CompanyData = req.body;
            const newCompanyData = new CompanyInformation_1.default(CompanyData);
            const savedTenant = yield newCompanyData.save();
            const token = yield (newCompanyData === null || newCompanyData === void 0 ? void 0 : newCompanyData.GenerateAuthToken());
            res.status(201).json({ savedTenant, token: token });
        }
        catch (error) {
            next(error);
        }
    }),
    SignIn: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const companyInfor = yield CompanyInformation_1.default.FindByCredentials(req.body.CompanyEmail, req.body.CompanyPassword);
            const token = yield (companyInfor === null || companyInfor === void 0 ? void 0 : companyInfor.GenerateAuthToken());
            res.status(200).send({ payload: companyInfor, token: token });
        }
        catch (error) {
            next(error);
        }
    }),
    CompanyData: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.companyData) {
                res.status(404).send({ message: "Company Data is not available" });
                return;
            }
            res.status(200).send(req.companyData);
        }
        catch (error) {
            next(error);
        }
    }),
    UpdateInformation: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const companyData = req.companyData;
            if (!companyData) {
                res.status(404).json({ message: "companyData not found" });
                return;
            }
            const legalUpdateData = [
                "CompanyName",
                "CompanyLogo",
                "CompanyAddress",
                "CompanyPhone",
                "CompanyEmail",
                "CompanyRole",
            ];
            const ObjectKeys = Object.keys(req.body);
            const isMatch = ObjectKeys.every((companydataKeys) => legalUpdateData.includes(companydataKeys));
            if (!isMatch) {
                res.status(400).json({
                    message: "Make sure you update with the correct information",
                });
                return;
            }
            legalUpdateData.forEach((key) => {
                if (req.body[key]) {
                    companyData[key] = req.body[key];
                }
            });
            yield companyData.save();
            res.status(200).json({ message: "Update successful", companyData });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=CompanyInformation.js.map