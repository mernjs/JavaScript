import React from "react";
import styled from "styled-components";

const Tabs = ({ changeViewState, viewState }) => {
	  
	return (
	
		<StyledHeaderNav>
			
			{/*<StyledNavItem
				data-nav="1"
				onClick={changeViewState}
				viewState={viewState}
				current="1"
			>
				All
			</StyledNavItem>*/}

			<StyledNavItem
				data-nav="1"
				onClick={changeViewState}
				viewState={viewState}
				current="1"
			>
				CHATS (21)
			</StyledNavItem>

			<StyledNavItem
				data-nav="2"
				onClick={changeViewState}
				viewState={viewState}
				current="2"
			>
				STORIES
			</StyledNavItem>

			<StyledNavItem
				data-nav="3"
				onClick={changeViewState}
				viewState={viewState}
				current="3"
			>
				CALLS
			</StyledNavItem>

		</StyledHeaderNav>
	
	)
	
}

export default Tabs;

const StyledHeaderNav = styled.nav`
	background: green;
	position: sticky;
	background-color: #2b4288;
	top: 0;
	z-index: 1;
	font-size: 0.9em;
	font-weight: 600;
	height: 45px;
	display: flex;
	letter-spacing: 0.4px;
	justify-content: space-between;
	color: white;
	text-transform: uppercase;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
	a {
		flex-grow: 2
		padding-top: 15px;
	}
	a:first-child {
		flex-grow: 2
		padding-top: 15px;
	}
`;

const StyledNavItem = styled.a`
	text-align: center;
	transition: background-color 1.5s;
	color: ${props => (props.viewState === props.current ? "white" : "#e0e1e3f7")};
	font-weight: ${props => (props.viewState === props.current ? 600 : 500)};
	border-bottom: ${props =>
		props.viewState === props.current ? "3px solid white" : "none"};
	&:active {
		background-color: lightgray;
		transition: background-color 1.5s;
		border-bottom: 3px solid white;
	}
	svg {
		fill: ${props => (props.viewState === props.current ? "white" : "#e0e1e3f7")};
	}
`;
