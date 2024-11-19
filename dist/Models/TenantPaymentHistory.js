"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const Tenant_1 = __importDefault(require("./Tenant"));
const TenantPayment_1 = __importDefault(require("./TenantPayment"));
const TenantPaymentHistorySchema = new mongoose_1.Schema({
    TenantKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Tenant",
        required: [true, "TenantKey is required"],
    },
    TenantPaymentKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "TenantPayment",
        required: [true, "TenantPaymentKey is required"],
    },
}, {
    timestamps: true,
});
TenantPaymentHistorySchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const TenantPaymentHistoryData = this;
        if (TenantPaymentHistoryData.TenantKey) {
            const TenantExits = yield Tenant_1.default.exists({
                _id: TenantPaymentHistoryData.TenantKey,
            });
            if (!TenantExits) {
                throw new Error("The specified Tenant  does not exist.");
            }
        }
        if (TenantPaymentHistoryData.TenantPaymentKey) {
            const TenantPaymentHistoryExits = yield TenantPayment_1.default.exists({
                _id: TenantPaymentHistoryData.TenantPaymentKey,
            });
            if (!TenantPaymentHistoryExits) {
                throw new Error("The specified Tenant Payment History does not exist.");
            }
        }
        next();
    });
});
const TenantPaymentHistory = mongoose_1.default.model("TenantPaymentHistory", TenantPaymentHistorySchema);
exports.default = TenantPaymentHistory;
//# sourceMappingURL=TenantPaymentHistory.js.map