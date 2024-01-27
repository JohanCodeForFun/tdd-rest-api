import { default as request } from "supertest";
import { makeApp } from "../src/app";

const createContact = jest.fn();
const getContactById = jest.fn();
const getAllContacts = jest.fn();

const app = makeApp({ createContact, getContactById, getAllContacts });

beforeEach(() => {
  createContact.mockResolvedValue({
    first_name: "Anna",
    last_name: "Andersson",
    email: "anna.andersson@gmail.com",
    personal_number: "550713-1405",
    address: "Utvecklargatan 12",
    zipcode: "111 22",
    city: "Stockholm",
    country: "Sweden",
  });
});

describe("POST /contact", () => {
  it("should return 400 on empty contact", async () => {
    const res = await request(app).post("/contact").send({});

    expect(res.statusCode).toEqual(400);
  });

  it("should return error message when createContact throws an error", async () => {
    const errorContact = {
      first_name: "Anna",
      last_name: "Andersson",
      email: "anna.andersson@example.com",
      personal_number: "550713-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };

    // Mock createContact to throw an error
    (createContact as jest.Mock).mockImplementation(() => {
      throw new Error('An error occurred while saving the contact');
    });

    const res = await request(app).post("/contact").send(errorContact);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'An error occurred while saving the contact' });
  });

  it("should return error message on missing first name", async () => {
    const missingfirst_name = {
      last_name: "Andersson",
      email: "anna.andersson@gmail.com",
      personal_number: "550713-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };

    const res = await request(app).post("/contact").send(missingfirst_name);

    expect(res.statusCode).toEqual(400);
  });

  it("should return error message on invalid email", async () => {
    const invalidEmailContact = {
      first_name: "Anna",
      last_name: "Andersson",
      email: "anna.andersson",
      personal_number: "550713-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };

    const res = await request(app).post("/contact").send(invalidEmailContact);

    expect(res.statusCode).toEqual(400);
  });

  it("should return 201 on valid post", async () => {
    const validContact = {
      first_name: "Anna",
      last_name: "Andersson",
      email: "anna.andersson@gmail.com",
      personal_number: "550713-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };

    const res = await request(app).post("/contact").send(validContact);

    expect(res.statusCode).toEqual(201);
  });

  it("should call createContact 2 times", () => {
    expect(createContact.mock.calls.length).toBe(2);
  })
});
