module.exports.parseClients = (unparsedClients) => {

  var clientsParsed = []

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

module.exports.parseGoogleMatrix = (unparsedCandidates, matrix) => {

  var parsedGoogleMatrix = []

  for (var i in unparsedCandidates) {
    var candidate = {}
    candidate[unparsedCandidates[i].name] = {
      address : matrix.destination_addresses[i],
      duration: matrix.rows[0].elements[i].duration.text,
      distance: matrix.rows[0].elements[i].distance.text
     }
    parsedGoogleMatrix.push(candidate)
  }

  return parsedGoogleMatrix
}
