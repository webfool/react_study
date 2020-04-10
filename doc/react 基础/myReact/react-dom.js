function render (element, parentNode) {
  // 如果直接传入一个字符串，直接当文本节点使用
  if (typeof element === 'string' || typeof element === 'number') {
    console.log('in')
    return parentNode.appendChild(document.createTextNode(element))
  }
  
  let {type, props} = element
  if (typeof type === 'string') {
    let domEle = document.createElement(type)

    for (let propName in props) {
      if (propName === 'className') {
        // 兼容所有浏览器的类赋值方法
        domEle.className = props[propName]
      } else if (propName === 'style') {
        // style 支持两种方式赋值
        // 1）转为字符串赋值 cssText  2）依次把每个属性赋值给 style
        const cssText = Object.entries(props[propName]).reduce((cssText, [key, value]) => {
          key = key.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`) // 驼峰式转连字符式
          return cssText +=`${key}: ${value};`
        }, '')
        domEle.style.cssText = cssText
      } else if (propName === 'children') {
        const value = props[propName]
        const children = Array.isArray(value) ? value : [value]
        children.forEach(child => {
          render(child, domEle)
        })
      } else {
        domEle.setAttribute(propName, props[propName])
      }
    }

    return parentNode.appendChild(domEle)
  } else if (type.isReactComponent) {
    const vnode = new type(props).render()
    return render(vnode, parentNode)
  } else if (typeof type === 'function') {
    return render(type(props), parentNode)
  }
}

export default {render}