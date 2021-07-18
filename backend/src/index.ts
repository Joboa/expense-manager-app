import 'reflect-metadata'
require('dotenv').config()

import { createConnection } from 'typeorm'
import dbconfig from './config/database'
import { app } from './app'

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

export { app }
