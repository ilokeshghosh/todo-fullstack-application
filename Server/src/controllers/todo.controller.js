import mongoose from "mongoose";
import { Todo } from "../models/todos.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from '../utils/asyncHandler.js'


const addTodo = async (req, res) => {
    const { title } = req.body
    if (!title) {
        throw new Error('Title is required');
    }
    const todo = await Todo.create({ title: title })
    if (!todo) {
        throw new ApiError(400, 'Error In Add Todo')
    }

    const todos = await Todo.find();

    if (!todos) {
        throw new ApiError(400, "Error in Fetching latest Todos")
    }

    return res.status(200).json(new ApiResponse(200, todos, 'Todo Added Successfully'))
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
    const { _id: id, title,isCompleted,priority } = req.body;

    if ([id, title,priority].some(data => data.trim() === '')) {
        throw new ApiError(400, 'All Field Are Required')
    }
    const todo = await Todo.findByIdAndUpdate(id, title,isCompleted,priority)
    if (!todo) {
        throw new ApiError(402, 'ERROR In Updating Todo')
    }

    const todosList = await Todo.find();
    if (!todosList) {
        throw new ApiError(400, 'Error In Fetching TodoList')
    }
    return res.status(200).json(new ApiResponse(200, todosList, 'Todo Updated Successfully'))
})

const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(404, "ID is Required")
    }

    const todo = await Todo.deleteOne({ _id: id })

    if (!todo) {
        throw new ApiError(400, "Error in Deleting todo")
    }

    return res.status(200).json(new ApiResponse(200, todo, 'Todo Deleted Successfully'))
})

export { addTodo, getTodosList, getTodoById, updateTodo, deleteTodo }