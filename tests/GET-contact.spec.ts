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

beforeEach(() => {
  getContactById.mockRestore();
  getAllContacts.mockRestore();

  getContactById.mockResolvedValue({
    id: "638cfd06f84b41a7be61ebad",
    first_name: "Stina",
    last_name: "Andersson",
    email: "stina.andersson@gmail.com",
    personal_number: "550713-1405",
    address: "Utvecklargatan 12",
    zipcode: "111 22",
    city: "Stockholm",
    country: "Sweden",
    lat: 59.3251172,
    lng: 18.0710935,
  });

  getAllContacts.mockResolvedValue([
    {
      id: "638cfd06f84b41a7be61ebad",
      first_name: "Anna",
      last_name: "Andersson",
      email: "anna.andersson@gmail.com",
      personal_number: "550713-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "Stockholm",
      country: "Sweden",
      lat: 59.3251172,
      lng: 18.0710935,
    },
    {
      id: "638cfd06f84b41a7be61eadb",
      first_name: "Erik",
      last_name: "Eriksson",
      email: "erik.eriksson@gmail.com",
      personal_number: "740301-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "Stockholm",
      country: "Sweden",
      lat: 59.3251172,
      lng: 18.0710935,
    },
  ]);
});

afterEach(() => {
  jest.resetAllMocks();
  nock.cleanAll();
});

describe("GET contact", () => {
  it("should return 400 on invalid get", async () => {
    const res = await request(app).get("/contact/invalid-id");

    expect(res.statusCode).toEqual(400);
  });

  it("should return 404 on valid get with invalid id", async () => {
    getContactById.mockResolvedValue(null);
    
    const getRes = await request(app).get(`/contact/000000000000000000000000`);

    expect(getRes.statusCode).toEqual(404);
  });

  it('returns the contact without geolocation when invalid city', async () => {
    const mockGeoLocation: any[] = [];
    
    nock("https://api.api-ninjas.com")
    .get("/v1/geocoding?city=Stockholm")
    .times(1)
    .reply(400, mockGeoLocation);
  
    const mockContact = {
      _id: "638cfd06f84b41a7be61ebad",
      first_name: "Zara",
      last_name: "Andersson",
      email: "zara.andersson@gmail.com",
      personal_number: "550713-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };
    getContactById.mockResolvedValue(mockContact);
    getGeoCodingLocation.mockResolvedValue(mockGeoLocation);

    const response = await request(app).get(`/contact/${mockContact._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockContact);
  });

  it('returns the contact with geolocation when valid city is present', async () => {
    const mockGeoLocation = [{ latitude: 59.3251172, longitude: 18.0710935 }];
    
    nock("https://api.api-ninjas.com")
    .get("/v1/geocoding?city=Stockholm")
    .reply(200, mockGeoLocation);
  
    const mockContact = {
      _id: "638cfd06f84b41a7be61ebad",
      first_name: "Zara",
      last_name: "Andersson",
      email: "zara.andersson@gmail.com",
      personal_number: "550713-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    };
    getContactById.mockResolvedValue(mockContact);
    getGeoCodingLocation.mockResolvedValue(mockGeoLocation);

    const response = await request(app).get(`/contact/${mockContact._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...mockContact,
      lat: mockGeoLocation[0].latitude,
      lng: mockGeoLocation[0].longitude,
    });
  });

  it("should return 200 on valid get with id", async () => {
    const mockGeoLocation = [{ latitude: 59.3251172, longitude: 18.0710935 }];
    
    nock("https://api.api-ninjas.com")
      .get("/v1/geocoding?city=Stockholm")
      .reply(200, mockGeoLocation);
    
    const getRes = await request(app).get(`/contact/638cfd06f84b41a7be61ebad`);

    expect(getRes.body.id).toBe("638cfd06f84b41a7be61ebad");
    expect(getRes.statusCode).toEqual(200);
  });

  it("should return all contacts with geolocation", async () => {
    const mockGeoLocation = [{ latitude: 59.3251172, longitude: 18.0710935 }];
    
    nock("https://api.api-ninjas.com")
      .get("/v1/geocoding?city=Stockholm")
      .reply(200, mockGeoLocation);

    const res = await request(app).get("/contact");

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].lat).toBe(mockGeoLocation[0].latitude);
    expect(res.body[0].lng).toBe(mockGeoLocation[0].longitude);
    expect(res.statusCode).toEqual(200);
  });
});
