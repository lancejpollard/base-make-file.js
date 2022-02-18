
const { findName } = require('../name')
const mintSift = require('../sift')

module.exports = mintLink

function mintLink(base) {
  const name = findName(base)
  const sift = base.link[1] && mintSift(base.link[1])
  // just mint it into complete match tree just in case.
  const b = {
    form: 'link',
    name,
    sift,
  }
  return b
}
