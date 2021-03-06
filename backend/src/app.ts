import 'reflect-metadata'
require('dotenv').config()
import express, { Application } from 'express'
import { json, urlencoded } from 'body-parser'

import { signup, signin, authenticateToken } from './utils/auth'
import userRouter from './routes/userRouter'
import expenseRouter from './routes/expenseRouter'

const app: Application = express()

app.use(json())
app.use(urlencoded({ extended: true }))

app.post('/signup', signup)
app.post('/signin', signin)

// app.use('/api/v1', authenticateToken)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/expenses', expenseRouter)

export { app }
