import { Contact } from "../../service/schemas/contact.schemas.js";

export async function indexContacts(req, res, next) {
  try {
    const owner = req.user;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const favorite = req.query.favorite;

    const filter = favorite ? { favorite } : [];
    const skip = page * limit - limit;

    const result = await Contact.find({ owner, ...filter }, "", {
      skip,
      limit,
    });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
