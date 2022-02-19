
const mintLink = require('../link')
const mintTask = require('../task')
const { findName } = require('../name')
const mintNest = require('../nest')

module.exports = mintLace

function mintLace(base) {
  const name = findName(base)
  // just mint it into complete match tree just in case.
  const lace = {
    form: 'lace',
    name,
    link: [],
    zone: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'link':
        lace.link.push(mintLink(base))
        break
      case 'lace':
        lace.zone.push(mintLaceSite(base))
        break
      case 'test':
        lace.zone.push(mintTest(base))
        break
      case 'walk':
        lace.zone.push(mintWalk(base))
        break
      case 'call':
        lace.zone.push(mintTask.mintCall(base))
        break
      case 'hold':
        lace.zone.push(mintHold(base))
        break
      default: throw new Error(JSON.stringify(base))
    }
  })

  return lace
}

function mintWalk(base) {
  const walk = {
    form: 'walk',
    nest: mintNest(base.link[0])
  }
  return walk
}

function mintTest(base) {
  const test = {
    form: 'test',
    nest: mintNest(base.link[0])
  }
  return test
}

function mintLaceSite(base) {
  const name = findName(base)

  switch (name) {
    case 'form': return mintLaceForm(base)
    case 'text': return mintLaceText(base)
    default: throw new Error(JSON.stringify(base))
  }
}

function mintLaceForm(base) {
  const laceForm = {
    form: 'lace-form',
    name: null,
    bind: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'form':
        laceForm.name = findName(base)
        break
      case 'bind':
        laceForm.bind.push(mintTask.mintBind(base))
        break
    }
  })

  return laceForm
}

function mintLaceText(base) {
  const link = base.link[1]
  switch (link.name) {
    case 'text': return mintTask.mintText(link)
    case 'code': return mintTask.mintCode(link)
    case 'loan': return mintTask.mintLoan(link)
    default: throw new Error(JSON.stringify(base))
  }
}
