import {
  User,
  registerUserSchema,
} from "../../service/schemas/user.schemas.js";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import send from "../../config/nodemailer.config.js";

export async function registerNewUser(req, res, next) {
  const validBody = registerUserSchema.validate(req.body);
  if (validBody.error) {
    return res.status(400).json({
      status: "400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: validBody.error,
    });
  }
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();
    if (user) {
      return res.status(409).json({
        status: "409 conflict",
        "Content-Type": "application/json",
        ResponseBody: { message: "Email in use" },
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const sendEmail = await send({ email, verificationToken });

    if (!sendEmail) {
      return res.status(500).json({
        status: "error",
        "Content-Type": "application/json",
        ResponseBody: { message: "Server error" },
      });
    }

    const newUser = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verify: false,
      verificationToken,
    });

    return res.status(201).json({
      status: "201 created",
      "Content-Type": "application/json",
      message: "user created",
      ResponseBody: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}
