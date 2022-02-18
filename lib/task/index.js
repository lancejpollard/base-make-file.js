
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
  const taskBase = base.link.find(link => link.name === 'base')

  if (taskBase) {
    const taskLoan = {
      form: 'task-loan',
      base: findName(taskBase)
    }

    return taskLoan
  }

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
      case 'have':
        task.zone.push(mintHave(base))
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

function mintHave(base) {
  const name = findName(base)
  const have = {
    form: 'zone-have',
    name,
    bind: []
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `bind`:
        const bind = mintBind(base)
        have.bind.push(bind)
        break
    }
  })
  return have
}

function mintCall(base) {
  const name = base.link[0].form === 'nest' ? mintNest(base.link[0]) : findName(base)

  const call = {
    form: `call`,
    name, // nest-call vs. call
    wait: false,
    bind: [],
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
      case `loan`:
        {
          const loan = mintLoan(base)
          const bind = {
            form: `bind`,
            name: null,
            sift: loan
          }
          call.bind.push(bind)
        }
        break
      case `move`:
        {
          const move = mintMove(base)
          const bind = {
            form: `bind`,
            name: null,
            sift: move
          }
          call.bind.push(bind)
        }
        break
      case `read`:
        {
          const read = mintRead(base)
          const bind = {
            form: `bind`,
            name: null,
            sift: read
          }
          call.bind.push(bind)
        }
        break
      case `link`:
        {
          const link = mintLoan(base)
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
      case `wait`:
        call.wait = true
        break
    }
  })

  return call
}

function mintRead(base) {
  const name = findName(base)
  // should be nest
  const sift = base.link[1] && mintSift(base.link[1])
  const read = {
    form: 'read',
    name,
    sift
  }
  return read
}

function mintMove(base) {
  const name = findName(base)
  // should be nest
  const sift = base.link[1] && mintSift(base.link[1])
  const move = {
    form: 'move',
    name,
    sift
  }
  return move
}

function mintLoan(base) {
  const name = base.link[0].form === 'nest' ? mintNest(base.link[0]) : findName(base)
  if (typeof name === 'string') {
    return {
      form: 'loan',
      name
    }
  } else {
    return {
      form: 'loan-nest',
      nest: name
    }
  }
}

function mintHost(base) {
  const name = findName(base)
  // TODO: update for type definitions.
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
      case 'host':
        const host = mintHost(base)
        zone.zone.push(host)
        break
      case 'save':
        const save = mintLoan(base)
        zone.zone.push(save)
        break
      case 'loan':
        const loan = mintLoan(base)
        zone.zone.push(loan)
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
  const bind = {
    form: `bind`,
    name,
    bond: null
  }

  const base = b.link[1]

  switch (base.name) {
    case 'task':
      {
        bind.bond = mintTask(base)
      }
      break
    case 'loan':
      {
        bind.bond = mintLoan(base)
      }
      break
    case 'move':
      {
        bind.bond = mintMove(base)
      }
      break
    case 'read':
      {
        bind.bond = mintRead(base)
      }
      break
    case 'link':
      {
        bind.bond = mintLoan(base)
      }
      break
    case 'call':
      {
        bind.bond = mintCall(base)
      }
      break
    case 'size':
      {
        bind.bond = mintSize(base)
      }
      break
    case 'text':
      {
        bind.bond = mintText(base)
      }
      break
    case 'code':
      {
        bind.bond = mintCode(base)
      }
      break
  }
  return bind
}

function mintText(base) {
  return {
    form: `text`,
    text: base.link[0].link[0].text
  }
}

function mintSize(base) {
  return {
    form: `size`,
    size: base.link[0].mark
  }
}

function mintCode(base) {
  return {
    form: `code`,
    code: base.code
  }
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
