
const makeTree = require('@lancejpollard/link-parser.js')
// const buildDeckFile = require('./lib/file/deck')
// const buildCallFile = require('./lib/file/call')
const buildTaskFile = require('./lib/file/task')
const buildFormFile = require('./lib/file/form')
// const buildTestFile = require('./lib/file/test')
const buildViewFile = require('./lib/file/view')

const BUILDER = {
  'dock-task-file': buildTaskFile,
  'task-file': buildTaskFile,
  'form-file': buildFormFile,
  'view-file': buildViewFile,
}

module.exports = build

function build({ text, type }) {
  const tree = makeTree(text)
  const builder = BUILDER[type]
  const object = builder(tree)
  return object
}
