import { Router } from "express";
import ROUTES from "../constants/routes";
import tournamentsRouter from "./tournaments.route";

const router = Router();

router.use(ROUTES.TOURNAMENTS, tournamentsRouter);

export default router;