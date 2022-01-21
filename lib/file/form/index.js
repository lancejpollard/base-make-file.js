
const mintForm = require('../../form')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(tree) {
  const form = []
  const load = []
  tree.link.forEach(base => {
    switch (base.name) {
      case 'load':
        load.push(mintLoad(base))
        break
      case 'form':
        form.push(mintForm(base))
        break
    }
  })
  return {
    tree,
    load,
    form
  }
}
