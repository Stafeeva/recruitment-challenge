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
    var candidate = {
      name: unparsedCandidates[i].name,
      address : matrix.destination_addresses[i],
      duration: matrix.rows[0].elements[i].duration,
      distance: matrix.rows[0].elements[i].distance
     }
    parsedGoogleMatrix.push(candidate)
  }

  var sortedCandidates = parsedGoogleMatrix.sort((a, b) => {
    if (a.duration.value < b.duration.value) {
      return -1
    } else if (b.duration.value < a.duration.value) {
      return 1
    } else {
      return 0
    }
  })

  return sortedCandidates
}
