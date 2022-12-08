import mongoose, { QueryOptions } from "mongoose";
import NewsModel from "../models/news.model";
import { News } from "../types/news";

export default class NewsService {
  public async getAllNews(query: QueryOptions): Promise<News[]> {
    const limit = query.itemPerPage ?? 20;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const news: News[] = await NewsModel.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: query.sort == "desc" ? 1 : -1 });
    if (news.length == 0) {
      throw "There is no record..";
    }
    return news;
  }

  public async getANewsById(id: string): Promise<News> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw "There is no record with this id...";
    }
    const news: News | null = await NewsModel.findById(id);
    if (!news) {
      throw "There is no record with this id...";
    }
    return news;
  }

  public async createANews(
    news: News
  ): Promise<News> {
    if (!news.title || !news.text || !news.category) {
      throw "Bad request";
    }
    const createdNews = new NewsModel(news);
    return await createdNews.save();
  }

  public async updateANews(
    news: News
  ): Promise<News | null> {
    const isValid = mongoose.Types.ObjectId.isValid(news._id);
    if (!news._id || !isValid) {
      throw "You should send legal id";
    }
    const isNewsExist = await NewsModel.findById(news._id);

    if (!isNewsExist) {
      throw "News does not exist";
    }
    return await NewsModel.findOneAndUpdate(
      { _id: news._id },
      news,
      { upsert: true }
    );
  }

  public async deleteNewsWithTitle(title: string): Promise<string> {
    if (!title) {
      throw "Bad request";
    }
    const isExist = NewsModel.findOne({ title });
    if (!isExist) {
      throw "There is no record with this id...";
    }
    await NewsModel.deleteMany({ title });
    return "Item deleted";
  }
}
