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
const candidatesView = handlebars.compile(fs.readFileSync('./views/candidates.html', 'utf8'))

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
    console.log(body)
    parsedMatrix = dataParser.parseGoogleMatrix(candidates, JSON.parse(body));
    const data = {
      title: "Candidates",
      candidates: parsedMatrix
    }
    console.log("matrix")
    console.log(parsedMatrix)
    res.send(candidatesView(data))
  });

})

app.listen(3000, () => {
  console.log('Go to localhost:3000!')
})

const createGoogleMapAPIUrl = (APIKey, clientName) => {
  var originPostcode = parsedClients[clientName]

  return "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+ originPostcode + "&destinations=" + destinationPostcodes + "&key=" + APIKey
}
