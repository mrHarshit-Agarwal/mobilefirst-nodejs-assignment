import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()
const app = express()

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./frontend.html"));
    
    });

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))