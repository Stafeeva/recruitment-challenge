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
  res.redirect('/clients')
})

app.get('/clients', (req, res) => {
  res.send(clientsView({
    title: "Clients",
    clients: clients
  }))
})

app.get('/clients/:clientName', (req, res) => {
  const clientName = req.params.clientName
  const url = createGoogleMapAPIUrl(APIKey, parsedClients[clientName])
  request(url, (error, response, body) => {
    res.send(candidatesView({
      title: "Candidates",
      candidates: dataParser.parseGoogleMatrix(candidates, JSON.parse(body))
    }))
  })
})

app.listen(3000, () => {
  console.log('Go to localhost:3000!')
})

const createGoogleMapAPIUrl = (APIKey, originPostcode) => {
  return "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+ originPostcode + "&destinations=" + destinationPostcodes + "&key=" + APIKey
}
