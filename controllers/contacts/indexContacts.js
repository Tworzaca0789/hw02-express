import { listContactsDB } from "../../models/contacts.js";

export async function indexContacts(req, res, next) {
  try {
    const owner = req.iser.id;
    const favorite = req.query.favorite;

    const contacts = await listContactsDB({ favorite, owner });
    if (!contacts) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `not found`,
        contacts: `Not found`,
      });
    }
    return res.status(200).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json(`An error occurred:${err}`);
  }
}
