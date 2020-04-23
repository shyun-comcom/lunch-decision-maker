import React, { Component } from 'react';

import Footer from '../components/Footer';
import Loading from '../components/Loading';
import KakaoMap from '../components/KakaoMap';

import WinkEmoji from '../assets/wink-emoji.png';
import SalivaEmoji from '../assets/saliva-emoji.png';
import RandomRetry from '../assets/random-retry.png';
import AddressCopy from '../assets/address-copy.svg';
import UrlLink from '../assets/url-link.svg';
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
  matchList;

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      latitude: 0,
      longitude: 0,
      isFinished: false,
      comp: 0,
      winnerCate: 0,
    };
    this.restaurantList = [];
    this.categoryList = {};
    this.matchList = [];

    this.getShuffledMatch();
  }

  getShuffledMatch = () => {
    /* tournament info */
    for (var i = 0; i < 16; i++) {
      this.matchList[i] = i;
    }
    /* shuffle */
    for (var i = 0; i < 16; i++) {
      const idx = Math.floor(Math.random() * 16);
      var tmp = this.matchList[i];
      this.matchList[i] = this.matchList[idx];
      this.matchList[idx] = tmp;
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude, longitude,
        isLoaded: true
      });
    });
  }

  categorySearchPromise = (latitude, longitude, page, keyword) => {
    return new Promise((resolve, reject) => {
      places.keywordSearch(keyword, (result, status) => {
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

  getNearRestaurantList = async (latitude, longitude, keyword) => {
    const promises = [];
    for (var page = 1; page <= 3; page++) {
      promises.push(this.categorySearchPromise(latitude, longitude, page, keyword));
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

      this.setState({isFinished: true, selected: randomIdx});
      var container = document.getElementById('map');
      var options = {
        center: position, 
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options);
      var marker = new kakao.maps.Marker({ position });
      marker.setMap(map);
  }

  selectOne = (cate) => {
    if (this.state.comp === 28) { // finally pick
      const { latitude, longitude } = this.state;
      this.getNearRestaurantList(latitude, longitude, food_category[cate].name);
      this.setState({winnerCate: cate});
    } else {
      this.matchList.push(cate);
      this.setState({comp: this.state.comp + 2})
    }
  }

  renderCard = (index) => {
    const cate1 = this.matchList[index];
    const cate2 = this.matchList[index + 1];
    return (<div style={{fontFamily: 'Muli Bold', position: 'relative'}}>
      <div className="tournament-card"
          onClick={() => this.selectOne(cate1)}
          style={{background: food_category[cate1].color}}>
        <div style={{fontSize: '24px', position: 'absolute',
            fontWeight: 'bold', left: 24, top: 22}}>
          {food_category[cate1].name}
        </div>
        <img src={food_category[cate1].icon}
            style={{width: 104, height: 104,
                position: 'absolute', right: 32, bottom: 24}} />
      </div>
      <div style={{height: '30px'}} />
      <div className="tournament-card"
          onClick={() => this.selectOne(cate2)}
          style={{background: food_category[cate2].color}}>
        <div style={{fontSize: '24px', position: 'absolute',
            fontWeight: 'bold', left: 24, top: 22}}>
          {food_category[cate2].name}
        </div>
        <img src={food_category[cate2].icon}
            style={{width: 104, height: 104,
                position: 'absolute', right: 32, bottom: 24}} />
      </div>
      <div className="centered-vs">
        VS
      </div>
    </div>)
  }

  render = () => {
    const selected = this.restaurantList[this.state.selected];
    return (
      <div className="app-root-div">
        {this.state.isLoaded ? 
          this.state.isFinished ? 
            <div style={{paddingTop: '56px'}}>
              <div style={{padding: '0 40px 0 40px'}}>
                <div style={{fontSize: '20px', fontWeight: 'bold', paddingBottom: '32px'}}>
                  <div>오예!</div>
                  <div style={{display: 'flex', flexDirection: 'row',
                      alignItems: 'center', height: 24, lineHeight: 24}}>
                    오늘의 우승 메뉴
                    <img src={SalivaEmoji} width={24} height={24} 
                        style={{paddingLeft: 7}} />
                  </div>
                </div>
                <div style={{display: 'flex', paddingBottom: '32px',
                    justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{width: '248px', height: '182px',
                      borderRadius: '24px', position: 'relative', 
                      background: food_category[this.state.winnerCate].color}}>
                    <div style={{fontSize: '24px', position: 'absolute',
                        fontWeight: 'bold', left: 24, top: 22}}>
                      {food_category[this.state.winnerCate].name}
                    </div>
                    <img src={food_category[this.state.winnerCate].icon}
                        style={{width: 104, height: 104,
                            position: 'absolute', right: 32, bottom: 24}} />
                  </div>
                </div>
                <div style={{width: '280px', height: '1px', background: '#E5E5E5'}} />
                <div style={{height: '32px'}} />
                <KakaoMap lat={this.state.latitude} lng={this.state.longitude} />
                <div style={{display: 'flex', flexDirection: 'row',
                    alignItems: 'center', paddingTop: '32px'}}>
                  <div className='category-tag'
                      style={{backgroundColor: food_category[this.state.winnerCate].color}}>
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
                      onClick={() => {
                        this.getShuffledMatch();
                        this.setState({comp: 0, isFinished: false, winnerCate: 0});
                      }}
                      style={{width: '190px', height: '48px', fontSize: '16px',
                              lineHeight: '49px', borderRadius: '24px'}}>
                      <div style={{paddingRight: '4px'}}>다시 하기</div>
                      <img src={RandomRetry} width={16} height={16} 
                          style={{verticalAlign: 'middle'}} />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
            :
            <div style={{padding: '56px 40px 40px 40px'}}>
              <div style={{fontSize: '20px', fontWeight: 'bold',
                  paddingBottom: '40px'}}>
                <div>메뉴 월드컵!</div>
                <div style={{display: 'flex', flexDirection: 'row',
                    alignItems: 'center', height: 24, lineHeight: 24}}>
                  오늘의 취향은?
                  <img src={WinkEmoji} width={24} height={24} 
                      style={{paddingLeft: 7}} />
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column',
                  alignItems: 'center'}}>
                { this.renderCard(this.state.comp) }
              </div>
            </div>
          : <Loading />
        }
      </div>
    );
  }
}
