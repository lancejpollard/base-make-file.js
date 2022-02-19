
const mintLace = require('../../lace')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(tree) {
  const lace = {}
  const load = []
  tree.link.forEach(base => {
    switch (base.name) {
      case 'load':
        load.push(mintLoad(base))
        break
      case 'lace':
        const l = mintLace(base)
        lace[l.name] = l
        break
    }
  })
  return {
    tree,
    load,
    lace
  }
}
