import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json({ limit: '16kb' }))
// app.use(express.urlencoded({extended:true, limit:'16kb'}))

// import routes
import todoRouter from './routes/todo.route.js'
app.use('/api/v1/todos', todoRouter)
export { app }