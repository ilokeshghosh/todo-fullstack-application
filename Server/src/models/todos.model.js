import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default:''
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        // enum: ['HIGH', 'MID', 'LOW'],
        default: 'LOW'
    }
}, { timestamps: true })

export const Todo = model('Todo', todoSchema)