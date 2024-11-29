"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import "./socket/socket";
const Server_1 = require("./NewExpress/Server");
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const server = http_1.default.createServer(Server_1.app);
Server_1.app.use((0, cors_1.default)());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    connectionStateRecovery: {},
});
Server_1.app.get("/health", (req, res) => {
    res.status(200).send("Server is healthy");
});
io.on("connection", (socket) => {
    console.log(chalk_1.default.green(`User connected: ${socket.id}`));
    socket.on("chat message", (msg) => {
        console.log(chalk_1.default.yellow(`Message received: ${msg}`));
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log(chalk_1.default.red(`User disconnected: ${socket.id}`));
    });
});
server.listen(PORT, () => {
    console.log(chalk_1.default.magenta(`Server listening on ${PORT}`));
});
//# sourceMappingURL=index.js.map