import 'reflect-metadata'
require('dotenv').config()
import express, { Application } from 'express'
import { json, urlencoded } from 'body-parser'

import userRouter from './routes/userRouter'
import expenseRouter from './routes/expenseRouter'
import { createConnection } from 'typeorm'
import dbconfig from './config/database'

const app: Application = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/api/v1/users', userRouter)
app.use('/api/v1/expenses', expenseRouter)

const PORT = process.env.PORT || 5000

createConnection(dbconfig)
  .then((connection) => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('Unable to connect to db', err)
    process.exit(1)
  })
