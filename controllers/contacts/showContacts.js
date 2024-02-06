import { getContactByIdDB } from "../../models/contacts.js";

export async function showContacts(req, res, next) {
  const { id } = req.params;
  const owner = req.user.id;

  try {
    const contacts = await getContactByIdDB({ id, owner });

    const contact = contacts.filter((contact) => contact.id === parseInt(id));
    return res.status(200).json({ contact });
  } catch (err) {
    return res.status(404).json(` Not found: ${err}`);
  }
}
