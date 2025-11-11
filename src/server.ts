process.on("uncaughtException", (err: Error) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

import "dotenv/config";
import app from "./app.ts";
import mongoose from "mongoose";

const port = process.env.PORT || 4000;
const dbProtocol = process.env.MONGO_PROTOCOL;
const dbCluster = process.env.MONGO_CLUSTER;
const dbName = process.env.MONGO_DATABASE;
const dbUser = process.env.MONGO_USERNAME;
const dbPassword = process.env.MONGO_PASSWORD;
const authSource = process.env.MONGO_AUTH_SOURCE;


const authString = authSource ? `authSource=${authSource}` : ""
const DB = `${dbProtocol}://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?${authString}`;

const server = app.listen(port, function () {
    console.log(`\n✅ Server: http://127.0.0.1:${port}\n`);
});

mongoose
    .connect(DB)
    .then(() => {
        console.log(
            `✅ Database: Connected Successfully`
        );
    })
    .catch((err: Error) => {
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
