
const { findName } = require('../name')
const mintLink = require('../link')
const mintTask = require('../task')

module.exports = mintForm

function mintForm(base) {
  const name = findName(base)
  const isCase = !!base.link.slice(1).find(x => x.name === 'case')

  if (isCase) {
    const form = {
      form: 'form-case',
      name,
      head: [],
      link: [],
      case: {},
      task: [],
    }
    base.link.slice(1).forEach(base => {
      switch (base.name) {
        case 'case':
          const c = mintLink.mintLinkForm(base)
          form.case[c.name] = c
          break
        case 'head':
          const head = mintLink(base)
          form.head.push(head)
          break
        case 'link':
          const link = mintLink(base)
          form.link.push(link)
          break
        case 'task':
          const task = mintTask(base)
          form.task.push(task)
          break
      }
    })
    return form
  } else {
    const form = {
      form: 'form-base',
      name,
      base: {},
      wear: [],
      head: [],
      link: [],
      zone: [],
      task: [],
      fill: [],
    }
    base.link.slice(1).forEach(base => {
      switch (base.name) {
        case 'base':
          const b = mintLink.mintLinkForm(base)
          form.base[b.name] = b
          break
        case 'head':
          const head = mintLink(base)
          form.head.push(head)
          break
        case 'link':
          const link = mintLink(base)
          form.link.push(link)
          break
        case 'call':
          const call = mintTask.mintCall(base)
          form.zone.push(call)
          break
        case 'wear':
          const wear = mintWear(base)
          form.zone.push(wear)
          break
        case 'test':
          const test = mintTask.mintTest(base)
          form.zone.push(test)
          break
        case 'scan':
          const scan = mintTask.mintScan(base)
          form.zone.push(scan)
          break
        case 'walk':
          const walk = mintTask.mintWalk(base)
          form.zone.push(walk)
          break
        case 'hold':
          const hold = mintTask.mintHold(base)
          form.zone.push(hold)
          break
        case 'task':
          const task = mintTask(base)
          form.task.push(task)
          break
        case 'fill':
          form.fill.push(findName(base))
          break
      }
    })
    return form
  }
}

function mintWear(base) {
  const name = findName(base)

  const wear = {
    form: 'form-wear',
    name,
    bind: [],
    head: [],
    task: [],
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'bind':
        const bind = mintTask.mintBind(base)
        wear.bind.push(bind)
        break
      case 'task':
        const task = mintTask(base)
        wear.task.push(task)
        break
    }
  })

  return wear
}
