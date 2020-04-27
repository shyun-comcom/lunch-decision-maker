import React, { Component } from 'react';

import Footer from '../components/Footer';
import KakaoMap from '../components/KakaoMap';

import SalivaEmoji from '../assets/saliva-emoji.png';
import AddressCopy from '../assets/address-copy.svg';
import UrlLink from '../assets/url-link.svg';
import ShareLink from '../assets/share-link.svg';
import VerticalDots from '../assets/vertical-dots.svg';
import './app.css';

const places = new kakao.maps.services.Places();
const copy = require('clipboard-copy');

export default class RandomPage extends Component {
  constructor(props) {
    super(props);
  }

  getShareLink = () => {
    const { latitude, longitude, selected } = this.state;
    const item = this.restaurantList[selected];
    var newURL = window.location.protocol + "//" + window.location.host + "/share/" 
        + `${latitude}/${longitude}/${item.id}/${item.category_name}/${item.place_name}/${item.road_address_name}`;
    copy(newURL);
  }

  render = () => {
    const { latitude, longitude, pid, cname, pname, paddress } = this.props.match.params;
    return ( 
      <div className="app-root-div">
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
                  onClick={() => copy(paddress)}
                  style={{cursor: 'pointer'}} />
              <div style={{width: '8px' }} />
              <a target="_blank" href={`https://place.map.kakao.com/${pid}`}
                  style={{width: '24px', height: '24px', cursor: 'pointer'}}>
                <img src={UrlLink} width={24} height={24} />
              </a>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', paddingBottom: 32}}>
              <div className="white-button"
                  onClick={() => this.getShareLink()}
                  style={{width: '200px', height: '48px', 
                      borderRadius: '24px', lineHeight: '48px'}}>
                <div style={{paddingRight: '4px', paddingBottom: '1px'}}>
                  결과 링크 공유하기
                </div>
                <img style={{verticalAlign: 'middle'}} src={ShareLink} />
              </div>
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
