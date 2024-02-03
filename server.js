import { app } from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";

const uriDb = process.env.DATABASE_URL;
const connection = mongoose.connect(uriDb);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
