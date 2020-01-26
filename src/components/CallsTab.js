import React, { Component } from "react";
import styled from "styled-components";
import { calls } from "../assets/data/calls";

class CallsTab extends Component {
	
  	render(){
		
		return (

			<StyledList>

				{calls.map(item => (
					
					<StyledListItem>
						
						<ListItemAvatar> <img src={item.avatar} alt={item.title} /> </ListItemAvatar>
					
						<ListItemContent onClick={() => console.log(item.id)}>
            
			  				<ContentTopRow>
                		
								<p>{item.title}</p>
                		
								<span>
									{item.call === 'voice' ? 
									<i class="fa fa-video-camera" style={{ fontSize: 18 }} aria-hidden="true" ></i>:
									<i class="fa fa-phone" style={{ fontSize: 20 }} aria-hidden="true"></i>
									}
									
					
									
								
								</span>
              			
						  	</ContentTopRow>
            
			  				<ContentBottomRow>
                		
								<span className="preview">
								<i class="fa fa-reply" style={{ fontSize: 9, color: 'red' }} aria-hidden="true" ></i> October 27, 22:20</span>
                				
								{/* <span>icon</span> */}
              				
							</ContentBottomRow>
            
						</ListItemContent>

					</StyledListItem>

				))}

			</StyledList>

		)

	}
	
}

export default CallsTab;


const StyledList = styled.div`
  	padding: 0;
  	margin: 0;
`;

const StyledListItem = styled.a`
  	background: #fafafa;
  	display: flex;
  	align-items: center;
  	&:active {
    	background-color: #e4e4e4;
  	}
`;

const ListItemAvatar = styled.div`
  	flex-basis: 5%;
  	padding-left: 10px;
  	padding-right: 5px;
  	img {
    	width: 50px;
    	height: 50px;
    	border-radius: 50%;
  	}
`;

const ListItemContent = styled.div`
  	flex-basis: 95%;
  	border-bottom: 1px solid #e4e4e4;
  	padding-left: 15px;
  	padding: 17px 15px 17px 0px;
`;

const ContentTopRow = styled.div`
  	display: flex;
  	justify-content: space-between;
  	padding-bottom: 4.5px;
  	p {
		margin: 0;
		color: #202020;
		font-weight: 550;
		font-size: 15px;
	}
	span {
		color: #2b4288;
		font-size: 12px;
	}
`;

const ContentBottomRow = styled.div`
  	display: flex;
  	justify-content: space-between;
  	span:first-child {
    	font-size: 12px;
    	white-space: nowrap;
    	overflow: hidden;
    	max-width: 250px;
    	text-overflow: ellipsis;
  	}
  	span {
    	color: #737373;
    	font-size: 0.8em;
  	}
`;
