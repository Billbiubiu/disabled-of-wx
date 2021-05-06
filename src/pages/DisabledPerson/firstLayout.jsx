import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  GridLayout,
  ContainerWithBorder,
  CommonMap,
  RowChart
} from '../../components';
import * as Icons from '../../assets/images/disabled-person';
import './firstLayout.scss';
import {getDisabledNum,disabeldType,disabeldSex} from '../../service/index'

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


const FirstLayout = (props) => {
  // 残疾人数
  const [disabledCount, setDisabledCount] = useState(0);
  //残疾人类型总数
  const [disabledStatisticsList, setDisabledStatisticsList] = useState([])
  // 残疾人数据统计
  const [disabledAnalysis, setDisabledAnalysis] = useState([])
  // 残疾人收入统计
  const [disabledMoney, setDisabledMoney] = useState([])
  //选择地图的区域
  const [area,setArea] = useState()
  // 残疾人性别数量
   const [sexNum,setSexNum] = useState({})

  // 是否切换到第二屏幕
  const [switchFlag, setSwtichFlag] = useState(false)
  // 
  const [timeRange,setTimeRange]= useState({})

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
    //执证残疾人总数
    getDisabledNum(area,timeRange.startDate,timeRange.endDate).then((res)=>{
      setDisabledCount(res.data.sum)
    })
    // 残疾人类型统计
    disabeldType(area,timeRange.startDate,timeRange.endDate).then((res)=>{
      setDisabledAnalysis(res.data)
    })
    // 残疾人性别数量
    disabeldSex(area,timeRange.startDate,timeRange.endDate).then((res)=>{
      setSexNum(res.data)
    })

    // mock数据
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
    const disabledNum = {
      db: 5369,
      dsr: 85369,
      yhdc: 3125,
      rjzfmj: 33.25
    }
    const disabledList = [
      { title: "低保人数", num: parseNumber(disabledNum.db), unit: "人" },
      { title: "低收入人数", num: parseNumber(disabledNum.dsr), unit: "人" },
      { title: "一户多残数量", num: parseNumber(disabledNum.yhdc), unit: "人" },
      { title: "人均住房面积", num: disabledNum.rjzfmj, unit: "平米" },
    ]

    const moneyNum = {
      cjrrjnsr: '185369',
      srjnsr: "23369",
    }
    const moneyList = [
      { title: "残疾人人均年收入", num: parseNumber(moneyNum.cjrrjnsr), img: Icons.cjr_big },
      { title: "市人均年收入", num: parseNumber(moneyNum.srjnsr), img: Icons.people },
    ]
    setSexNum({man:70,woman:30})
    setDisabledMoney(moneyList)
    setDisabledAnalysis(disabledList)
    setDisabledStatisticsList(list)
    setDisabledCount(1368422);
  }, [area,timeRange]);


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
      color: ['#0263ff', '#ff1493', '#00f5ff'],
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
      color: ['#a4d915', '#00f5ff'],
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
        data: ['20010年', '2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年']
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
    // 残疾人数据统计1
    '3-2-1': {
      color: ['#ff1493', '#00f5ff'],
      title: {
        text: '家庭医生签约统计',
        left: 'center',
        top: 0,
        textStyle: {
          color: 'white',
          fontSize: '10'
        }
      },
      legend: {
        textStyle: {
          fontSize: 10,
          color: 'white'
        },
        width: 1000,
        bottom: '1',
        left: 'center',
        itemWidth: 14,
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '80%'],
          label: {
            show: false,
            position: 'center',
            color: "#fff",
            backgroundColor: "transparent",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '10',
              formatter: `{d}%

{b}`,
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
          ],
          roseType: 'radius',
        }
      ]
    },
    // 残疾人数据统计2
    '3-2-2': {
      color: ['#ff1493', '#00f5ff'],
      title: {
        text: '残疾人婚姻状况统计',
        left: 'center',
        top: 0,
        textStyle: {
          color: 'white',
          fontSize: '10'
        }
      },
      legend: {
        textStyle: {
          fontSize: 10,
          color: 'white'
        },
        width: 1000,
        bottom: '1',
        left: 'center',
        itemWidth: 14,
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '80%'],
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              formatter: `{d}%

{b}`,
              show: true,
              fontSize: '10',
              color: "#fff",
              backgroundColor: "transparent",
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
          ],
        }
      ]
    },
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
    mergeEchartsOptions({})
  }, [mergeEchartsOptions]);
  return (
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
              <div className="rate-man" style={{ width: sexNum.man*100/(sexNum.man+sexNum.woman)+"%" }}></div>
              <div className="rate-icon">
                <div className="rate-bc"></div>
              </div>
              <div className="rate-woman" style={{ width: sexNum.woman*100/(sexNum.man+sexNum.woman)+"%" }}></div>
            </div>
            <img src={Icons.woman} alt="" />
          </div>
          <div className="memo">
            <div className="man-memo">
              <div style={{ fontSize: '6rem' }}>男性：{sexNum.man*100/(sexNum.man+sexNum.woman)+"%" }</div>
              <span><span style={{ fontSize: '18rem' }}>{sexNum.man}</span>人</span>
            </div>
            <div className="woman-memo">
              <div style={{ fontSize: '6rem' }}>女性：{sexNum.woman*100/(sexNum.man+sexNum.woman)+"%" }</div>
              <span><span style={{ fontSize: '18rem' }}>{sexNum.woman}</span>人</span>
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
        <CommonMap callBack={(e)=>{setArea(e.name)}}></CommonMap>
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
          <span>残疾人数据统计</span>
        </div>
        <div className="grid-item-content grid-num">
          {
            disabledAnalysis.map((item) => {
              return <div className="content-item">
                <div className="item-num-content">
                  <span className="item-num">{item.num}</span>
                  <span className="item-unit">{item.unit}</span>
                </div>
                <div className="item-title">{item.title}</div>
              </div>
            })
          }

        </div>
      </ContainerWithBorder>
      <ContainerWithBorder key="3-2" className="grid-item">
        <div className="grid-item-content grid-charts">
          <ReactEcharts
            className="content-chart"
            option={echartsOptions['3-2-1']}
          />
          <ReactEcharts
            className="content-chart"
            option={echartsOptions['3-2-2']}
          />
        </div>

      </ContainerWithBorder>
      <ContainerWithBorder key="3-3" className="grid-item">
        <div className="grid-item-title">
          <span>残疾人收入统计</span>
        </div>
        <div className="disabled-money">
          {
            disabledMoney.map((item) => {
              return <div className="disabled-item">
                <span className="item-num">{item.num}<span>元</span></span>
                <img src={item.img} alt="" />
                <span className="item-title">{item.title}</span>
              </div>
            })
          }
        </div>
      </ContainerWithBorder>
    </GridLayout>
  )
}

export default FirstLayout;