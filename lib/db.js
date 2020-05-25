'use strict'

const mongoose = require('mongoose')
const {
  DB_USER,
  DB_PASSWD,
} = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@cluster0-l7etu.mongodb.net/test?retryWrites=true&w=majority`

let connection
async function connectDB() {
  if (connection) return connection

  let client
  try {
    client = await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    connection = client.connection
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB
