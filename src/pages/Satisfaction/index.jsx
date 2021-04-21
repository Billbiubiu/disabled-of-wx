import React, { useCallback, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Layout } from 'antd';
import {
  CommonNavBar,
  ContainerWithCorner,
  GridLayout,
  ContainerWithBorder,
  CommomMap,
  RowChart
} from '../../components';
import './index.scss';

const { Content } = Layout;

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 6 },
  { i: '1-2', x: 0, y: 5, w: 6, h: 18 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 16 },
  { i: '2-2', x: 6, y: 16, w: 12, h: 8 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 24 },
];

const mockData = {
  "1-2": {
    data: [
      { name: '惠山区', value: 87.68 },
      { name: '新吴区', value: 86.42 },
      { name: '惠山区', value: 85.37 },
      { name: '惠山区', value: 84.22 },
      { name: '惠山区', value: 84.22 },
      { name: '惠山区', value: 84.22 },
      { name: '惠山区', value: 84.22 },
      { name: '惠山区', value: 84.22 },
      { name: '惠山区', value: 84.22 },
      { name: '惠山区', value: 70.22 },
      { name: '惠山区', value: 70.22 },
      { name: '惠山区', value: 70.22 },
      { name: '惠山区', value: 70.22 },
      { name: '惠山区', value: 70.22 },
    ]
  },
  "2-2": {
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
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
        boundaryGap: true,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'white'
          }
        },
      },
    ],
    series: [
      {
        type: 'bar',
        name: 'bar',
        data: [2, 4, 6, 6, 8, 6, 2, 2, 3, 1, 5, 6],
      },
      {
        type: 'line',
        name: 'line',
        data: [2, 4, 6, 6, 8, 6, 2, 2, 3, 1, 5, 6],
      }
    ]
  },
  "3-1": {
    data: [
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 95 },
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 94 },
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 94 },
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 93 },
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 92 },
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 90 },
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 89 },
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 87 },
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 86 },
      { name: '对政府和社会各界对残疾人的关爱满意度', value: 85 },
    ]
  }
}

const Satisfaction = (props) => {
  const mergeEchartsOptions = useCallback((mergeData) => {
    setEchartsOptions(oldData => ({
      ...oldData,
      ...mergeData,
    }))
  }, []);

  const [echartsOptions, setEchartsOptions] = useState({
    // 各区平均满意度
    '1-2': {},
    // 机构满意度每月满意度变化趋势
    '2-2': {},
    // 各区域的数据
    '3-1': {},
  });

  const [tjData, setTjData] = useState([
    { title: "办理单位数量", num: 108 },
    { title: "本月办理事务数量", num: 108, scale: '14.2', status: 'down' },
    { title: "平均满意度", num: "82.3%", scale: '14.2', status: 'up' },
  ])

  useEffect(() => {
    mergeEchartsOptions(mockData)
  }, [mergeEchartsOptions]);

  return (
    <Layout className="satisfaction">
      <CommonNavBar showTime={true} title="满意度" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="satisfaction-content">
        <GridLayout layout={layout} margin={[5, 5]}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人满意度情况统计</span>
            </div>
            <div className="grid-item-content">
              {
                tjData.map((item) => {
                  return <div className="content-item">
                    <span className="item-num">{item.num}</span>
                    <span className="item-title">{item.title}</span>
                    {item.status === "up" ? <span className="item-scale text-green">↑{item.scale}</span> : item.status ? <span className="item-scale text-red">↓{item.scale}</span> : <span className="item-scale"></span>}
                  </div>
                }
                )
              }

            </div>
          </ContainerWithBorder>
          <ContainerWithBorder key="1-2" className="grid-item">
            <div className="grid-item-title">
              <span>各区平均满意度</span>
            </div>
            <RowChart
              rowIndxStyle={{ color: 'white' }}
              ifShowArrow={true}
              option={echartsOptions['1-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">
            <CommomMap callBack={() => { }}></CommomMap>
          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>机构满意度每月满意度变化趋势</span>
            </div>
            <ReactEcharts
              option={echartsOptions['2-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-1" className="grid-item">
            <div className="grid-item-title">
              <span>{'惠山区'}</span>
            </div>
            <RowChart
              option={echartsOptions['3-1']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
        </GridLayout>
      </ContainerWithCorner>
    </Layout>
  )
}

export default Satisfaction;