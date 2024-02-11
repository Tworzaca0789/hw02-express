import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { router as contactsRouter } from "./routes/api/contacts.routes.js";
import { router as usersRouter } from "./routes/api/users.routes.js";
import { setJWTStrategy } from "./config/config-jwt.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);

setJWTStrategy();

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
