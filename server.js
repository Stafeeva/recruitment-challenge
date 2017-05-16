const express = require('express')
const app = express()
const fs = require('fs')


const candidates = require('./data/candidates.json')
console.log(candidates.Candidates)
const clients = require('./data/locations.json')
console.log(clients.Clients)


app.get('/', function (req, res) {
  res.send('Homepage...')
})

app.get('/clients', function (req, res) {
  res.send('List of clients....')
})

app.get('/clients/{{clientName}}', function (req, res) {
  res.send('List of candidates....')
})

app.listen(3000, function () {
  console.log('Go to  localhost:3000!')
})
