import { Schema, model, models } from "mongoose"

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },

    type: {
        type: String,
        default: 'note' // note , md, file 
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
    }
})

const Post = models.Post ||  model('Post', PostSchema)

export default Post