import React, { Component } from 'react';

import Footer from '../components/Footer';
import Loading from '../components/Loading';
import KakaoMap from '../components/KakaoMap';

import WinkEmoji from '../assets/wink-emoji.png';
import SalivaEmoji from '../assets/saliva-emoji.png';
import './app.css';

import DumplingIcon from '../assets/dumpling-icon.png';
import RiceIcon from '../assets/rice-icon.png';
import ChickenIcon from '../assets/chicken-icon.png';
import BurgerIcon from '../assets/burger-icon.png';
import SushiIcon from '../assets/sushi-icon.png';
import OctopusIcon from '../assets/octopus-icon.png';
import PizzaIcon from '../assets/pizza-icon.png';
import DosirakIcon from '../assets/dosirak-icon.png';
import TacoIcon from '../assets/taco-icon.png';
import BunsikIcon from '../assets/bunsik-icon.png';
import JookIcon from '../assets/jook-icon.png';
import SaladIcon from '../assets/salad-icon.png';
import SandwichIcon from '../assets/sandwich-icon.png';
import BakeryIcon from '../assets/bakery-icon.png';
import WesternIcon from '../assets/western-icon.png';
import AsianIcon from '../assets/asian-icon.png';

const places = new kakao.maps.services.Places();

const food_category = [
  { id: 'korean', name: '한식', color: '#D8E3FF', icon: RiceIcon },
  { id: 'burger', name: '버거', color: '#FFE6C0', icon: BurgerIcon },
  { id: 'chinese', name: '중식', color: '#FFF5D0', icon: DumplingIcon },
  { id: 'japanese', name: '일식', color: '#FFE3DA', icon: SushiIcon },
  { id: 'seafood', name: '해산물', color: '#FFE3DA', icon: OctopusIcon },
  { id: 'chicken', name: '치킨', color: '#FFE6C0', icon: ChickenIcon },
  { id: 'pizza', name: '피자', color: '#FFF5D0', icon: PizzaIcon },
  { id: 'dosirak', name: '도시락', color: '#FFE3DA', icon: DosirakIcon },
  { id: 'mexican', name: '멕시칸', color: '#FFE6C0', icon: TacoIcon },
  { id: 'bunsik', name: '분식', color: '#FFF5D0', icon: BunsikIcon },
  { id: 'bakery', name: '베이커리', color: '#D8E3FF', icon: BakeryIcon },
  { id: 'jook', name: '죽', color: '#FFE6C0', icon: JookIcon },
  { id: 'salad', name: '샐러드', color: '#D8E3FF', icon : SaladIcon },
  { id: 'sandwich', name: '샌드위치', color: '#FFF5D0', icon : SandwichIcon },
  { id: 'western', name: '양식', color: '#FFE3DA', icon : WesternIcon },
  { id: 'asian', name: '아시안', color: '#D8E3FF', icon : AsianIcon },
];

export default class TournamentPage extends Component {
  restaurantList;
  categoryList;

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      latitude: 0,
      longitude: 0,
      isFinished: false
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
      places.keywordSearch('도시락', (result, status) => {
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
          category_group_code: 'FD6',
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
      <div className="app-root-div">
        {this.state.isLoaded ? 
          this.state.isFinished ? 
            <div style={{paddingTop: '56px'}}>
              <div style={{fontSize: '20px', fontWeight: 'bold',
                  paddingBottom: '40px', paddingTop: '56px'}}>
                <div>오예!</div>
                <div style={{display: 'flex', flexDirection: 'row',
                    alignItems: 'center', height: 24, lineHeight: 24}}>
                  오늘의 우승 메뉴
                  <img src={SalivaEmoji} width={24} height={24} 
                      style={{paddingLeft: 7}} />
                </div>
              </div>
            </div>
            :
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
          : <Loading />
        }
      </div>
    );
  }
}
