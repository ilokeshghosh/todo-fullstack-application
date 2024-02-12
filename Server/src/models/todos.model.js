import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is Required"]
    },
    desc: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['HIGH', 'MID', 'LOW'],
        default: 'LOW'
    }
}, { timestamps: true })

export const Todo = model('Todo', todoSchema)