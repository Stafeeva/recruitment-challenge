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
  allClients.forEach((client) => {
    printHTML.push("<h3><a href='/clients/" + client.name + "'>" + client.name + "</a></h3>");
  })
  res.send(printHTML.join(''));
})

app.get('/clients/:clientName', (req, res) => {
  // console.log('List of candidates...')
  // console.log(req.params)
  const clientName = req.params.clientName
  const allCandidates = candidates.Candidates
  const printHTML = []
  allCandidates.forEach((candidate) => {
    console.log(candidate)
    printHTML.push("<h4>" + candidate.name + ", postcode:" + candidate.postcode + "</h4>");
  })
  res.send('Client name: ' + clientName + printHTML.join(''))
})

app.listen(3000, () => {
  console.log('Go to  localhost:3000!')
})
