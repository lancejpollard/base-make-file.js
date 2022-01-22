
const mintTest = require('../../test')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(tree) {
  const test = []
  const load = []
  tree.link.forEach(link => {
    switch (link.name) {
      case 'load':
        load.push(mintLoad(link))
        break
      case 'test':
        test.push(mintTest(link))
        break
    }
  })
  return {
    tree,
    load,
    test
  }
}
