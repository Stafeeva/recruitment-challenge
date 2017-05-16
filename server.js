const express = require('express')
const app = express()
const fs = require('fs')
const APIKey = process.env.GOOGLE_MAPS_API_KEY
const request = require('request')
const handlebars = require('handlebars')

const candidates = require('./data/candidates.json')
const clients = require('./data/locations.json')

const clientsView = handlebars.compile(fs.readFileSync('./views/clients.html', 'utf8'))

var matrix = null

app.get('/', (req, res) => {
  res.send('Homepage...')
})

app.get('/clients', (req, res) => {
  const data = {
    title: "Clients",
    clients: clients.Clients
  }
  res.send(clientsView(data));//printListOfClientsAsHTML());
})

app.get('/clients/:clientName', (req, res) => {
  const clientName = req.params.clientName
  request(createGoogleMapAPIUrl(APIKey, clientName), (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    matrix = JSON.parse(body);
    console.log("inside request!")
    console.log(matrix)
    res.send(printMatrixAsHTML(clientName, matrix))
  });

})

app.listen(3000, () => {
  console.log('Go to  localhost:3000!')
})

createGoogleMapAPIUrl = (APIKey, clientName) => {
  var originPostcode = ''
  clients.Clients.forEach((client) => {
    if (client.name == clientName) {
      originPostcode = client.postcode.replace(" ", "")
    }
  })
  var destinationPostcodes = []
  for (var i in candidates.Candidates) {
    destinationPostcodes.push(candidates.Candidates[i].postcode.replace(" ", ""))
  }
  console.log(destinationPostcodes.slice(0,3).join('|'))
  return "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+ originPostcode + "&destinations=" + destinationPostcodes.slice(0,3).join('|')+ "&key=" + APIKey
}

printMatrixAsHTML = (clientName, matrix) => {
  console.log("inside printMatrixAsHTML!")
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
