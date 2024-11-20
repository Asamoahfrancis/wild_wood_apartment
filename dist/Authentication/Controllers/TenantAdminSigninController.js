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
exports.TenantAdminController = void 0;
const Tenant_1 = __importDefault(require("../../Models/Tenant"));
exports.TenantAdminController = {
    TenantSigin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tenantData = yield Tenant_1.default.FindAuthTenants(req.body.TenantEmail, req.body.TenantPassword);
            const token = yield tenantData.GenerateTenantTokens();
            res
                .status(200)
                .send({
                message: "Login succesfully",
                payload: tenantData,
                token: token,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=TenantAdminSigninController.js.map