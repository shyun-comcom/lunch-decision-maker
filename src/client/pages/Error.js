import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './app.css';

import WorldMap from '../assets/world-map.png';

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
        <div className="app-root-div" style={{padding: '60px 40px 60px 40px'}}>
            <Helmet>
            <meta property="og:title" content="Nyam Nyam" />
            <meta property="og:type" content="website" />
            <meta property="og:description"
                content="메뉴 결정에 어려움을 겪는 사람들을 위한 메뉴&식당 추천서비스
                    Can’t decide? Let “Nyam Nyam” make a choice for you :)" />
            <meta property="og:image" 
                content={require('../assets/og-tag-image.png')} />
            </Helmet>
            <div style={{fontSize: '20px', color: '#929292', 
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
    )
  }
}
