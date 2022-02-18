
const mintTask = require('../../task')
const mintForm = require('../../form')
const mintLoad = require('../../load')
const mintStem = require('../../stem')

module.exports = mintFile

function mintFile(tree) {
  const task = []
  const load = []
  const call = []
  const form = []
  const stem = {}
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
      case 'form':
        form.push(mintForm(link))
        break
      case 'stem':
        const s = mintStem(link)
        stem[s.name] = s
        break
    }
  })
  return {
    tree,
    load,
    call,
    task,
    form,
    stem,
  }
}
