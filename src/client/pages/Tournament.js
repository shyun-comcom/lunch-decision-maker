import React, { Component } from 'react';

import ThinkingEmoji from '../assets/thinking-emoji.png';
import './app.css';

export default class TournamentPage extends Component {
  restaurantList;
  categoryList;

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      latitude: 0,
      longitude: 0
    };
    this.restaurantList = [];
    this.categoryList = {};
  }

  render = () => {
    const { latitude, longitude } = this.state;
    return (this.state.isLoaded ? 
      null /* TODO */
      :
      <div className="app-root-div">
        <div style={{fontSize: '20px', color: '#929292', 
                fontFamily: 'Noto Sans KR'}}>
            <div>탐색중..</div>
            <div>냠냠의 선택은?</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            paddingTop: '136px', paddingBottom: '136px'}}>
          <img src={ThinkingEmoji} />
        </div>
      </div>
    );
  }
}
