module.exports.parseClients = (unparsedClients) => {

  var clientsParsed = {}

  unparsedClients.forEach((client) => {
    clientsParsed[client.name] = client.postcode
  })

  return clientsParsed
}
