import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Layout } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import {
  CommonNavBar,
  ContainerWithCorner,
  GridLayout,
  ContainerWithBorder,
  RowChart,
} from '../../components';
import './index.scss';

const { Content } = Layout;

const mockData = {
  '1-2': {
    data: [
      { name: '残联机构', value: 51 },
      { name: '残疾人之家', value: 33 },
      { name: '辅具适配中心', value: 32 },
      { name: '教育机构', value: 22 },
      { name: '爱心企业', value: 15 },
      { name: '盲人按摩机构', value: 12 },
      { name: '托养机构', value: 11 },
      { name: '康复机构', value: 2 },
      { name: '其他', value: 1 },
    ]
  }
}

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 24 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 16 },
  { i: '2-2', x: 6, y: 16, w: 12, h: 8 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 4 },
  { i: '3-2', x: 18, y: 4, w: 6, h: 20 },
];

const ServiceAgencies = () => {
  const [echartsOptions, setEchartsOptions] = useState({
    // 服务机构数据
    '1-2': {},
    // 机构每月残疾人变化趋势
    '2-2': {},
  });
  const mergeEchartsOptions = useCallback((mergeData) => {
    setEchartsOptions(oldData => ({
      ...oldData,
      ...mergeData,
    }))
  }, []);
  // 当前选中的服务机构数据
  const [activeAgency, setActiveAgency] = useState();
  useEffect(() => {
    mergeEchartsOptions(mockData);
    setActiveAgency(mockData['1-2'].data[0]);
  }, [mergeEchartsOptions]);

  return (
    <Layout className="service-agencies">
      <CommonNavBar showTime={true} title="服务机构" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="disabled-person-content">
        <GridLayout layout={layout}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人康复机构数据统计</span>
            </div>
            <div className="grid-item-content"></div>
            <div className="grid-item-title">
              <span>服务机构数据</span>
            </div>
            <div
              className="grid-item-content"
              style={{
                flex: 2,
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              <RowChart
                option={echartsOptions['1-2']}
                style={{ flex: 1 }}
                rowBodyStyle={{
                  backgroundColor: '#bb3d00',
                }}
                rowFooterStyle={{
                  backgroundColor: '#bb3d00',
                }}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginLeft: '10rem',
              }}>
                {(echartsOptions['1-2'].data && echartsOptions['1-2'].data.length) && (
                  echartsOptions['1-2'].data.map((item, index) => {
                    const key = index;
                    const isActive = activeAgency && activeAgency.name === item.name;
                    return (
                      <div key={key} onClick={() => setActiveAgency(item)}>
                        <RightOutlined
                          style={{
                            fontSize: '30rem',
                            color: isActive ? '#bb3d00' : 'white',
                          }}
                        />
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">

          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>机构每月残疾人变化趋势</span>
            </div>
            <ReactEcharts
              option={echartsOptions['2-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-1" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人服务机构办理事务情况统计</span>
            </div>
            <div className="grid-item-content"></div>
          </ContainerWithBorder>
          <ContainerWithBorder key="3-2" className="grid-item">
            <div className="grid-item-title">
              <span>残联机构</span>
            </div>
            <div className="grid-item-content"></div>
          </ContainerWithBorder>
        </GridLayout>
      </ContainerWithCorner>
    </Layout>
  )

}


export default ServiceAgencies