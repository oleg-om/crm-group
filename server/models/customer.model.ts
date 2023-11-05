import mongoose, {Document, ObjectId} from "mongoose";

export interface CustomerDocument extends Document {
    name: string,
    surname: string,
    phone: number,
    car: {},
    created_at: Date,
    userId: ObjectId
}

const Customer = mongoose.model<CustomerDocument>(
    "Customer",
    new mongoose.Schema<CustomerDocument>({
        name: {type: String, required: true},
        surname: {type: String, required: false},
        phone: {
            type: Number, required: true
        },
        car: {
            type: Object
        },
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

export default Customer;
