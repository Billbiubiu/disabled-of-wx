import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  GridLayout,
  ContainerWithBorder,
  CommonMap,
  RowChart
} from '../../components';
import {disabeldDegree,disabeldSpecial,disabeldEducation,disabeldYanglaobx,disabeldYiliaobx,disabeldYanglaobxJMZG,disabeldYiliaobxJMZG,disabeldEmploy,disabeldAge,disabeldTypeForYJY,disabeldEmployment,disabeldUnit} from '../../service/index'
import * as Icons from '../../assets/images/disabled-person';
import './secord.scss';

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 24 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 24 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 10 },
  { i: '3-2', x: 18, y: 8, w: 6, h: 7 },
  { i: '3-3', x: 18, y: 16, w: 6, h: 7 },
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


const SecordLayout = (props) => {
  const {area,timeRange} = props
  // 残疾人就业 已就业和未就业数量和占比
  const [jyNum, setJyNum] = useState({})
  // echarts图表
  const [echartsOptions, setEchartsOptions] = useState({
    '1-1': {},
    '1-2': {},
    '1-3': {
      data: []
    },
    '2-1-1': {},
    '2-1-2': {},
    '2-1-3': {},
    '2-1-4': {},
    '3-1-1': {},
    '3-1-2': {},
    '3-2': {},
    '3-3':{}
  })


  useEffect(()=>{
    Promise.all([
      // 残疾人文化程度group数量（无、小学、本科。。。）
      new Promise((resolve)=>{
        disabeldDegree(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          const options = {
            grid: {
              top: "5%",
              left: "12%",
              bottom: "15%"
            },
            color: ['#00a8e8'],
            xAxis: {
              type: 'category',
              axisLine: {
                lineStyle: {
                  color: 'white'
                }
              },
              axisLabel: {  
                interval:0,  
                rotate:20  
             },
              data: Object.keys(res)
            },
            tooltip: {
              show: true,
            },
            yAxis: {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: 'white'
                }
              },
            },
            series: [{
              data: Object.values(res),
              radius: [100, 100],
              type: 'bar'
            }]
          } 
          resolve(options)
        })
      }),
      // 残疾人的特长 group类型和占比
      new Promise((resolve)=>{
        disabeldSpecial(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          const options = {
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
                name: '面积模式',
                type: 'pie',
                radius: [80, 90],
                roseType: 'area',
                label: {
                  fontSize: '10',
                  color: "#fff",
                  backgroundColor: "transparent",
                },
      
                itemStyle: {
                  borderRadius: 8
                },
                data: Object.keys(res).map((key)=>{return {name:key,value:res[key]}})
              }
            ]
          }
          resolve(options)
        })
      }),
      //残疾人在读学习group 学历的数量
      new Promise((resolve)=>{
        disabeldEducation(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          resolve(Object.keys(res).map((key)=>{return {name:key,value:res[key]}}))
        })
      }),
      //医疗保险缴纳和未缴纳数量和占比
      new Promise((resolve)=>{
        disabeldYiliaobx(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          resolve({
            color: ['#ff1493', '#00f5ff'],
            title: {
              text: '医疗保险',
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
                name: '医疗保险',
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
                data: Object.keys(res).map((key)=>{return {name:key==='wj'?"未参保":"已参保",value:res[key]}}),
                
              }
            ]
          })
        })
      }),
      //残疾人养老保险缴纳和未缴纳数量和占比
      new Promise((resolve)=>{
        disabeldYanglaobx(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          resolve({
            color: ['#ff1493', '#00f5ff'],
            title: {
              text: '养老保险',
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
                name: '养老保险',
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
                data: Object.keys(res).map((key)=>{return {name:key==='wj'?"未参保":"已参保",value:res[key]}}),
                
              }
            ]
          })
        })
      }),
      //养老保险分布职工养老和居民养老数量
      new Promise((resolve)=>{
        disabeldYanglaobxJMZG(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          resolve({
            color: ['#ff1493', '#00f5ff'],
            title: {
              text: '养老保险分布',
              left: 'center',
              top: '0',
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
                name: '养老保险分布',
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
                data: Object.keys(res).map((key)=>{return {name:key==='resident'?"居民医疗":"职工医疗",value:res[key]}}),
                
              }
            ]
          })
        })
      }),
      //医疗保险分布职工养老和居民养老数量
      new Promise((resolve)=>{
        disabeldYiliaobxJMZG(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          resolve({
            color: ['#ff1493', '#00f5ff'],
            title: {
              text: '医疗保险分布',
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
                name: '医疗保险分布',
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
                data: Object.keys(res).map((key)=>{return {name:key==='resident'?"居民医疗":"职工医疗",value:res[key]}}),
              }
            ]
          })
        })
      }),
      //残疾人就业 已就业和未就业数量和占比
      new Promise((resolve)=>{
        disabeldEmploy(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          setJyNum(res)
          resolve({})
        })
      }),
      //已就业的残疾人中，年龄段的数量
      new Promise((resolve)=>{
        disabeldAge(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          resolve({
            color: ['#ff1493', '#00f5ff', '#3c98ff', '#ffdb5c', '#f0732e', '#7fce67'],
            title: {
              text: '残疾人年龄统计',
              left: 'center',
              top: 10,
              textStyle: {
                color: 'white',
                fontSize: '10'
              }
            },
            tooltip: {
              show: true
            },
            series: [
              {
                name: '残疾人年龄统计',
                type: 'pie',
                label: {
                  show: false
                },
                data: Object.keys(res).map((key)=>{return {name:key,value:res[key]}}),
              }
            ]
          })
        })
      }),
      //已就业的残疾中 残疾人的类型和占比
      new Promise((resolve)=>{
        disabeldTypeForYJY(area, timeRange.startDate, timeRange.endDate).then((res)=>{
          resolve({
            color: ['#ff1493', '#00f5ff', '#3c98ff', '#ffdb5c', '#f0732e', '#7fce67'],
            title: {
              text: '残疾人类别统计',
              left: 'center',
              top: 10,
              textStyle: {
                color: 'white',
                fontSize: '10'
              }
            },
            tooltip: {
              show: true
            },
            series: [
              {
                name: '残疾人类别统计',
                type: 'pie',
                label: {
                  show: false
                },
                data: Object.keys(res).map((key)=>{return {name:key,value:res[key]}}),
              }
            ]
          })
        })
      }),
      //残疾人就业形式分类
      new Promise((resolve)=>{
        disabeldEmployment(area, timeRange.startDate, timeRange.endDate).then((res)=>{
            resolve({
              data: Object.keys(res).map((key)=>{return {name:key,value:res[key]}}),
            })
        })
      }),
      //残疾人就业单位性质分类
      new Promise((resolve)=>{
        disabeldUnit(area, timeRange.startDate, timeRange.endDate).then((res)=>{
            resolve( {
              data: Object.keys(res).map((key)=>{return {name:key,value:res[key]}})
            })
        })
      }),
    ]).then((res)=>{
      setEchartsOptions({...echartsOptions,
        '1-1':res[0],
        '1-2':res[1],
        '1-3':{data:res[2]},
        '2-1-1':res[3],
        '2-1-2':res[4],
        '2-1-3':res[5],
        '2-1-4':res[6],
        '3-1-1':res[9],
        '3-1-2':res[8],
        '3-2':res[10],
        '3-3':res[11]
      })
    })
  },[area, timeRange])

  return (
    <GridLayout layout={layout}>
      <ContainerWithBorder key="1-1" className="grid-item">
        <div className="grid-item-title">
          <span>文化程度分布图</span>
        </div>
        <ReactEcharts
          option={echartsOptions['1-1']}
          className="grid-item-content"
        />
        <div className="grid-item-title">
          <span>残疾人特长统计</span>
        </div>
        <ReactEcharts
          option={echartsOptions['1-2']}
          className="grid-item-content"
        />
        <div className="grid-item-title">
          <span>就读学校分类统计</span>
        </div>
        <RowChart rowIndxStyle={{ color: 'white' }} option={echartsOptions['1-3']} className="grid-item-content"></RowChart>
      </ContainerWithBorder>
      <ContainerWithBorder key="2-1" className="grid-item">
        <div className="grid-item-content grid-charts">
          <ReactEcharts option={echartsOptions['2-1-1']} className="grid-item-chart"></ReactEcharts>
          <ReactEcharts option={echartsOptions['2-1-2']} className="grid-item-chart"></ReactEcharts>
          <ReactEcharts option={echartsOptions['2-1-3']} className="grid-item-chart"></ReactEcharts>
          <ReactEcharts option={echartsOptions['2-1-4']} className="grid-item-chart"></ReactEcharts>
        </div>

      </ContainerWithBorder>
      <ContainerWithBorder key="3-1" className="grid-item">
        <div className="grid-item-title">
          <span>就业情况</span>
        </div>
        <div className="grid-item-content sex-analysis">
          <div className="sex-rate">
            <div className="rate-container">
              <div className="rate-man" style={{ width: jyNum.jy * 100 / (jyNum.jy + jyNum.wjy) + "%" }}></div>
              <div className="rate-icon">
                <div className="rate-bc"></div>
              </div>
              <div className="rate-woman" style={{ width: jyNum.wjy * 100 / (jyNum.jy + jyNum.wjy) + "%" }}></div>
            </div>
          </div>
          <div className="memo">
            <div className="man-memo">
              <div style={{ fontSize: '6rem' }}>就业：{(jyNum.jy * 100 / (jyNum.jy + jyNum.wjy)).toFixed(2) + "%"}</div>
              <span><span style={{ fontSize: '6rem' }}>{jyNum.jy}</span>人</span>
            </div>
            <div className="woman-memo">
              <div style={{ fontSize: '6rem' }}>未就业：{(jyNum.wjy * 100 / (jyNum.jy + jyNum.wjy)).toFixed(2) + "%"}</div>
              <span><span style={{ fontSize: '6rem' }}>{jyNum.wjy}</span>人</span>
            </div>
          </div>
        </div>
        <div className="grid-item-content content-charts">
          <ReactEcharts option={echartsOptions['3-1-1']} className="grid-item-chart"></ReactEcharts>
          <ReactEcharts option={echartsOptions['3-1-2']} className="grid-item-chart"></ReactEcharts>

        </div>

      </ContainerWithBorder>
      <ContainerWithBorder key="3-2" className="grid-item">
        <div className="grid-item-title">
          <span>就业形式分类</span>
        </div>
        <RowChart rowIndxStyle={{ color: 'white' }} rowBodyStyle={{ backgroundColor: '#bb3d00' }} rowFooterStyle={{ backgroundColor: '#bb3d00' }} option={echartsOptions['3-2']} className="grid-item-content"></RowChart>
      </ContainerWithBorder>
      <ContainerWithBorder key="3-3" className="grid-item">
        <div className="grid-item-title">
          <span>单位性质分类</span>
        </div>
        <RowChart rowIndxStyle={{ color: 'white' }} option={echartsOptions['3-3']} className="grid-item-content"></RowChart>
      </ContainerWithBorder>
    </GridLayout>
  )
}

export default SecordLayout;