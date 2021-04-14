import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Layout } from 'antd';
import {
  CommonNavBar,
  ContainerWithCorner,
  GridLayout,
  ContainerWithBorder,
} from '../../components';
import './index.scss';

const { Content } = Layout;

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 24 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 16 },
  { i: '2-2', x: 6, y: 16, w: 12, h: 8 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 8 },
  { i: '3-2', x: 18, y: 8, w: 6, h: 8 },
  { i: '3-3', x: 18, y: 16, w: 6, h: 8 },
];

const ServiceOnline = (props) => {
  const [echartsOptions, setEchartsOptions] = useState({
    // 互动交流
    '1-1-2': {},
    // 业务模块
    '1-1-3': {},
    // 康复签到
    '2-2': {},
    // 点击量
    '3-1': {},
    // 无障碍地图
    '3-2': {},
    // 无障碍建筑与设施评分
    '3-3': {},
  });
  const mergeEchartsOptions = useCallback((mergeData) => {
    setEchartsOptions(oldData => ({
      ...oldData,
      ...mergeData,
    }))
  }, []);
  useEffect(() => {
    mergeEchartsOptions({})
  }, [mergeEchartsOptions]);
  return (
    <Layout className="service-online">
      <CommonNavBar showTime={true} title="服务申请" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="disabled-person-content">
        <GridLayout layout={layout}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>注册人数据统计</span>
            </div>
            <div className="grid-item-content"></div>
            <div className="grid-item-title">
              <span>互动交流</span>
            </div>
            <ReactEcharts
              option={echartsOptions['1-1-2']}
              className="grid-item-content"
            />
            <div className="grid-item-title">
              <span>业务模块</span>
            </div>
            <ReactEcharts
              option={echartsOptions['1-1-3']}
              className="grid-item-content"
            />
            <div className="grid-item-title">
              <span>热点服务</span>
            </div>
            <div className="grid-item-content"></div>
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">

          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>康复签到</span>
            </div>
            <ReactEcharts
              option={echartsOptions['2-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-1" className="grid-item">
            <div className="grid-item-title">
              <span>点击量</span>
            </div>
            <ReactEcharts
              option={echartsOptions['3-1']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-2" className="grid-item">
            <div className="grid-item-title">
              <span>无障碍地图</span>
            </div>
            <ReactEcharts
              option={echartsOptions['3-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-3" className="grid-item">
            <div className="grid-item-title">
              <span>无障碍建筑与设施评分</span>
            </div>
            <ReactEcharts
              option={echartsOptions['3-3']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
        </GridLayout>
      </ContainerWithCorner>
    </Layout>
  )
}

export default ServiceOnline;