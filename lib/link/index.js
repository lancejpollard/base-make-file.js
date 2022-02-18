
const { findName } = require('../name')
const mintSift = require('../sift')

module.exports = mintLink

function mintLink(base) {
  const name = findName(base)
  // just mint it into complete match tree just in case.
  const link = {
    form: 'link',
    name,
    linkForm: null,
    base: null, // default value
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
    }
  })

  return link
}

function mintLinkForm(base) {
  const name = findName(base)
  const formLoan = {
    form: 'form-loan',
    name
  }
  return formLoan
}

function mintLinkList(base) {
  const name = findName(base)
  const formLoan = {
    form: 'form-loan',
    name: 'list',
    bind: [
      {
        form: 'bind',
        name: 'head',
        sift: {
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
        sift: {
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
