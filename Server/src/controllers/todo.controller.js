import mongoose from "mongoose";
import { Todo } from "../models/todos.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from '../utils/asyncHandler.js'


const addTodo = async (req, res) => {
    const { title, desc, priority } = req.body
    if ([title, desc, priority].some(data => data.trim() === '')) {
        throw new Error('All Fields Are required');
    }
    const todo = await Todo.create({ title, desc, priority })
    if (!todo) {
        throw new ApiError(400, 'Error In Add Todo')
    }

    return res.status(200).json(new ApiResponse(200, todo, 'Todo Added Successfully'))
}

const getTodosList = asyncHandler(async (_, res) => {
    const todos = await Todo.find();
    if (!todos) {
        throw new ApiError(400, "Error in Fetching Latest Todos")
    }
    return res.status(200).json(new ApiResponse(200, todos, "Todo Fetched Successfully"));
})

const getTodoById = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) {
        throw new ApiError(404, 'ID not found')
    }
    const todo = await Todo.findById(id)
    if (!todo) {
        throw new ApiError(404, "Todo Not Found")
    }


    return res.status(200).json(new ApiResponse(200, todo, 'Todo Found'))
})

const updateTodo = asyncHandler(async (req, res) => {
    const { _id, title, desc, priority } = req.body;
    if ([_id, title, desc, priority].some(data => data.trim() === '')) {
        throw new Error('All Fields Are required');
    }
    const todo = await Todo.findByIdAndUpdate(_id,
        { $set: { title, desc, priority } },
        { new: true })
    if (!todo) {
        throw new ApiError(401, 'ERROR In Updating Todo')
    }

    return res.status(200).json(new ApiResponse(200, todo, 'Todo Updated Successfully'))
})

const deleteTodo = asyncHandler(async (req, res) => {
    const id = req.query.id
    if (!id) {
        throw new ApiError(404, "ID is Required")
    }

    const todo = await Todo.deleteOne({ _id: id })

    if (!todo) {
        throw new ApiError(400, "Error in Deleting todo")
    }


    return res.status(200).json(new ApiResponse(200, todo, 'Todo Deleted Successfully'))
})

const completeTask = asyncHandler(async (req, res) => {
    const id = req.query.id;

    if (!id) {
        throw new ApiError(401, 'ID is required')
    }

    const currentTodo = await Todo.findById(id);
    if (!currentTodo) {
        throw new ApiError(404, 'Invalid ID');
    }

    const todo = await Todo.findByIdAndUpdate({ _id: id }, {
        $set: {
            isCompleted: !currentTodo.isCompleted
        }

    }, { new: true })

    if (!todo) {
        throw new ApiError(400, "Failed To Updated Data");
    }

    return res.status(200).json(new ApiResponse(200, todo, 'Task Completed'));

})

export { addTodo, getTodosList, getTodoById, updateTodo, deleteTodo, completeTask }