/**
 * Recursive function which accept 2 parameters:
 * @param config {nodeName: string, attrs: {key: value}, children: {}[], innerHtml?: string, innerText?: string}: each item of children has same interface as `config` argument
 * @param parent {HTMLElement}: accept element to insert new one into, body - is default value
 *
 * @return HTMLElement: contain link for DOM element that is already rendered
 *
 * note: config could be extended/changed in any convenient way, e.g. listeners
 */

const DOMStructure = {
  nodeName: 'div',
  attrs: {
    class: 'some bem__classes',
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

const renderDOM = (config, parent = document.body) => {
// create parent element with attributes
  let newElement = document.createElement(config.nodeName)
  newElement.setAttribute('id','result')
  parent.prepend(newElement)
  let elemClassName = config.attrs.class
  let elemWidth = config.attrs.width
  newElement.setAttribute('class', `${elemClassName}`)
  newElement.setAttribute('width', `${elemWidth}`)

//create children of parent element with the same attributes + unique attributes
  for (let element of config.children) {
    let childName = document.createElement(element.nodeName)
    newElement.append(childName)
    childName.setAttribute('class', `${elemClassName}`)
    childName.setAttribute('width', `${elemWidth}`)
    if (element.hasOwnProperty('innerText')) {
      childName.innerText = element.innerText
    } else if (element.hasOwnProperty('innerHtml')) {
      childName.innerHTML = element.innerHtml
    }
  }
  let result = document.getElementById('result')
  console.log(result);
}


renderDOM(DOMStructure)
