import axios from 'axios';

const todosApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

class ApiService {
    async addTodo(data) {
        try {
            const response = await todosApi.post('/add-todo', data)
            return response.data;
        } catch (error) {
            throw error
        }
    }

    async getTodosList() {
        try {
            return (await todosApi.get('/get-todos')).data.data
        } catch (error) {
            throw error
        }
    }

    async updateTodo(data) {
        try {
            const response = await todosApi.patch('/update-todo', data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteTodo(id) {
        try {
            const response = await todosApi.delete(`/delete-todo?id=${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async completeTask(id){
        try {
            const response = await todosApi.patch(`/complete-todo?id=${id}`);
            return response.data;
        } catch (error) {
            throw error
        }
    }

}

export default new ApiService;