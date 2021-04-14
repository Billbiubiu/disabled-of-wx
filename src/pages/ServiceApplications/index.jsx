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
  { i: '1-1', x: 0, y: 0, w: 6, h: 4 },
  { i: '1-2', x: 0, y: 4, w: 6, h: 5 },
  { i: '1-3', x: 0, y: 9, w: 6, h: 15 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 16 },
  { i: '2-2', x: 6, y: 16, w: 12, h: 8 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 24 },
];

const ServiceApplications = (props) => {
  const [echartsOptions, setEchartsOptions] = useState({
    // 维文
    '1-2': {},
    // 康复
    '1-3': {},
    // 机构每月残疾人服务申请变化趋势
    '2-2': {},
    // 教就
    '3-1': {},
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
    <Layout className="service-applications">
      <CommonNavBar showTime={true} title="服务申请" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="service-applications-content">
        <GridLayout layout={layout} margin={[5, 5]}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>服务申请人数统计</span>
            </div>
            <div className="grid-item-content">
              <span>申请人数量</span>
              <span>000000000</span>
            </div>
          </ContainerWithBorder>
          <ContainerWithBorder key="1-2" className="grid-item">
            <div className="grid-item-title">
              <span>维文</span>
            </div>
            <ReactEcharts
              option={echartsOptions['1-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="1-3" className="grid-item">
            <div className="grid-item-title">
              <span>康复</span>
            </div>
            <ReactEcharts
              option={echartsOptions['1-3']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">
          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>机构每月残疾人服务申请变化趋势</span>
            </div>
            <ReactEcharts
              option={echartsOptions['2-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-1" className="grid-item">
            <div className="grid-item-title">
              <span>教就</span>
            </div>
            <ReactEcharts
              option={echartsOptions['3-1']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
        </GridLayout>
      </ContainerWithCorner>
    </Layout>
  )
}

export default ServiceApplications;