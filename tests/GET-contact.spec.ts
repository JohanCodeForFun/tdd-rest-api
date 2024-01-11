import request from "supertest";
import nock from "nock";
import { makeApp } from "../src/app";

const createContact = jest.fn();
const getContactById = jest.fn();
const getAllContacts = jest.fn();
const getGeoCodingLocation = jest.fn();

const app = makeApp({
  createContact,
  getContactById,
  getAllContacts,
});

beforeAll(() => {
  nock("https://api.api-ninjas.com")
    .get("/v1/geocoding?city=Stockholm")
    .times(8)
    .reply(200, {
      name: "Stockholm",
      latitude: 59.3251172,
      longitude: 18.0710935,
      country: "SE",
    });
});

beforeEach(() => {
  getContactById.mockRestore();
  getAllContacts.mockRestore();

  getContactById.mockResolvedValue({
    id: "638cfd06f84b41a7be61ebad",
    firstname: "Anna",
    lastname: "Andersson",
    email: "anna.andersson@gmail.com",
    personalnumber: "550713-1405",
    address: "Utvecklargatan 12",
    zipCode: "111 22",
    city: "Stockholm",
    country: "Sweden",
    lat: 59.3251172,
    lng: 18.0710935,
  });

  getAllContacts.mockResolvedValue([
    {
      id: "638cfd06f84b41a7be61ebad",
      firstname: "Anna",
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
      lat: 59.3251172,
      lng: 18.0710935,
    },
    {
      id: "638cfd06f84b41a7be61eadb",
      firstname: "Erik",
      lastname: "Eriksson",
      email: "erik.eriksson@gmail.com",
      personalnumber: "740301-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
      lat: 59.3251172,
      lng: 18.0710935,
    },
  ]);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("GET contact", () => {
  it("should return 400 on invalid get", async () => {
    const res = await request(app).get("/contact/invalid-id");

    expect(res.statusCode).toEqual(400);
  });

  it('returns the contact with geolocation when city is present', async () => {
    const mockContact = {
      _id: "638cfd06f84b41a7be61ebad",
      firstname: "Anna",
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };
    const mockGeoLocation = [{ latitude: 99, longitude: 99 }];
    getContactById.mockResolvedValue(mockContact);
    (getGeoCodingLocation).mockResolvedValue(mockGeoLocation);

    const response = await request(app).get(`/contact/${mockContact._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...mockContact,
      lat: mockGeoLocation[0].latitude,
      lng: mockGeoLocation[0].longitude,
    });
  });

  it("should return 200 on valid get with id", async () => {
    const getRes = await request(app).get(`/contact/638cfd06f84b41a7be61ebad`);

    expect(getRes.body.id).toBe("638cfd06f84b41a7be61ebad");
    expect(getRes.statusCode).toEqual(200);
  });

  it("should return all contacts", async () => {
    const res = await request(app).get("/contact");

    expect(res.body).toBeInstanceOf(Array);
    expect(res.statusCode).toEqual(200);
  });
});
