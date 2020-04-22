import React, { Component } from 'react';

import ThinkingEmoji from '../assets/thinking-emoji.png';
import WinkEmoji from '../assets/wink-emoji.png';
import './app.css';

const places = new kakao.maps.services.Places();

export default class TournamentPage extends Component {
  restaurantList;
  categoryList;

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      latitude: 0,
      longitude: 0
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
      this.setState({isLoaded: true});
    });
  }

  render = () => {
    const { latitude, longitude } = this.state;
    return (
      <div className="app-root-div" style={{padding: '0 40px 0 40px'}}>
        {this.state.isLoaded ? 
          <div style={{paddingTop: '56px'}}>
            <div style={{fontSize: '20px', fontWeight: 'bold',
                paddingBottom: '40px', paddingTop: '56px'}}>
              <div>메뉴 월드컵!</div>
              <div style={{display: 'flex', flexDirection: 'row',
                  alignItems: 'center', height: 24, lineHeight: 24}}>
                오늘의 취향은?
                <img src={WinkEmoji} width={24} height={24} 
                    style={{paddingLeft: 7}} />
              </div>
            </div>
            <div>
              {Object.keys(this.categoryList).map((key) => 
                <div key={key} style={{fontSize: '12px'}}>
                  {`[${key}] ${this.categoryList[key]}`}
                </div>
              )}
            </div>
          </div>
          :
          <div style={{paddingTop: '56px'}}>
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
