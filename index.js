
const buildDeckFile = require('./lib/file/deck')
const buildBaseFile = require('./lib/file/base')
const buildTestFile = require('./lib/file/test')

const BUILDER = {
  'dock': buildBaseFile,
  'base': buildBaseFile,
  'deck': buildDeckFile,
  'test': buildTestFile,
}

module.exports = build

function build({ tree, type }) {
  const builder = BUILDER[type]
  if (!builder) {
    throw new Error(`Builder ${type} does not exist`)
  }
  const object = builder(tree)
  object.mint = type
  return object
}
