import React, { Component } from 'react'
import './assets/css/login.css'
// hidden-sm
class Login extends Component {

    render () {
        return (
              <div className='Login container'>
                <div className='Login__row row'>
                  <div>
                    <button style={{marginTop: '100px', marginLeft: '100px'}} onClick={this.props.onClick}>Login</button>
                  </div>
                </div>
              </div>
        )
    }
}

export default Login