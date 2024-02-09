import { Contact } from "../../service/schemas/contact.schemas.js";

export async function deleteContacts(req, res, next) {
  const id = req.params.id;
  const owner = req.user.id;
  try {
    const result = await Contact.findOne({ id, owner });
    if (result) {
      await Contact.findByIdAndDelete({ id });

      return res.json({
        status: "success",
        code: 200,
        data: { deletedContact: result },
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
  }
}
