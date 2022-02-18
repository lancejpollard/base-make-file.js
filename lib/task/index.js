
const { findName } = require('../name')
const mintNest = require('../nest')
const mintSift = require('../sift')
const mintLink = require('../link')

mintSift.mintCall = mintCall
module.exports = mintTask
mintTask.mintCall = mintCall
mintTask.mintSave = mintSave

function mintTask(base) {
  const name = findName(base)
  const task = {
    form: 'task',
    name,
    link: [],
    zone: [],
    wait: false,
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'link':
        task.link.push(mintLink(base))
        break
      case 'host':
        task.zone.push(mintHost(base))
        break
      case 'turn':
        task.zone.push(mintTurn(base))
        break
      case 'call':
        task.zone.push(mintCall(base))
        break
      case 'wait':
        task.wait = true
        break
    }
  })
  return task
}

function mintCall(base) {
  const name = findName(base)

  const call = {
    form: `call`,
    name,
    wait: false,
    bind: [],
    zone: [],
    hook: [],
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `bind`:
        const bind = mintBind(base)
        call.bind.push(bind)
        break
      case `hook`:
        const hook = mintHook(base)
        call.hook.push(hook)
        break
      case `link`:
        {
          const link = mintLink(base)
          const bind = {
            form: `bind`,
            name: null,
            sift: link
          }
          call.bind.push(bind)
        }
        break
      case `size`:
        {
          const size = mintSift(base)
          const bind = {
            form: `bind`,
            name: null,
            sift: size
          }
          call.bind.push(bind)
        }
        break
      case `save`:
        const save = mintCallSave(base)
        call.zone.push(save)
        break
      case `turn`:
        const turn = mintCallTurn(base)
        call.zone.push(turn)
        break
      case `wait`:
        call.wait = true
        break
    }
  })

  return call
}

function mintHost(base) {
  const name = findName(base)
  const sift = base.link[1] && mintSift(base.link[1])
  const zone = {
    form: 'host',
    name,
    sift
  }
  return zone
}

function mintHook(base) {
  const name = findName(base)
  const zone = {
    form: `hook`,
    name,
    link: [],
    zone: []
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'link':
        const b = mintLink(base)
        zone.link.push(b)
        break
      case 'call':
        const call = mintCall(base)
        zone.zone.push(call)
        break
      case 'save':
        const save = mintSave(base)
        zone.zone.push(save)
        break
      case 'turn':
        const turn = mintTurn(base)
        zone.zone.push(turn)
        break
      default:
        throw base.name
    }
  })
  return zone
}

const mintBind = b => {
  const name = findName(b)
  const sift = b.link[1].name === 'task' ? mintTask(b.link[1]) : mintSift(b.link[1])
  const bind = {
    form: `bind`,
    name,
    sift
  }
  return bind
}

function mintTurn(base) {
  const name = findName(base)
  const sift = base.link[1] && mintSift(base.link[1])
  return {
    form: `turn`,
    name,
    sift
  }
}

function mintCallTurn(base) {
  const name = findName(base)
  return {
    form: `call-turn`,
    name
  }
}

function mintSave(base) {
  const nest = base.link[0]
  const sift = mintSift(base.link[1])
  const zone = {
    form: `save`,
    nest,
    sift
  }
  return zone
}

function makeRoad(base) {
  return base
}
