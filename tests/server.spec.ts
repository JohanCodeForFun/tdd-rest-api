import { makeApp } from "../src/app";
import { createContact, getContactById, getAllContacts } from "../src/database";
import mongoose from "mongoose";
import { server } from "../src/server";

jest.mock("mongoose", () => ({
  connect: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("../src/app", () => ({
  makeApp: jest.fn().mockReturnValue({
    listen: jest.fn(),
  }),
}));

jest.mock("../src/database", () => ({
  createContact: jest.fn(),
  getContactById: jest.fn(),
  getAllContacts: jest.fn(),
}));

describe("Server", () => {
  // Save the original MONGO_URI
  const originalMongoUri = process.env.MONGO_URI;

  // ...

  afterEach(() => {
    // Restore the original MONGO_URI
    process.env.MONGO_URI = originalMongoUri;
  });

  it("should throw an error when MONGO_URI is not defined", () => {
    // Delete MONGO_URI from the environment variables
    delete process.env.MONGO_URI;

    // Require the server module and check that it throws an error
    jest.isolateModules(() => {
      expect(() => require("../src/server")).toThrow(
        "MONGO_URI is not defined"
      );
    });
  });

  it("should start the server successfully", () => {
    require("../src/server");

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
  });

  it("should throw an error when MONGO_URI is not defined", () => {
    delete process.env.MONGO_URI;

    expect(() => require("../src/server")).toThrow("MONGO_URI is not defined");
  });
});
