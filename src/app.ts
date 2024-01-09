import express, { json } from "express";

export const makeApp = () => {
  const app = express();

  app.use(json());

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to the API" });
  });

  app.post("/contact", async (req, res) => {
    const errors = [];
    /*
      firstname: "Anna",
      lastname: "Andersson",
      email: "anna.andersson@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    */
    if (!req.body) {
      errors.push({ error: "You must provide a complete contact" });
    }

    if (!req.body.firstname || req.body.firstname.length === 0) {
      errors.push({ error: "You must provide a firstname" });
    }
    if (!req.body.lastname || req.body.lastname.length === 0) {
      errors.push({ error: "You must provide a lastname" });
    }
    if (!req.body.email || req.body.email.length === 0) {
      errors.push({ error: "You must provide a email" });
    }
    if (!req.body.address || req.body.address.length === 0) {
      errors.push({ error: "You must provide a address" });
    }
    if (!req.body.zipCode || req.body.zipCode.length === 0) {
      errors.push({ error: "You must provide a zipCode" });
    }
    if (!req.body.city || req.body.city.length === 0) {
      errors.push({ error: "You must provide a city" });
    }
    if (!req.body.country || req.body.country.length === 0) {
      errors.push({ error: "You must provide a country" });
    }
    if (errors.length) {
      res.status(400).json(errors);
    } else {
      res.status(201).json({ message: "contact created" });
      // try { 
      //   const contact = req.body;
      //   // const contact = new Contact(req.body);
      //   // await contact.save();
      //   res.status(201).json(contact);
      // } catch (error) {
      //   res
      //     .status(500)
      //     .json({ error: "An error occurred while saving the contact" });
      // }
    }
  });
  return app;
};
