import React, { Component } from 'react';
import './app.css';

import BlowEmoji from '../assets/blow-emoji.png';
import WinkEmoji from '../assets/wink-emoji.png';
import WhiteArrow from '../assets/white-arrow.svg';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className="app-root-div" style={{padding: '60px 40px 60px 40px'}}>
        <div className="home-item-box" id="random">
            <div className="home-item-desc">
              <div>둘 중 하나 고르기도 REAL 스트레스?!</div>
              <div>나는 한식, 양식 고르는 것도 어려워</div>
            </div>
            <div className="home-item-title">
              냠냠 정해줘! 랜덤 메뉴
            </div>
            <div className="home-item-content">
              <img src={BlowEmoji} width={88} height={88} />
              <div className="dark-button"
                  onClick={() => this.props.history.push("random")}
                  style={{width: '80px', height: '40px', 
                      borderRadius: '24px', lineHeight: '40px'}}>
                {"GO "}
                <img src={WhiteArrow} />
              </div>
            </div>
        </div>
        <div style={{height: '24px'}} />
        <div className="home-item-box" id="tournament">
            <div className="home-item-desc">
              <div>분명 먹고 싶은게 있는데.. 있었는데...</div>
              <div>냠냠, 메뉴 좀 보여줘! 내가 골라볼게</div>
            </div>
            <div className="home-item-title">
              내가 정해! 메뉴 월드컵
            </div>
            <div className="home-item-content">
              <img src={WinkEmoji} width={88} height={88} />
              <div className="dark-button"
                  onClick={() => this.props.history.push("tournament")}
                  style={{width: '80px', height: '40px', 
                      borderRadius: '24px', lineHeight: '40px'}}>
                {"GO "}
                <img src={WhiteArrow} />
              </div>
            </div>
        </div>
      </div>
    )
  }
}
