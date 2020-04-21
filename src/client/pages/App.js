import React, { Component } from 'react';
import { observer } from 'mobx-react';

import YummyEmoji from '../assets/yummy-emoji.png';
import AinizeLogo from '../assets/ainize-logo.svg';
import './app.css';

@observer
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='app-root-div'>
                <div style={{fontSize: '20px', color: '#929292', 
                        fontFamily: 'Noto Sans KR'}}>
                    <div>메뉴 결정이 늘 귀찮은</div>
                    <div>고민하는 당신을 냠냠!</div>
                </div>
                <div style={{fontSize: '36px', color: '#3D3D3D',
                        fontWeight: 'bold', fontFamily: 'Muli',
                        paddingTop: '12px', paddingBottom: '48px'}}>
                    Nyam Nyam!
                </div>
                <div className='dark-button'
                    style={{width: '160px', height: '48px', 
                            borderRadius: '24px', lineHeight: '48px'}}
                    onClick={() => this.props.history.push('home')}>
                    시작하기
                </div>
                <img src={AinizeLogo} style={{paddingTop: '121px'}} />
            </div>
        )
    }
}