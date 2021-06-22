import express from 'express'
import { json, urlencoded } from 'body-parser'
export const app = express()
import "reflect-metadata";

app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).send({message: 'expense manager app'})
})

const port = 5000

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
