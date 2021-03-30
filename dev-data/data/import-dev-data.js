const fs = require('fs')

const mongoose = require('mongoose')
const dotenv = require('dotenv')

const Tour = require('../../models/tourModel')

dotenv.config()

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data deleted!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
