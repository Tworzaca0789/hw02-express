import express from "express";
import auth from "../../middlewares/auth-jwt.js";

import { getCurrentUserToken } from "../../controllers/users/getCurrentUserToken.js";
import { loginUser } from "../../controllers/users/loginUser.js";
import { logoutUser } from "../../controllers/users/logoutUser.js";
import { registerNewUser } from "../../controllers/users/registerNewUser.js";
import { updateSubscription } from "../../controllers/users/updateSubscription.js";
import { uploadStorage } from "../../middlewares/uploadsMiddleware.js";
import { updateAvatar } from "../../controllers/users/updateAvatar.js";
import { verificationUserToken } from "../../controllers/users/verificationUserToken.js";
import { resendingVerificationEmail } from "../../controllers/users/resendingVerificationEmail.js";

const router = express.Router();

router.post("/signup", registerNewUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);
router.get("/current", auth, getCurrentUserToken);
router.patch("/", auth, updateSubscription);
router.patch("/avatars", auth, uploadStorage.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verificationUserToken);
router.post("/verify/", resendingVerificationEmail);

export { router };
