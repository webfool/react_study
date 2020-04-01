import React from 'react'
import ReactDom from 'react-dom'
import propTypes from 'prop-types'

// 目标：PropTypes 的分类和使用 


// === 如下是 propTypes 的分类和使用 ===
class TestElementType extends React.Component {}

class Friend {
  constructor () {
    this.name = 'friend'
  }
}

class Parent extends React.Component {

  render() {
    const props = {
      name: 'hw',
      age: 25,
      finish: true,
      hobbies: ['ball', 'game'],
      father: {name: 'zz'},
      todo: () => {console.log('todo')},

      eleType: TestElementType,
      ele: <TestElementType></TestElementType>,
      friend: new Friend(),

      female: '女',
      motto: 'hard working!',

      height: [1, 2, 3],
      subjectScope: {
        math: 80,
        chinese: 80
      },
      mother: {
        name: 'mother',
        age: 35,
        from: 'gd'
      },
      brother: {
        name: 'brother'
      },

      success: 'study',
      directions: ['study', 'work', 'life'],

    }
    return <Child {...props}></Child>
  }
}

// propTypes 校验
class Child extends React.Component {
  static defaultProps = {
    isLife: true
  }

  static propTypes = {
    // 定义单个类型
    name: propTypes.string,
    age: propTypes.number,
    finish: propTypes.bool,
    hobbies: propTypes.array,
    father: propTypes.object,
    todo: propTypes.func,

    eleType: propTypes.elementType,
    ele: propTypes.element,
    friend: propTypes.instanceOf(Friend),

    // 定义多个选项
    female: propTypes.oneOf(['男', '女']),
    motto: propTypes.oneOfType([
      propTypes.string,
      propTypes.number
    ]),

    // 定义数组或对象的值类型
    height: propTypes.arrayOf(propTypes.number),
    subjectScope: propTypes.objectOf(propTypes.number),
    mother: propTypes.shape({ // 可以传入任意字段，字段值需满足定义的类型
      name: propTypes.string,
      age: propTypes.number
    }),
    brother: propTypes.exact({ // 只能传入定义的字段，且字段值得满足定义的类型
      name: propTypes.string,
      age: propTypes.number
    }),

    success: function (props, propName, componentName) { // 传给组件的prop对象，当前 propName 属性名，组件名
      console.log('success ->', props, propName, componentName)
      if (props[propName] !== 'study') {
        return new Error('你的学习不成功!')
      }
    },
    directions: propTypes.arrayOf(function (originData, key) {
      if (!['study', 'work', 'life'].includes(originData[key])) {
        return new Error('你有些方向是错的')
      }
    }),

    isLife: propTypes.any.isRequired // 设置必填，传入或者有默认值即可
  }

  render() {
    return <span>{this.props.name}</span>
  }
}

ReactDom.render(<Parent></Parent>, document.getElementById('root'))
/**
 * 总结: 
 * propTypes 支持：
 * - 某个/某些类型
 * - 数组/对象的值为特定类型
 * - 自定义校验规则（值、对象或数组的值）
 * - 必填校验
 */

