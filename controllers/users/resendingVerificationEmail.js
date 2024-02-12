import {
  User,
  userVerificationSchema,
} from "../../service/schemas/user.schemas.js";
import send from "../../config/nodemailer.config.js";
export const resendingVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const validationEmail = userVerificationSchema.validate(req.body);

    if (validationEmail.error) {
      return res.status(400).json({
        status: "400",
        "Contet-Type": "application/json",
        RequestBody: {
          message: "missing required field email",
        },
        ResponseBody: validationEmail.error,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "404 Not found",
        "Content-Type": "application/json",
        ResponseBody: { message: "Not found" },
      });
    }

    const { verify, verificationToken } = user;

    if (verify === true) {
      return res.status(400).json({
        status: "400 Bad request ",
        "Content-Type": "application/json",
        ResponseBody: { message: "Verification has already been passed" },
      });
    }

    const sendEmail = await send({ email, verificationToken });

    if (!sendEmail) {
      return res.status(500).json({
        status: "500",
        "Content-Type": "application/json",
        ResponseBody: { message: "Server error" },
      });
    }

    res.status(200).json({
      status: "200 OK",
      "Content-Type": "application/json",
      ResponseBody: { message: "Verification email sent" },
    });
  } catch (err) {
    next(err);
  }
};
