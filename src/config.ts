import { config } from "dotenv";

const isEvnExist = config();

if(isEvnExist.error) {
    throw new Error("There is no .env file :(")
}

const CONFIG = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    api: {
        prefix: '/api'
    }
}

export default CONFIG;