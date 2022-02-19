
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
      case: {},
      task: [],
    }
    base.link.slice(1).forEach(base => {
      switch (base.name) {
        case 'case':
          const c = mintLink.mintLinkForm(base)
          form.case[c.name] = c
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
      head: [],
      link: [],
      zone: [],
      task: [],
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
      }
    })
    return form
  }
}

function mintBase(base, form = 'base') {
  const name = findName(base)
  // const sift = base.link[1] && mintSift(base.link[1])
  // just mint it into complete match tree just in case.
  const b = {
    form,
    name,
    case: undefined,
    sift: undefined,
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'list':
        b.case = {
          form: 'list',
          name: findName(base)
        }
        break
      case 'form':
        b.case = {
          form: 'form',
          name: findName(base)
        }
        break
    }
  })
  return b
}
