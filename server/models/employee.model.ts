import mongoose, {Document, ObjectId} from "mongoose";

export interface EmployeeDocument extends Document {
    name: string,
    surname: string,
    percent?: number,
    roles: string[],
    created_at: Date,
    userId: ObjectId
}


const Employee = mongoose.model<EmployeeDocument>(
    "Employee",
    new mongoose.Schema<EmployeeDocument>({
        name: {type: String, required: true},
        surname: {type: String, required: true},
        percent: Number,
        roles: [
            {
                type: mongoose.Schema.Types.String,
                ref: "Role"
            }
        ],
        created_at: {
            type: Date,
            default: Date.now
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

export default Employee;
