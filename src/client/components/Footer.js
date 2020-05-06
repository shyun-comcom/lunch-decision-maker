import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import AinizeCorona from '../assets/ainize-corona.png';
import AinizeDeoldify from '../assets/ainize-deoldify.png';
import AinizeLogo from '../assets/ainize-logo.svg';
import SalivaEmoji from '../assets/saliva-emoji.png';
import YoutubeIcon from '../assets/youtube-icon.svg';
import AinizeIcon from '../assets/ainize-icon.svg';
import GithubIcon from '../assets/github-icon.svg';
import '../pages/app.css';

const LinkButton = withStyles({
  root: {
    background: '#ffffff',
    borderRadius: 24,
    border: '1px solid #DFDFDF',
    boxSizing: 'border-box',
    height: 48,
    minWidth: 248,
    maxWidth: 248,
  },
  label: {
    textTransform: 'none'
  }
})(Button);

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{flexDirection: 'column', background: '#f2f2f2',
                    display: 'flex', alignItems: 'center', padding: '32px 0 32px 0'}}>
                <div style={{height: '27px'}} />
                <img src={SalivaEmoji} style={{width: 72, height: 72}} />
                <div style={{fontSize: '36px', color: '#3D3D3D',
                        fontWeight: 'bold', fontFamily: 'Muli',
                        paddingTop: '24px', paddingBottom: '40px'}}>
                    Nyam Nyam!
                </div>
                <div style={{padding: '0 80px 0 80px', fontSize: '14px',
                        color: '#555555', lineHeight: '20px', paddingBottom: '46px'}}>
                    냠냠은 Ainize 플랫폼에 살고 있는 오픈소스 프로젝트에요. <br /><br />
                    아직은 미흡하지만 좋아해주시면 업그레이드 되서 다시 찾아올게요!
                    서비스와 디자인은 모두 오픈되어 있으니 자유롭게 활용하시길 : )
                </div>
                <LinkButton className='white-button' target="_blank"
                    href={"https://link.ainize.ai/2WvpY1D"}>
                    <div style={{paddingRight: '4px'}}>좋아해주기</div>
                    <img style={{verticalAlign: 'middle'}} src={YoutubeIcon} />
                </LinkButton>
                <div style={{height: '16px'}} />
                <LinkButton className='white-button' target="_blank"
                    href={"https://link.ainize.ai/3cf5h0M"}>
                    <div style={{paddingRight: '4px'}}>Ainize 더 알아보기</div>
                    <img style={{verticalAlign: 'middle'}} src={AinizeIcon} />
                </LinkButton>
                <div style={{height: '16px'}} />
                <LinkButton className='white-button' target="_blank"
                    href={"https://link.ainize.ai/2SBT8uQ"}>
                    <div style={{paddingRight: '4px'}}>냠냠 프로젝트 보기</div>
                    <img style={{verticalAlign: 'middle'}} src={GithubIcon} />
                </LinkButton>
                <div style={{height: '16px'}} />
                <LinkButton className='white-button'
                    onClick={() => this.props.history.goBack()}>
                    처음으로 돌아가기
                </LinkButton>
                <div style={{height: '80px'}} />
                <div style={{color: '#636363', fontSize: 16, fontWeight: 'bold'}}>
                    다른 Ainize 프로젝트 보기
                </div>
                <div style={{height: '32px'}} />
                <a className="ainize-item" target="_blank"
                    href="https://www.youtube.com/watch?v=Q2Lp0CmxOzc">
                    <img src={AinizeCorona} 
                        style={{width: 248, height: 140, borderRadius: 16}} />
                    <div style={{height: 16}} />
                    <div style={{fontSize: 14, fontWeight: 'bold', color: '#000000'}}>
                        코로나 맵 하루만에 만들기 가능?!
                    </div>
                    <div style={{fontSize: 14, fontWeight: 'bold', color: '#000000'}}>
                        오픈소스로 코로나 감염현황 개발하는 법
                    </div>
                    <div style={{height: 3}} />
                    <div style={{fontSize: 12, color: '#929292'}}>
                        #신종코로나 #코로나맵 #개발자
                    </div>
                </a>
                <div style={{height: '40px'}} />
                <a className="ainize-item" target="_blank"
                    href="https://www.youtube.com/watch?v=Gei0nxVqbOo">
                    <img src={AinizeDeoldify} 
                        style={{width: 248, height: 140, borderRadius: 16}} />
                    <div style={{height: 16}} />
                    <div style={{fontSize: 14, fontWeight: 'bold', color: '#000000'}}>
                        흑백사진을 컬러사진으로 바꿔주는 인공지능?!
                    </div>
                    <div style={{height: 3}} />
                    <div style={{fontSize: 12, color: '#929292'}}>
                        #deoldify #흑백사진 #컬러복원
                    </div>
                </a>
                <div style={{height: '40px'}} />
                <a target="_blank" href="https://link.ainize.ai/3cf5h0M">
                    <img src={AinizeLogo} style={{width: 106, height: 35}} />
                </a>
            </div>
        )
    }
}

export default withRouter(Footer);