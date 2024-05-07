import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: String;
    password: String;
}

const UsersSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model<IUser>('Users', UsersSchema);
