
const buildDeckFile = require('./lib/file/deck')
// const buildCallFile = require('./lib/file/call')
const buildTaskFile = require('./lib/file/task')
const buildFormFile = require('./lib/file/form')
const buildTestFile = require('./lib/file/test')
const buildViewFile = require('./lib/file/view')

const BUILDER = {
  'dock-task': buildTaskFile,
  'task': buildTaskFile,
  'form': buildFormFile,
  'view': buildViewFile,
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
  return object
}
