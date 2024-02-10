import { Contact } from "../../service/schemas/contact.schemas.js";

export async function deleteContacts(req, res, next) {
  try {
    const { id } = req.params;
    const { owner } = req.user;
    const result = await Contact.findOne({ _id: id, owner });
    if (result) {
      const contactDelete = await Contact.findByIdAndDelete({ _id: id });
      return res.json({
        status: "success",
        code: 200,
        data: { deletedContact: contactDelete },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
    return res.status(500).json({ message: "Serwer error" });
  }
}
