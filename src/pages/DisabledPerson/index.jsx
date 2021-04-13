import React from 'react';
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
  return (
    <Layout className="disabled-person">
      <CommonNavBar showTime={true} title="残疾人" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="disabled-person-content">
        <GridLayout layout={layout}>
          <ContainerWithBorder key="0" className="grid-item-content"></ContainerWithBorder>
          <ContainerWithBorder key="1" className="grid-item-content"></ContainerWithBorder>
          <ContainerWithBorder key="2" className="grid-item-content"></ContainerWithBorder>
          <ContainerWithBorder key="3" className="grid-item-content"></ContainerWithBorder>
          <ContainerWithBorder key="4" className="grid-item-content"></ContainerWithBorder>
          <ContainerWithBorder key="5" className="grid-item-content"></ContainerWithBorder>
        </GridLayout>
      </ContainerWithCorner>
    </Layout>
  )
}

export default DisabledPerson;