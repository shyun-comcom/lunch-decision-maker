import React, { Component } from 'react';
import { getNearRestaurantList } from '../utils';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Footer from '../components/Footer';
import Loading from '../components/Loading';
import KakaoMap from '../components/KakaoMap';

import RandomRetry from '../assets/random-retry.png';
import SalivaEmoji from '../assets/saliva-emoji.png';
import AddressCopy from '../assets/address-copy.svg';
import UrlLink from '../assets/url-link.svg';
import ShareLink from '../assets/share-link.svg';
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

export default class RandomPage extends Component {
  restaurantList;
  categoryList;
  kakaoMap;

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      latitude: 0,
      longitude: 0,
      selected: 0,
    };
    this.restaurantList = [];
    this.categoryList = {};
    this.kakaoMap = React.createRef();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude, longitude
      });
      this.setRandomInfo(latitude, longitude);
    }, (error) => {
      this.props.history.push('/error');
    }, { maximumAge: 0 });
  }

  setRandomInfo = async (latitude, longitude) => {
    const restList = await getNearRestaurantList(latitude, longitude);
    this.restaurantList = restList;
    const randomIdx = Math.floor(Math.random() * this.restaurantList.length);
    const randomRest = this.restaurantList[randomIdx];

    this.setState({isLoaded: true, width: 280, height: 180, selected: randomIdx});

    this.kakaoMap.current.moveMap(randomRest.y, randomRest.x);
  }

  getShareLink = () => {
    const { latitude, longitude, selected } = this.state;
    const item = this.restaurantList[selected];
    var newURL = window.location.protocol + "//" + window.location.host + "/share/" 
        + `${latitude}/${longitude}/${item.id}/${item.category_name}/${item.place_name}/${item.road_address_name}`;
    copy(encodeURI(newURL));
    alert('공유 링크가 복사되었습니다.');
  }

  render = () => {
    const { latitude, longitude } = this.state;
    const selected = this.restaurantList[this.state.selected];
    return ( 
      <div className="app-root-div">
        {this.state.isLoaded ?
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
              <KakaoMap lat={this.state.latitude} lng={this.state.longitude} 
                  ref={this.kakaoMap} />
              <div style={{display: 'flex', flexDirection: 'row',
                  alignItems: 'center', paddingTop: '32px'}}>
                <div className='category-tag' style={{backgroundColor: '#D8E3FF'}}>
                  {selected.category_name}
                </div>
                <div style={{paddingLeft: '8px', fontSize: '14px'}}>
                  {selected.place_name}
                </div>
              </div>
              <div style={{color: '#929292', fontSize: '12px', height: 24,
                  display: 'flex', flexDirection: 'row', alignItems: 'center',
                  paddingTop: '9px', paddingBottom: '53px'}}>
                {selected.road_address_name}
                <div style={{width: '8px' }} />
                <img src={AddressCopy} width={24} height={24} 
                    onClick={() => {
                      copy(selected.road_address_name);
                      alert('주소가 복사되었습니다.');
                    }}
                    style={{cursor: 'pointer'}} />
                <div style={{width: '8px' }} />
                <a target="_blank" href={selected.place_url}
                    style={{width: '24px', height: '24px', cursor: 'pointer'}}>
                  <img src={UrlLink} width={24} height={24} />
                </a>
              </div>
              <div style={{display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', paddingBottom: 32}}>
                <ResultButton className="white-button"
                    onClick={() => this.getShareLink()}>
                  <div style={{paddingRight: '4px'}}>결과 링크 공유하기</div>
                  <img style={{verticalAlign: 'middle'}} src={ShareLink} />
                </ResultButton>
                <div style={{height: '16px'}} />
                <ResultButton className='white-button'
                    onClick={() => this.setRandomInfo(latitude, longitude)}>
                    <div style={{paddingRight: '4px'}}>한번 더 랜덤</div>
                    <img src={RandomRetry} width={16} height={16} 
                        style={{verticalAlign: 'middle'}} />
                </ResultButton>
                <div style={{height: '32px'}} />
                <img src={VerticalDots} />
              </div>
            </div>
            <Footer />
          </div>
          : <Loading />
        }
      </div>
    );
  }
}
