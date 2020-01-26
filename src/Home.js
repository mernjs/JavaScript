import React, { Component } from 'react'
import Conversation         from './components/Conversation'
import SideBar             from './components/SideBar'
import './assets/css/style.css'

// hidden-sm

class App extends Component {
    
    render () {
        return (
            <div className='App container-fuild'>
                <div className='App__row row'>
                    <div className='col-sm-4 col-md-3 col-xs-12 no-padding'>
                        <SideBar onClick={this.props.onClick}/>
                    </div>
                    <div className='col-sm-8 col-md-9 col-xs-12 no-padding'>
                        <Conversation />
                    </div>
                </div>
            </div>
        )
    }
}

export default App