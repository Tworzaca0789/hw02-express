import { schema } from "../../helpers/joiValid.js";
import { Contact } from "../../service/schemas/contact.schemas.js";

export async function createContacts(req, res, next) {
  try {
    const validContact = schema.validate(req.body);
    if (validContact.error) {
      return res.status(400).json({ error: validContact.error });
    }

    const contact = await Contact.create({
      ...req.body,
      owner: req.user._id,
    });

    return res.status(201).json(contact);
  } catch (err) {
    console.error(err);
    next(err);
    return res.status(500).json({ message: "Server error" });
  }
}
