import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  GridLayout,
  ContainerWithBorder,
  CommonMap,
  RowChart
} from '../../components';
import { Spin } from 'antd'
import * as Icons from '../../assets/images/disabled-person';
import './firstLayout.scss';
import { disabeldIncome,getAgeGroup,getDisabledNum, getAutismNum,disabeldType, disabeldSex, disabeldDoctor,disabeldMarry, disabeldDbNum,disabeldAvg,getMultipleNum,getSevereNum,getSuspectedNum,disabeldPersonAvg} from '../../service/index'

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
  const {area,setArea,timeRange} = props
  // 残疾人数
  const [disabledCount, setDisabledCount] = useState(0);
  //残疾人类型总数
  const [disabledStatisticsList, setDisabledStatisticsList] = useState([])
  // 残疾人数据统计
  const [disabledAnalysis, setDisabledAnalysis] = useState([])
  // 残疾人收入统计
  const [disabledMoney, setDisabledMoney] = useState([])
  // 残疾人性别数量
  const [sexNum, setSexNum] = useState({})

  //是否加载完毕
  const [loading, setLoading] = useState()

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

  // echarts图表
  const [echartsOptions, setEchartsOptions] = useState({
    // 残疾人类型统计
    '1-2': {},
    // 残疾人数据统计
    '1-3': {},
    // 残疾人增长趋势图
    '2-2': {},
    // 残疾人数据统计1
    '3-2-1': {},
    // 残疾人数据统计2
    '3-2-2': {},
    // 残疾人收入统计
    '3-3': {}
  });

  useEffect(() => {
    // setLoading(false)
    setLoading(true)
    Promise.all([
      //执证残疾人总数
      new Promise((resolve) => {
        getDisabledNum(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve(res.sum)
        })
      }),
      // 残疾人类型统计
      new Promise((resolve) => {
        disabeldType(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve({
            data: Object.keys(res).map((key) => {
              return { name: key, value: res[key] }
            })
          })
        })
      }),
      // 残疾人性别数量
      new Promise((resolve) => {
        disabeldSex(area, timeRange.startDate, timeRange.endDate).then((res) => {
          setSexNum({man:Number(res.man),women:Number(res.women)})
          resolve(res)
        })
      }),
      //残疾人低保人数、低收入、一户多残、人均住房面积数量
      new Promise((resolve) => {
        disabeldDbNum(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve(res)
        })
      }),
      // 残疾人婚姻状况
      new Promise((resolve) => {
        disabeldMarry(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve({
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
                  { value: res.WH, name: '未婚' },
                  { value: res.YPO, name: '有配偶' },
                  { value: res.LH, name: '离婚' },
                  { value: res.SO, name: '丧偶' },
                ],
              }
            ]
          })
        })
      }),
      // 残疾人人均年收入
      new Promise((resolve)=>{
        disabeldAvg(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          resolve(res)
        })
      }),
      //多重残疾人
      new Promise((resolve)=>{
        getMultipleNum(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve(res.multiple)
        })
      }),
      //重度残疾人
      new Promise((resolve)=>{
        getSevereNum(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve(res.severe)
        })
      }),
      //残疾人年纪统计
      new Promise((resolve) => {
        getAgeGroup(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve(res)
        })
      }),
      // 市人均年收入最新一年的数据
      new Promise((resolve)=>{
        disabeldPersonAvg(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve(res)
        })
      }),
      // 孤独症人数统计
      new Promise((resolve)=>{
        getAutismNum(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve(res.autism)
        })
      }),
      // 残疾人人均年收入年度增长率 和市人均年收入增长率 每年的折线图
      new Promise((resolve)=>{
        disabeldIncome().then((res)=>{
          resolve({
            color: ['#a4d915', '#00f5ff'],
            legend: {
              right: 0,
              top: -5,
              data: ['残疾人人均年收入', '社会人均年收入'],
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
              data: Object.keys(res)
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
                data: Object.values(res).map((item)=>item.disabledPerson)
              },
              {
                name: '社会人均年收入',
                type: 'line',
                stack: '总量',
                data: Object.values(res).map((item)=>item.cityPerson)
              },
      
            ]
          })
        })
      }),
      // 家庭医生签约和未签订数量和占比
      new Promise((resolve)=>{
        disabeldDoctor(area, timeRange.startDate, timeRange.endDate).then((res) => {
          resolve({
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
                name: '已签约',
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
                  { value: res.已签约数, name: '已签约' },
                  { value: res.未签约数, name: '未签约' },
                ],
              }
            ]
          })
        })
      })
    ]).then((res) => {
      console.log(res)
      setDisabledCount(res[0])
        setDisabledMoney([
          { title: "残疾人人均年收入", num: res[5].oneincomeAvg, img: Icons.cjr_big },
          { title: "社会人均年收入", num: res[9].cityPersonAvg, img: Icons.people },
        ])
        setEchartsOptions({
          ...echartsOptions, '1-2': res[1],'3-2-2':res[4],'3-2-1':res[12],'2-2':res[11],'1-3':{
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
                radius: '80%',
                selectedMode: 'single',
                data: Object.keys(res[8]).map((item)=>{return {name:item+'岁',value:res[8][item]}})
              }
            ]
          }
        })
        setDisabledAnalysis([
          { title: "重度残疾人", num: parseNumber(res[7]), unit: "人" },
          { title: "多重残疾人", num: parseNumber(res[6]), unit: "人" },
          { title: "一户多残数量", num: parseNumber(res[3].yhdcNum), unit: "人" },
          { title: "劳动残疾人数", num: parseNumber(res[3].劳动残疾人数), unit: "人" },
        ])
        const list = [
          { title: "低保人数", num: parseNumber(res[3].dbNum) },
          { title: "低收入人数", num: parseNumber(res[3].dsrNum) },
          { title: "孤独症儿童", num: parseNumber(res[10]) },
        ]
        setDisabledStatisticsList(list)
        setLoading(true)
      })
  }, [area, timeRange]);


  return loading ? (
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
                return <div className="disabled-item" key={Math.random()}>
                  <img src={Icons.cjr} alt="" />
                  <span className="item-num">{item.num}</span>
                  <span className="item-title">{item.title}</span>
                </div>
              })
            }
          </div>
        </div>
        <div className="grid-item-title">
          <span>性别统计</span>
        </div>
        <div className="grid-item-content sex-analysis">
          <div className="sex-rate">
            <img src={Icons.man} alt="" />
            <div className="rate-container">
              <div className="rate-man" style={{ width: sexNum.man * 100 / (sexNum.man + sexNum.women) + "%" }}></div>
              <div className="rate-icon">
                <div className="rate-bc"></div>
              </div>
              <div className="rate-woman" style={{ width: sexNum.women * 100 / (sexNum.man + sexNum.women) + "%" }}></div>
            </div>
            <img src={Icons.woman} alt="" />
          </div>
          <div className="memo">
            <div className="man-memo">
              <div style={{ fontSize: '6rem' }}>男性：{(sexNum.man * 100 / (sexNum.man + sexNum.women)).toFixed(2) + "%"}</div>
              <span><span style={{ fontSize: '18rem' }}>{sexNum.man}</span>人</span>
            </div>
            <div className="woman-memo">
              <div style={{ fontSize: '6rem' }}>女性：{(sexNum.women * 100 / (sexNum.man + sexNum.women)).toFixed(2) + "%"}</div>
              <span><span style={{ fontSize: '18rem' }}>{sexNum.women}</span>人</span>
            </div>
          </div>
        </div>
        <div className="grid-item-title">
          <span>残疾人类型统计</span>
        </div>
        <RowChart option={echartsOptions['1-2']} className="grid-item-content" style={{ height: '50rem', }}></RowChart>
        <div className="grid-item-title">
          <span>残疾人年龄统计</span>
        </div>
        <ReactEcharts
          option={echartsOptions['1-3']}
          className="grid-item-content"
        />
      </ContainerWithBorder>
      <ContainerWithBorder key="2-1" className="grid-item">
        <CommonMap initData={0} callBack={(e) => { setArea(e.name) }}></CommonMap>
      </ContainerWithBorder>
      <ContainerWithBorder key="2-2" className="grid-item">
        <div className="grid-item-title">
          <span>残疾人和社会人均年收入增长趋势图</span>
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
              return <div className="content-item" key={Math.random()}>
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
          <span>人均年收入统计</span>
        </div>
        <div className="disabled-money">
          {
            disabledMoney.map((item) => {
              return <div className="disabled-item" key={Math.random()}>
                <span className="item-num">{item.num}<span>元</span></span>
                <img src={item.img} alt="" />
                <span className="item-title">{item.title}</span>
              </div>
            })
          }
        </div>
      </ContainerWithBorder>
    </GridLayout>
  ) : <div className="loading"><Spin tip="Loading..."></Spin></div>
}

export default FirstLayout;