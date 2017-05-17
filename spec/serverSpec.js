const dataParser = require('../src/dataParser')
const unparsedClients = require('../data/locations.json').Clients

describe("Parse clients", () => {

  it("parses clients", () => {
    const parsedClients = dataParser.parseClients(unparsedClients)
    expect(parsedClients["Ale"]).toEqual('B4 7XG')
  })
})
