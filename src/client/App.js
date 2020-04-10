import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = { 
    username: null,
    latitude: 0,
    longitude: 0
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));

    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }

  render() {
    const { username, latitude, longitude } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <h2>
          {`${latitude}, ${longitude}`}
        </h2>
      </div>
    );
  }
}
