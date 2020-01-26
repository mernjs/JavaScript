import React, { Component } from "react";
import { statusItems } from "../assets/data/statusItems.js";
import styled, { css } from "styled-components";

class StoriesTab extends Component {

	render() {

	    return (
      		
			<StyledList>
        	
				{statusItems.map(item => (
          	
			  		<StyledListItem>
            
						<ListItemAvatar>
              				
							<img src={item.avatar} alt={item.title} />
            			
						</ListItemAvatar>
            
						<ListItemContent onClick={() => console.log(item.id)}>
            
			  				<ContentTopRow>
                		
								<p>{item.title}</p>
              			
						  	</ContentTopRow>
            
			  				<ContentBottomRow>
                		
								<span className="preview">{item.preview}</span>
                				
							</ContentBottomRow>
            
						</ListItemContent>
          	
			  		</StyledListItem>
					
				))}
      		
			</StyledList>
		)
		
	}
	  
}

export default StoriesTab;

const StyledListItem = styled.a`
	background: #fafafa;
	display: flex;
	align-items: center;
	&:active {
		background-color: #e4e4e4;
	}
	&:hover {
		cursor: pointer;
	}
`;

const ListItemAvatar = styled.div`
	flex-basis: 5%;
	padding-left: 10px;
	padding-right: 5px;

	img {
		width: 50px;
		height: 50px;
		border-radius: ${props => (props.avatarIsOpen ? "0%" : "50%")};

		transition: transform 1s ease;
	}
	${props =>
		props.avatarIsOpen && css`
		transform: scale(5) translate(50%, 20px);
		transition: transform 0.5s ease;
		z-index: 9999;
	`}
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
		color: gray;
		font-size: 12px;
	}
`;

const ContentBottomRow = styled.div`
	display: flex;
	justify-content: space-between;
	.preview {
		font-size: 12px;
		color: #737373;
	}
`;

const StyledList = styled.ul`
	padding: 0;
	margin: 0;
`;
