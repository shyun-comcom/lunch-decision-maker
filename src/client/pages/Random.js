import React, { Component } from 'react';
import axios from 'axios';

import ThinkingEmoji from '../assets/thinking-emoji.png';
import './app.css';

const places = new kakao.maps.services.Places();

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

      /* restList.forEach((elem) => {
        if (this.categoryList[elem.category_name]) { 
          this.categoryList[elem.category_name] += 1;
        } else {
          this.categoryList[elem.category_name] = 1;
        }
      }); */
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
      <div className="app-root-div" style={{padding: '0 40px 0 40px'}}>
        {this.state.isLoaded ?
          <div style={{fontSize: '20px', fontWeight: 'bold', paddingBottom: '40px'}}>
            <div>냠냠!</div>
            <div>식당도 알려줄께! 어때?</div>
          </div>
          : null
        }
        <div style={{width: this.state.width, height: this.state.height,
            borderRadius: 8}} id="map" />
        {this.state.isLoaded ?
          <div style={{paddingTop: '32px'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div className='category-tag' style={{backgroundColor: '#D8E3FF'}}>
                {selected.category_name}
              </div>
              <div style={{paddingLeft: '8px', fontSize: '14px'}}>
                {selected.place_name}
              </div>
            </div>
            <div style={{color: '#929292', fontSize: '12px',
                paddingTop: '12px', paddingBottom: '56px'}}>
              {selected.road_address_name}
            </div>
            <div style={{display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center'}}>
              <div className="dark-button"
                  onClick={() => this.props.history.push('confirm')}
                  style={{width: '160px', height: '48px', 
                      borderRadius: '24px', lineHeight: '48px'}}>
                {"좋아 👍"}
              </div>
            </div>
          </div>
          :
          <div>
            <div style={{fontSize: '20px', color: '#929292', 
                    fontFamily: 'Noto Sans KR'}}>
                <div>탐색중..</div>
                <div>냠냠의 선택은?</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                paddingTop: '136px', paddingBottom: '136px'}}>
              <img src={ThinkingEmoji} />
            </div>
          </div>
        }
      </div>
    );
  }
}
