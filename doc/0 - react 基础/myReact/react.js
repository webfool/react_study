class Component {
  static isReactComponent = true
  constructor (props) {
    this.props = props
  }
}

function ReactElement (type, props) {
  return {type, props}
}


function createElement (type, config) {
  const props = {}

  for (let key in config) {
    props[key] = config[key]
  }

  let children = Array.from(arguments).slice(2)
  if (children.length === 1) {
    props.children = children[0]
  } else if (children.length > 1) {
    props.children = children
  }

  return ReactElement(type, props)
}

export default {createElement, Component}