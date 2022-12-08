import mongoose from "mongoose";

export type News = {
    _id: mongoose.Types.ObjectId,
    title: string,
    thumbnail: string,
    category: string,
    text: string,
    _v: number
} 