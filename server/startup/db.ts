import {initRoles} from "@startup/roles";
import mongoose from 'mongoose';

export const initDatabase = () => {
    const db = process.env.MONGO_URL  || "mongodb://localhost:27017/test"

    mongoose
        .connect(db)
        .then(() => {
            console.log("Successfully connect to MongoDB.");
            initRoles()
        })
        .catch((err: Error) => {
            console.error("Connection error", err);
            process.exit();
        });
}
