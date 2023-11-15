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
    tag: {
        type: String,
        default: '' // front-end, back-end, react, angular, vue, python
    },
    content: {
        type: String,
        default: '',
        required: [false]
    },
    open: {
        type: Number,
        default: 1 //  1:is public ,0: is secret and only user can visit
    },
    secret: {
        type: Number,
        default: 0 //  1:is secret ,0: is normal
    },
    uid: {
        type: String,
        required: [true, 'Author is required!']
    },
    view: {
        type: Number,
        default: 0,
    },
    createTime: {
        type: String,
        default: new Date().getTime().toString()
    },
    updateTime: {
        type: String,
        default: new Date().getTime().toString()
    }
})

const Post = models.Post ||  model('Post', PostSchema)

export default Post