import React from 'react'
import './index.scss'
import { useHistory } from "react-router-dom";
import { CommonNavBar, ContainerWithCorner, GridLayout, ContainerWithBorder, CommomMap } from '../../components';
import './index.scss';

// 布局数据
const layout = [
  { i: '0', x: 0, y: 0, w: 6, h: 24 }, // 左侧
  { i: '1', x: 6, y: 0, w: 12, h: 16 }, // 地图
  { i: '2', x: 6, y: 16, w: 12, h: 8 }, // 中下
  { i: '3', x: 18, y: 0, w: 6, h: 8 }, // 右上
  { i: '4', x: 18, y: 8, w: 6, h: 8 }, // 右中
  { i: '5', x: 18, y: 16, w: 6, h: 8 }, // 右下
];

const ServiceAgencies = () => {
  const history = useHistory();

  return (
    <div className="service-agencies">
      <CommonNavBar showTime={true} title="服务机构" btnType="back"></CommonNavBar>
      <ContainerWithCorner className="service-agencies-content">
        <GridLayout layout={layout}>
          <ContainerWithBorder key="0" className="grid-item-content"></ContainerWithBorder>
          <ContainerWithBorder key="1" className="grid-item-content">
            <CommomMap callBack={() => { }}></CommomMap>
          </ContainerWithBorder>
          <ContainerWithBorder key="2" className="grid-item-content"></ContainerWithBorder>
          <ContainerWithBorder key="3" className="grid-item-content"></ContainerWithBorder>
          <ContainerWithBorder key="4" className="grid-item-content"></ContainerWithBorder>
          <ContainerWithBorder key="5" className="grid-item-content"></ContainerWithBorder>
        </GridLayout>
      </ContainerWithCorner>
    </div >
  )

}


export default ServiceAgencies