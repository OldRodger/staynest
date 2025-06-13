process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

import "dotenv/config";
import app from "./app.ts";
import mongoose from "mongoose";

const port = process.env.PORT || 4000;
const DB = process.env.DB_STRING || "";

const server = app.listen(port, function () {
  console.log(`\n✅ Server: http://127.0.0.1:${port}\n`);
});

mongoose
  .connect(DB)
  .then(() => {
    console.log(
      `✅ Database: Connected Successfully (${DB.split("/").at(-1)})`
    );
  })
  .catch((err) => {
    console.error("❌ Database: Connection Failed");
    console.error(err.message);
  });

process.on("unhandledRejection", (err: unknown) => {
  if (err instanceof Error) {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
  } else {
    console.log("UNHANDLED REJECTION! (NON ERROR) 💥 Shutting down...", err);
  }

  server.close(() => {
    process.exit(1);
  });
});
