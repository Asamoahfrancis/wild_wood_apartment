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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Role_1 = __importDefault(require("../../Models/Role"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const CompanyAuthenticationTypeSchema = new mongoose_1.Schema({
    CompanyName: {
        type: String,
        required: [true, "CompanyName is required"],
        unique: true,
        trim: true,
    },
    CompanyLogo: {
        type: String,
        required: [true, "CompanyLogo is required"],
    },
    CompanyAddress: {
        type: String,
        required: [true, "CompanyAddress is required"],
        trim: true,
    },
    CompanyPhone: {
        type: String,
        required: [true, "CompanyPhone is required"],
        trim: true,
        validate: {
            validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v),
            message: "Invalid phone number format",
        },
    },
    CompanyEmail: {
        type: String,
        required: [true, "CompanyEmail is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (v) => /^\S+@\S+\.\S+$/.test(v),
            message: "Invalid email format",
        },
    },
    CompanyPassword: {
        type: String,
        required: [true, "CompanyPassword is required"],
    },
    CompanyForgetPassword: {
        type: String,
    },
    CompanyRole: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Role",
        // required: [true, "CompanyRole is required"],
    },
    tokens: [
        {
            token: {
                type: String,
                required: [true, "Token is Required"],
            },
        },
    ],
}, {
    timestamps: true,
});
CompanyAuthenticationTypeSchema.virtual("CompanyConfirmPassword")
    .get(function () {
    return this._confirmPassword;
})
    .set(function (value) {
    this._confirmPassword = value;
});
CompanyAuthenticationTypeSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const Companyuser = this;
        if (Companyuser.CompanyRole) {
            const roleExists = yield Role_1.default.exists({ _id: Companyuser.CompanyRole });
            if (!roleExists) {
                throw new Error("The specified CompanyRole does not exist.");
            }
        }
        if (Companyuser.isModified("CompanyPassword")) {
            if (Companyuser.CompanyConfirmPassword !== Companyuser.CompanyPassword) {
                throw new Error("CompanyConfirmPassword must match CompanyPassword");
            }
            Companyuser.CompanyPassword = yield bcryptjs_1.default.hash(Companyuser.CompanyPassword, 8);
        }
        next();
    });
});
//static methods
CompanyAuthenticationTypeSchema.statics.FindByCredentials = function (Email, Password) {
    return __awaiter(this, void 0, void 0, function* () {
        const companyData = yield this.findOne({ CompanyEmail: Email });
        if (!companyData) {
            throw new Error("Unable to login");
        }
        const isMatch = yield bcryptjs_1.default.compare(Password, companyData.CompanyPassword);
        if (!isMatch) {
            throw new Error("Unable to login");
        }
        return companyData;
    });
};
//methods
CompanyAuthenticationTypeSchema.methods.GenerateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const companyData = this;
        const token = jsonwebtoken_1.default.sign({ _id: companyData._id.toString() }, secret);
        companyData.tokens = companyData.tokens.concat({ token: token });
        yield companyData.save();
        return token;
    });
};
const CompanyInformation = mongoose_1.default.model("CompanyInformation", CompanyAuthenticationTypeSchema);
exports.default = CompanyInformation;
//# sourceMappingURL=CompanyInformation.js.map