import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

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
            <div className='app-root-div' style={{position: 'relative'}}>
                <MetaTags>
                    <meta property="og:title" content="Nyam Nyam" />
                    <meta property="og:type" content="website" />
                    <meta property="og:description"
                        content="메뉴 결정에 어려움을 겪는 사람들을 위한 메뉴&식당 추천서비스
                            Can’t decide? Let “Nyam Nyam” make a choice for you :)" />
                    <meta property="og:image" 
                        content={require('../assets/og-tag-image.png')} />
                </MetaTags>
                <div style={{paddingLeft: '20px', paddingTop: '56px'}}>
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