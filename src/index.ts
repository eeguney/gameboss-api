import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import CONFIG from "./config";
import router from "./routes/Router";
import mongooseConnection from "./db/mongoose";

function startServer() {
  const app: Application = express();

  mongooseConnection(app);

  app.use(cors());

  app.use(helmet());

  app.use(express.json());

  app.use(CONFIG.api.prefix, router);
}

startServer();
