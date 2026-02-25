import express from 'express'
import "dotenv/config"
import { dbConnect } from './src/config/dbConnect.js'
import notesRoute from './src/routes/notesRoute.js'
import userRoute from './src/routes/userRoute.js'
import cors from "cors";

const app = express()
const port = process.env.PORT

dbConnect()
app.use(cors())
app.use(express.json())
app.use('/note', notesRoute)
app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
