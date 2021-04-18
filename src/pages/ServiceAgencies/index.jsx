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
  CommomMap,
} from '../../components';
import agencyStatisticsIcon from '../../assets/images/service-agency/agency-statistics-icon.png';
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
  },
  '2-2': {
    grid: [
      {
        top: 10,
        right: 0,
        bottom: 0,
        left: 0,
        containLabel: true,
      }
    ],
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
    ],
    series: [
      {
        type: 'bar',
        data: [2, 4, 6, 6, 8, 6, 2, 2, 3, 1, 5, 6],
      },
      {
        type: 'line',
        data: [2, 4, 6, 6, 8, 6, 2, 2, 3, 1, 5, 6],
      }
    ]
  },
  '3-2': {
    data: [
      { name: '无锡残疾人辅助器具中心', value: 543769 },
      { name: '无锡市残疾人就业信息网', value: 358125 },
      { name: '无锡市残疾人联合会', value: 335155 },
      { name: '无锡市残疾人康复中心', value: 255145 },
      { name: '无锡市残疾人康复研究会', value: 228131 },
      { name: '无锡市盲人联合会', value: 213154 },
      { name: '无锡市肢体残障联合会', value: 185354 },
      { name: '无锡市治理残障康复中心', value: 165835 },
      { name: '无锡市听力康复中心', value: 164528 },
    ],
    unit: '人',
  },
}

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 24 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 16 },
  { i: '2-2', x: 6, y: 16, w: 12, h: 8 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 6 },
  { i: '3-2', x: 18, y: 6, w: 6, h: 18 },
];

const parseNumber = (number) => {
  return number
    .toString()
    .split('')
    .reverse()
    .reduce((result, item, index) => {
      if (index && index % 3 === 0) {
        result.push(',');
      }
      result.push(item);
      return result;
    }, [])
    .reverse()
    .join('');
}
const agencyStatisticsList = [
  { name: '服务机构数量', key: 'agency' },
  { name: '工作人员数量', key: 'staff' },
  { name: '服务对象数量', key: 'customer' },
];
const businessStatisticsList = [
  { name: '办理单位数量', key: 'organization' },
  { name: '本月办理事务数量', key: 'business' },
  { name: '事务完成率', key: 'completion', unit: '%' },
];

const ServiceAgencies = () => {
  const [agencyStatisticsData, setAgencyStatisticsData] = useState({
    agency: 0,
    staff: 0,
    customer: 0,
  });
  const [businessStatisticsData, setBusinessStatisticsData] = useState({
    organization: {
      value: 0,
    },
    business: {
      value: 0,
      rate: 0,
    },
    completion: {
      value: 0,
      rate: 0,
    },
  });
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
    // 1-1
    setAgencyStatisticsData({
      agency: parseNumber(168),
      staff: parseNumber(2365),
      customer: parseNumber(1183),
    });
    mergeEchartsOptions(mockData);
    setActiveAgency(mockData['1-2'].data[0]);
    // 3-1
    setBusinessStatisticsData({
      organization: {
        value: parseNumber(108),
      },
      business: {
        value: parseNumber(12466),
        rate: 14.2,
      },
      completion: {
        value: 88.3,
        rate: -8.3,
      }
    })
  }, [mergeEchartsOptions]);
  return (
    <Layout className="service-agencies">
      <CommonNavBar showTime={true} title="服务机构" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="service-agencies-content">
        <GridLayout layout={layout}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人康复机构数据统计</span>
            </div>
            <div className="grid-item-content agency-statistics">
              {agencyStatisticsList.map(item => {
                const { key, name } = item;
                const value = agencyStatisticsData[key] || 0;
                return (
                  <div key={key} className="agency-statistics-item">
                    <div className="agency-statistics-value">
                      <img
                        alt=""
                        src={agencyStatisticsIcon}
                        className="agency-statistics-icon"
                      />
                      {value}
                    </div>
                    <div className="agency-statistics-name">{name}</div>
                  </div>
                )
              })}
            </div>
            <div className="grid-item-title">
              <span>服务机构数据</span>
            </div>
            <div
              className="grid-item-content"
              style={{
                flex: 4,
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
            <CommomMap />
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
            <div className="grid-item-content business-statistics">
              {businessStatisticsList.map(item => {
                const { key, name, unit } = item;
                const { value, rate } = businessStatisticsData[key];
                const arrow = (rate && (rate > 0 ? '⬆' : '⬇')) || null;
                const rateStyle = (rate && (rate > 0 ? {
                  color: '#00EC00',
                } : {
                  color: '#FF0000',
                })) || {};
                return (
                  <div
                    key={key}
                    className="business-statistics-item"
                  >
                    <div className="business-statistics-value">{value}{unit}</div>
                    <div className="business-statistics-name">{name}</div>
                    <div
                      className="business-statistics-rate"
                      style={rateStyle}
                    >
                      {rate ? (
                        <span>{arrow}{Math.abs(rate)}{rate && '%'}</span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </ContainerWithBorder>
          <ContainerWithBorder key="3-2" className="grid-item">
            <div className="grid-item-title">
              <span>残联机构</span>
            </div>
            <RowChart
              option={echartsOptions['3-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
        </GridLayout>
      </ContainerWithCorner>
    </Layout>
  )

}


export default ServiceAgencies