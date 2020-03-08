import React 		from "react";
import styled 		from "styled-components";

import StoriesTab 	from "../components/StoriesTab";
import ChatsTab 	from "../components/ChatsTab";
import ActiveTab 	from "../components/ActiveTab";
import CallsTab 	from "../components/CallsTab";


const HomeScreen = ({ viewState, showChatScreen, searchTerm }) => {
	
	let position;
	if (viewState === "1") {
		position = "0%";
	} else if (viewState === "2") {
		position = "-100%";
	} else if (viewState === "3") {
		position = "-200%";
	} 

	// else if (viewState === "4") {
	// 	position = "-300%";
	// }
	
	return (

		<Carousel>
		
			<CarouselTrack goToSlide={position}>
				
				{/*<Slide defaultPosition={"0%"}>
					<ActiveTab />
				</Slide>*/}

				<Slide defaultPosition={"0%"}>
					<ChatsTab searchTerm={searchTerm} showChatScreen={showChatScreen} />
				</Slide>
				
				<Slide defaultPosition={"100%"}>
					<StoriesTab/>	
				</Slide>
				
				<Slide defaultPosition={"200%"}>
					<CallsTab />
				</Slide>

			</CarouselTrack>

		</Carousel>

	)

}

export default HomeScreen;

const Carousel = styled.div`
	min-width: 200px;
	min-height: 710px;
	overflow-y: hidden;
	overflow-x: hidden;
	position: relative;
	padding: 0;
	background-color: #fafafa;
`;

const CarouselTrack = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	padding: 0;
	margin: 0;
	transition: transform 0.2s ease 0s;
	transform: translateX(${props => props.goToSlide});
`;

const Slide = styled.div`
	position: absolute;
	display: block;
	top: 0;
	left: 0;
	right: 0;
	height: 100%;
	transition: transform 0.2s;
	transform: translateX(${props => props.defaultPosition});
`;
