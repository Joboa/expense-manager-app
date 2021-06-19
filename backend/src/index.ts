import express from 'express'
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send({ message: 'expense manager app' })
})


app.listen(port, () => console.log(`Listening on port ${port}`))
