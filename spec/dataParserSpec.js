const dataParser = require('../src/dataParser')
const unparsedClients = require('../data/locations.json').Clients

const dummyCandidates = [{
  "name": "Agnezka Seize-Soinxante-Quatre",
  "postcode": "B42 1QZ",
  "modeOfTransport": {
    "type": "bike",
    "speed": 15.5
  }
},
{
  "name": "Pavel Smirnoff",
  "postcode": "B69 1EQ",
  "modeOfTransport": {
    "type": "bike",
    "speed": 15.5
  }
}]

const dummyMatrix = {
   "destination_addresses" : [
      "Rocky Ln, Birmingham B42 1QZ, UK",
      "Oldbury B69 1EQ, UK"
   ],
   "origin_addresses" : [ "Curzon St, Birmingham B4 7XG, UK" ],
   "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "6.7 km",
                  "value" : 6655
               },
               "duration" : {
                  "text" : "12 mins",
                  "value" : 739
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "22.9 km",
                  "value" : 22900
               },
               "duration" : {
                  "text" : "23 mins",
                  "value" : 1372
               },
               "status" : "OK"
            }
         ]
      }
   ],
   "status" : "OK"
}


describe("parseClients", () => {

  it("parses clients", () => {
    const parsedClients = dataParser.parseClients(unparsedClients)
    expect(parsedClients["Ale"]).toEqual('B4 7XG')
  })
})

describe("getPostcodes", () => {

  it("gets postcodes from candidates in order to send it in http request", () => {
    const destinationPostcodes = dataParser.getPostcodes(dummyCandidates)
    expect(destinationPostcodes).toEqual("B421QZ|B691EQ")
  })
})

describe("parseGoogleMatrix", () => {

  it("creates an object for every candidate", () => {
    const parsedGoogleMatrix = dataParser.parseGoogleMatrix(dummyCandidates, dummyMatrix)
    const perfectOutput = {
      name : 'Agnezka Seize-Soinxante-Quatre',
      address : 'Rocky Ln, Birmingham B42 1QZ, UK',
      duration : { text : '12 mins', value : 739 },
      distance : { text : '6.7 km', value : 6655 }
    }
    expect(parsedGoogleMatrix[0]).toEqual(perfectOutput)
  })
})
