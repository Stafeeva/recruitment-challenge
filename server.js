const express = require('express')
const app = express()
const fs = require('fs')
const APIKey = process.env.GOOGLE_MAPS_API_KEY
const request = require('request')
const handlebars = require('handlebars')

const candidates = require('./data/candidates.json').Candidates.slice(0,7)
const clients = require('./data/locations.json').Clients
const dataParser = require('./src/dataParser')

const clientsView = handlebars.compile(fs.readFileSync('./views/clients.html', 'utf8'))

const parsedClients = dataParser.parseClients(clients)
const destinationPostcodes = dataParser.getPostcodes(candidates)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Homepage...')
})

app.get('/clients', (req, res) => {
  const data = {
    title: "Clients",
    clients: clients
  }
  res.send(clientsView(data))
})

app.get('/clients/:clientName', (req, res) => {
  const clientName = req.params.clientName
  request(createGoogleMapAPIUrl(APIKey, clientName), (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    matrix = JSON.parse(body);
    res.send(printMatrixAsHTML(clientName, matrix))
  });

})

app.listen(3000, () => {
  console.log('Go to localhost:3000!')
})

const createGoogleMapAPIUrl = (APIKey, clientName) => {
  var originPostcode = parsedClients[clientName]

  return "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+ originPostcode + "&destinations=" + destinationPostcodes + "&key=" + APIKey
}

const printMatrixAsHTML = (clientName, matrix) => {
  console.log(matrix)
  var printHTML = "<h3>" + clientName + "</h3>" + "<p>" + matrix.destination_addresses + "</p>"
  const distances = matrix.rows[0].elements
  console.log(distances)
  distances.forEach((distance) => {
    console.log(distance.distance.text)
    printHTML = printHTML + distance.distance.text + ", time: " + distance.duration.text
  })
  return printHTML;
}
