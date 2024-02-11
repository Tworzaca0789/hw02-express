//export const updateAvatar = () => {};
import { User } from "../../service/schemas/user.schemas.js";
import path from "path";
import fs from "node:fs/promises";
import Jimp from "jimp";

const updateAvatarsDir = path.join(process.cwd(), "public/avatars");

export const updateAvatar = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(updateAvatarsDir, originalname);
  try {
    await fs.rename(temporaryName, fileName);

    Jimp.read(fileName, async (error, avatar) => {
      if (error) throw error;
      avatar.resize(250, 250).write(fileName);
    });

    const avatarURL = path.join("avatars", originalname);
    await User.findByIdAndUpdate(userId, { avatarURL });

    return res.status(200).json({
      status: "200 OK",
      "Content-Type": "application/json",
      user_id: userId,
      ResponseBody: { avatarURL: avatarURL },
      message: "Avatar loaded successfully",
    });
  } catch (error) {
    return next(error);
  }
};
