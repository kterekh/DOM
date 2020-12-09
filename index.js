/**
 * Recursive function which accept 2 parameters:
 * @param config {nodeName: string, attrs: {key: value}, children: {}[], innerHtml?: string, innerText?: string}: each item of children has same interface as `config` argument
 * @param parent {HTMLElement}: accept element to insert new one into, body - is default value
 *
 * @return HTMLElement: contain link for DOM element that is already rendered
 *
 * note: config could be extended/changed in any convenient way, e.g. listeners
 */

const setParentAttributes = (element) => {
  let attrsNames = element.parentNode.getAttributeNames() //[]
  attrsNames.forEach(attr => {
    let attrValue = element.parentNode.getAttribute(attr)
    element.setAttribute(attr, attrValue)
  })
}

const renderDOM = (config, parent = document.body) => {
  const {nodeName} = config
  //create element
  let newElement = document.createElement(nodeName)
  parent.append(newElement)
  //set innerText & innerHTML
  if (config.hasOwnProperty('innerText')) {
    newElement.innerText = config.innerText
  } else if (config.hasOwnProperty('innerHtml')) {
    newElement.innerHTML = config.innerHtml
  }
  // set attribute
  setParentAttributes(newElement)
  if (config.attrs) {
    Object.entries(config.attrs).forEach(config => {
      newElement.setAttribute(config[0], config[1])
    })
  }
  //render children
  if (config.children) {
    config.children.forEach(child => {
      renderDOM(child, newElement)
    })
  }
}

const DOMStructure = {
  nodeName: 'div',
  attrs: {
    className: 'some bem__classes',
    width: '100px'
  },
  children: [
    {
      nodeName: 'a',
      attrs: {
        href: '#',
        target: 'blank'
      },
      innerText: 'Link to home'
    },
    {
      nodeName: 'div',
      innerHtml: '<a href="#">another link</a>'
    },
    {
      nodeName: 'ul',
      children: [
        {
          nodeName: 'li',
          innerText: 'item 1'
        },
        {
          nodeName: 'li',
          innerText: 'item 2'
        }
      ]
    }
  ]
}

renderDOM(DOMStructure)

