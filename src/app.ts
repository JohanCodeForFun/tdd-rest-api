import express, { json } from "express";
import { validateAddress } from "./utils/validateAddress";
import { validateEmail } from "./utils/validateEmail";
import { validateCity } from "./utils/validateCity";
import { validateCountry } from "./utils/validateCountry";
import { validateName } from "./utils/validateName";
import { validateZipCode } from "./utils/validateZipCode";
import { validatePersonalNumber } from "./utils/validatePersonalNumber";
import { Contact, createContact } from "./database";

type AppPropps = {
  createContact: (contactData: Contact) => Contact;
};

export const makeApp = ({ createContact }: AppPropps) => {
  const app = express();

  app.use(json());

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to the API" });
  });

  app.post("/contact", async (req, res) => {
    const {
      firstname,
      lastname,
      email,
      personalnumber,
      address,
      zipCode,
      city,
      country,
    } = req.body;

    const errors = [];

    if (!req.body) {
      errors.push({ error: "You must provide a complete contact" });
    }

    if (!validateName(firstname)) {
      errors.push({ error: "You must provide a firstname" });
    }
    if (!validateName(lastname)) {
      errors.push({ error: "You must provide a lastname" });
    }
    if (!validateEmail(email)) {
      errors.push({
        error: "You must provide a valid email. Example name@domain.com",
      });
    }
    if (!validateAddress(address)) {
      errors.push({ error: "You must provide a address" });
    }
    if (!validateZipCode(zipCode)) {
      errors.push({ error: "You must provide a zipCode" });
    }
    if (!validatePersonalNumber(personalnumber)) {
      errors.push({
        error: "You must provide a valid personal number. Example, 550713-1405",
      });
    }
    if (!validateCity(city)) {
      errors.push({ error: "You must provide a city" });
    }
    if (!validateCountry(country)) {
      errors.push({ error: "You must provide a country" });
    }
    if (errors.length) {
      res.status(400).json(errors);
    } else {
      try {
        const contact = await createContact(req.body);

        res.status(201).json(contact);
      } catch (error) {
        console.log("catch error", error)
        res
          .status(500)
          .json({ error: "An error occurred while saving the contact" });
      }
    }
  });
  return app; 
};
