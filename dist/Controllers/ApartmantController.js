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
exports.ApartmentController = void 0;
const Apartment_1 = __importDefault(require("../Models/Apartment"));
exports.ApartmentController = {
    CreateApartment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const apartmentPayload = req.body;
            const newApartment = new Apartment_1.default(apartmentPayload);
            const savednewApartmentData = yield newApartment.save();
            res.status(201).send({ savednewApartmentData });
        }
        catch (error) {
            next(error);
        }
    }),
    GetApartment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { ApartmentKey } = req.adminTenantData;
            const getApartment = yield Apartment_1.default.findOne({ _id: ApartmentKey });
            let ApartmentComplexKey_;
            if (getApartment) {
                ApartmentComplexKey_ = getApartment.ApartmentComplexKey;
            }
            const allApartment = yield Apartment_1.default.find({
                ApartmentComplexKey: ApartmentComplexKey_,
            });
            res.status(201).send({ payload: allApartment });
        }
        catch (error) {
            next(error);
        }
    }),
    GetSingleApartment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const apartId = req.params.id;
            const isExist = yield Apartment_1.default.exists({ _id: apartId });
            if (!isExist) {
                res.status(404).send({ message: "apartment does not exist" });
                return;
            }
            const foundApartment = yield Apartment_1.default.findOne({ _id: apartId });
            if (!foundApartment) {
                res.status(404).send({ message: "apartment  not found" });
                return;
            }
            res.status(201).send({ payload: foundApartment });
        }
        catch (error) {
            next(error);
        }
    }),
    UpadateApartment: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const apartId = req.params.id;
            const isExist = yield Apartment_1.default.exists({ _id: apartId });
            if (!isExist) {
                res.status(404).send({ message: "apartment does not exist" });
                return;
            }
            const foundApartment = yield Apartment_1.default.findOne({ _id: apartId });
            if (!foundApartment) {
                res.status(404).send({ message: "apartment  not found" });
                return;
            }
            const permittedUpdate = [
                "ApartmentComplexKey",
                "RoomFeeKey",
                "ApartmentName",
            ];
            const objectKeys = Object.keys(req.body);
            const ismatch = objectKeys.every((data) => permittedUpdate.includes(data));
            if (!ismatch) {
                res.status(404).send({ message: "no keys contains non allowed keys" });
                return;
            }
            permittedUpdate.forEach((data) => {
                if (req.body[data]) {
                    foundApartment[data] = req.body[data];
                }
            });
            yield foundApartment.save();
            res
                .status(201)
                .send({ message: "Updated successfully", payload: foundApartment });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=ApartmantController.js.map