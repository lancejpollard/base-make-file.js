
const { findName } = require('../name')
const mintNest = require('../nest')
const mintSift = require('../sift')
const mintLink = require('../link')

mintSift.mintCall = mintCall
module.exports = mintTask
mintTask.mintCall = mintCall
mintTask.mintSave = mintSave
mintTask.mintHost = mintHost
mintTask.mintText = mintText
mintTask.mintCode = mintCode
mintTask.mintBind = mintBind
mintTask.mintLoan = mintLoan
mintTask.mintScan = mintScan
mintTask.mintTest = mintTest
mintTask.mintWalk = mintWalk

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
    head: [],
    link: [],
    zone: [],
    wait: false,
    cast: null,
    risk: false,
    hide: false,
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'head':
        task.head.push(mintLink(base))
        break
      case 'note':
        task.note = findName(base)
        break
      case 'link':
        task.link.push(mintLink(base))
        break
      case 'host':
        task.zone.push(mintHost(base))
        break
      case 'have':
        task.zone.push(mintHave(base))
        break
      case 'rest':
        task.zone.push(mintRest(base))
        break
      case 'show':
        task.zone.push(mintShow(base))
        break
      case 'turn':
        task.zone.push(mintTurn(base))
        break
      case 'walk':
        task.zone.push(mintWalk(base))
        break
      case 'test':
        task.zone.push(mintTest(base))
        break
      case 'scan':
        task.zone.push(mintScan(base))
        break
      case 'hold':
        task.zone.push(mintHold(base))
        break
      case 'call':
        task.zone.push(mintCall(base))
        break
      case 'wait':
        task.wait = true
        break
      case 'risk':
        task.risk = true
        break
      case 'hide':
        task.hide = true
        break
      case 'cast':
        task.cast = findName(base)
        break
    }
  })
  return task
}

function mintShow(base) {
  // TODO: can take direct text, or it can do something else.
}

function mintRest(base) {
  return {
    form: 'rest'
  }
}

function mintWalk(base) {
  const nest = base.link[0].form === 'nest' ? mintNest(base.link[0]) : findName(base)

  const walk = {
    form: 'call',
    name: 'walk',
    bind: [],
    hook: []
  }

  walk.bind.push({
    name: 'list',
    bond: {
      form: 'loan-nest',
      nest
    }
  })

  const zone = []

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'host':
        zone.push(mintHost(base))
        break
      case 'have':
        zone.push(mintHave(base))
        break
      case 'rest':
        zone.push(mintRest(base))
        break
      case 'show':
        zone.push(mintShow(base))
        break
      case 'turn':
        zone.push(mintTurn(base))
        break
      case 'walk':
        zone.push(mintWalk(base))
        break
      case 'test':
        zone.push(mintTest(base))
        break
      case 'scan':
        zone.push(mintScan(base))
        break
      case 'hold':
        zone.push(mintHold(base))
        break
      case 'call':
        zone.push(mintCall(base))
        break
    }
  })

  const hook = {
    form: 'hook',
    link: [
      {
        form: 'link',
        name: 'site',
      }
    ],
    zone,
  }

  walk.hook.push(hook)

  return walk
}

function mintTest(base) {
  const nest = findName(base)
  const test = {
    form: 'call',
    name: `test-${nest}`,
    bind: []
  }

  test.bind.push({
    name: 'list',
    bond: {
      form: 'loan-nest',
      nest
    }
  })

  return test
}

function mintScan(base) {
  const nest = base.link[0].form === 'nest' ? mintNest(base.link[0]) : findName(base)

  const scan = {
    form: 'call',
    name: 'scan',
    bind: [],
    hook: []
  }

  scan.bind.push({
    name: 'list',
    bond: {
      form: 'loan-nest',
      nest
    }
  })

  const zone = []

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'test':
        zone.push(mintScanTest(base))
        break
      case 'case':
        zone.push(mintScanCase(base))
        break
    }
  })

  scan.bind.push({
    name: 'zone',
    bond: zone
  })

  return scan
}

function mintScanTest(base) {
  const nest = base.link[0].form === 'nest' ? mintNest(base.link[0]) : findName(base)

  const test = {
    form: 'scan-test',
    nest,
    bind: [],
    zone: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'host':
        test.zone.push(mintHost(base))
        break
      case 'have':
        test.zone.push(mintHave(base))
        break
      case 'rest':
        test.zone.push(mintRest(base))
        break
      case 'show':
        test.zone.push(mintShow(base))
        break
      case 'turn':
        test.zone.push(mintTurn(base))
        break
      case 'walk':
        test.zone.push(mintWalk(base))
        break
      case 'test':
        test.zone.push(mintTest(base))
        break
      case 'scan':
        test.zone.push(mintScan(base))
        break
      case 'hold':
        test.zone.push(mintHold(base))
        break
      case 'call':
        test.zone.push(mintCall(base))
        break
    }
  })

  return test
}

