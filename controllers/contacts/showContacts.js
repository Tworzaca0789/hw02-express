import { Contact } from "../../service/schemas/contact.schemas.js";

export async function showContacts(req, res, next) {
  try {
    const id = req.params.id;
    const owner = req.user.id;
    const contact = await Contact.findOne({ id, owner });

    if (contact) {
      return res.status(200).json({ contact });
    } else {
      return res.status(404).json(` Not found id: ${id}`);
    }
  } catch (err) {
    next(err);
  }
}
