import React, { Component } from 'react';
import { observer } from 'mobx-react';

import AinizeLogo from '../assets/ainize-logo.svg';
import SalivaEmoji from '../assets/saliva-emoji.png';
import FacebookIcon from '../assets/facebook-icon.svg';
import GithubIcon from '../assets/github-icon.svg';
import './app.css';

@observer
export default class ConfirmPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='app-root-div'>
                <div style={{flex: 1, flexDirection: 'column',
                        display: 'flex', alignItems: 'center'}}>
                    <div style={{height: '64px'}} />
                    <img src={SalivaEmoji} style={{width: 72, height: 72}} />
                    <div style={{fontSize: '36px', color: '#3D3D3D',
                            fontWeight: 'bold', fontFamily: 'Muli Bold',
                            paddingTop: '24px', paddingBottom: '40px'}}>
                        Nyam Nyam!
                    </div>
                    <div style={{padding: '0 80px 0 80px', fontSize: '14px',
                            color: '#555555', lineHeight: '20px', paddingBottom: '46px'}}>
                        냠냠은 Ainize 플랫폼에 살고 있는 오픈소스 프로젝트에요. <br /><br />
                        아직은 미흡하지만 좋아해주시면 업그레이드 되서 다시 찾아올께요!
                        서비스와 디자인은 모두 오픈되어 있으니 자유롭게 활용하시길 : )
                    </div>
                    <div className='white-button'
                        style={{width: '248px', height: '48px', fontSize: '16px',
                                lineHeight: '49px', borderRadius: '24px'}}>
                        <div style={{paddingRight: '4px'}}>좋아해주기</div>
                        <img style={{verticalAlign: 'middle'}} src={FacebookIcon} />
                    </div>
                    <div style={{height: '16px'}} />
                    <div className='white-button'
                        style={{width: '248px', height: '48px', fontSize: '16px',
                                lineHeight: '49px', borderRadius: '24px'}}>
                        <div style={{paddingRight: '4px'}}>냠냠 프로젝트 보기</div>
                        <img style={{verticalAlign: 'middle'}} src={GithubIcon} />
                    </div>
                    <div style={{height: '16px'}} />
                    <div className='white-button'
                        style={{width: '248px', height: '48px', fontSize: '16px',
                                lineHeight: '49px', borderRadius: '24px'}}>
                        처음으로 돌아가기
                    </div>
                    <div style={{height: '48px'}} />
                </div>
                <div style={{flex: 1, flexDirection: 'column', background: '#f2f2f2',
                        display: 'flex', alignItems: 'center', padding: '32px 0 32px 0'}}>
                    <img src={AinizeLogo} />
                </div>
            </div>
        )
    }
}