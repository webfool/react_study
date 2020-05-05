import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom'


class App extends Component {
  render () {
    return <>
      

      <Router>
        <ul>
          <li>
            <Link to="/users/1" style={{color: 'blue', cursor: 'pointer'}}>user</Link>
          </li>
          <li>
            <Link to="/about" style={{color: 'blue', cursor: 'pointer'}}>about</Link>
          </li>
        </ul>

        {/* <Switch> */}
          <Route path="/" component={Home} exact></Route>
          <Redirect from="/redirect" to="/users" exact></Redirect>
          <Route path="/about" component={About} exact></Route>
          <Route path="/users/:id" component={Users} exact>
            {/* <User2></User2> */}
          </Route>
        {/* </Switch> */}
      </Router>
    </>
  }
}

function Home (props) {
  return <h2>Home</h2>
}

function About (props) {
  // return <Redirect to="/users"></Redirect>
  return <h2>About</h2>
}

function Users (props) {
  console.log('user props ->', props)
  return <h2>Users</h2>
}

function User2 (props) {
  console.log('user2 props ->', props)
  return <span>aaaaa</span>
}

ReactDOM.render(<App/>, document.getElementById('root'))



/**
 * Route 传递组件的方式可以是：component 属性、子元素
 */