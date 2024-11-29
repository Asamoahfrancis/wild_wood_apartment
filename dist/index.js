"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./socket/socket");
const Server_1 = require("./NewExpress/Server");
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
Server_1.app.listen(PORT, () => {
    console.log(chalk_1.default.magenta(`Server listening on ${PORT}`));
});
//# sourceMappingURL=index.js.map