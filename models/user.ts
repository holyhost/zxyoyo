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
    keys: {
        type: String,
        default: 'zxyoyo'
    },
    image: {
        type: String,
        default: 'icon.png'
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    }
})

const User = models.User ||  model('User', UserSchema)

export default User