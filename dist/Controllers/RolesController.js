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
exports.RoleController = void 0;
const Role_1 = __importDefault(require("../Models/Role"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.RoleController = {
    PostRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { RoleType, CompanyInformationKey } = req.body;
            const newRole = new Role_1.default({ RoleType, CompanyInformationKey });
            const savedRole = yield newRole.save();
            res.status(201).json(savedRole);
        }
        catch (error) {
            next(error);
        }
    }),
    GetRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Validate `companyData` and its `_id`
            if (!req.companyData || !req.companyData._id) {
                res.status(400).json({
                    message: "Invalid request. Missing company data or ID.",
                });
                return;
            }
            const companyId = new mongoose_1.default.Types.ObjectId(req.companyData._id);
            const roles = yield Role_1.default.find({
                CompanyInformationKey: companyId,
            }).populate("CompanyInformationKey");
            if (!roles || roles.length === 0) {
                res.status(404).json({
                    message: `No roles found for company ID: ${req.companyData._id}`,
                });
                return;
            }
            res.status(200).json({
                message: "Roles retrieved successfully",
                payload: roles,
            });
        }
        catch (error) {
            console.error("Error fetching roles:", error);
            next(error);
        }
    }),
    GetSingleRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roleId = req.params.id;
            const role = yield Role_1.default.findById(roleId);
            if (!role) {
                res.status(404).send({ message: "Role not found" });
                return;
            }
            res.status(200).send({ payload: role });
        }
        catch (error) {
            next(error);
        }
    }),
    UpdateRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roleId = req.params.id;
            const { RoleType } = req.body;
            const allowedToUpdate = "RoleType";
            const UpdateObjectKeys = Object.keys(req.body).join();
            if (UpdateObjectKeys !== allowedToUpdate) {
                res.status(404).json({ message: "Update role cannot be updated" });
                return;
            }
            const updatedRole = yield Role_1.default.findByIdAndUpdate(roleId, { RoleType }, { new: true, runValidators: true });
            if (!updatedRole) {
                res.status(404).json({ message: "Role not found" });
                return;
            }
            res.status(200).json(updatedRole);
        }
        catch (error) {
            next(error);
        }
    }),
    DeleteRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roleId = req.params.id;
            const deletedRole = yield Role_1.default.findByIdAndDelete(roleId);
            if (!deletedRole) {
                res.status(404).send({ message: "Role not found" });
                return;
            }
            res.status(200).send({ message: "Role deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=RolesController.js.map