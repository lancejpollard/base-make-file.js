
const mintTask = require('../../task')
const mintForm = require('../../form')
const mintLoad = require('../../load')
const mintStem = require('../../stem')
const mintCast = require('../../cast')
const mintWear = require('../../wear')

module.exports = mintFile

function mintFile(tree) {
  const task = []
  const load = []
  const zone = []
  const form = []
  const cast = []
  const wear = []
  const stem = {}
  tree.link.forEach(link => {
    switch (link.name) {
      case 'load':
        load.push(mintLoad(link))
        break
      case 'call':
        zone.push(mintTask.mintCall(link))
        break
      case 'host':
        zone.push(mintTask.mintHost(link))
        break
      case 'hold':
        zone.push(mintTask.mintHold(link))
        break
      case 'save':
        zone.push(mintTask.mintSave(link))
        break
      case 'cast':
        cast.push(mintCast(link))
        break
      case 'wear':
        wear.push(mintWear(link))
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
    zone,
    task,
    cast,
    wear,
    form,
    stem,
  }
}
