import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'antd';
import { CommonNavBar, ContainerWithCorner, GridLayout, ContainerWithBorder } from '../../components';
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
  const resizeTimer = useRef();
  useEffect(() => {
    const onResize = () => {
      if (resizeTimer.current) {
        clearTimeout(resizeTimer.current)
      }
      resizeTimer.current = setTimeout(() => {
        const layoutContainer = layoutContainerRef.current;
        const { clientWidth: width, clientHeight: height } = layoutContainer;
        setLayoutSize({ width, height });
        setLayoutVisible(true);
        resizeTimer.current = null;
      }, 100)
    }
    // 触发初次计算
    onResize()
    // 监听resize事件，重新计算布局宽高
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

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
          {
            layoutVisible && (
              <GridLayout
                {...{
                  ...layoutConfig,
                  ...layoutSize,
                  layout,
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
            )
          }
        </div>
      </ContainerWithCorner>
    </Layout>
  )
}

export default Login;