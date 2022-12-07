import { RequestHandler, Request, Response } from "express";
import STATUS_CODE from "../constants/status";
import TournamentService from "../services/tournament.service";
import { Tournament } from "../types/tournament";

export const getAllTournaments: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const tournamentService = new TournamentService();
    const data = await tournamentService.getAllTournaments(req.query);
    return res.status(STATUS_CODE.SUCCESS.OK).json(data);
  } catch (error) {
    return res.status(STATUS_CODE.ERROR.NOT_FOUND).json(error);
  }
};

export const getATournamentById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const tournamentId = req.params.id;
  try {
    const tournamentService = new TournamentService();
    const data = await tournamentService.getATournamentById(tournamentId);
    return res.status(STATUS_CODE.SUCCESS.OK).json(data);
  } catch (error) {
    return res.status(STATUS_CODE.ERROR.NOT_FOUND).json(error);
  }
};

export const createANewTournament: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const theTournament: Tournament = req.body;
  try {
    const tournamentService = new TournamentService();
    const data = await tournamentService.createANewTournament(theTournament);
    return res.status(STATUS_CODE.SUCCESS.CREATED).json(data);
  } catch (error) {
    return res.status(STATUS_CODE.ERROR.BAD_REQUEST).json(error);
  }
};

export const deleteTournamentWithTitle: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { title } = req.body;
  try {
    const tournamentService = new TournamentService();
    const data = await tournamentService.deleteTournamentWithTitle(title);
    return res.status(STATUS_CODE.SUCCESS.OK).json(data);
  } catch (error) {
    return res.status(STATUS_CODE.ERROR.NOT_FOUND).json(error);
  }
};
