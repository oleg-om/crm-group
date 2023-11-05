import mongoose, {Document} from "mongoose";
import {ERoles} from "@enums/roles.enum";

export interface RoleDocument extends Document {
    name: ERoles,
}

const Role = mongoose.model<RoleDocument>(
    "Role",
    new mongoose.Schema<RoleDocument>({
        name: String
    })
);

export default Role;
