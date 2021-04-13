import React from 'react'
import { CommonNavBar, ContainerWithCorner } from '../../components/index'
import './index.scss'
import {
  cjr,
  fwjg,
  fwsq,
  wsfw,
  myd
} from '../../assets/images/mainPage/index'
import { useHistory } from "react-router-dom";


const MainPage = () => {
  const history = useHistory();

  return (
    <div className="main-page">
      <CommonNavBar title="无锡市残疾人联合会数据可视化平台"></CommonNavBar>
      <ContainerWithCorner className="main-page-content">
        <div className="handicapped" onClick={() => { history.push("/disabled-person") }}>
          <div className="div-container">
            <img src={cjr} alt="" />
            <span>残疾人</span>
          </div>
        </div>
        <div className="serviceAgencies" onClick={() => { history.push("/serviceAgencies") }}>
          <div className="div-container">
            <img src={fwjg} alt="" />
            <span>服务机构</span>
          </div>
        </div>
        <div className="serviceApply" onClick={() => { history.push("/") }}>
          <div className="div-container">
            <img src={fwsq} alt="" />
            <span>服务申请</span>
          </div>
        </div>
        <div className="interServe" onClick={() => { history.push("/") }}>
          <div className="div-container">
            <img src={wsfw} alt="" />
            <span>网上服务</span>
          </div>
        </div>
        <div className="satisfact" onClick={() => { history.push("/") }}>
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