import React, { Component } from 'react';
import { getNearRestaurantList } from '../utils';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';

import Footer from '../components/Footer';
import Loading from '../components/Loading';
import KakaoMap from '../components/KakaoMap';

import { getShortenURL } from '../utils';

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
  copyURL;

  constructor(props) {
    super(props);
    this.state = {
      copyLoading: false,
      isLoaded: false,
      isGenerated: false,
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

    this.setState({isLoaded: true, width: 280, height: 180,
        selected: randomIdx, isGenerated: false, copyLoading: false});

    this.kakaoMap.current.moveMap(randomRest.y, randomRest.x);
  }

  getShareLink = async () => {
    this.setState({copyLoading: true});
    const { selected } = this.state;
    const item = this.restaurantList[selected];
    const newURL = window.location.protocol + "//" + window.location.host + "/share/" 
        + `${item.y}/${item.x}/${item.id}/${item.category_name}/${item.place_name}/${item.road_address_name}`;
    try {
      const shortenURL = await getShortenURL(newURL);
      this.copyURL = shortenURL;
      this.setState({isGenerated: true, copyLoading: false});
    } catch (e) {
      this.copyURL = newURL;
      this.setState({isGenerated: true, copyLoading: false});
    }
  }

  render = () => {
    const { latitude, longitude } = this.state;
    const selected = this.restaurantList[this.state.selected];
    return ( 
      <div className="app-root-div">
        {this.state.isLoaded ?
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
                <KakaoMap lat={this.state.latitude} lng={this.state.longitude} 
                    ref={this.kakaoMap} />
              </div>
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
                { this.state.isGenerated ? 
                  <ResultButton className="white-button" disabled={!this.state.isGenerated}
                      onClick={() => {
                        copy(this.copyURL);
                        alert('공유 링크가 복사되었습니다.');
                      }}>
                    <div style={{display: 'flex', flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center'}}>
                      <div style={{paddingRight: '4px'}}>공유 링크 복사하기</div>
                      <img style={{verticalAlign: 'middle'}} src={ShareLink} />
                    </div>
                  </ResultButton>
                :
                  <ResultButton className="white-button" disabled={this.state.copyLoading}
                      onClick={() => this.getShareLink()}>
                    { this.state.copyLoading ? 
                      <div style={{display: 'flex', flexDirection: 'row',
                          alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{paddingRight: '4px'}}>링크 생성 중...</div>
                        <CircularProgress size={16} thickness={7} color="inherit" />
                      </div>
                      :
                      <div style={{display: 'flex', flexDirection: 'row',
                          alignItems: 'center', justifyContent: 'center'}}>
                        <div>결과 링크 공유</div>
                      </div>
                    }
                  </ResultButton>
                }
                <div style={{height: '16px'}} />
                <ResultButton className='white-button' disabled={this.state.copyLoading}
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
