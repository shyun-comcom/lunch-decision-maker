import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Footer from '../components/Footer';
import KakaoMap from '../components/KakaoMap';

import SalivaEmoji from '../assets/saliva-emoji.png';
import AddressCopy from '../assets/address-copy.svg';
import HandupIcon from '../assets/handup-icon.png';
import UrlLink from '../assets/url-link.svg';
import VerticalDots from '../assets/vertical-dots.svg';
import './app.css';

const ResultButton = withStyles({
  root: {
    background: '#ffffff',
    borderRadius: 24,
    border: '1px solid #DFDFDF',
    boxSizing: 'border-box',
    height: 48,
    minWidth: 200,
    maxWidth: 200,
  },
  label: {
    textTransform: 'none'
  }
})(Button);

const copy = require('copy-text-to-clipboard');

export default class SharePage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const { latitude, longitude, pid, cname, pname, paddress } = this.props.match.params;
    return ( 
      <div className="app-root-div">
        <Helmet>
          <meta property="og:title" content="Nyam Nyam" />
          <meta property="og:type" content="website" />
          <meta property="og:description"
              content="메뉴 결정에 어려움을 겪는 사람들을 위한 메뉴&식당 추천서비스
                  Can’t decide? Let “Nyam Nyam” make a choice for you :)" />
          <meta property="og:image" 
              content={require('../assets/og-tag-image.png')} />
        </Helmet>
        <div style={{paddingTop: '56px'}}>
          <div style={{padding: '0 40px 0 40px'}}>
            <div style={{paddingBottom: '40px'}}>
              <div style={{display: 'flex', flexDirection: 'row',
                  alignItems: 'center', height: 24, lineHeight: 24}}>
                냠냠의 추천!
                <img src={SalivaEmoji} width={24} height={24}
                    style={{paddingLeft: 7}} />
              </div>
              <div>오늘의 메뉴와 식당, 어때?</div>
            </div>
            <KakaoMap lat={Number(latitude)} lng={Number(longitude)} />
            <div style={{display: 'flex', flexDirection: 'row',
                alignItems: 'center', paddingTop: '32px'}}>
              <div className='category-tag' style={{backgroundColor: '#D8E3FF'}}>
                {cname}
              </div>
              <div style={{paddingLeft: '8px', fontSize: '14px'}}>
                {pname}
              </div>
            </div>
            <div style={{color: '#929292', fontSize: '12px', height: 24,
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                paddingTop: '9px', paddingBottom: '53px'}}>
              {paddress}
              <div style={{width: '8px' }} />
              <img src={AddressCopy} width={24} height={24} 
                  onClick={() => {
                    copy(paddress);
                    alert('주소가 복사되었습니다.');
                  }}
                  style={{cursor: 'pointer'}} />
              <div style={{width: '8px' }} />
              <a target="_blank" href={`https://place.map.kakao.com/${pid}`}
                  style={{width: '24px', height: '24px', cursor: 'pointer'}}>
                <img src={UrlLink} width={24} height={24} />
              </a>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', paddingBottom: 32}}>
              <ResultButton className="white-button"
                  onClick={() => this.props.history.push('/')}>
                <div style={{paddingRight: '4px'}}>나도 해보기</div>
                <img style={{verticalAlign: 'middle'}} src={HandupIcon} />
              </ResultButton>
              <div style={{height: '32px'}} />
              <img src={VerticalDots} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
