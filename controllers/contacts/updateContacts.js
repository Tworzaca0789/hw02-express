import { schema } from "../../helpers/joiValid.js";
import { Contact } from "../../service/schemas/contact.schemas.js";

export async function updateContacts(req, res, next) {
  try {
    const id = req.params.id;
    const owner = req.user.id;
    const validBody = schema.validate(req.body);

    if (validBody.error) {
      return res.status(400).json({
        message: validBody.error.message,
      });
    }

    const contact = await Contact.findOne({
      id,
      owner,
    });

    if (contact) {
      await Contact.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      return res.json({
        status: "success",
        code: 200,
        data: { updatedContact: contact },
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
