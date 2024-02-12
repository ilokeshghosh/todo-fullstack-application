import { app } from "./app.js";
import dotenv from 'dotenv'
import { connectDB } from "./db/index.js";

dotenv.config({
    path: './env'
})

const port = process.env.PORT || 8000

connectDB().then(() => {
    app.on('error', (error) => {
        console.log('ERROR WHILE RUNNING APP', error)
    })

    app.listen(port, () => {
        console.log(`SERVER IS RUNNING AT :: http://localhost:${port}`);
    })
})
    .catch(error => {
        console.log('ERROR IN DB CONNECTION ', error)
    })