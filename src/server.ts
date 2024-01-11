require("dotenv").config();
import { makeApp } from "./app";
import { createContact, getContactById, getAllContacts } from "./database";
import mongoose from "mongoose";

const port = 3000;
const app = makeApp({
  createContact,
  getContactById,
  getAllContacts,
});

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined");
}

mongoose.connect(mongoUri).then(() => {
  app.listen(port, () => {
    console.log("Connected to database.");
    console.log("Listening on port", port);
  });
});
