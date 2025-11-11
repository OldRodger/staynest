import "dotenv/config";
import {connect} from "mongoose";
import path, {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import fs from "node:fs";
import User from "../user/user.model.ts";
import Hotel from "../hotel/hotel.model.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbProtocol = process.env.MONGO_PROTOCOL;
const dbCluster = process.env.MONGO_CLUSTER;
const dbName = process.env.MONGO_DATABASE;
const dbUser = process.env.MONGO_USERNAME;
const dbPassword = process.env.MONGO_PASSWORD;
const authSource = process.env.MONGO_AUTH_SOURCE;


const authString = authSource ? `authSource=${authSource}` : "";
const DB = `${dbProtocol}://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?${authString}`;
connect(DB)
    .then(() => console.log(`✅ Database: Connected Successfully`))
    .catch((err: Error) => {
        console.error("❌ Database: Connection Failed");
        console.error(err.message);
    });

const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
);
const hotels = JSON.parse(
    fs.readFileSync(path.join(__dirname, "hotels.json"), "utf-8")
);

async function importData() {
    try {
        await User.create(users);
        await Hotel.create(hotels);
        console.log("🎉 Database seeded successfuly");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

async function deleteData() {
    try {
        await User.deleteMany();
        await Hotel.deleteMany();
        console.log("⛔️ Database truncated successfuly");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

const command = process.argv.at(-1)?.toLowerCase();

if (command === "--seed") {
    importData();
} else if (command === "--truncate") {
    deleteData();
}
