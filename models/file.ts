import { Schema, model, models } from "mongoose"

const FileSchema = new Schema({

    type: {
        type: String,
        default: 'file' // file, image, txt, zip, post
    },
    content: {
        type: String,
        default: '',
        required: [false]
    },
    uid: {
        type: String,
        required: [true, 'Author is required!']
    },
    view: {
        type: Number,
        default: 0,
    },

    creatTime: {
        type: String,
        default: new Date().getTime().toString()
    }
})

const File = models.File ||  model('File', FileSchema)

export default File