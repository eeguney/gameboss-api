import { Application } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import CONFIG from "../config";

export default function mongooseConnection(app: Application) {
  if (!CONFIG.MONGODB_URL) {
    console.error("There is no MONGODB URL on your enviroments");
    return;
  }

  const PORT = CONFIG.PORT || 8000;

  mongoose.set("strictQuery", true);


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
