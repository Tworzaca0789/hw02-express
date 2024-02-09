import { Schema, model } from "mongoose";
import Joi from "joi";

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

export const registerUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 3 }).required(),
  password: Joi.string().min(7).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 3 }).required(),
  password: Joi.string().min(7).required(),
});

export const subscriptionUserSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const User = model("user", userSchema);
