import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Layout } from 'antd';
import {
  CommonNavBar,
  ContainerWithCorner,
  GridLayout,
  ContainerWithBorder,
  RowChart,
} from '../../components';
import * as Icons from '../../assets/images/disabled-person';
import './index.scss';

const { Content } = Layout;

const mockData = {
  '1-1-3': {
    data: [
      { name: '肢体', value: 543769 },
      { name: '智力', value: 410527 },
      { name: '精神', value: 273684 },
      { name: '听力', value: 136842 },
    ],
    unit: '人',
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
  '3-1': {
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        data: [
          { value: 20, name: '14周岁以下' },
          { value: 30, name: '14~22周岁' },
          { value: 40, name: '22~60周岁' },
          { value: 10, name: '60周岁以上' },
        ]
      },
    ]
  },
  '3-2': {
    legend: {
      bottom: '5%',
      left: 'center',
      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '50%'],
        avoidLabelOverlap: false,
        data: [
          { value: 37, name: '务工收入' },
          { value: 22, name: '养殖收入' },
          { value: 26, name: '经销收入' },
          { value: 15, name: '种地收入' },
        ]
      },
    ]
  },
  '3-3': {
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
        axisLabel: {
          interval: 0,
        },
        data: ['无', '小学', '初中', '中专', '高中', '高职', '大专', '本科', '研究生', '博士', '博士后'],
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
        data: [2, 4, 6, 6, 8, 6, 2, 2, 3, 1, 5],
      },
    ]
  },
}

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 24 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 16 },
  { i: '2-2', x: 6, y: 16, w: 12, h: 8 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 8 },
  { i: '3-2', x: 18, y: 8, w: 6, h: 8 },
  { i: '3-3', x: 18, y: 16, w: 6, h: 8 },
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
const disabledStatisticsList = [
  { name: '重度残疾人', key: 'zdcjr', icon: Icons.zdcjr },
  { name: '低保', key: 'db', icon: Icons.db },
  { name: '低收入数', key: 'dsrs', icon: Icons.dsrs },
  { name: '就业', key: 'jy', icon: Icons.jy },
  { name: '生活补贴', key: 'shbt', icon: Icons.shbt },
  { name: '护理人数', key: 'hlrs', icon: Icons.hlrs },
]

const DisabledPerson = (props) => {
  // 残疾人数
  const [disabledCount, setDisabledCount] = useState(0);
  const disabledCountList = useMemo(() => {
    const list = disabledCount.toString().split('').reverse();
    while (list.length < 7) list.push('0');
    return list.reduce((result, item, index) => {
      if (index && index % 3 === 0) {
        result.push(',');
      }
      result.push(item);
      return result;
    }, []).reverse();
  }, [disabledCount]);
  useEffect(() => {
    setDisabledCount(1368422);
  }, []);
  // 残疾人统计数据
  const [disabledStatisticsData, setDisabledStatisticsData] = useState({
    zdcjr: 0,
    db: 0,
    dsrs: 0,
    jy: 0,
    shbt: 0,
    hlrs: 0,
  });
  useEffect(() => {
    setDisabledStatisticsData({
      db: parseNumber(1222),
      dsrs: parseNumber(1222),
      hlrs: parseNumber(1222),
      jy: parseNumber(1222),
      shbt: parseNumber(1222),
      zdcjr: parseNumber(1222),
    })
  }, []);
  // echarts图表
  const [echartsOptions, setEchartsOptions] = useState({
    // 残疾人类型统计
    '1-1-3': {},
    // 残疾人增长趋势图
    '2-2': {},
    // 残疾人年龄分布统计
    '3-1': {},
    // 残疾人收入来源分布
    '3-2': {},
    // 残疾人受教育程度统计
    '3-3': {},
  });
  const mergeEchartsOptions = useCallback((mergeData) => {
    setEchartsOptions(oldData => ({
      ...oldData,
      ...mergeData,
    }))
  }, []);
  useEffect(() => {
    mergeEchartsOptions(mockData)
  }, [mergeEchartsOptions]);
  return (
    <Layout className="disabled-person">
      <CommonNavBar showTime={true} title="残疾人" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="disabled-person-content">
        <GridLayout layout={layout}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人数据统计</span>
            </div>
            <div className="grid-item-content" style={{ flex: 'none' }}>
              <div className="disabled-count">
                <span className="disabled-count-label">申请人数量</span>
                <span className="disabled-count-value">
                  {
                    disabledCountList.map((item, index) => {
                      const key = index;
                      const className = item === ',' ? 'disabled-count-separate' : 'disabled-count-number';
                      return (
                        <span key={key} className={className}>{item}</span>
                      )
                    })
                  }
                </span>
              </div>
              <div className="disabled-statistics">
                {disabledStatisticsList.map(item => {
                  const { key, name, icon } = item;
                  const value = disabledStatisticsData[key] || 0;
                  return (
                    <div key={key} className="disabled-statistics-item">
                      <img
                        alt=""
                        src={icon}
                        className="disabled-statistics-icon"
                      />
                      <div>
                        <div className="disabled-statistics-value">{value}</div>
                        <div className="disabled-statistics-name">{name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="grid-item-title">
              <span>残疾人性别统计</span>
            </div>
            <div className="grid-item-content" style={{ flex: 'none' }}>
              <div className="proportion-of-gender" style={{ margin: '5rem 0' }}>
                <div style={{
                  border: '3rem solid #C236FF',
                  borderRadius: '4rem',
                  height: '30rem',
                  display: 'flex',
                  alignItems: 'stretch',
                  padding: '3rem',
                }}>
                  <div style={{
                    flex: 55,
                    marginRight: '3rem',
                    backgroundColor: '#C236FF',
                  }}></div>
                  <div style={{
                    flex: 44,
                    backgroundColor: '#C236FF',
                  }}></div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <span>男性：55%</span><br />
                    <span style={{ fontWeight: 'bold' }}>958人</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span>女性：45%</span><br />
                    <span style={{ fontWeight: 'bold' }}>757人</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-item-title">
              <span>残疾人类型统计</span>
            </div>
            <RowChart
              option={echartsOptions['1-1-3']}
              className="grid-item-content"
              style={{ height: '200rem' }}
            />
            <div className="grid-item-title">
              <span>残疾人等级统计</span>
            </div>
            <div className="grid-item-content"></div>
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">

          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人增长趋势图</span>
            </div>
            <ReactEcharts
              option={echartsOptions['2-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-1" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人年龄分布统计</span>
            </div>
            <ReactEcharts
              option={echartsOptions['3-1']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-2" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人收入来源分布</span>
            </div>
            <ReactEcharts
              option={echartsOptions['3-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-3" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人受教育程度统计</span>
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

export default DisabledPerson;