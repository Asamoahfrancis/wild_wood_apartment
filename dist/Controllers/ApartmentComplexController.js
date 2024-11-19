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
exports.ApartmentComplexController = void 0;
const ApartmentComplex_1 = __importDefault(require("../Models/ApartmentComplex"));
exports.ApartmentComplexController = {
    CreateApartmentComplex: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const apartmentComplexPayload = req.body;
            const newApartmentComplex = new ApartmentComplex_1.default(apartmentComplexPayload);
            const savedApartmentComplex = yield newApartmentComplex.save();
            res.status(201).send({ savedApartmentComplex });
        }
        catch (error) {
            next(error);
        }
    }),
    GetAllApartmentComplex: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const AllApartmentComplex = yield ApartmentComplex_1.default.find();
            res.status(200).send({ payload: AllApartmentComplex });
        }
        catch (error) {
            next(error);
        }
    }),
    GetSingleApartmentComplex: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const IDapartmentComplex = req.params.id;
            const isExist = yield ApartmentComplex_1.default.exists({
                _id: IDapartmentComplex,
            });
            if (!isExist) {
                res
                    .status(404)
                    .send({ message: "Apartment Complex id is not does not exist" });
                return;
            }
            const AllApartmentComplex = yield ApartmentComplex_1.default.findOne();
            res.status(200).send({ payload: AllApartmentComplex });
        }
        catch (error) {
            next(error);
        }
    }),
    UpdateApartmentComplex: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const IDapartmentComplex = req.params.id;
            const isExist = yield ApartmentComplex_1.default.exists({
                _id: IDapartmentComplex,
            });
            if (!isExist) {
                res
                    .status(404)
                    .send({ message: "Apartment Complex id is not does not exist" });
                return;
            }
            const foundApartmentComlex = yield ApartmentComplex_1.default.findOne({
                _id: IDapartmentComplex,
            });
            if (!foundApartmentComlex) {
                res.status(404).send({ message: "Apartment Complex not found" });
                return;
            }
            const PermitUpdate = "ApartmentComplexAddress";
            const ObjectAddress = Object.keys(req.body).join().trim();
            const isPermitted = ObjectAddress === PermitUpdate;
            if (!isPermitted) {
                res.status(404).send({ message: "This key is not valid for update" });
                return;
            }
            foundApartmentComlex.ApartmentComplexAddress =
                req.body.ApartmentComplexAddress;
            const response = yield foundApartmentComlex.save();
            res.status(200).send({ payload: response });
        }
        catch (error) {
            next(error);
        }
    }),
};
//# sourceMappingURL=ApartmentComplexController.js.map