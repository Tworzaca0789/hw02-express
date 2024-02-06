import { schema } from "../../helpers/joiValid.js";
import { updateContactDB } from "../../models/contacts.js";

export const updateStatusContacts = async (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  const { id } = req.params;
  const { favorite } = value;
  const owner = req.user.id;

  if (error) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const result = await updateContactDB({ id, favorite, owner });
    if (result) {
      res.json({
        status: "Success",
        code: 200,
        data: { updatedContact: result },
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
};
