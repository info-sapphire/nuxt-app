const express = require('express')
const bodyParser = require('body-parser')

// init app
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

module.exports = app
