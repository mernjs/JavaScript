import React, { Component } from "react";
import styled 		from "styled-components";
import { messages } from "../assets/data/messages.js";
import { chats } 	from "../assets/data/chats.js";
import arrow 		from "../assets/images/arrow-left2.svg";
import camera 		from "../assets/images/camera-grey.svg";
import attachment 	from "../assets/images/attachment.svg";
import happy 		from "../assets/images/happy.svg";
import mic 			from "../assets/images/mic.svg";
import rightArrow 	from "../assets/images/arrow-right.svg";
import background 	from "../assets/images/background.jpg";

class ChatScreen extends Component {
	
	state = {
		messages: [],
		formValue: ""
	};

	componentDidMount() {

		this.setState({ messages });
	
	}

	componentDidUpdate() {
	
		window.scrollTo(0, document.body.scrollHeight);
	
	}

	handleChange = (event) => {
	
		this.setState({ formValue: event.target.value });
	
	}

	handleSubmit = (event) => {
	
		event.preventDefault();
	
		const newMessages = [...this.state.messages];
	
		const message = {
			id: Date.now(),
			content: this.state.formValue,
			status: "outgoing"
		};
	
		window.scrollTo(0, document.body.scrollHeight);
	
		this.setState({ messages: newMessages.concat(message) });
	
		this.setState({ formValue: "" });
	
	}

	addEmoji = () => {
	
		this.setState({ formValue: "😎" });
	
	}

  	render() {
		
		let msg;
		
		if (this.props.currentChatId) {
			msg = chats.find(item => item.id === this.props.currentChatId);
		} else {
			msg = chats.find(item => item.id === 64138);
		}

		return (

			<StyledChatScreen style={this.props.style}>
				
				<StyledChatScreenHeader>
					
					<ChatScreenHeaderLeft>
				
						<a onClick={this.props.closeChatScreen}> <img src={arrow} alt="arrow left icon" /> </a>
				
						<a> <img src={msg.avatar} alt={msg.title} /> </a>
				
						<span> <span className="user-name">{msg.title}</span> 
						<br /> <span style={{ fontSize: 12, margin: 0, padding: 0, color: '#fff' }}> last seen today at 21:02 </span> </span>
				
					</ChatScreenHeaderLeft>

					<ChatScreenHeaderRight>
					
						<i class="fa fa-video-camera" style={{ fontSize: 18 }} aria-hidden="true" ></i>
					
						<i class="fa fa-phone" style={{ fontSize: 20 }} aria-hidden="true"></i>
					
						<SettingsIcon>
							<span />
							<span />
							<span />
						</SettingsIcon>
					
					</ChatScreenHeaderRight>

				</StyledChatScreenHeader>

				<ChatContent>
				
					{this.state.messages.map(item => (
					
						<StyledChatMessage key={item.id} status={item.status}>
					
							{item.status === "incoming" && <a> <img className="userAvatar" src='https://images.pexels.com/photos/921646/pexels-photo-921646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' alt={msg.title} /> </a>}
					
							<span> {item.content} </span>
					
							{item.status === "outgoing" && <a> <img className="userAvatar" src="https://images.pexels.com/photos/1071049/pexels-photo-1071049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=90" alt={msg.title} /> </a>}
					
						</StyledChatMessage>
					
					))}
				
				</ChatContent>

				<StyledChatScreenFooter>
					<StyledForm onSubmit={this.handleSubmit}>
						
						<span className="input-addon"> <img src={happy} alt="" onClick={this.addEmoji} /> </span>
						
						<input type="text" onChange={this.handleChange} value={this.state.formValue} />
						
						<span className="input-addon"> <img src={attachment} alt="" /> </span>
						
						<span className="input-addon"> <img src={camera} alt="" /> </span>
						
						<RecordIcon>
						
							{this.state.formValue.length >= 1 && ( <button type="submit"> <img src={rightArrow} alt="" /> </button> )}
						
							{this.state.formValue.length === 0 && ( <div> <img src={mic} alt="" /> </div> )}

						</RecordIcon>

					</StyledForm>

				</StyledChatScreenFooter>

			</StyledChatScreen>

		)

	}
	
}

