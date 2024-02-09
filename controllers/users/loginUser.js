import { User, loginUserSchema } from "../../service/schemas/user.schemas.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function loginUser(req, res, next) {
  const validBody = loginUserSchema.validate(req.body);
  if (validBody.error) {
    return res.status(400).json({
      status: "400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: validBody.error,
    });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !passwordCorrect) {
      return res.status(401).json({
        status: "401",
        ResponseBody: { message: "Incorrect login or password" },
      });
    }

    const payload = {
      id: user._id,
    };

    const SECRET = process.env.SECRET_JWT;
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    return res.json({
      status: "200 OK",
      "Content-Type": "application/json",
      ResponseBody: {
        token: token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
}
