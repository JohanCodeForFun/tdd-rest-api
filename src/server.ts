import { makeApp } from "./app";
import { createContact } from "./database";
import mongoose from "mongoose";

const port = 3000;
const app = makeApp({ createContact });

mongoose.connect("connection_string").then(() => {
  app.listen(port, () => {
    console.log("Listening on port", port);
  });
});
