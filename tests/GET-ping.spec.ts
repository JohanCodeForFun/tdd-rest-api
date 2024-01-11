import { default as request } from "supertest";
import { makeApp } from "../src/app";

const createContact = jest.fn();
const getContactById = jest.fn();
const getAllContacts = jest.fn();

const app = makeApp({ createContact, getContactById, getAllContacts });

describe("GET /", () => {
  it("should return 200 on /", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Welcome to the API");
  });
});
