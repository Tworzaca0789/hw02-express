import {
  User,
  registerUserSchema,
} from "../../service/schemas/user.schemas.js";
import bcrypt from "bcryptjs";

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

    const newUser = await User.create({
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      status: "201 created",
      "Content-Type": "application/json",
      message: "user created",
      ResponseBody: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
    return res.status(500).json({
      status: "500",
      message: "Server error",
    });
  }
}
