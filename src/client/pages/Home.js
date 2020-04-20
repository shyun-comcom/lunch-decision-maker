import React, { Component } from 'react';
import './app.css';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className="app-root-div">
        <div className="home-item-box" id="random"
            onClick={() => this.props.history.push("random")}>
            <div className="home-item-title">
              니가 정해! 랜덤 메뉴
            </div>
            <div className="home-item-desc">
              <div>메뉴와 함께, 반경 1km 내 식당까지!</div>
              <div>냠냠에게 맡겨봐</div>
            </div>
        </div>
        <div style={{height: '24px'}} />
        <div className="home-item-box" id="tournament"
            onClick={() => this.props.history.push("tournament")}>
            <div className="home-item-title">
              내가 정해! 메뉴 월드컵
            </div>
            <div className="home-item-desc">
              <div>16강으로 진행되는 어쩌구 저쩌구</div>
              <div>설명이 있으면 좋을 듯</div>
            </div>
        </div>
      </div>
    )
  }
}
