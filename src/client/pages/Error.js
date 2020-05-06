import React, { Component } from 'react';
import './app.css';

import WorldMap from '../assets/world-map.png';

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
        <div className="app-root-div" style={{padding: '60px 40px 60px 40px'}}>
            <div style={{fontSize: '20px', color: '#929292', 
                    fontFamily: 'Noto Sans KR'}}>
                <div>위치 정보 서비스 공유를</div>
                <div>허용해 주세요</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                paddingTop: '136px', paddingBottom: '136px'}}>
                <img src={WorldMap} width={160} height={160} />
            </div>
        </div>
    )
  }
}
