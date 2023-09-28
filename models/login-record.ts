import { Schema, model, models } from "mongoose"

const LoginRecordSchema = new Schema({
    uid: {
        type: String,
        required: [true, 'Uid is required!']
    },

    token: {
        type: String,
        required: [true, 'Token is required!']
    },
    ctime: {
        type: String,
        required: [true, 'Current time is required!']
    },
    message: {
        type: String,
        default: 'Login successfully.'
    }
})

const LoginRecord = models.LoginRecord ||  model('LoginRecord', LoginRecordSchema)

export default LoginRecord