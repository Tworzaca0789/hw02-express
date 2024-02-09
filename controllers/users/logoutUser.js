import { User } from "../../service/schemas/user.schemas.js";

export async function logoutUser(req, res, next) {
  try {
    const { id } = req.user;

    if (!req.user || !req.user.token) {
      return res.status(401).json({
        status: "401",
        "Content-Type": "application/json",
        ResponseBody: { message: "Not authorized" },
      });
    }
    await User.findByIdAndUpdate({ _id: id }, { token: null }, { new: true });
    return res.status(204).json({
      status: "204 No Content",
    });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
}
