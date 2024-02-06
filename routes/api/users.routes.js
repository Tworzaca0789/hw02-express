import express from "express";

import { createNewUser } from "../../controllers/users/createNewUser.js";
import { getCurrentUserToken } from "../../controllers/users/getCurrentUserToken.js";
import { loginUser } from "../../controllers/users/loginUser.js";
import { logoutUser } from "../../controllers/users/logoutUser.js";

const router = express.Router();

router.post("/signup", createNewUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/current", getCurrentUserToken);

export { router };
