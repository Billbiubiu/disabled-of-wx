import React from 'react';
import { CommonNavBar, ContainerWithCorner } from '../../components/index';
import { cjr, fwjg, fwsq, wsfw, myd } from '../../assets/images/mainPage/index';
import './index.scss';

const MainPage = (props) => {
  const { history } = props;
  return (
    <div className="main-page">
      <CommonNavBar title="无锡市残疾人联合会数据可视化平台" />
      <ContainerWithCorner className="main-page-content">
        <div className="disabled-person" onClick={() => { history.push("/disabled-person") }}>
          <div className="div-container">
            <img src={cjr} alt="" />
            <span>残疾人</span>
          </div>
        </div>
        <div className="service-agencies" onClick={() => { history.push("/service-agencies") }}>
          <div className="div-container">
            <img src={fwjg} alt="" />
            <span>服务机构</span>
          </div>
        </div>
        <div className="service-applications" onClick={() => { history.push("/service-applications") }}>
          <div className="div-container">
            <img src={fwsq} alt="" />
            <span>服务申请</span>
          </div>
        </div>
        <div className="service-online" onClick={() => { history.push("/service-online") }}>
          <div className="div-container">
            <img src={wsfw} alt="" />
            <span>网上服务</span>
          </div>
        </div>
        <div className="satisfaction" onClick={() => { history.push("/satisfaction") }}>
          <div className="div-container">
            <img src={myd} alt="" />
            <span>满意度</span>
          </div>
        </div>
      </ContainerWithCorner>
    </div >
  )

}


export default MainPage