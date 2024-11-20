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
exports.TenantController = void 0;
const Tenant_1 = __importDefault(require("../Models/Tenant"));
const Role_1 = __importDefault(require("../Models/Role"));
exports.TenantController = {
    PostTenant: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tenantData = req.body;
            const { companyData, adminTenantData } = req;
            if (!tenantData.RoleKey) {
                res.status(400).send({ message: "RoleKey is required" });
                return;
            }
            const getRoleType = yield Role_1.default.findOne({ _id: tenantData.RoleKey });
            if (!getRoleType) {
                res.status(404).send({ message: "Invalid RoleKey provided" });
                return;
            }
            if (companyData) {
                if (getRoleType.RoleType !== "Tenant Administrator") {
                    res.status(403).send({
                        message: "Only Tenant Administrators can create Tenants",
                    });
                    return;
                }
                if (!tenantData.TenantPassword) {
                    res.status(403).send({
                        message: "Provide a default Password for Tenant Admin",
                    });
                    return;
                }
            }
            else if (adminTenantData) {
                if (getRoleType.RoleType !== "Tenant") {
                    res.status(403).send({
                        message: "Only Admins can create Tenant Administrators",
                    });
                    return;
                }
            }
            else {
                res.status(403).send({
                    message: "Unauthorized: Invalid user type",
                });
                return;
            }
            const newTenant = new Tenant_1.default(tenantData);
            const savedTenant = yield newTenant.save();
            res.status(201).send(savedTenant);
        }
        catch (error) {
            next(error);
        }
    }),
    // Get all tenants
    GetTenant: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log("jwt:", req.headers);
            const tenants = yield Tenant_1.default.find()
                .populate("LeasePeriodKey")
                .populate({
                path: "ApartmentKey",
                populate: { path: "ApartmentComplexKey RoomFeeKey" },
            })
                .populate("RoleKey")
                .populate({
                path: "TenantPaymentHistoryKey",
                populate: {
                    path: "TenantKey TenantPaymentKey",
                },
            });
            res.status(200).json(tenants);
        }
        catch (error) {
            next(error);
        }
    }),
    // Get a single tenant by ID
    GetSingleTenant: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tenantId = req.params.id;
            const tenant = yield Tenant_1.default.findById(tenantId)
                .populate("LeasePeriodKey")
                .populate({
                path: "ApartmentKey",
                populate: { path: "ApartmentComplexKey RoomFeeKey" },
            })
                .populate("RoleKey")
                .populate({
                path: "TenantPaymentHistoryKey",
                populate: {
                    path: "TenantKey TenantPaymentKey",
                },
            });
            if (!tenant) {
                res.status(404).json({ message: "Tenant not found" });
                return;
            }
            res.status(200).json(tenant);
        }
        catch (error) {
            next(error);
        }
    }),
    // Update a tenant by ID
    UpdateTenant: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tenantId = req.params.id;
            const updatedTenant = yield Tenant_1.default.findOne({ _id: tenantId });
            if (!updatedTenant) {
                res.status(404).json({ message: "Tenant not found" });
                return;
            }
            const legalUpdateData = [
                "TenantPhone",
                "TenantEmail",
                "LeasePeriodKey",
                "ApartmentKey",
                "RoleKey",
                "TenantPaymentHistoryKey",
            ];
            const ObjectKeys = Object.keys(req.body);
            const isMatch = ObjectKeys.every((tenantData) => legalUpdateData.includes(tenantData));
            if (!isMatch) {
                res.status(400).json({
                    message: "Make sure you update with the correct information",
                });
                return;
            }
            legalUpdateData.forEach((key) => {
                if (req.body[key]) {
                    updatedTenant[key] = req.body[key];
                }
            });
            yield updatedTenant.save();
            res.status(200).json({ message: "Update successful", updatedTenant });
        }
        catch (error) {
            next(error);
        }
    }),
    // Delete a tenant by ID
    DeleteTenant: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tenantId = req.params.id;
            const deletedTenant = yield Tenant_1.default.findByIdAndDelete(tenantId);
            if (!deletedTenant) {
                res.status(404).json({ message: "Tenant not found" });
                return;
            }
            res.status(200).json({ message: "Tenant deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=TenantController.js.map