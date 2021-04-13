import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import { ContainerWithCorner, GridLayout, ContainerWithBorder } from '../../components';
import './index.scss';

const { Header, Content } = Layout;

// 布局数据
const layout = [
  { i: '0', x: 0, y: 0, w: 6, h: 24 }, // 左侧
  { i: '1', x: 6, y: 0, w: 12, h: 16 }, // 地图
  { i: '2', x: 6, y: 16, w: 12, h: 8 }, // 中下
  { i: '3', x: 18, y: 0, w: 6, h: 8 }, // 右上
  { i: '4', x: 18, y: 8, w: 6, h: 8 }, // 右中
  { i: '5', x: 18, y: 16, w: 6, h: 8 }, // 右下
];
// 布局配置
const layoutConfig = {
  rowNum: 24,
  colNum: 24,
  margin: [10, 10],
};

const Login = (props) => {
  const layoutContainerRef = useRef();
  const [layoutVisible, setLayoutVisible] = useState(false); // 用于延迟渲染
  const [layoutSize, setLayoutSize] = useState({ width: 0, height: 0 }); // 布局组件宽高
  // 确定布局组件宽高
  useEffect(() => {
    const layoutContainer = layoutContainerRef.current;
    const { clientWidth: width, clientHeight: height } = layoutContainer;
    setLayoutSize({ width, height });
    setLayoutVisible(true);
  }, [])
  return (
    <Layout className="disabled-person">
      <Header className="disabled-person-header">
        <h1 style={{ color: '#fff' }}>无锡市残疾人联合会数据可视化平台</h1>
      </Header>
      <ContainerWithCorner
        component={Content}
        className="disabled-person-content">
        <div
          ref={layoutContainerRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {
            layoutVisible && (
              <GridLayout
                {...{
                  ...layoutConfig,
                  ...layoutSize,
                  layout,
                }}
              >
                <ContainerWithBorder key="0"></ContainerWithBorder>
                <ContainerWithBorder key="1"></ContainerWithBorder>
                <ContainerWithBorder key="2"></ContainerWithBorder>
                <ContainerWithBorder key="3"></ContainerWithBorder>
                <ContainerWithBorder key="4"></ContainerWithBorder>
                <ContainerWithBorder key="5"></ContainerWithBorder>
              </GridLayout>
            )
          }
        </div>
      </ContainerWithCorner>
    </Layout>
  )
}

export default Login;