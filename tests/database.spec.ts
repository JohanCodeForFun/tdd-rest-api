import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createContact, getContactById, getAllContacts } from "../src/database";

describe("Database operations tests", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('returns the contact with the given id', async () => {
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
    lat: 59.3251172,
    lng: 18.0710935,
    };

    const contact = await getContactById('638cfd06f84b41a7be61ebad');

    expect(contact).toEqual(mockContact);
  });

  it("getAllContacts - should return all contacts", async () => {
    const contact1 = await createContact({
      firstname: "Anna",
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    });
    const contact2 = await createContact({
      firstname: "Erik",
      lastname: "Eriksson",
      email: "erik.eriksson@gmail.com",
      personalnumber: "740301-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    });

    const contacts = await getAllContacts();
    expect(contacts.length).toBe(2);
  });
});
