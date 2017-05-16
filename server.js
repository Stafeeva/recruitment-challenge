const express = require('express')
const app = express()
const fs = require('fs')


const candidates = require('./data/candidates.json')
// console.log(candidates.Candidates)
const clients = require('./data/locations.json')


app.get('/', (req, res) => {
  res.send('Homepage...')
})

app.get('/clients', (req, res) => {
  const allClients = clients.Clients
  const printHTML = []
  allClients.forEach( (name) => {
    printHTML.push('<h3>' + name.name + '</h3>');
  })
  console.log(printHTML.join(''))
  res.send(printHTML.join(''));
})

app.get('/clients/:clientName', (req, res) => {
  // console.log('List of candidates...')
  // console.log(req.params)
  const clientName = req.params.clientName
  res.send('a single client: ' + clientName)
})

app.listen(3000, () => {
  console.log('Go to  localhost:3000!')
})
