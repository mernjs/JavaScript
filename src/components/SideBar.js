import React, { Component } 	from "react";
import { connect } 				from "react-redux";
import { bindActionCreators } 	from "redux";

import { load as loadMessages } from "../reducers/ducks/message";

class SideBar extends Component {

  	state = { activeSideBar: "first" }; 

  	componentDidMount() {
	    this.props.loadMessages({ id: 3 });
  	}

  	handleBackClick = e => {
	    this.setState({ activeSideBar: "first" });
  	};

  	handleComposeClick = e => {
	    this.setState({ activeSideBar: "second" });
  	};

  	onSearchInSideBarFirst = text => {
	    console.log("Searched text in SideBarFirst: ", text);
  	};

  	onSearchInSideBarSecond = text => {
	    console.log("Searched text in SideBarSecond: ", text);
  	};

  	render() {
	    return (
      		<div className={`SideBar SideBar--${this.state.activeSideBar}-active`}>
        		
				<div className="SideBar__first">
          			
				  	<div className="Heading row">
            	
						<div className="SideBarHeading__avatar col-md-9 col-xs-9">
              	
				  			<div className="SideBarHeading__avatar__icon">
                
								<h5 style={{ lineHeight: "20px", fontWeight: "bold", color: '#fff' }}>	RNChat	</h5>
              	
				  			</div>
            	
						</div>
            	
						<div onClick={e => this.handleComposeClick(e)} className="SideBarHeading__conversations col-md-2 col-xs-2">
					
							<i className="SideBarHeading__conversations__icon fa fa-comments" />
					
						</div>
					
						<div style={{cursor: 'pointer'}} onClick={this.props.onClick} className="SideBarHeading__menu col-md-1 col-xs-1">
					
							<i className="SideBarHeading__menu__icon fa fa-ellipsis-v" />
					
						</div>
          		
					</div>

					<ul className="nav nav-tabs nav-justified">
					  	<li className="active"><a data-toggle="tab" href="#chats">CHATS (21)</a></li>
					  	<li><a data-toggle="tab" href="#stories">STORIES</a></li>
					  	<li><a data-toggle="tab" href="#calls">CALLS</a></li>
					</ul>

				<div class="tab-content">

				  	<div id="chats" class="tab-pane fade in active">
					   
					  	<div className="SearchBox row">

							<div className="SearchBox__form col-md-12">
							
								<div className="form-group has-feedback">
							
									<input type="text" className="SearchBox__form__input form-control" onChange={e => this.onSearchInSideBarFirst(e.target.value)} />
							
									<span className="SearchBox__form__search_icon glyphicon glyphicon-search form-control-feedback" />
							
								</div>
							
							</div>
						
						</div>

						<div className="ConversationsArchive row">
							
							{this.props.conversations.map(conversation => (
							
								<div key={conversation.uuid} onClick={() => this.props.loadMessages(conversation)} className="ConversationsArchiveItem col-md-12 col-sm-12 col-xs-12" >
							
									<div className="row">
							
										<div className="ConversationsArchiveItem__avatar col-md-3 col-sm-3 col-xs-3">
							
											<div className="ConversationsArchiveItem__avatar__icon">
							
												<img src={conversation.avatar} alt="avatar" />
							
											</div>
							
										</div>
							
										<div className="ConversationsArchiveItem__info col-md-9 col-sm-9 col-xs-9">
							
											<span className="ConversationsArchiveItem__info__name">
											
												<strong>{conversation.name}</strong>
											
												<span style={{float: "right", fontSize: '10px'}}>12:20 AM</span>
											
											</span>
							
											<br />
							
											<span className="ConversationsArchiveItem__info__time">
											
												<i className="fa fa-check" style={{ fontSize: 10, color: '#2b4288', marginRight: '5px' }} aria-hidden="true" ></i> 
												
												{conversation.lastMessage.text.length > 12 ? conversation.lastMessage.text.substring(0, 12).concat("...") : conversation.lastMessage.text}
												
												<span style={{height: 24, width: 24, backgroundColor: '#2b4288', color: '#fff', padding: 5, borderRadius: 20, fontWeight: '600', textAlign: 'center', fontSize: 10, float: 'right', marginRight: '-40px'}}>12</span> 
											
											</span>
							
										</div>
							
									</div>
							
								</div>
							
							))}
					
						</div>

					</div>




					<div id="stories" class="tab-pane fade">
					    <div className="SearchBox row">

							<div className="SearchBox__form col-md-12">
							
								<div className="form-group has-feedback">
							
									<input type="text" className="SearchBox__form__input form-control" onChange={e => this.onSearchInSideBarFirst(e.target.value)} />
							
									<span className="SearchBox__form__search_icon glyphicon glyphicon-search form-control-feedback" />
							
								</div>
							
							</div>
						
						</div>

						<div className="ConversationsArchive row">
							
							{this.props.conversations.map(conversation => (
							
								<div key={conversation.uuid} onClick={() => this.props.loadMessages(conversation)} className="ConversationsArchiveItem col-md-12 col-sm-12 col-xs-12" >
							
									<div className="row">
							
										<div className="ConversationsArchiveItem__avatar col-md-3 col-sm-3 col-xs-3">
							
											<div className="ConversationsArchiveItem__avatar__icon">
							
												<img src={conversation.avatar} alt="avatar" />
							
											</div>
							
										</div>
							
										<div className="ConversationsArchiveItem__info col-md-9 col-sm-9 col-xs-9">
							
											<span className="ConversationsArchiveItem__info__name">
											
												<strong>{conversation.name}</strong>
											
											</span>
							
											<br />
							
											<span className="ConversationsArchiveItem__info__time">
												12:20 AM
											</span>
							
										</div>
							
									</div>
							
								</div>
							
							))}
					
						</div>						
					</div>
					  


					<div id="calls" class="tab-pane fade">
					    <div className="SearchBox row">

							<div className="SearchBox__form col-md-12">
							
								<div className="form-group has-feedback">
							
									<input type="text" className="SearchBox__form__input form-control" onChange={e => this.onSearchInSideBarFirst(e.target.value)} />
							
									<span className="SearchBox__form__search_icon glyphicon glyphicon-search form-control-feedback" />
							
								</div>
							
							</div>
						
						</div>

						<div className="ConversationsArchive row">
							
							{this.props.conversations.map((conversation, index) => (
							
								<div key={conversation.uuid} onClick={() => this.props.loadMessages(conversation)} className="ConversationsArchiveItem col-md-12 col-sm-12 col-xs-12" >
							
									<div className="row">
							
										<div className="ConversationsArchiveItem__avatar col-md-3 col-sm-3 col-xs-3">
							
											<div className="ConversationsArchiveItem__avatar__icon">
							
												<img src={conversation.avatar} alt="avatar" />
							
											</div>
							
										</div>
							
										<div className="ConversationsArchiveItem__info col-md-9 col-sm-9 col-xs-9">
							
											<span className="ConversationsArchiveItem__info__name">
											
												<strong>{conversation.name}</strong>
												<span style={{float: "right", fontSize: '10px'}}>
												{index*2 === index ? <i class="fa fa-video-camera" style={{ fontSize: 18, color: '#2b4288' }} aria-hidden="true" ></i> :
												<i class="fa fa-phone" style={{ fontSize: 20, color: '#2b4288' }} aria-hidden="true"></i> }
												</span>
											</span>
							
											<br />
							
											<span className="ConversationsArchiveItem__info__time">
												<i class="fa fa-reply" style={{ fontSize: 9, color: 'red' }} aria-hidden="true" ></i> October 27, 22:20
											</span>
							
										</div>
							
									</div>
							
								</div>
							
							))}
					
						</div>
					  </div>

					</div>
				</div>















				<div className="SideBar__second">
					
					<div className="OverlapHeading row">
					
						<div className="OverlapHeading__heading">
					
							<div onClick={e => this.handleBackClick(e)} className="OverlapHeading__heading__backButton col-md-1 col-sm-1 col-xs-1">
					
								<i className="fa fa-arrow-left" aria-hidden="true" />
					
							</div>
					
							<div className="OverlapHeading__heading__title col-md-11 col-sm-11 col-xs-11">
					
								<strong>Start a new chat</strong>
					
							</div>
					
						</div>
					
					</div>

					<div className="SearchBox row">
						
						<div className="SearchBox__form col-md-12">
						
							<div className="form-group has-feedback">
						
								<input type="text" className="SearchBox__form__input form-control" onChange={e => this.onSearchInSideBarSecond(e.target.value)} />
						
								<span className="SearchBox__form__search_icon glyphicon glyphicon-search form-control-feedback" />
						
							</div>
						
						</div>
					
					</div>
					
					<div className="AllConversationsArchive row">
						
						{this.props.conversations.map(conversation => (
						
							<div key={conversation.uuid} onClick={() => this.props.loadMessages(conversation)} className="ConversationsArchiveItem col-md-12 col-sm-12 col-xs-12" >
						
								<div className="row">
						
									<div className="ConversationsArchiveItem__avatar col-md-3 col-sm-3 col-xs-3">
						
										<div className="ConversationsArchiveItem__avatar__icon">
						
											<img src={conversation.avatar} alt="avatar" />
						
										</div>
						
									</div>
						
									<div className="ConversationsArchiveItem__info col-md-9 col-sm-9 col-xs-9">
						
										<span className="ConversationsArchiveItem__info__name">
						
											<strong>{conversation.name}</strong>
						
										</span>
						
										<br />
						
										<span className="ConversationsArchiveItem__info__time">
						
											{conversation.lastMessage.text.length > 12 ? conversation.lastMessage.text.substring(0, 12).concat("...") : conversation.lastMessage.text}
						
										</span>
						
									</div>
						
								</div>
						
							</div>
						
						))}
				
					</div>
          
        		</div>

      		</div>
    	)
  	}
}

const mapStateToProps = state => ({
  	conversations: state.conversations
});

const mapDispatchToProps = dispatch => bindActionCreators({loadMessages}, dispatch);

export default connect( mapStateToProps, mapDispatchToProps)(SideBar);