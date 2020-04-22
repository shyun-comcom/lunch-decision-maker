import React, { Component } from 'react';
import './app.css';

import WorldMap from '../assets/world-map.png';
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
            <div className="home-item-title">
              니가 정해! 랜덤 메뉴
            </div>
            <div className="home-item-desc">
              <div>메뉴와 함께, 반경 1km 내 식당까지!</div>
              <div>냠냠에게 맡겨봐</div>
            </div>
            <div className="home-item-content">
              <img src={WorldMap} width={88} height={88} />
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
            <div className="home-item-title">
              내가 정해! 메뉴 월드컵
            </div>
            <div className="home-item-desc">
              <div>16강으로 진행되는 어쩌구 저쩌구</div>
              <div>설명이 있으면 좋을 듯</div>
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
