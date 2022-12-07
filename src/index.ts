import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose, { ConnectOptions } from "mongoose";
import CONFIG from "./config";
import ROUTES from "./constants/routes";
import router from "./routes/Router";

function startServer() {
  const app: Application = express();

  mongoose.set("strictQuery", true);

  app.use(cors());

  app.use(helmet());

  app.use(express.json());

  app.use(ROUTES.INDEX, router);

  const PORT = CONFIG.PORT || 8000;

  if (!CONFIG.MONGODB_URL) {
    console.error("There is no MONGODB URL on your enviroments");
    return;
  }

  mongoose
    .connect(CONFIG.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      app.listen(PORT, (): void => {
        console.log(`API is running on PORT: ${PORT}`);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

startServer();
