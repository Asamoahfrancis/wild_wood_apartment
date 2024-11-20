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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const CompanyInformation_1 = __importDefault(require("../Authentication/Model/CompanyInformation"));
const Tenant_1 = __importDefault(require("../Models/Tenant"));
dotenv_1.default.config();
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const secret = process.env.JWT_SECRET;
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer", "").trim();
        if (!token) {
            res.status(401).json({ message: "Authorization token is missing" });
            return;
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, secret);
        }
        catch (err) {
            res.status(401).json({ message: "Invalid or expired token" });
            return;
        }
        const { _id } = decoded;
        const tenantUser = yield Tenant_1.default.findOne({
            _id,
            "TenantTokens.token": token,
        }).populate("RoleKey");
        if (tenantUser) {
            req.adminTenantData = tenantUser;
            req.token = token;
            next();
            return;
        }
        const companyUser = yield CompanyInformation_1.default.findOne({
            _id,
            "tokens.token": token,
        });
        if (companyUser) {
            req.companyData = companyUser;
            req.token = token;
            next();
            return;
        }
        res.status(404).json({ message: "User not found or unauthorized" });
    }
    catch (error) {
        console.error("AuthMiddleware error:", error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});
exports.default = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map