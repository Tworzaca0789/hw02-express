import Contact from "../service/schemas/contact.schemas.js";

const listContactsDB = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactByIdDB = async (id) => {
  const contact = await Contact.findOne({ _id: id });
  return contact;
};

const createContactDB = async (name, email, phone, favorite) => {
  const contact = await Contact.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  });
  contact.save();
  return contact;
};

const updateContactDB = async ({ id, name, email, phone, favorite }) => {
  await Contact.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favorite: req.body.favorite,
      },
    },
    { new: true }
  );

  const contact = await Contact.findById(id);
  return contact;
};

const removeContactDB = async (id) => {
  const result = await Contact.findByIdAndDelete({ _id: id });
  return result;
};

export {
  listContactsDB,
  getContactByIdDB,
  removeContactDB,
  createContactDB,
  updateContactDB,
};
