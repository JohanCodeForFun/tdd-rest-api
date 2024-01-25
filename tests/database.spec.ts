import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createContact, getContactById, getAllContacts } from "../src/database";

describe("Database operations tests", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("returns the contact with the given id", async () => {
    const contact = await createContact({
      firstname: "Anna",
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    });

    const response = await getContactById(contact._id.toString());

    expect(response?.firstname).toEqual("Anna");
    expect(response?.lastname).toEqual("Andersson");
    expect(response?.email).toEqual("anna.andersson@gmail.com");
    expect(response?.personalnumber).toEqual("550713-1405");
    expect(response?.address).toEqual("Utvecklargatan 12");
    expect(response?.zipCode).toEqual("111 22");
    expect(response?.city).toEqual("Stockholm");
    expect(response?.country).toEqual("Sweden");
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
    expect(contacts.length).toBe(3);
  });

});
