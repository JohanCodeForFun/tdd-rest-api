import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import nock from "nock";
import { createContact, getContactById, getAllContacts } from "../src/database";

describe("Database operations tests", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  beforeEach(() => {
    nock("https://api.api-ninjas.com")
    .get("/v1/geocoding?city=DFFFDFDSSD")
    .reply(200, []);
  });

  afterEach(() => {
    jest.resetAllMocks();
    nock.cleanAll();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("returns the contact with the given id", async () => {
    const contact = await createContact({
      first_name: "Lisa",
      last_name: "Andersson",
      email: "lisa.andersson@gmail.com",
      personal_number: "550713-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "DFFFDFDSSD",
      country: "Sweden",
    });

    const response = await getContactById(contact._id.toString());

    expect(response?.first_name).toEqual("Lisa");
    expect(response?.last_name).toEqual("Andersson");
    expect(response?.city).toBe("DFFFDFDSSD");
    expect(response?.lat).toBe(undefined);
    expect(response?.lng).toBe(undefined);
  });

  it('it should return contact without lat/long if address is invalid', async () => {

    const contact = await createContact({
      first_name: "David",
      last_name: "Andersson",
      email: "david.andersson@gmail.com",
      personal_number: "550713-1405",
      address: "Utvecklargatan 12",
      zipcode: "111 22",
      city: "DFFFDFDSSD",
      country: "DFFFDFDSSD",
    });

    const response = await getContactById(contact._id.toString());

    expect(response?.city).toBe("DFFFDFDSSD");
    expect(response?.lat).toBe(undefined);
    expect(response?.lng).toBe(undefined);
  });

  it("getAllContacts - should return all contacts", async () => {
    const contacts = await getAllContacts();
    
    expect(contacts.length).toBe(2);
  });
});
