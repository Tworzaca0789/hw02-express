import { Schema, model } from "mongoose";

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set e-mail address for contact"],
  },
  phone: {
    type: String,
    required: [true, "Set phone number for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Contact = model("contact", contactsSchema);
