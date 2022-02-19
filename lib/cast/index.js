
const { findName } = require('../name')
const mintLink = require('../link')

module.exports = mintCast

function mintCast(base) {
  const name = findName(base)
  const cast = {
    form: 'cast',
    name,
    link: [],
    head: [],
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'link':
        cast.link.push(mintLink(base))
        break
      case 'head':
        cast.head.push(mintLink(base))
        break
    }
  })

  return cast
}
