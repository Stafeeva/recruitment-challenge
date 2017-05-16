const express = require('express')
const app = express()
const fs = require('fs')
const APIKey = process.env.GOOGLE_MAPS_API_KEY
const request = require('request')

const candidates = require('./data/candidates.json')
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

const googleMapAPIUrl = 'http://google.com'
var matrix = null

request(googleMapAPIUrl, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  matrix = body;
});

app.get('/clients/:clientName', (req, res) => {
  const clientName = req.params.clientName
  const allCandidates = candidates.Candidates
  const printHTML = []
  // allCandidates.forEach((candidate) => {
  //   printHTML.push("<h4>" + candidate.name + ", postcode: " + candidate.postcode + "</h4>");
  // })
  // res.send('Client name: ' + clientName + printHTML.join(''))
  res.send(matrix)
})

app.listen(3000, () => {
  console.log('Go to  localhost:3000!')
})
