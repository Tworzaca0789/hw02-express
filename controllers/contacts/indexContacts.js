import { listContactsDB } from "../../models/contacts.js";

export async function indexContacts(req, res, next) {
  try {
    const contacts = await listContactsDB();
    return res.status(200).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json(`An error occurred:${err}`);
  }
}
