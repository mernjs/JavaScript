import React, { Component }	from "react";
import styled, { injectGlobal } from "styled-components";
import { Transition } 	from "react-spring";

import Tabs 		from "./components/Tabs";
import Header 		from "./components/Header";

import HomeScreen 	from "./screens/HomeScreen";
import ChatScreen 	from "./screens/ChatScreen";

class App extends Component {
	
	state = {
		viewState: "1",
		chatScreenIsVisible: false,
		currentChatId: 0,
		searchTerm: "",
		searchInputIsvisible: false,
		dropdownIsVisible: false
  	}

  	showSearchInput = () => {
	
		this.setState({ searchInputIsvisible: true, viewState: "1" });
	  
	}

  	closeSearchInput = () => {
	
		this.setState({ searchInputIsvisible: false, searchTerm: "" });
	  
	}

  	handleSearchtermChange = (event) => {
		
		this.setState({ searchTerm: event.target.value });
	  
	}

  	changeViewState = (event) => {
	
		const newState = event.target.dataset.nav;
	
		this.setState({ viewState: newState });
	  
	}

  	showChatScreen = (id) => {

    	this.setState({ chatScreenIsVisible: true, currentChatId: id });
	  
	}

  	closeChatScreen = () => {
    	this.setState({ chatScreenIsVisible: false, currentChatId: 0 });
  	}

  	toggleDropdown = () => {

    	this.setState(prevState => {
      		return { dropdownIsVisible: !prevState.dropdownIsVisible };
		})
		
  	}

  	render() {

    	return (
		
			<StyledApp>
			
				<Header
					searchTerm={this.state.searchTerm}
					handleSearchtermChange={this.handleSearchtermChange}
					showSearchInput={this.showSearchInput}
					closeSearchInput={this.closeSearchInput}
					searchInputIsvisible={this.state.searchInputIsvisible}
					toggleDropdown={this.toggleDropdown}
					dropdownIsVisible={this.state.dropdownIsVisible}
					onLogout={this.props.onLogout}
				/>
			
				<Tabs
					viewState={this.state.viewState}
					changeViewState={this.changeViewState}
				/>
			
				<HomeScreen
					showChatScreen={this.showChatScreen}
					viewState={this.state.viewState}
				/>
			
				<Transition
					items={this.state.chatScreenIsVisible}
					from={{ opacity: 0 }}
					enter={{ opacity: 1 }}
					leave={{ opacity: 0 }}
					config={{ duration: 200 }}
				>
					{show => show && (props => (
						
						<ChatScreen
							style={props}
							currentChatId={this.state.currentChatId}
							closeChatScreen={this.closeChatScreen}
						/>

					))}
					
				</Transition>
			
			</StyledApp>
    	)
  	}
}

export default App;

injectGlobal`
	*, *:before, *:after {
		box-sizing: border-box;
	}
	body {
		font-family: 'Roboto', sans-serif;
		margin: 0;
		background-color: #f1f1f2;
	}
`;

const StyledApp = styled.div`
	max-width: 100%;
	margin: 0 auto;
	position: relative;
`;

