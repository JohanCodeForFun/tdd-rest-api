import express, { json } from "express";
import { validateAddress } from "./utils/validateAddress";
import { validateEmail } from "./utils/validateEmail";
import { validateCity } from "./utils/validateCity";
import { validateCountry } from "./utils/validateCountry";
import { validateName } from "./utils/validateName";
import { validateZipCode } from "./utils/validateZipCode";
import { validatePersonalNumber } from "./utils/validatePersonalNumber";
import {
  Contact,
  createContact,
  getContactById,
  getAllContacts,
  isValidId,
} from "./database";

type GeoCodingLocation = {
  latitude: number;
  longtitude: number;
}

type AppPropps = {
  createContact: (contactData: Contact) => Promise<Contact>;
  getContactById: (id: string) => Promise<Contact | null>;
  getAllContacts: () => Promise<Contact[]>;
  // getGeoCodingLocation: (location: string) => Promise<GeoCodingLocation[]>;
};

export const makeApp = ({
  createContact,
  getContactById,
  getAllContacts,
}: AppPropps) => {
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

    const errors: object[] = [];

    const validations = [
      { validate: validateName, field: 'firstname', message: 'You must provide a firstname' },
      { validate: validateName, field: 'lastname', message: 'You must provide a lastname' },
      { validate: validateEmail, field: 'email', message: 'You must provide a valid email. Example name@domain.com' },
      { validate: validateAddress, field: 'address', message: 'You must provide a address' },
      { validate: validateZipCode, field: 'zipCode', message: 'You must provide a zipCode' },
      { validate: validatePersonalNumber, field: 'personalnumber', message: 'You must provide a valid personal number. Example, 550713-1405' },
      { validate: validateCity, field: 'city', message: 'You must provide a city' },
      { validate: validateCountry, field: 'country', message: 'You must provide a country' },
    ];

    validations.forEach(({ validate, field, message }) => {
      if (!validate(req.body[field])) {
        errors.push({ error: message });
      }
    });

    if (errors.length) {
      res.status(400).json(errors);
    } else {
      try {
        const contact = await createContact(req.body);
        res.status(201).json(contact);
      } catch (error) {
        console.log("catch error", error);
        res.status(500).json({ error: "An error occurred while saving the contact" });
      }
    }
  });

  app.get("/contact/:id", async (req, res) => {
    if (!isValidId(req.params.id)) {
      res.status(400).send();
    } else {
      const result = await getContactById(req.params.id);

      res.status(200).send(result);
    }
  });

  app.get("/contact/", async (req, res) => {
    const contacts = await getAllContacts();
    
    res.status(200).json(contacts);
  });
  return app;
};
