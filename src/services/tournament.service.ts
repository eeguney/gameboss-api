import mongoose, { QueryOptions } from "mongoose";
import TournamentModel from "../models/tournament.model";
import { Tournament } from "../types/tournament";

export default class TournamentService {
  public async getAllTournaments(query: QueryOptions): Promise<Tournament[]> {
    const limit = query.itemPerPage ?? 20;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const tournaments: Tournament[] = await TournamentModel.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: query.sort == "desc" ? 1 : -1 });
    if (tournaments.length == 0) {
      throw "There is no record..";
    }
    return tournaments;
  }

  public async getATournamentById(id: string): Promise<Tournament> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw "There is no record with this id...";
    }
    const tournaments: Tournament | null = await TournamentModel.findById(id);
    if (!tournaments) {
      throw "There is no record with this id...";
    }
    return tournaments;
  }

  public async createANewTournament(
    tournament: Tournament
  ): Promise<Tournament> {
    if (!tournament.title || !tournament.text || !tournament.category) {
      throw "Bad request";
    }
    const createdTournament = new TournamentModel(tournament);
    return await createdTournament.save();
  }

  public async updateATournament(
    tournament: Tournament
  ): Promise<Tournament | null> {
    const isValid = mongoose.Types.ObjectId.isValid(tournament._id);
    if (!tournament._id || !isValid) {
      throw "You should send legal id";
    }
    const isTournamentExist = await TournamentModel.findById(tournament._id);

    if (!isTournamentExist) {
      throw "Tournament does not exist";
    }
    return await TournamentModel.findOneAndUpdate(
      { _id: tournament._id },
      tournament,
      { upsert: true }
    );
  }

  public async deleteTournamentWithTitle(title: string): Promise<string> {
    if (!title) {
      throw "Bad request";
    }
    const isExist = TournamentModel.findOne({ title });
    if (!isExist) {
      throw "There is no record with this id...";
    }
    await TournamentModel.deleteMany({ title });
    return "Item deleted";
  }
}
