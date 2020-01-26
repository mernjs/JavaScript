import React, { Component } from 'react'
import Login from './Login'
import Home from './Home'

class App extends Component {

    constructor(props){
      super(props)
      this.state = {
        isLoggedIn : false
      }
    }

    login = () => {
      this.setState({isLoggedIn: true})
    }

    logout = () => {
      this.setState({isLoggedIn: false})
    }

    render () {
        if(this.state.isLoggedIn === false){
          return <Login onClick={this.login}/>
        }
        if(this.state.isLoggedIn === true){
          return <Home onClick={this.logout}/>
        }
        
    }
}

export default App