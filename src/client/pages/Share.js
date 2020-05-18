import React, { Component } from 'react';
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
        <div className="app-page-wrapper">
          <div className="app-main-div">
            <div style={{paddingBottom: '40px'}}>
              <div style={{display: 'flex', flexDirection: 'row',
                  alignItems: 'center', height: 24, lineHeight: 24}}>
                냠냠의 추천!
                <img src={SalivaEmoji} width={24} height={24}
                    style={{paddingLeft: 7}} />
              </div>
              <div>오늘의 메뉴와 식당, 어때?</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <KakaoMap lat={Number(latitude)} lng={Number(longitude)} />
            </div>
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
                  style={{width: '80px', height: '24px', cursor: 'pointer',
                      display: 'flex', flexDirection: 'row', borderRadius: '24px',
                      alignItems: 'center', justifyContent: 'center', color: '#929292',
                      textDecoration: 'none', border: '1px solid #DFDFDF'}}>
                <div style={{paddingRight: '4px'}}>카카오맵</div>
                <img src={UrlLink} width={10} height={10} />
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
