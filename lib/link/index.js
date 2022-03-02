
const { findName } = require('../name')

module.exports = mintLink

mintLink.mintLinkForm = mintLinkForm
mintLink.mintLinkKnit = mintLinkKnit
mintLink.mintLinkMesh = mintLinkMesh
mintLink.mintLinkList = mintLinkList

function mintLink(base) {
  const name = findName(base)
  // just mint it into complete match tree just in case.
  const link = {
    form: 'link',
    name,
    linkForm: null,
    base: null, // default value
    time: null,
    loan: true,
    lock: true,
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'form':
        link.linkForm = mintLinkForm(base)
        break
      case 'list':
        link.linkForm = mintLinkList(base)
        break
      case 'mesh':
        link.linkForm = mintLinkMesh(base)
        break
      case 'base':
        link.base = mintLinkBase(base)
        break
      case 'time':
        link.time = findName(base)
        break
      case 'cast':
        link.linkForm = mintLinkCast(base)
        break
      case 'loan':
        link.loan = false
        break
      case 'lock':
        link.lock = false
        break
    }
  })

  return link
}

function mintLinkCast(base) {
  const name = findName(base)
  const formLoan = {
    form: 'cast-loan',
    name,
    lead: []
  }
  return formLoan
}

function mintLinkForm(base) {
  const name = findName(base)
  const formLoan = {
    form: 'form-loan',
    name,
    lead: []
  }
  return formLoan
}

function mintLinkList(base) {
  const name = findName(base)
  const formLoan = {
    form: 'form-loan',
    name: 'list',
    lead: [
      {
        form: 'bind',
        name: 'head',
        bond: {
          form: 'term',
          name
        }
      }
    ]
  }
  return formLoan
}

function mintLinkKnit(base) {
  const name = findName(base)
  const formLoan = {
    form: 'form-loan',
    name: 'knit',
    bind: [
      {
        form: 'bind',
        name: 'head',
        bond: {
          form: 'term',
          name
        }
      }
    ]
  }
  return formLoan
}

function mintLinkMesh(base) {
  const name = findName(base)
  // "line" on mesh is the key property
  const formLoan = {
    form: 'form-loan',
    name: 'mesh',
    bind: [
      {
        form: 'bind',
        name: 'head',
        bond: {
          form: 'term',
          name
        }
      }
    ]
  }
  return formLoan
}

function mintLinkBase(base) {

}
