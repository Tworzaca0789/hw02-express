import { Contact } from "../../service/schemas/contact.schemas.js";

export async function indexContacts(req, res, next) {
  try {
    const owner = req.user.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const favorite = req.query.favorite;

    const result = await Contact.find({ owner, favorite }, "", {
      page,
      limit,
    });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
    return res.status(500).json(`An error occurred:${err}`);
  }
}
