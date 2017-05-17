module.exports.parseClients = (unparsedClients) => {

  var clientsParsed = {}

  unparsedClients.forEach((client) => {
    clientsParsed[client.name] = client.postcode
  })

  return clientsParsed
}

module.exports.getPostcodes = (unparsedCandidates) => {

  var destinationPostcodes = []

  for (var i in unparsedCandidates) {
    destinationPostcodes.push(unparsedCandidates[i].postcode.replace(" ", ""))
  }

  return destinationPostcodes.join("|")
}
