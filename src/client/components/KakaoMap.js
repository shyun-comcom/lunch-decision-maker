import React, { Component } from 'react';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const position  = new kakao.maps.LatLng(this.props.lat, this.props.lng); 

        var container = document.getElementById('map');
        var options = {
            center: position, 
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        var map = new kakao.maps.Map(container, options);
        var marker = new kakao.maps.Marker({ position });
        marker.setMap(map);
    }

    render() {
        return (
            <div style={{width: '280px', height: '180px', borderRadius: 8}}
                id="map" />
        )
    }
}