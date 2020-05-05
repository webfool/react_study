import React, { Component } from 'react';
import RouterContext from '../context'

class HashRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        pathname: window.location.hash.slice(1)
      }
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1) || '/'
        }
      })
    })
    window.location.hash = window.location.hash || '/'
  }
  render() { 
    const value = {
      location: this.state.location,
      history: {
        push: (to) => {
          window.location.hash = to
        }
      }
    }
    return <RouterContext.Provider value={value}>
      {this.props.children}
    </RouterContext.Provider>
  }
}

export default HashRouter;