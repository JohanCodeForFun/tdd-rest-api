import { makeApp } from "./src/app";
import { startServer } from "./src/server";
import { createContact, getContactById, getAllContacts } from "./src/database";
import mongoose from "mongoose";
require("dotenv").config();

const mongoUri = process.env.MONGO_URI || "";
const app = makeApp({
  createContact,
  getContactById,
  getAllContacts,
});

(async () => {
  await mongoose.connect(mongoUri);
  await startServer(app, console);
})();




