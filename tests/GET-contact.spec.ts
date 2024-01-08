import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("GET contact", () => {
  it("should return 400 on invalid get", async () => {
    const res = await request(app).get("/contact/invalid-id");
    expect(res.statusCode).toEqual(400);
  });

  it("should return 200 on valid get", async () => {
    const getRes = await request(app).get(`/contact/${body._id}`);
    const validContact = {
      firstname: "Anna",
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };

    expect(getRes.body).toEqual(validContact);
    expect(getRes.statusCode).toEqual(200);
  });

  it("should return all contacts", async () => {
    const res = await request(app).get("/contact");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return contact with id", async () => {
    const getRes = await request(app).get(`/contact/${postRes.body._id}`);
    const validContact = {
      firstname: "Anna",
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };

    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body).toEqual(validContact);
  });
});
