import React, { Component } from 'react';

export default class KakaoMap extends Component {
    kakaoMap;
    marker;

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const position = new kakao.maps.LatLng(this.props.lat, this.props.lng); 

        var container = document.getElementById('map');
        var options = {
            center: position, 
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        this.kakaoMap = new kakao.maps.Map(container, options);
        this.marker = new kakao.maps.Marker({ position });
        this.marker.setMap(this.kakaoMap);
    }

    moveMap = (latitude, longitude) => {
        this.marker.setMap(null); // remove previous marker
        const position = new kakao.maps.LatLng(latitude, longitude);
        this.kakaoMap.setCenter(position);
        this.marker = new kakao.maps.Marker({ position });
        this.marker.setMap(this.kakaoMap);
    }

    render() {
        return (
            <div style={{width: '280px', height: '180px', borderRadius: 8}}
                id="map" />
        )
    }
}