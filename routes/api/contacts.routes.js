import express from "express";
import auth from "../../middlewares/auth-jwt.js";
import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { createContacts } from "../../controllers/contacts/createContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContacts } from "../../controllers/contacts/updateContacts.js";
import { updateStatusContacts } from "../../controllers/contacts/updateStatusContacts.js";

const router = express.Router();

router.get("/", auth, indexContacts);

router.get("/:id", auth, showContacts);

router.post("/", auth, createContacts);

router.put("/:id", auth, updateContacts);

router.patch("/:id/favorite", auth, updateStatusContacts);

router.delete("/:id", auth, deleteContacts);

export { router };
