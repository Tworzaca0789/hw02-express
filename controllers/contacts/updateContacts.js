import { schema } from "../../helpers/joiValid.js";
import { updateContactDB } from "../../models/contacts.js";

export async function updateContacts(req, res, next) {
  const { value, error } = schema.validate(req.body);
  const { name, email, phone } = value;
  const { id } = req.params;
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const contact = await updateContactDB({ id, name, email, phone });
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: { updatedContact: contact },
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
