import "./socket/socket";
import { app } from "./NewExpress/Server";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(chalk.magenta(`Server listening on ${PORT}`));
});
