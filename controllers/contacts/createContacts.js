import { createContactDB } from "../../models/contacts.js";
import { schema } from "../../helpers/joiValid.js";

export const createContacts = async (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  const { name, email, phone } = value;
  const owner = req.user.id;

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const contact = await createContactDB({ name, email, phone, owner });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { createdContact: contact },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
