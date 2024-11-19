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
const LeasePeriod_1 = __importDefault(require("./LeasePeriod"));
const Role_1 = __importDefault(require("./Role"));
const TenantPaymentHistory_1 = __importDefault(require("./TenantPaymentHistory"));
const Apartment_1 = __importDefault(require("./Apartment"));
const TenantSchema = new mongoose_1.Schema({
    TenantFirstName: {
        type: String,
        required: [true, "TenantFirstName is required"],
        trim: true,
        lowercase: true,
    },
    TenantMiddleName: {
        type: String,
        trim: true,
        lowercase: true,
    },
    TenantLastName: {
        type: String,
        required: [true, "TenantLastName is required"],
        trim: true,
        lowercase: true,
    },
    TenantEmail: {
        type: String,
        required: [true, "TenantEmail is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    TenantPhone: {
        type: Number,
        unique: true,
        required: [true, "TenantPhone is required"],
    },
    LeasePeriodKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "LeasePeriod",
        required: [true, "LeasePeriodKey is required"],
    },
    ApartmentKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Apartment",
        required: [true, "ApartmentKey is required"],
    },
    RoleKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Role",
        required: [true, "RoleKey is required"],
    },
    TenantPaymentHistoryKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "TenantPaymentHistory",
        // required: [true, "TenantPaymentHistory is required"],
    },
    TenantPassword: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
TenantSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const TenantData = this;
        if (TenantData.LeasePeriodKey) {
            const leaseExits = yield LeasePeriod_1.default.exists({
                _id: TenantData.LeasePeriodKey,
            });
            if (!leaseExits) {
                throw new Error("The specified LeasePeriodKey does not exist.");
            }
        }
        if (TenantData.ApartmentKey) {
            const apartmentExits = yield Apartment_1.default.exists({
                _id: TenantData.ApartmentKey,
            });
            if (!apartmentExits) {
                throw new Error("The specified ApartmentKey does not exist.");
            }
        }
        if (TenantData.RoleKey) {
            const roleExits = yield Role_1.default.exists({ _id: TenantData.RoleKey });
            if (!roleExits) {
                throw new Error("The specified RoleKey does not exist.");
            }
        }
        if (TenantData.TenantPaymentHistoryKey) {
            const TenantPaymentHistoryExits = yield TenantPaymentHistory_1.default.exists({
                _id: TenantData.TenantPaymentHistoryKey,
            });
            if (!TenantPaymentHistoryExits) {
                throw new Error("The specified Tenant Payment History  does not exist.");
            }
        }
        if (TenantData.TenantPassword) {
            const RoleData = yield Role_1.default.findOne({ _id: TenantData.RoleKey });
            if (RoleData) {
                const role = RoleData.RoleType;
                if (role !== "Tenant Administrator") {
                    throw new Error("You're not a Tenant Administrator");
                }
            }
        }
        next();
    });
});
const Tenant = mongoose_1.default.model("Tenant", TenantSchema);
exports.default = Tenant;
//# sourceMappingURL=Tenant.js.map