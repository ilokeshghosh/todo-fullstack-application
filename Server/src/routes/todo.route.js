import { Router } from "express";
import { addTodo, getTodosList,getTodoById,updateTodo,deleteTodo } from "../controllers/todo.controller.js";
const router = Router();

router.route('/add-todo').post(addTodo)
router.route('/get-todos').get(getTodosList);
router.route('/get-todo/:id').get(getTodoById)
router.route('/update-todo').patch(updateTodo);
router.route('/delete-todo/:id').delete(deleteTodo);

export default router