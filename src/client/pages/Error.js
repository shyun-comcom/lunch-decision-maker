import React, { Component } from 'react';
import './app.css';

import WorldMap from '../assets/world-map.png';

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
        <div className="app-root-div">
          <div className="app-page-wrapper">
            <div className="app-main-div">
              <div style={{fontSize: '20px', color: '#929292', width: '280px',
                      fontFamily: 'Noto Sans KR', fontWeight: 'bold'}}>
                  <div>위치 정보 서비스 공유를</div>
                  <div>허용해 주세요</div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  paddingTop: '136px', paddingBottom: '136px'}}>
                  <img src={WorldMap} width={160} height={160} />
              </div>
            </div>
          </div>
        </div>
    )
  }
}
