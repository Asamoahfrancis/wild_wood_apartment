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
const ApartmentComplex_1 = __importDefault(require("./ApartmentComplex"));
const RoomFee_1 = __importDefault(require("./RoomFee"));
const ApartmantMaintainceFee_1 = __importDefault(require("./ApartmantMaintainceFee"));
const ApartmentSchema = new mongoose_1.Schema({
    ApartmentComplexKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ApartmentComplex",
        required: [true, "ApartmentComplexKey is required"],
    },
    RoomFeeKey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "RoomFee",
        required: [true, "RoomKeyKey is required"],
    },
    ApartmentName: {
        type: String,
        required: [true, "ApartmentName is required"],
        unique: true,
    },
    ApartmentMaintainceFeeKey: {
        ref: "ApartmantMaintainceFee",
        type: String,
    },
}, {
    timestamps: true,
});
ApartmentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const apartmentData = this;
        if (apartmentData.ApartmentComplexKey) {
            const newApartment = yield ApartmentComplex_1.default.exists({
                _id: apartmentData.ApartmentComplexKey,
            });
            if (!newApartment) {
                throw new Error("The specified ApartmentComplex Key does not exist.");
            }
        }
        if (apartmentData.RoomFeeKey) {
            const newRoomFeeKey = yield RoomFee_1.default.exists({
                _id: apartmentData.RoomFeeKey,
            });
            if (!newRoomFeeKey) {
                throw new Error("The specified  RoomFeeKey does not exist.");
            }
        }
        if (apartmentData.ApartmentMaintainceFeeKey) {
            const newApartmentMaintainceFeeKey = yield ApartmantMaintainceFee_1.default.exists({
                _id: apartmentData.ApartmentMaintainceFeeKey,
            });
            if (!newApartmentMaintainceFeeKey) {
                throw new Error("The specified  Apartment MaintainceFee Key does not exist.");
            }
        }
        next();
    });
});
const Apartment = mongoose_1.default.model("Apartment", ApartmentSchema);
exports.default = Apartment;
//# sourceMappingURL=Apartment.js.map