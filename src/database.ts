import mongoose, { Document } from "mongoose";

export type Contact = {
  firstname: string;
  lastname: string;
  email: string;
  personalnumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
};

const contactSchema = new mongoose.Schema<Contact>({
  firstname: String,
  lastname: String,
  email: String,
  personalnumber: String,
  address: String,
  zipCode: String,
  city: String,
  country: String,
});

const ContactModel = mongoose.model("Contact", contactSchema);

export const createContact = async (contactData: Contact) => {
  return await new ContactModel(contactData).save();
};

export const getContactById = async (id: string) => {
  return await ContactModel.findById(id).lean();
}

export const getAllContacts = async () => {
  return await ContactModel.find().lean();
}

export const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);