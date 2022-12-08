import { RequestHandler, Request, Response } from "express";
import STATUS_CODE from "../constants/status";
import NewsService from "../services/news.service";
import { News } from "../types/news";
import logger from "../utils/logger";

export const getAllNews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const newsService = new NewsService();
    const data = await newsService.getAllNews(req.query);
    return res.status(STATUS_CODE.SUCCESS.OK).json(data);
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODE.ERROR.NOT_FOUND).send(error);
  }
};

export const getANewstById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const newsId = req.params.id;
  try {
    const newsService = new NewsService();
    const data = await newsService.getANewsById(newsId);
    return res.status(STATUS_CODE.SUCCESS.OK).json(data);
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODE.ERROR.NOT_FOUND).send(error);
  }
};

export const createANews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const theNews: News = req.body;
  try {
    const newsService = new NewsService();
    const data = await newsService.createANews(theNews);
    return res.status(STATUS_CODE.SUCCESS.CREATED).json(data);
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
  }
};

export const deleteNewsWithTitle: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { title } = req.body;
  try {
    const newsService = new NewsService();
    const data = await newsService.deleteNewsWithTitle(title);
    return res.status(STATUS_CODE.SUCCESS.OK).json(data);
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODE.ERROR.NOT_FOUND).send(error);
  }
};

export const updateANews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const newsService = new NewsService();
    const data = await newsService.updateANews(req.body);
    return res.status(STATUS_CODE.SUCCESS.OK).json(data);
  } catch (error) {
    logger.error(error);
    return res.status(STATUS_CODE.ERROR.NOT_FOUND).send(error);
  }
};
