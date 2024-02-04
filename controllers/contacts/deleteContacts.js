import { listContactsDB, removeContactDB } from "../../models/contacts.js";

export async function deleteContacts(req, res, next) {
  removeContactDB();
  const contacts = await listContactsDB();
  const { id } = req.params;
  const newContacts = contacts.findIndex((contact) => contact.id !== id);
  try {
    return res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    if (newContacts === -1) {
      return res.status(404).json(`Not found: ${err}`);
    }
  }
}
