import React from "react";
import styled from "styled-components";
import search from "../assets/images/search.svg";
import arrowLeft from "../assets/images/arrow-left2-2.svg";

const Header = ({
	searchInputIsvisible,
	closeSearchInput,
	handleSearchtermChange,
	searchTerm,
	showSearchInput,
	toggleDropdown,
	dropdownIsVisible,
	onLogout
}) => {

	return (
		
		<StyledHeaderTop>
			
			<Title> <h1 style={{fontWeight: 'bold'}}>RNChat</h1> </Title>
			
			<SearchBar isVisible={searchInputIsvisible}>
			
				<img src={arrowLeft} alt="search" onClick={closeSearchInput} />
			
				<input type="text" placeholder="Search..." onChange={handleSearchtermChange} value={searchTerm} />
			
			</SearchBar>
			
			<SearchIcon onClick={showSearchInput}>
			
				<img src={search} alt="search" />
			
			</SearchIcon>
			
			<SettingsIcon onClick={toggleDropdown}>
				<span />
				<span />
				<span />
			</SettingsIcon>
			
			<StyledDropdown visible={dropdownIsVisible}>
      		
				<button onClick={toggleDropdown}>close</button>
				
				<p>Hi!, thanks for checking out this project! You can find it on&nbsp;</p>
				<p onClick={onLogout}>Logout</p>
			</StyledDropdown>

		
		</StyledHeaderTop>
	
	)

}

export default Header;

const StyledHeaderTop = styled.div`
	background-color: #2b4288;
	height: 5px;
	display: flex;
	height: 60px;
	align-items: center;
`;

const SearchBar = styled.div`
	position: absolute;
	width: 100%;
	flex: 0.5;
	display: flex;
	align-items: center;
	transform-origin: 82%;
	background-color: white;
	border-radius: ${props => (props.isVisible === true ? "0px" : "35px")};
	transform: ${props => (props.isVisible === true ? "scaleX(1)" : "scaleX(0)")};
	transition: border-radius 0.3s, transform 0.3s;
	input[type="text"] {
		border-radius: 35px;
		width: 90%;
		height: 60px;
		font-size: 1em;
		border: 0px;
		min-width: 0;
		margin-left: 10px;
	}
	img {
		height: 20px;
		margin: 10px;
		&:hover {
			cursor: pointer;
		}
	}
`;

const Title = styled.div`
	flex: 5;
	h1 {
		color: white;
		font-weight: 500;
		font-size: 1.3em;
		padding-left: 17px;
	}
`;
const SearchIcon = styled.div`
	flex: 0.5;
	img {
		margin: 0;
		padding: 0;
		height: 17px;
	}
	&:hover {
		cursor: pointer;
	}
`;

const SettingsIcon = styled.div`
	flex: 0.5;
	display: flex;
	flex-direction: column;
	padding-right: 20px;
	span {
		align-self: flex-end;
		width: 4px;
		height: 4px;
		margin: 1px;
		background: #fff;
		border-radius: 50%;
		display: block;
	}
	&:hover {
		cursor: pointer;
	}
`;


const StyledDropdown = styled.div`
	font-size: 0.9em;
	background-color: white;
	position: absolute;
	box-shadow: 0px 3px 3px grey;
	transform: ${props => (props.visible ? "scale(1)" : "scale(0)")};
	transition: transform 0.3s ease;
	transform-origin: top right;
	height: 30%;
	width: 50%;
	z-index: 999;
	top: 10px;
	right: 10px;
	padding: 5px;
	p {
		padding: 4px;
	}

	button {
		background: none;
		border: 0;
		padding: 2px;
		color: inherit;
		font: inherit;
		line-height: normal;
		overflow: visible;
		user-select: none;
		border: 1px solid grey;
		border-radius: 2px;
		&:hover {
			cursor: pointer;
		}
	}
`;
