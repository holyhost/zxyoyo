import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!']
    },

    name: {
        type: String,
        required: [true, 'Username is required!']
    },
    role: {
        type: String,
        default: 'user'
    },
    image: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    }
})

const User = models.User ||  model('User', UserSchema)

export default User