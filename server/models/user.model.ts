import mongoose, {Document} from "mongoose";

export interface UserDocument extends Document {
    username: string,
    email: string,
    password: string,
    roles: string[],
    isVerified: boolean
}

const User = mongoose.model<UserDocument>(
    "User",
    new mongoose.Schema<UserDocument>({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        isVerified:{type: Boolean, default: false}
    })
);

export default User;
