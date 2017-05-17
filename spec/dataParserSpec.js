const dataParser = require('../src/dataParser')
const unparsedClients = require('../data/locations.json').Clients

describe("parseClients", () => {

  it("parses clients", () => {
    const parsedClients = dataParser.parseClients(unparsedClients)
    expect(parsedClients["Ale"]).toEqual('B4 7XG')
  })
})

describe("getPostcodes", () => {

  const unparsedCandidates = [{
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

  it("gets postcodes from candidates in order to send it in http request", () => {
    const destinationPostcodes = dataParser.getPostcodes(unparsedCandidates)
    expect(destinationPostcodes).toEqual("B421QZ|B691EQ")
  })
})
