import express from 'express'
import mongoose from 'mongoose'

import 'express-async-errors'
import { CustomError } from './helpers/error-handler.js'
import authRoutes from './routes/user.routes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// routing
app.use('/api/v1/auth', authRoutes)

// error

app.all('*', (req, res) => {
  return res.status(404).json({
    statusCode: 404,
    message: `${req.originalUrl} not found`,
  })
})

// custom error handling
app.use((error, _req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(error.serializeErrors())
  }
  next()
})

mongoose
  .connect('mongodb://127.0.0.1:27017/fourtofive')
  .then(() => {
    console.log('Connected to database')
  })
  .catch(err => console.log(err.message))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

console.log(process.env.MAIL_HOST)
