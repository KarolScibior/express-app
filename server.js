const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(err.name, err.message)
})

dotenv.config()

const app = require('./app')

const port = process.env.PORT || 3000
const db = process.env.DATABASE_URI

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected 🥬')
  })

const server = app.listen(port, () => {
  console.log(`App running on port ${port}... 🔥`)
})

process.on('unhandledRejection', err => {
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION! Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})
