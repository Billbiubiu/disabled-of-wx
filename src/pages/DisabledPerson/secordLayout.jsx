import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  GridLayout,
  ContainerWithBorder,
  CommonMap,
  RowChart
} from '../../components';
import * as Icons from '../../assets/images/disabled-person';
import './secord.scss';

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 24 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 24 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 12 },
  { i: '3-2', x: 18, y: 8, w: 6, h: 6 },
  { i: '3-3', x: 18, y: 16, w: 6, h: 6 },
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
    // echarts图表
  const [echartsOptions, setEchartsOptions] = useState({
    '1-1': {
       grid:{
      	 top:"5%",
         left:"10%",
         bottom:"13%"
	    },
      color:['#00a8e8'],
        xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: 'white'
              }
        },
            data: ['无', '小学', '初中', '高中', '大专', '本科', '硕士','博士']
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
            data: [120, 200, 150, 80, 70, 110, 130,23],
             radius: [80, 100],
            type: 'bar'
        }]
    },
    '1-2':{
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
                label:{
                  fontSize: '10',
                  color: "#fff",
                  backgroundColor: "transparent",
                },

                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    {value: 40, name: '特长1'},
                    {value: 38, name: '特长2'},
                    {value: 32, name: '特长3'},
                ]
            }
        ]
    },
    '1-3':{
      data: [
        { name: '小学', value: 8768 },
        { name: '初中', value: 8642 },
        { name: '高中', value: 8537 },
        { name: '本科', value: 8422 },
        { name: '大专', value: 8322 },
        { name: '本科', value: 8122 },
        { name: '硕士', value: 7922 },
        { name: '博士', value: 5622 },
      ]
    },
    '2-1-1':{
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
        itemWidth:14,
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
          data: [
            { value: 335, name: '已参保' },
            { value: 310, name: '未参保' },
          ],
          roseType: 'radius',
        }
      ]
    },
    '2-1-2':{
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
        itemWidth:14,
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
          data: [
            { value: 335, name: '已参保' },
            { value: 310, name: '未参保' },
          ],
          roseType: 'radius',
        }
      ]
    },
    '2-1-3':{
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
        itemWidth:14,
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
          data: [
            { value: 335, name: '职工养老' },
            { value: 310, name: '居民养老' },
          ],
          roseType: 'radius',
        }
      ]
    },
    '2-1-4':{
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
        itemWidth:14,
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
          data: [
            { value: 335, name: '职工医疗' },
            { value: 310, name: '居民医疗' },
          ],
          roseType: 'radius',
        }
      ]
    },
    '3-1-1':{
      color: ['#ff1493', '#00f5ff','#3c98ff','#ffdb5c','#f0732e','#7fce67'],
      title: {
        text: '残疾人类别统计',
        left: 'center',
        top: 19,
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
        bottom: 0,
        left: 'center',
         itemWidth:14,
         itemGap:5
      },
      tooltip:{
        show:true
      },
      series: [
        {
          name: '残疾人类别统计',
          type: 'pie',
          label: {
            show:false
          },
          data: [
            { value: 335, name: '类型1' },
            { value: 310, name: '类型2' },
            { value: 310, name: '类型3' },
            { value: 310, name: '类型4' },
            { value: 310, name: '类型5' },
            { value: 310, name: '类型6' },
          ],
          roseType: 'radius',
        }
      ]
    },
    '3-1-2':{
      color: ['#ff1493', '#00f5ff','#3c98ff','#ffdb5c','#f0732e','#7fce67'],
      title: {
        text: '残疾人年龄统计',
        left: 'center',
        top: 19,
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
        bottom: 0,
        left: 'center',
         itemWidth:14,
         itemGap:5
      },
      tooltip:{
        show:true
      },
      series: [
        {
          name: '残疾人年龄统计',
          type: 'pie',
          label: {
            show:false
          },
          data: [
            { value: 335, name: '18 以下' },
            { value: 310, name: '19 - 25' },
            { value: 310, name: '26 - 35' },
            { value: 310, name: '35 - 55' },
            { value: 310, name: '55 - 70' },
            { value: 310, name: '70 以上' },
          ],
          roseType: 'radius',
        }
      ]
    },
    '3-2':{
      data: [
        { name: '录用', value: 8768 },
        { name: '聘用', value: 8642 },
        { name: '自主创业', value: 8537 },
        { name: '定向创业', value: 8422 },
      ]
    },
    '3-3':{
      data: [
        { name: '国有企业', value: 8768 },
        { name: '民营企业', value: 8642 },
        { name: '合资企业', value: 8537 },
        { name: '外商独资企业', value: 8422 },
        { name: '政府机关', value: 8322 },
        { name: '事业单位', value: 8122 },
      ]
    }
  })

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
              <div className="rate-man" style={{ width: "64%" }}></div>
              <div className="rate-icon">
                <div className="rate-bc"></div>
              </div>
              <div className="rate-woman" style={{ width: "36%" }}></div>
            </div>
          </div>
          <div className="memo">
            <div className="man-memo">
              <div style={{ fontSize: '6rem' }}>就业：64%</div>
              <span><span style={{ fontSize: '6rem' }}>12311</span>人</span>
            </div>
            <div className="woman-memo">
              <div style={{ fontSize: '6rem' }}>未就业：36%</div>
              <span><span style={{ fontSize: '6rem' }}>12311</span>人</span>
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
          <span>就业形势分类</span>
        </div>
        <RowChart rowIndxStyle={{ color: 'white' }} rowBodyStyle={{backgroundColor:'#bb3d00'}} rowFooterStyle={{backgroundColor:'#bb3d00'}} option={echartsOptions['3-2']} className="grid-item-content"></RowChart>
      </ContainerWithBorder>
      <ContainerWithBorder key="3-3" className="grid-item">
        <div className="grid-item-title">
          <span>单位形势分类</span>
        </div>
        <RowChart rowIndxStyle={{ color: 'white' }} option={echartsOptions['3-3']} className="grid-item-content"></RowChart>
      </ContainerWithBorder>
    </GridLayout>
  )
}

export default SecordLayout;