import { User } from "../../service/schemas/user.schemas.js";

export const verificationUserToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({
        status: "404 Not Found",
        ResponseBody: {
          message: "User not found",
        },
      });
    }

    const resultVerification = await User.findOneAndUpdate(
      { verificationToken },
      { verify: true, verificationToken: null },
      { new: true }
    );

    return res.status(200).json({
      status: "200 OK",
      ResponseBody: {
        message: "Verification successful",
        verify: resultVerification.verify,
        verificationToken: result.verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
