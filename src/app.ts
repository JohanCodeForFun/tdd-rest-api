import express, { json } from "express";
import { isValidId } from "./database";
import { getGeoCodingLocation } from "./geoLocation";
import { Contact } from "./types/Contact";

import {
  validateAddress,
  validateEmail,
  validateCity,
  validateCountry,
  validateName,
  validateZipCode,
  validatePersonalNumber,
} from "./utils/index";

export type AppPropps = {
  createContact: (contactData: Contact) => Promise<Contact>;
  getContactById: (id: string) => Promise<Contact | null>;
  getAllContacts: () => Promise<Contact[]>;
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
    const errors: object[] = [];

    const validations = [
      {
        validate: validateName,
        field: "firstname",
        message: "You must provide a firstname",
      },
      {
        validate: validateName,
        field: "lastname",
        message: "You must provide a lastname",
      },
      {
        validate: validateEmail,
        field: "email",
        message: "You must provide a valid email. Example name@domain.com",
      },
      {
        validate: validateAddress,
        field: "address",
        message: "You must provide a address",
      },
      {
        validate: validateZipCode,
        field: "zipCode",
        message: "You must provide a zipCode",
      },
      {
        validate: validatePersonalNumber,
        field: "personalnumber",
        message:
          "You must provide a valid personal number. Example, 550713-1405",
      },
      {
        validate: validateCity,
        field: "city",
        message: "You must provide a city",
      },
      {
        validate: validateCountry,
        field: "country",
        message: "You must provide a country",
      },
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
        await createContact(req.body);
        res.status(201).json("No Content");
      } catch (error) {
        res
          .status(400)
          .json({ error: "An error occurred while saving the contact" });
      }
    }
  });

  app.get("/contact/:id", async (req, res) => {
    if (!isValidId(req.params.id)) {
      res.status(400).send("Invalid id received");
    } else {
      let result = await getContactById(req.params.id);
      if (result?.city) {
        const geoLocation = await getGeoCodingLocation(result.city);
        
        if (geoLocation && geoLocation.length > 0) {
          res.status(200).send({
            ...result,
            lat: geoLocation[0].latitude,
            lng: geoLocation[0].longitude,
          });
        } else {
          res.status(200).send(result);
        }
      } else {
        res.status(404).send(result);
      }
    }
  });

  app.get("/contact", async (req, res) => {
    let contacts = await getAllContacts();

    contacts = await Promise.all(
      contacts.map(async (contact) => {
        const geoLocation = await getGeoCodingLocation(contact.city);

        if (geoLocation && geoLocation.length > 0) {
          return {
            ...contact,
            lat: geoLocation[0].latitude,
            lng: geoLocation[0].longitude,
          };
        } else {
          return contact;
        }
      })
    );
    res.status(200).json(contacts);
  });
  return app;
};
