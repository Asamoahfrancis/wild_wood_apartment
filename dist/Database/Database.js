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
exports.DBClass = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
dotenv_1.default.config();
const dbPORT = process.env.DB_CONNECTION;
const dbUrlProd = process.env.MONGODB_PROD;
class DBClass {
    constructor() {
        mongoose_1.default.connection.on("connected", () => console.log(chalk_1.default.white("MongoDB connected")));
        mongoose_1.default.connection.on("disconnected", () => console.log(chalk_1.default.white("MongoDB disconnected")));
        mongoose_1.default.connection.on("error", (error) => console.error("MongoDB connection error:", error));
    }
    // Singleton instance getter
    static getInstance() {
        if (!DBClass.instance) {
            DBClass.instance = new DBClass();
        }
        return DBClass.instance;
    }
    // Retry delay function
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    // Connect to MongoDB with retry logic
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionString = (() => {
                if (process.env.NODE_ENV === "production") {
                    if (!dbUrlProd) {
                        console.error("Production MongoDB connection string (MONGODB_PROD) is not defined in environment variables.");
                        process.exit(1); // Exit if the production connection string is not set
                    }
                    return dbUrlProd;
                }
                else {
                    if (!dbPORT) {
                        console.error("Development MongoDB connection string (DB_CONNECTION) is not defined in environment variables.");
                        process.exit(1); // Exit if the development connection string is not set
                    }
                    return dbPORT;
                }
            })();
            let attempt = 0;
            while (attempt < DBClass.maxRetries) {
                try {
                    yield mongoose_1.default.connect(connectionString, {
                        serverSelectionTimeoutMS: DBClass.serverSelectionTimeoutMS,
                    });
                    console.log(chalk_1.default.green("MongoDB connection established"));
                    return; // Exit if connection is successful
                }
                catch (error) {
                    attempt++;
                    console.error(`Error connecting to MongoDB (attempt ${attempt}/${DBClass.maxRetries}):`, error);
                    if (attempt >= DBClass.maxRetries) {
                        console.error(chalk_1.default.red("Max retries reached. Failed to connect to MongoDB."));
                        process.exit(1); // Exit if max retries are reached
                    }
                    // Wait before retrying
                    console.log(chalk_1.default.yellow(`Retrying to connect in ${DBClass.retryDelay / 1000} seconds...`));
                    yield this.delay(DBClass.retryDelay);
                }
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connection.close();
                console.log("MongoDB connection closed");
            }
            catch (error) {
                console.error("Error disconnecting from MongoDB:", error);
            }
        });
    }
}
exports.DBClass = DBClass;
DBClass.instance = null;
DBClass.serverSelectionTimeoutMS = 5000;
DBClass.maxRetries = 5;
DBClass.retryDelay = 2000;
//# sourceMappingURL=Database.js.map