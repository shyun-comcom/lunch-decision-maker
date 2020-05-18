import React, { Component } from 'react';

import AinizeLogo from '../assets/ainize-logo.svg';
import BurgerIcon from '../assets/burger-icon.png';
import DumplingIcon from '../assets/dumpling-icon.png';
import ChickenIcon from '../assets/chicken-icon.png';
import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div className='app-root-div'
                    style={{position: 'relative', width: '320px', padding: '0 60px'}}>
                    <div style={{padding: '0 10px'}}>
                        <div style={{fontSize: '20px', color: '#3C3C3C', 
                                fontFamily: 'Noto Sans KR'}}>
                            <div>메뉴 결정부터 식당 추천까지,</div>
                            <div>냠냠 하나면 돼!</div>
                        </div>
                        <div style={{fontSize: '36px', color: '#3D3D3D',
                                fontWeight: 600, fontFamily: 'Muli',
                                paddingTop: '16px', paddingBottom: '48px'}}>
                            Nyam Nyam!
                        </div>
                        <div className='dark-button'
                            style={{width: '160px', height: '48px', 
                                    borderRadius: '24px', lineHeight: '48px'}}
                            onClick={() => this.props.history.push('/home')}>
                            시작하기
                        </div>
                    </div>
                    <div style={{height: '304px'}} />
                    <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                        <a target="_blank" href="https://link.ainize.ai/3cf5h0M">
                            <img src={AinizeLogo} />
                        </a>
                    </div>
                    <div className='circle-div' 
                        style={{top: 393, left: 18, background: '#FFF5D0',
                                boxShadow: '0px 2px 16px #FFD43E'}}>
                        <img src={BurgerIcon} style={{width: 60, height: 60}} />
                    </div>
                    <div className='circle-div' 
                        style={{top: 328, left: 160, background: '#D8E3FF',
                                boxShadow: '0px 2px 24px #8CACFF'}}>
                        <img src={DumplingIcon} style={{width: 60, height: 60}} />
                    </div>
                    <div className='circle-div' 
                        style={{top: 274, left: 302, background: '#FFE3DA',
                                boxShadow: '0px 2px 24px rgba(255, 0, 0, 0.31)'}}>
                        <img src={ChickenIcon} style={{width: 60, height: 60}} />
                    </div>
                </div>
            </div>
        )
    }
}