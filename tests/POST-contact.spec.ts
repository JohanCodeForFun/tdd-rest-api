import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

const error = [
  {
    error: "firstname is missing",
  },
  {
    error: "email is not valid",
  },
];

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST contact", () => {
  it("should return 400 on empty contact", async () => {
    const res = await request(app).post("/contact").send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(error);
  });

  it("should return error message on missing first name", async () => {
    const missingFirstName = {
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };

    const res = await request(app).post("/contact").send(missingFirstName);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(error);
  });

  it("should return error message on invalid email", async () => {
    const invalidEmailContact = {
      firstname: "Anna",
      lastname: "Andersson",
      email: "anna.andersson",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };

    const res = await request(app).post("/contact").send(invalidEmailContact);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(error);
  });

  it("should return 201 on valid post", async () => {
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

    const res = await request(app).post("/contact").send(validContact);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });
});
