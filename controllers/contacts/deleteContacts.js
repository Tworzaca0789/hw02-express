import { removeContactDB } from "../../models/contacts.js";

export async function deleteContacts(req, res, next) {
  const { id } = req.params;
  try {
    const result = await removeContactDB({ id });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { deletedContact: result },
      });
    } else {
      res.status(404).json({
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
