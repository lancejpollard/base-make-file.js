
const { findName } = require('../name')
const mintCast = require('../cast')
const mintTask = require('../task')
const mintLink = require('../link')

module.exports = mintWear

function mintWear(base) {
  const name = findName(base)
  const wear = {
    form: 'wear',
    name,
    base: [], // supertraits
    head: [],
    link: [],
    cast: [],
    task: [],
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'base':
        wear.base.push(findName(base))
        break
      case 'link':
        wear.link.push(mintLink(base))
        break
      case 'head':
        wear.head.push(mintLink(base))
        break
      case 'cast':
        wear.cast.push(mintCast(base))
        break
      case 'task':
        wear.task.push(mintTask(base))
        break
    }
  })

  return wear
}
