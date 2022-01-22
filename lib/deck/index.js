
module.exports = mintDeck

function mintDeck(tree) {
  const road = tree.link[0].text
  if (!road.startsWith('@')) {
    throw new Error(`Invalid deck path ${road}`)
  }
  const [host, site] = road.substr(1).split('/')
  return {
    host,
    site,
  }
}
