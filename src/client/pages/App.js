import React, { Component } from 'react';
import { observer } from 'mobx-react';

import AinizeLogo from '../assets/ainize-logo.svg';
import BurgerIcon from '../assets/burger-icon.png';
import DumplingIcon from '../assets/dumpling-icon.png';
import ChickenIcon from '../assets/chicken-icon.png';
import './app.css';

@observer
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='app-root-div' style={{position: 'relative'}}>
                <div style={{paddingLeft: '20px'}}>
                    <div style={{fontSize: '20px', color: '#3C3C3C', 
                            fontFamily: 'Noto Sans KR'}}>
                        <div>메뉴 결정이 늘 귀찮은</div>
                        <div>당신을 위한 냠냠!</div>
                    </div>
                    <div style={{fontSize: '36px', color: '#3D3D3D',
                            fontWeight: 'bold', fontFamily: 'Muli Bold',
                            paddingTop: '16px', paddingBottom: '48px'}}>
                        Nyam Nyam!
                    </div>
                    <div className='dark-button'
                        style={{width: '160px', height: '48px', 
                                borderRadius: '24px', lineHeight: '48px'}}
                        onClick={() => this.props.history.push('home')}>
                        시작하기
                    </div>
                </div>
                <img src={AinizeLogo} style={{paddingTop: '304px'}} />
                <div className='circle-div' 
                    style={{top: 449, left: -19, background: '#FFF5D0',
                            boxShadow: '0px 2px 16px #FFD43E'}}>
                    <img src={BurgerIcon} style={{width: 60, height: 60}} />
                </div>
                <div className='circle-div' 
                    style={{top: 384, left: 118, background: '#D8E3FF',
                            boxShadow: '0px 2px 24px #8CACFF'}}>
                    <img src={DumplingIcon} style={{width: 60, height: 60}} />
                </div>
                <div className='circle-div' 
                    style={{top: 330, left: 260, background: '#FFE3DA',
                            boxShadow: '0px 2px 24px rgba(255, 0, 0, 0.31)'}}>
                    <img src={ChickenIcon} style={{width: 60, height: 60}} />
                </div>
            </div>
        )
    }
}