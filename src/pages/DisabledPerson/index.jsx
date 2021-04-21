import React, { useCallback, useEffect, useMemo, useState } from 'react';
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


const DisabledPerson = (props) => {
  // 残疾人数
  const [disabledCount, setDisabledCount] = useState(0);

  //残疾人类型总数
  const [disabledStatisticsList, setDisabledStatisticsList] = useState([])

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
    const num = {
      zdcjr: '185369',
      dccjr: "23369",
      gdzcjr: "11247"
    }
    const list = [
      { title: "重度残疾人", num: parseNumber(num.zdcjr) },
      { title: "多重残疾人", num: parseNumber(num.dccjr) },
      { title: "孤独症残疾人", num: parseNumber(num.gdzcjr) },
    ]
    setDisabledStatisticsList(list)
    setDisabledCount(1368422);
  }, []);


  // echarts图表
  const [echartsOptions, setEchartsOptions] = useState({
    // 残疾人类型统计
    '1-2': {
      data: [
        { name: '肢体', value: 87.68 },
        { name: '智力', value: 86.42 },
        { name: '精神', value: 85.37 },
        { name: '听力', value: 84.22 },
        { name: '听力', value: 84.22 },
        { name: '听力', value: 84.22 },
      ]
    },
    // 残疾人数据统计
    '1-3': {
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c} ({d}%)',
        textStyle: {
          fontWeight: 50,
          fontSize: '10'
        }
      },
      series: [
        {
          type: 'pie',
          label: {
            fontWeight: 50,
            color: 'white',
            fontSize: '10'
          },
          radius: '100%',
          selectedMode: 'single',
          data: [
            { value: 735, name: '残疾军人' },
            { value: 510, name: '执证残疾人' },
            { value: 434, name: '疑是残疾人' },
          ]
        }
      ]
    },
    // 残疾人增长趋势图
    '2-2': {
      legend: {
        right: 0,
        top: -5,
        data: ['残疾人人均年收入', '市人均年收入'],
        textStyle: {
          color: 'white'
        }
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '16%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
        type: 'category',
        boundaryGap: false,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
        type: 'value'
      },
      series: [
        {
          name: '残疾人人均年收入',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210, 110, 513, 444, 111, 333]
        },
        {
          name: '市人均年收入',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 441]
        },

      ]
    },
    // 残疾人数据统计
    '3-2': {},
    // 残疾人收入统计
    '3-3': {}
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
                <span className="disabled-count-label">残疾人数</span>
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
                {
                  disabledStatisticsList.map((item) => {
                    return <div className="disabled-item">
                      <img src={Icons.cjr} alt="" />
                      <span className="item-num">{item.num}</span>
                      <span className="item-title">{item.title}</span>
                    </div>
                  })
                }
              </div>
            </div>
            <div className="grid-item-title">
              <span>残疾人类型统计</span>
            </div>
            <RowChart option={echartsOptions['1-2']} className="grid-item-content" style={{ height: '50rem', }}></RowChart>
            <div className="grid-item-title">
              <span>残疾人性别统计</span>
            </div>
            <div className="grid-item-content sex-analysis">
              <div className="sex-rate">
                <img src={Icons.man} alt="" />
                <div className="rate-container">
                  <div className="rate-man" style={{ width: "70%" }}></div>
                  <div className="rate-icon">
                    <div className="rate-bc"></div>
                  </div>
                  <div className="rate-woman" style={{ width: "30%" }}></div>
                </div>
                <img src={Icons.woman} alt="" />
              </div>
              <div className="memo">
                <div className="man-memo">
                  <div style={{ fontSize: '6rem' }}>男性：72%</div>
                  <span><span style={{ fontSize: '18rem' }}>12311</span>人</span>
                </div>
                <div className="woman-memo">
                  <div style={{ fontSize: '6rem' }}>女性：72%</div>
                  <span><span style={{ fontSize: '18rem' }}>12311</span>人</span>
                </div>
              </div>
            </div>
            <div className="grid-item-title">
              <span>残疾人数据统计</span>
            </div>
            <ReactEcharts
              option={echartsOptions['1-3']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">
            <CommomMap></CommomMap>
          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人和全市人均收入增长趋势图</span>
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
            {/* <ReactEcharts
              option={echartsOptions['3-1']}
              className="grid-item-content"
            /> */}
          </ContainerWithBorder>
          <ContainerWithBorder key="3-2" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人收入来源分布</span>
            </div>
            {/* <ReactEcharts
              option={echartsOptions['3-2']}
              className="grid-item-content"
            /> */}
          </ContainerWithBorder>
          <ContainerWithBorder key="3-3" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人受教育程度统计</span>
            </div>
            {/* <ReactEcharts
              option={echartsOptions['3-3']}
              className="grid-item-content"
            /> */}
          </ContainerWithBorder>
        </GridLayout>
      </ContainerWithCorner>
    </Layout >
  )
}

export default DisabledPerson;