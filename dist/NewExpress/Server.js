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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const TenantRoute_1 = __importDefault(require("../Routers/TenantRoute"));
const RoleRoute_1 = __importDefault(require("../Routers/RoleRoute"));
const CompanyInformation_1 = __importDefault(require("../Authentication/Routers/CompanyInformation"));
const Database_1 = require("../Database/Database");
const LeasePeriodRoute_1 = __importDefault(require("../Routers/LeasePeriodRoute"));
const ApartmentRoute_1 = __importDefault(require("../Routers/ApartmentRoute"));
const ApartmentComplexRoute_1 = __importDefault(require("../Routers/ApartmentComplexRoute"));
const RoomFeeRoute_1 = __importDefault(require("../Routers/RoomFeeRoute"));
const ApartmantMaintainceRoute_1 = __importDefault(require("../Routers/ApartmantMaintainceRoute"));
const ProblemRoute_1 = __importDefault(require("../Routers/ProblemRoute"));
const TenantPaymentRoute_1 = __importDefault(require("../Routers/TenantPaymentRoute"));
const MaintainceFeeRoute_1 = __importDefault(require("../Routers/MaintainceFeeRoute"));
const TenantPaymentHistoryRoute_1 = __importDefault(require("../Routers/TenantPaymentHistoryRoute"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const dbInstance = Database_1.DBClass.getInstance();
exports.app = (0, express_1.default)();
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "🌲 WILD WOOD APARTMENTS API 🌲",
            version: "1.0.0",
            description: "API documentation for the Tenant system",
        },
        servers: [
            {
                url: "http://localhost:8080/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [path_1.default.resolve(__dirname, "../Routers/*.js")],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(options);
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dbInstance.connect();
        process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
            yield dbInstance.disconnect();
            process.exit(0);
        }));
    });
}
startApp();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.static("public"));
exports.app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
exports.app.use("/api/auth", CompanyInformation_1.default);
exports.app.use("/api", TenantRoute_1.default);
exports.app.use("/api", RoleRoute_1.default);
exports.app.use("/api", LeasePeriodRoute_1.default);
exports.app.use("/api", ApartmentRoute_1.default);
exports.app.use("/api", ApartmentComplexRoute_1.default);
exports.app.use("/api", RoomFeeRoute_1.default);
exports.app.use("/api", ApartmantMaintainceRoute_1.default);
exports.app.use("/api", MaintainceFeeRoute_1.default);
exports.app.use("/api", ProblemRoute_1.default);
exports.app.use("/api", TenantPaymentRoute_1.default);
exports.app.use("/api", TenantPaymentHistoryRoute_1.default);
exports.app.use("/api-doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
exports.app.get("*", (req, res) => {
    res.send("The endpoint does not exist");
});
// Global Error Handling Middleware
exports.app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        message: err.message || "Internal Server Error",
    });
});
//# sourceMappingURL=Server.js.map