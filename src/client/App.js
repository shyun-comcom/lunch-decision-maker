import React, { Component } from 'react';
import axios from 'axios';
import { REACT_APP_KAKAO_API_KEY } from './constants';
import './app.css';

export default class App extends Component {
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
      console.log(position.coords);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      this.getNearRestaurantList(position.coords.latitude, position.coords.longitude);
    });
  }

  getNearRestaurantList = async (latitude, longitude) => {
    for (var page = 1; page <= 3; page++) {
      const res = await axios.get("https://dapi.kakao.com/v2/local/search/category.json", {
        headers: {
          'Authorization': `KakaoAK ${REACT_APP_KAKAO_API_KEY}`
        },
        params: {
          x: longitude,
          y: latitude,
          radius: 1000,
          category_group_code: 'FD6',
          page
        }
      });
      const { documents } = res.data;
      documents.forEach((elem) => {
        const category = elem.category_name.split(' > ');
        this.restaurantList.push({
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
        if (this.categoryList[category[1]]) { this.categoryList[category[1]] += 1; }
        else { this.categoryList[category[1]] = 1; }
      });
    }
    this.setState({isLoaded: true});
  }

  render = () => {
    const { latitude, longitude } = this.state;
    return (
      <div>
        <h1>Current Location</h1>
        <h2>
          { `${latitude}, ${longitude}` }
        </h2>
        { this.state.isLoaded ? 
          Object.keys(this.categoryList).map((key) => 
            <div key={key}>
              {`${key} (${this.categoryList[key]})`}
            </div>
          )
          : null
        }
        { this.state.isLoaded ? 
          this.restaurantList.map((elem) => 
            <div key={elem.id} style={{padding: '10px'}}>
              <div style={{fontWeight: 600}}>{elem.place_name}</div>
              <div>{`[${elem.category_name}] ${elem.address_name}`}</div>
            </div>
          )
          : null
        }
      </div>
    );
  }
}
