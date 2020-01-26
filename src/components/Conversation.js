import React, { Component } 	from "react";
import ReactDOM 				from "react-dom";
import { connect } 				from "react-redux";
import { bindActionCreators } 	from "redux";
import styled 		from "styled-components";

// import arrow 		from "../assets/images/arrow-left2.svg";
import camera 		from "../assets/images/camera-grey.svg";
import attachment 	from "../assets/images/attachment.svg";
import happy 		from "../assets/images/happy.svg";
import mic 			from "../assets/images/mic.svg";
import rightArrow 	from "../assets/images/arrow-right.svg";

import { create as createMessage } 	from "../reducers/ducks/message";
import background 					from "../assets/images/background.jpg";

class Conversation extends Component {
	  
	state = { 
		messages: [],
		formValue: ""
	};
	  
	componentDidUpdate() {
	
		this.scrollChatToBottom();
	
	}

  	scrollChatToBottom() {
		
		const chat = ReactDOM.findDOMNode(this.refs.chatComponent);
		
		chat.scrollTop = chat.scrollHeight - chat.clientHeight;
	  
	}

	handleChange = (event) => {
	
		this.setState({ formValue: event.target.value });
	
	}

	handleSubmit = (event) => {

		event.preventDefault();

    	if (!this.state.formValue.length) return;
	
		this.props.createMessage({
      		text: this.state.formValue,
      		uuid: `uuid-${new Date().toISOString()}`,
      		sentAt: "15:55",
      		origin: "sender"
    	});

		this.setState({ formValue: "" });

		this.scrollChatToBottom()
	
	}

	addEmoji = () => {
	
		this.setState({ formValue: "😎" });
	
	}

  	render() {
	    return (
      		<div className="Conversation">
        		
				<div className="Heading row">
          			
					 <div className="ConversationHeading__avatar col-md-1 col-sm-1 col-xs-2">
            			
						<div className="ConversationHeading__avatar__icon">
				
							<img src="https://images.pexels.com/photos/921646/pexels-photo-921646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="avatar" />
            	
						</div>

          			</div>
          			
					<div className="ConversationHeading__name col-md-9 col-sm-9 col-xs-8">
            	
						<strong className="ConversationHeading__name__meta">Chandani Singh</strong>

            			<div className="ConversationHeading__online">last seen today at 21:02</div>

          			</div>
          			
					<div className="ConversationHeading__dot col-md-2 col-sm-2 col-xs-2">
					
						<i class="ConversationHeading__dot__icon fa fa-video-camera" aria-hidden="true" />
						
						<i class="ConversationHeading__dot__icon fa fa-phone" aria-hidden="true"/>
				
						<i className="ConversationHeading__dot__icon fa fa-ellipsis-v" aria-hidden="true" />
					
					</div>

        		</div>
				
				<div ref="chatComponent" className="Chat row" style={{ background: `url(${background}) fixed center` }}>
          			
					{this.props.messages.map(message => (
            			
						<div className={`Message Message--${message.origin} row`}>
              			
						  	<div className={`Message__wrapper col-sm-12`}>
								{message.origin === 'receiver' && <span className="Conversations__avatar__icon" style={{paddingRight: '10px'}}>
									
									<img src="https://images.pexels.com/photos/921646/pexels-photo-921646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="avatar" />
				
								</span>}
								<div className="Message__wrapper__body">
                  		
						  			<div className="Message__wrapper__body__text"> {message.text} </div>
									 
								  	{/* <div className="Message__wrapper__body__sentAt"> {message.sentAt} </div> */}
                				
								</div>

								{message.origin === 'sender' && <span className="Conversations__avatar__icon" style={{paddingLeft: '10px'}}>
									
									<img src="https://images.pexels.com/photos/921646/pexels-photo-921646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="avatar" />
				
								</span>}
								
              				
							</div>
            			
						</div>

          			))}

        		</div>


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


        		

      		</div>
    	)
  	}
}

const mapStateToProps = state => ({
  	messages: state.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({createMessage},dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);


// footer style
const StyledChatScreenFooter = styled.footer`
  background: #ece5dd;
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 75%;
  ${'' /* max-width: 450px; */}
  padding: 10px;
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