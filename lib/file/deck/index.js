
const mintDeck = require('../../deck')

module.exports = mintFile

function mintFile(tree) {
  let deck
  tree.link.forEach(base => {
    switch (base.name) {
      case 'deck':
        deck = mintDeck(base)
        break
    }
  })
  return { deck }
}
