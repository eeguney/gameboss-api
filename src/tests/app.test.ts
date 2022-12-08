import request from "supertest";
import mongooseConnection from "../db/mongoose";
import express, { Application } from "express";

const app: Application = express();

beforeEach(() => {
    mongooseConnection(app);
})

describe("GET /api/tournaments", () => {
    it("should return all tournaments", async () => {
        const res = await request(app).get("/tournaments");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
})