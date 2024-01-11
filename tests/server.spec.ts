import mongoose from "mongoose";

// Mock mongoose
jest.mock("mongoose", () => ({
  connect: jest.fn().mockResolvedValue({}),
  Schema: jest.fn().mockImplementation(() => ({
    // Mock mongoose.Schema
    add: jest.fn(),
    index: jest.fn(),
  })),
}));

describe("server.ts tests", () => {
  beforeEach(() => {
    jest.resetModules(); // This resets the module registry in Jest, allowing for a fresh import of server.ts in each test
  });

  it("throws an error when MONGO_URI is not defined", () => {
    process.env.MONGO_URI = "";
    expect(() => require("../src/server")).toThrow("MONGO_URI is not defined");
  });

  it("connects to the database when MONGO_URI is defined", async () => {
    process.env.MONGO_URI = "mongodb://localhost:27017/test";
    require("../src/server");
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
  });
});

// jest.mock('mongoose', () => ({
//   connect: jest.fn(),
// }));

// jest.mock('../src/app', () => {
//   return () => ({
//     listen: jest.fn().mockImplementation((port, callback) => {
//       callback();
//     }),
//   });
// });

// describe('server.ts tests', () => {
//   beforeEach(() => {
//     jest.resetModules(); // This resets the module registry in Jest, allowing for a fresh import of server.ts in each test
//   });

//   it('throws an error when MONGO_URI is not defined', () => {
//     process.env.MONGO_URI = '';
//     expect(() => require('../src/server')).toThrow('MONGO_URI is not defined');
//   });

//   it('connects to the database and starts the server when MONGO_URI is defined', () => {
//     process.env.MONGO_URI = 'mongodb://localhost:27017/test';
//     require('../src/server');
//     const mongoose = require('mongoose');
//     const makeApp = require('../src/app');
//     expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
//     expect(makeApp).toHaveBeenCalled();
//   });
// });
