import request from "supertest";
import { makeApp } from "../src/app";
import { createContact } from "../src/database";

const app = makeApp({ createContact });

describe("GET contact", () => {
  it("should return 400 on invalid get", async () => {
    const res = await request(app).get("/contact/invalid-id");
    expect(res.statusCode).toEqual(400);
  });

  it("should return 200 on valid get with id", async () => {
    const getRes = await request(app).get(`/contact/507f1f77bcf86cd799439011`);
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

});
