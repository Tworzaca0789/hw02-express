import { Contact } from "../../service/schemas/contact.schemas.js";

export async function showContacts(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ _id: id });

    if (contact) {
      return res.status(200).json({ contact });
    } else {
      return res.status(404).json(` Not found id: ${id}`);
    }
  } catch (err) {
    next(err);
  }
}
