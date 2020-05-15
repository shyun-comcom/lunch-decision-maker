import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'

import ThinkingEmoji from '../assets/thinking-emoji.png';
import '../pages/app.css';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{padding: '56px 40px 0 40px'}}>
                <div style={{fontSize: '20px', color: '#929292', 
                        fontFamily: 'Noto Sans KR'}}>
                    <div>탐색중..</div>
                    <div style={{display: 'flex', flexDirection: 'row',
                            alignItems: 'center'}}>
                        냠냠의 선택은?
                        <div style={{width: '10px'}} />
                        <CircularProgress size={16} thickness={8} color="inherit" />
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    paddingTop: '136px', paddingBottom: '136px'}}>
                <img src={ThinkingEmoji} />
                </div>
            </div>
        )
    }
}