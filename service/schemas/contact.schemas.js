import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const contacts = new Schema(
  {
    name: {
      type: String,
      require: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contacts);

export default Contact;
