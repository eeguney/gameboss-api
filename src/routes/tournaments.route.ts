import { Router } from "express";
import ROUTES from "../constants/routes";
import { getAllTournaments, getATournamentById, createANewTournament, deleteTournamentWithTitle } from "../controllers/tournament.controller";

const tournamentsRouter = Router();

tournamentsRouter.get(ROUTES.INDEX, getAllTournaments);

tournamentsRouter.get(`${ROUTES.INDEX}/:id`, getATournamentById);

tournamentsRouter.post(`${ROUTES.INDEX}`, createANewTournament);

tournamentsRouter.delete(`${ROUTES.INDEX}`, deleteTournamentWithTitle);

export default tournamentsRouter;