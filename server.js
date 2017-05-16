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

const googleMapAPIUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=B47XG&destinations=B421QZ|B691EQ&key=" + APIKey
var matrix = null

request(googleMapAPIUrl, function (error, response, body) {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  matrix = JSON.parse(body);
  console.log(matrix)
});

app.get('/clients/:clientName', (req, res) => {
  const clientName = req.params.clientName
  res.send(printMatrixAsHTML(clientName, matrix))
})

app.listen(3000, () => {
  console.log('Go to  localhost:3000!')
})

printMatrixAsHTML = (clientName, matrix) => {
  var printHTML = "<h3>" + clientName + "</h3>" + "<p>" + matrix.destination_addresses + "</p>"
  const distances = matrix.rows[0].elements
  distances.forEach = (distance) => {
    printHTML = printHTML + distance.distance.text + ", time: " + distance.duration.text
  }
  return printHTML;
}
