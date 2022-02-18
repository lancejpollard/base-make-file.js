
const mintSift = require('../sift')

module.exports = mintStem

function mintStem(base) {
  const name = findName(base)
  const stem = {
    form: 'stem',
    name,
    note: null,
    bond: null,
    stem: {}
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'note':
        stem.note = base
        break
      case 'bond':
        stem.bond = mintSift(base)
        break
      case 'call':
        stem.bond = mintSift(base)
        break
      case 'stem':
        const s = mintStem(base)
        stem.stem[s.name] = s
        break
    }
  })
  return stem
}

function findName(base) {
  return base.link[0].name.trim()
}
