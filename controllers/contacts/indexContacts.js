import { listContactsDB } from "../../service/contacts.service.js";

export async function indexContacts(req, res, next) {
  try {
    const owner = req.user.id;
    const favorite = req.query.favorite;

    const contacts = await listContactsDB({ owner, favorite });
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
    console.log(err);
    return res.status(500).json(`An error occurred:${err}`);
  }
}
