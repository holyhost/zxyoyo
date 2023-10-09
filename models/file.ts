import { Schema, model, models } from "mongoose"

const FileSchema = new Schema({

    type: {
        type: String,
        default: 'file' // file, image, txt, zip, post
    },
    name: {
        type: String,
        required: [true, 'File name is required!']
    },
    orname: {
        type: String,
        default: '' // file, image, txt, zip, post
    },
    size: {
        type: Number,
        default: 0 // file, image, txt, zip, post
    },
    open: {
        type: Number,
        default: 1 //  1:is public ,0: is secret and only user can visit
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

const FileBean = models.File ||  model('File', FileSchema)

export default FileBean