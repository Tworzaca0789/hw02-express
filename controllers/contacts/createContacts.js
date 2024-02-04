//import { addContact, listContacts } from "../../models/contacts.js";
//import { schema } from "../../helpers/joiValid.js";

import Contact from "../../service/schemas/contact.schemas.js";

export async function createContacts(req, res, next) {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  });
  contact.save();
  return res.json({ data: contact });

  // try {
  //   addContact();
  //   const contacts = await listContacts();
  //   const { name, email, phone } = req.body;

  //   const result = schema.validate(req.body);
  //   if (result.error) {
  //     return res.status(400).json({ message: result.error.message });
  //   } else {
  //     return res.json(result);
  //   }
  //   const newContact = {
  //     id: contacts.length + 1,
  //     name: name,
  //     email: email,
  //     phone: phone,
  //   };
  //   contacts.push(newContact);
  //   return res.status(201).json({ id });
  // } catch (err) {
  //   return res.json({ message: "missing required name - field" }).status(400);
  // }
}
