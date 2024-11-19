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
const Apartment_1 = __importDefault(require("./Apartment"));
const MaintainceFee_1 = __importDefault(require("./MaintainceFee"));
const ApartmantMaintainceFeeSchema = new mongoose_1.Schema({
    ApartmentKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Apartment",
        required: [true, "ApartmentKey is required"],
    },
    MaintenanceKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "MaintainceFee",
        required: [true, "MaintenanceKey is required"],
    },
}, {
    timestamps: true,
});
ApartmantMaintainceFeeSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const ApartmantMaintainceFeeData = this;
        if (ApartmantMaintainceFeeData.ApartmentKey) {
            const isExistApartmentKey = yield Apartment_1.default.exists({
                _id: ApartmantMaintainceFeeData.ApartmentKey,
            });
            if (!isExistApartmentKey) {
                throw new Error("The specified ApartmentKey  does not exist.");
            }
        }
        if (ApartmantMaintainceFeeData.MaintenanceKey) {
            const isExistMaintenanceKey = yield MaintainceFee_1.default.exists({
                _id: ApartmantMaintainceFeeData.MaintenanceKey,
            });
            if (!isExistMaintenanceKey) {
                throw new Error("The specified MaintenanceKey  does not exist.");
            }
        }
        next();
    });
});
const ApartmantMaintainceFee = mongoose_1.default.model("ApartmantMaintainceFee", ApartmantMaintainceFeeSchema);
exports.default = ApartmantMaintainceFee;
//# sourceMappingURL=ApartmantMaintainceFee.js.map