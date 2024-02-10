import { favoriteSchema } from "../../helpers/joiValid.js";
import { Contact } from "../../service/schemas/contact.schemas.js";

export async function updateStatusContacts(req, res, next) {
  try {
    const { id } = req.params;
    const validBody = favoriteSchema.validate(req.body);

    if (validBody.error) {
      return res.status(400).json({
        message: "missing field favorite",
        error: validBody.error,
      });
    }

    const result = await Contact.findOne({ _id: id });
    if (result) {
      const resultUpdateStatus = await Contact.findByIdAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
        }
      );
      return res.json({
        status: "Success",
        code: 200,
        data: { updatedContact: resultUpdateStatus },
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
