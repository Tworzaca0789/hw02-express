import { User } from "../../service/schemas/user.schemas.js";

export const getCurrentUserToken = async (req, res, next) => {
  try {
    const token = req.user.token;
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({
        status: "401 Unauthorized",
        "Content-Type": "application/json",
        ResponseBody: {
          message: "Not authorized",
        },
      });
    }

    return res.status(200).json({
      status: "200 OK",
      "Content-Type": "application/json",
      ResponseBody: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).json({ message: "Server no answer" });
  }
};
