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

      restList.forEach((elem) => {
        if (this.categoryList[elem.category_name]) { 
          this.categoryList[elem.category_name] += 1;
        } else {
          this.categoryList[elem.category_name] = 1;
        }
      });
      this.restaurantList = restList;

      // TODO (seonghwa) : random select

      this.setState({isLoaded: true, width: 260, height: 180});

      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options);
    });
  }

  render = () => {
    const { latitude, longitude } = this.state;
    return ( 
      <div className="app-root-div">
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
          <div>
            {
              Object.keys(this.categoryList).map((key) => 
                <div key={key}>
                  {`${key} (${this.categoryList[key]})`}
                </div>
              )
            }
            {/* 
              this.restaurantList.map((elem) => 
                <div key={elem.id} style={{padding: '10px'}}>
                  <div style={{fontWeight: 600}}>{elem.place_name}</div>
                  <div>{`[${elem.category_name}] ${elem.address_name}`}</div>
                </div>
              )
            */}
          </div>
          :
          <div>
            <div style={{fontSize: '20px', color: '#929292', 
                    fontFamily: 'Noto Sans KR'}}>
                <div>탐색중..</div>
                <div>냠냠의 선택은?</div>
            </div>
              <img src={ThinkingEmoji} style={{paddingTop: '32px'}} />
          </div>
        }
      </div>
    );
  }
}
