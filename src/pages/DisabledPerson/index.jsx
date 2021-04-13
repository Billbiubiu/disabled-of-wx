import React, { useRef } from 'react';
import { Layout } from 'antd';
import { CommonNavBar, ContainerWithCorner, GridLayout, ContainerWithBorder } from '../../components';
import './index.scss';

const { Content } = Layout;

// 布局数据
const layout = [
  { i: '0', x: 0, y: 0, w: 6, h: 24 }, // 左侧
  { i: '1', x: 6, y: 0, w: 12, h: 16 }, // 地图
  { i: '2', x: 6, y: 16, w: 12, h: 8 }, // 中下
  { i: '3', x: 18, y: 0, w: 6, h: 8 }, // 右上
  { i: '4', x: 18, y: 8, w: 6, h: 8 }, // 右中
  { i: '5', x: 18, y: 16, w: 6, h: 8 }, // 右下
];

const DisabledPerson = (props) => {
  const layoutContainerRef = useRef();
  return (
    <Layout className="disabled-person">
      <CommonNavBar showTime={true} title="残疾人" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="disabled-person-content">
        <div
          ref={layoutContainerRef}
          className="grid-layout-container"
        >
          <GridLayout
            {...{
              layout,
              layoutContainerRef,
            }}
          >
            <div key="0">
              <ContainerWithBorder className="grid-item-content"></ContainerWithBorder>
            </div>
            <div key="1">
              <ContainerWithBorder className="grid-item-content"></ContainerWithBorder>
            </div>
            <div key="2">
              <ContainerWithBorder className="grid-item-content"></ContainerWithBorder>
            </div>
            <div key="3">
              <ContainerWithBorder className="grid-item-content"></ContainerWithBorder>
            </div>
            <div key="4">
              <ContainerWithBorder className="grid-item-content"></ContainerWithBorder>
            </div>
            <div key="5">
              <ContainerWithBorder className="grid-item-content"></ContainerWithBorder>
            </div>
          </GridLayout>
        </div>
      </ContainerWithCorner>
    </Layout>
  )
}

export default DisabledPerson;