import Contact from "../service/schemas/contact.schemas.js";

const listContactsDB = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactByIdDB = async (id, owner) => {
  const contact = await Contact.findOne({ _id: id, owner });
  return contact;
};

const createContactDB = async ({ name, email, phone, favorite, owner }) => {
  const contact = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner,
  });
  contact.save();
  return contact;
};

const updateContactDB = async ({ id, name, email, phone, favorite, owner }) => {
  const contact = await Contact.findOne({ _id: id, owner });
  if (!contact) {
    return null;
  }
  return await Contact.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        email,
        phone,
        favorite,
        owner,
      },
    },
    { new: true }
  );
};

const removeContactDB = async ({ id, owner }) => {
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    return null;
  }
  return await Contact.findByIdAndDelete({ _id: id });
};

export {
  listContactsDB,
  getContactByIdDB,
  removeContactDB,
  createContactDB,
  updateContactDB,
};
