import dotenv from "dotenv";
import { app } from "../NewExpress/Server";
import http from "http";
import { Server } from "socket.io";
import chalk from "chalk";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;

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
  console.log(
    chalk.blue(`Socket.IO server running at http://localhost:${PORT}`)
  );
});
