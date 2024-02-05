import { app } from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

const connection = mongoose.connect(DATABASE_URL);

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful: ${PORT}`);
    });
  })
  .catch(
    (err) => console.log(`Database not connected: ${err.message}`),
    process.exit(1)
  );
