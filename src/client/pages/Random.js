import React, { Component } from 'react';

import Footer from '../components/Footer';
import Loading from '../components/Loading';

import RandomRetry from '../assets/random-retry.png';
import SalivaEmoji from '../assets/saliva-emoji.png';
import AddressCopy from '../assets/address-copy.svg';
import UrlLink from '../assets/url-link.svg';
import './app.css';

const places = new kakao.maps.services.Places();
const copy = require('clipboard-copy');

export default class RandomPage extends Component {
  restaurantList;
  categoryList;

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      latitude: 0,
      longitude: 0,
      selected: 0,
      height: 0,
      width: 0
    };
    this.restaurantList = [];
    this.categoryList = {};
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude, longitude
      });
      this.getNearRestaurantList(latitude, longitude);
    });
  }

  categorySearchPromise = (latitude, longitude, page) => {
    return new Promise((resolve, reject) => {
      places.categorySearch('FD6', (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const resList = [];
          result.forEach((elem) => {
            const category = elem.category_name.split(' > ');
            resList.push({
              id: elem.id,
              address_name: elem.address_name,
              road_address_name: elem.road_address_name,
              category_name: category[1],
              distance: elem.distance,
              place_name: elem.place_name,
              place_url: elem.place_url,
              x: elem.x,
              y: elem.y
            });
          });
          resolve(resList);
        } else {
          resolve([]);
        }
      }, {
          x: longitude,
          y: latitude,
          radius: 1000,
          page
      });
    })
  }

  getNearRestaurantList = async (latitude, longitude) => {
    const promises = [];
    for (var page = 1; page <= 3; page++) {
      promises.push(this.categorySearchPromise(latitude, longitude, page));
    }

    Promise.all(promises).then(async (res) => {
      var restList = [];
      res.forEach((elem) => {
        restList = restList.concat(elem);
      });

      this.restaurantList = restList;
      this.setRandomInfo();
    });
  }

  setRandomInfo = () => {
      const randomIdx = Math.floor(Math.random() * this.restaurantList.length);
      const randomRest = this.restaurantList[randomIdx];
      const position  = new kakao.maps.LatLng(randomRest.y, randomRest.x); 

      this.setState({isLoaded: true, width: 280, height: 180, selected: randomIdx});
      var container = document.getElementById('map');
      var options = {
        center: position, 
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options);
      var marker = new kakao.maps.Marker({ position });
      marker.setMap(map);
  }

  render = () => {
    const selected = this.restaurantList[this.state.selected];
    return ( 
      <div className="app-root-div">
        {this.state.isLoaded ?
          <div style={{fontSize: '20px', fontWeight: 'bold',
              padding: '56px 40px 40px 40px'}}>
            <div style={{display: 'flex', flexDirection: 'row',
                alignItems: 'center', height: 24, lineHeight: 24}}>
              냠냠의 추천!
              <img src={SalivaEmoji} width={24} height={24}
                  style={{paddingLeft: 7}} />
            </div>
            <div>오늘의 메뉴와 식당, 어때?</div>
          </div>
          : null
        }
        <div style={{padding: '0 40px 0 40px'}}>
          <div style={{width: this.state.width, height: this.state.height,
              borderRadius: 8}} id="map" />
        </div>
        {this.state.isLoaded ?
          <div style={{paddingTop: '32px'}}>
            <div style={{padding: '0 40px 0 40px'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
                    onClick={() => copy(selected.road_address_name)}
                    style={{cursor: 'pointer'}} />
                <div style={{width: '8px' }} />
                <a target="_blank" href={selected.place_url}
                    style={{width: '24px', height: '24px', cursor: 'pointer'}}>
                  <img src={UrlLink} width={24} height={24} />
                </a>
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', paddingBottom: 64}}>
              <div className="white-button"
                  onClick={() => this.props.history.push('confirm')}
                  style={{width: '200px', height: '48px', 
                      borderRadius: '24px', lineHeight: '48px'}}>
                결과 링크 공유하기
              </div>
              <div style={{height: '16px'}} />
              <div className='white-button'
                  onClick={() => this.setRandomInfo()}
                  style={{width: '190px', height: '48px', fontSize: '16px',
                          lineHeight: '49px', borderRadius: '24px'}}>
                  <div style={{paddingRight: '4px'}}>한번 더 랜덤</div>
                  <img src={RandomRetry} width={16} height={16} 
                      style={{verticalAlign: 'middle'}} />
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
