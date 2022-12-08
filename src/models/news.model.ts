import{ Schema, model } from "mongoose";
import { News } from "../types/news";

const newsSchema = new Schema<News>(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 240,
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      min: 10,
    },
    _v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

export default model<News>('News', newsSchema);
