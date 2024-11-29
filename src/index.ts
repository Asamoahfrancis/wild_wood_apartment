// import "./socket/socket";
import { app } from "./NewExpress/Server";
import dotenv from "dotenv";
import chalk from "chalk";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  connectionStateRecovery: {},
});
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});
io.on("connection", (socket) => {
  console.log(chalk.green(`User connected: ${socket.id}`));

  socket.on("chat message", (msg) => {
    console.log(chalk.yellow(`Message received: ${msg}`));
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log(chalk.red(`User disconnected: ${socket.id}`));
  });
});

server.listen(PORT, () => {
  console.log(chalk.magenta(`Server listening on ${PORT}`));
});
