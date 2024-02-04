import express from "express";

import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { createContacts } from "../../controllers/contacts/createContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContacts } from "../../controllers/contacts/updateContacts.js";
import { updateStatusContacts } from "../../controllers/contacts/updateStatusContacts.js";

const router = express.Router();

router.get("/", indexContacts);

router.get("/:id", showContacts);

router.post("/", createContacts);

router.put("/:id", updateContacts);

router.patch("/:id/favorite", updateStatusContacts);

router.delete("/:id", deleteContacts);

export { router };