function mintScanCase(base) {
  const link = base.link[0]

  const scanCase = {
    form: 'scan-case',
    bond: null,
    zone: []
  }

  switch (link.form) {
    case 'size':
      scanCase.bond = link
      break
    default:
      scanCase.bond = mintBond(link)
      break
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'host':
        scanCase.zone.push(mintHost(base))
        break
      case 'have':
        scanCase.zone.push(mintHave(base))
        break
      case 'rest':
        scanCase.zone.push(mintRest(base))
        break
      case 'show':
        scanCase.zone.push(mintShow(base))
        break
      case 'turn':
        scanCase.zone.push(mintTurn(base))
        break
      case 'walk':
        scanCase.zone.push(mintWalk(base))
        break
      case 'test':
        scanCase.zone.push(mintTest(base))
        break
      case 'scan':
        scanCase.zone.push(mintScan(base))
        break
      case 'hold':
        scanCase.zone.push(mintHold(base))
        break
      case 'call':
        scanCase.zone.push(mintCall(base))
        break
    }
  })

  return scanCase
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
            bond: move
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
            bond: read
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
            bond: link
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
            bond: size
          }
          call.bind.push(bind)
        }
        break
      case `text`:
        {
          const text = mintText(base)
          const bind = {
            form: `bind`,
            name: null,
            bond: text
          }
          call.bind.push(bind)
        }
        break
      case `code`:
        {
          const code = mintText(base)
          const bind = {
            form: `bind`,
            name: null,
            bond: code
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
  const name = base.link[0].form === 'nest' ? mintNest(base.link[0]) : findName(base)
  if (typeof name === 'string') {
    return {
      form: 'read',
      name
    }
  } else {
    return {
      form: 'read-nest',
      nest: name
    }
  }
}

function mintMove(base) {
  const name = base.link[0].form === 'nest' ? mintNest(base.link[0]) : findName(base)
  if (typeof name === 'string') {
    return {
      form: 'move',
      name
    }
  } else {
    return {
      form: 'move-nest',
      nest: name
    }
  }
}

function mintLoan(base) {
  // TODO: add lock free to this
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
  const zone = {
    form: 'host',
    name,
    bondForm: null,
    bond: null,
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'form':
        {
          const form = mintLink.mintLinkForm(base)
          zone.bondForm = form
        }
        break
      case 'list':
        {
          const form = mintLink.mintLinkList(base)
          zone.bondForm = form
        }
        break
      case 'knit':
        {
          const form = mintLink.mintLinkKnit(base)
          zone.bondForm = form
        }
        break
      case 'mesh':
        {
          const form = mintLink.mintLinkMesh(base)
          zone.bondForm = form
        }
        break
      case 'base':
        {
          const bond = mintBond(base.link[0])
          zone.bond = bond
        }
        break
    }
  })

  return zone
}

function mintBond(base) {
  switch (base.name) {
    case 'task': return mintTask(base)
    case 'loan': return mintLoan(base)
    case 'move': return mintMove(base)
    case 'read': return mintRead(base)
    case 'link': return mintLoan(base)
    case 'call': return mintCall(base)
    case 'size': return mintSize(base)
    case 'text': return mintText(base)
    case 'code': return mintCode(base)
    case 'make': return mintMake(base)
    case 'term': return mintTerm(base)
  }
}

function mintTerm(base) {
  const name = findName(base)
  return {
    form: 'term',
    name
  }
}

function mintHook(base) {
  const name = findName(base)
  const zone = {
    form: `hook`,
    name,
    link: [],
    zone: [],
    wait: false,
    cast: null,
    risk: false,
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
      case 'have':
        zone.zone.push(mintHave(base))
        break
      case 'rest':
        zone.zone.push(mintRest(base))
        break
      case 'wait':
        zone.wait = true
        break
      case 'risk':
        zone.risk = true
        break
      case 'cast':
        zone.cast = findName(base)
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
      case 'move':
        const move = mintMove(base)
        zone.zone.push(move)
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

function mintBind(b) {
  const name = findName(b)
  const bond = []
  const bind = {
    form: `bind`,
    name,
    bond: null
  }
  b.link.slice(1).forEach(base => {
    bond.push(mintBond(base))
  })
  if (bond.length === 1) {
    bind.bond = bond[0]
  } else {
    bind.bond = bond
  }
  return bind
}

function mintMake(base) {
  const name = findName(base)
  const make = {
    form: 'task-make',
    name,
    bind: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'bind':
        const b = mintBind(base)
        make.bind.push(b)
        break
    }
  })

  return make
}

function mintText(base) {
  const text = []

  base.link[0].link.forEach(base => {
    switch (base.form) {
      case 'cord':
        text.push(base)
        break
      case 'read':
        text.push(mintBond(base.link[0]))
        break
    }
  })

  return {
    form: `text`,
    text
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
  // TODO: make bond
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