export default ChatScreen;

const StyledChatScreen = styled.div`
	background-color: #ece5dd;
	background: url(${background}) fixed center;
	position: absolute;
	top: 0;
	z-index: 1;
	width: 100%;
`;

const ChatContent = styled.div`
	padding-top: 60px;
	padding-bottom: 50px;
	padding-right: 5px;
	padding-left: 5px;

	overflow: hidden;
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: flex-end;
`;

const StyledChatMessage = styled.div`
	display: flex;
	animation: fadeIn .3s linear ;
	margin-bottom: 5px;
	margin-top: 5px;
	justify-content: ${props =>
		props.status === "incoming" ? "flex-start" : "flex-end"};
		span {
			background-color: ${props =>
			props.status === "incoming" ? "#fff" : "#2b4288"};
			color:  ${props =>
			props.status === "incoming" ? "black" : "#fff"};
			margin-top: 7px;
			max-width: 75%;
			border-radius: 5px;
			padding: 10px;
			font-size: 12px;
			font-weight: 520;
			line-height: auto;
			span {
				padding: 0 0 0 8px;
				color: #858B90;
				float: right;
				font-size: .8em;
			}
		}
		.userAvatar {
			width: 40px;
			height: 40px;
			margin: 10px 5px 0 5px;
			border-radius: 50%;
		}
	}
	@keyframes fadeIn {
		0%, 20% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

`;

// header style
const StyledChatScreenHeader = styled.div`
	display: flex;
	color: white;
	z-index: 1;
	justify-content: space-between;
	align-items: center;
	background: #2b4288;
	position: fixed;
	height: 60px;
	width: 100%;
	${'' /* max-width: 450px; */}
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
`;

const ChatScreenHeaderLeft = styled.div`
	flex-basis: 70%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	a:first-child {
		padding-left: 10px;
		img {
		width: 20px;
		}
	}
	a:nth-child(2) {
		img {
		width: 40px;
		height: 40px;
		margin: 0 5px 0 5px;
		border-radius: 50%;
		}
	}
	a:nth-child(3) {
		color: white;
		text-decoration: none;
	}
	.user-name{
		color: #fff;
		font-weight: 550;
		font-size: 15px;
	}
`;

const ChatScreenHeaderRight = styled.div`
	display: flex;
	flex-basis: 30%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	a img {
		height: 20px;
	}
`;

const SettingsIcon = styled.div`
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
`;

// footer style
const StyledChatScreenFooter = styled.footer`
  background: #ece5dd;
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  ${'' /* max-width: 450px; */}
  padding: 5px;
`;

const StyledForm = styled.form`
	display: flex;
	justify-content: flex-start;

	.input-addon {
		min-width: 40px;
		background-color: white;
		height: 40px;
		text-align: center;
		img {
			margin-top: 10px;
			height: 20px;
		}
		&:nth-child(1) {
			border-radius: 50% 0% 0% 50%;
		}
		&:nth-child(4) {
			border-radius: 0% 50% 50% 0%;
		}
	}

	input {
		flex: 1 1 auto;
		min-width: 0;
		appearance:none
		height: 40px;
		border: 0px;
		background-color: #fff;
		font-size: 1em;
	}
`;

const RecordIcon = styled.div`
	padding-left: 5px;
	button[type="submit"] {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #2b4288;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 0px;
		padding: 0;
		border: none;
		outline: none;
		font: inherit;
		color: inherit;
		img {
		height: 20px;
		height: 20px;
		}
	}
	div {
		height: 40px;
		width: 40px;
		background-color: #2b4288;
		border-radius: 50%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
		height: 20px;
		}
	}
`;