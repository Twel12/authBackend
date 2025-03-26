import {Schema, model, Document} from "mongoose";

interface UserDocument extends Document {
    username: String,
    password: String,
    email: String
}

const userSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        trim: true,
    }
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;