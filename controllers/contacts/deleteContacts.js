import { removeContactDB } from "../../service/contacts.service.js";

export async function deleteContacts(req, res, next) {
  const { id } = req.params;
  const owner = req.user.id;

  try {
    const result = await removeContactDB({ id, owner });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { deletedContact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 40,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
}
