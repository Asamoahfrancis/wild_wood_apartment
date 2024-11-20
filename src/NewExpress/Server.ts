import express, { NextFunction, Request, Response, Router } from "express";
import TenantRouter from "../Routers/TenantRoute";
import RoleRouter from "../Routers/RoleRoute";
import CompanyInformationRouter from "../Authentication/Routers/CompanyInformation";
import { DBClass } from "../Database/Database";
import LeasePeriodRouter from "../Routers/LeasePeriodRoute";
import ApartmentRouter from "../Routers/ApartmentRoute";
import ApartmentComplexRouter from "../Routers/ApartmentComplexRoute";
import RoomFeeRouter from "../Routers/RoomFeeRoute";
import ApartmantMaintainceRouter from "../Routers/ApartmantMaintainceRoute";
import ProblemRouter from "../Routers/ProblemRoute";
import TenantPaymentRouter from "../Routers/TenantPaymentRoute";
import MaintainceFeeRouter from "../Routers/MaintainceFeeRoute";
import TenantPaymentHistoryRouter from "../Routers/TenantPaymentHistoryRoute";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import TenantAdminSigninRouter from "../Authentication/Routers/TenantAdminSigninRoute";
const dbInstance = DBClass.getInstance();
export const app = express();

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
        url_: "https://wild-wood-apartment.onrender.com",
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
  apis: [path.resolve(__dirname, "../Routers/*.{ts,js}")],
};

const swaggerDocs = swaggerJSDoc(options);

async function startApp() {
  await dbInstance.connect();
  process.on("SIGINT", async () => {
    await dbInstance.disconnect();
    process.exit(0);
  });
}

startApp();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/api/v1/auth", CompanyInformationRouter);
app.use("/api/v1/auth", TenantAdminSigninRouter);
app.use("/api/v1", TenantRouter);
app.use("/api/v1", RoleRouter);
app.use("/api/v1", LeasePeriodRouter);
app.use("/api/v1", ApartmentRouter);
app.use("/api/v1", ApartmentComplexRouter);
app.use("/api/v1", RoomFeeRouter);
app.use("/api/v1", ApartmantMaintainceRouter);
app.use("/api/v1", MaintainceFeeRouter);
app.use("/api/v1", ProblemRouter);
app.use("/api/v1", TenantPaymentRouter);
app.use("/api/v1", TenantPaymentHistoryRouter);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("*", (req, res) => {
  res.status(404).send("The endpoint does not exist");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    message: err.message || "Internal Server Error",
  });
});
