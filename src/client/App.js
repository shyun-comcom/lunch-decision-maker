import React, { Component } from 'react';
import { KAKAO_MAP_API_KEY } from './constants';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    // async load kakao map api
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services`;

    console.log(script.src);
    script.onload = () => this.onScriptLoad();
    document.head.appendChild(script);
  }

  onScriptLoad = () => {
    // get current geolocation
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }

  render = () => {
    const { latitude, longitude } = this.state;
    return (
      <div>
        <h1>Current Location</h1>
        <h2>
          { `${latitude}, ${longitude}` }
        </h2>
        <form>
          <input type="text" />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
