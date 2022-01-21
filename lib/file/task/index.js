
const mintTask = require('../../task')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(tree) {
  const task = []
  const load = []
  const call = []
  tree.link.forEach(link => {
    switch (link.name) {
      case 'load':
        load.push(mintLoad(link))
        break
      case 'call':
        call.push(mintTask.mintCall(link))
        break
      case 'save':
        call.push(mintTask.mintSave(link))
        break
      case 'task':
        task.push(mintTask(link))
        break
    }
  })
  return {
    tree,
    load,
    call,
    task
  }
}
