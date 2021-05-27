import React, { useMemo, useEffect, useState, useReducer, useCallback } from 'react';
import moment from 'moment';
import { Layout, Spin } from 'antd';
import {
  CommonNavBar,
  ContainerWithCorner,
  ContainerWithBorder,
  Echarts,
  GridLayout,
  RowChart,
} from '../../components';
import {
  getOnlineServiceZcptUser,
  getOnlineServiceInteract,
  getOnlineServicePosition,
  getOnlineServiceSignLog,
  getOnlineServiceInteractCnt,
  getOnlineServiceBsBuild,
  getOnlineServiceBsBuildingFacilityEvalution,
} from '../../service/ServiceOnline';
import * as icons from '../../assets/images/service-online';
import './index.scss';

const { Content } = Layout;
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

const ServiceOnline = () => {
  const [loading, setLoading] = useState(false);
  // 注册人数
  const [registeredCount, setRegisteredCount] = useState(0);
  const registeredCountList = useMemo(() => {
    const list = registeredCount.toString().split('').reverse();
    while (list.length < 7) list.push('0');
    return list.reduce((result, item, index) => {
      if (index && index % 3 === 0) {
        result.push(',');
      }
      result.push(item);
      return result;
    }, []).reverse();
  }, [registeredCount]);
  // 用户类型统计
  const [userStatisticsList, setUserStatisticList] = useState([
    { name: '普通用户', value: 0, icon: icons.ptyh },
    { name: '持证残疾人', value: 0, icon: icons.czcjr },
    { name: '企业机构', value: 0, icon: icons.qyjg },
  ]);
  // 小程序服务统计
  const [miniProgramTotal, setMiniProgramTotal] = useState(0);
  const [miniProgramStatisticsList, setMiniProgramStatisticsList] = useState([
    { name: "科室1服务数量", value: 0 },
    { name: "科室2服务数量", value: 0 },
    { name: "科室3服务数量", value: 0 },
  ]);
  // echarts图表
  const [echartsOptions, mergeEchartsOptions] = useReducer((state, newState) => ({
    ...state,
    ...newState,
  }), {
    // 互动交流
    '1-2': null,
    // 求职招聘
    '1-3': null,
    // 热点服务
    '1-4': null,
    // 小程序服务增值服务趋势图
    '2-1': null,
    // 康复签到
    '2-2': null,
    // 点击量
    '3-1': null,
    // 无障碍地图
    '3-2': null,
    // 无障碍建筑与设施评分
    '3-3': null,
  });
  // 请求数据
  const getData = useCallback((params) => {
    setLoading(true);
    Promise.all([
      // 1-2
      getOnlineServiceZcptUser(params).then(res => {
        setRegisteredCount(res['注册总人数'] || 0);
        setUserStatisticList([
          { name: '普通用户', value: parseNumber(res['普通用户'] || 0), icon: icons.ptyh },
          { name: '持证残疾人', value: parseNumber(res['持证残疾人'] || 0), icon: icons.czcjr },
          { name: '企业机构', value: parseNumber(res['企业机构'] || 0), icon: icons.qyjg },
        ])
      }),
      // 1-2、1-4
      getOnlineServiceInteract(params).then(res => {
        mergeEchartsOptions({
          '1-2': {
            color: ['#00A8E7'],
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
                axisTick: {
                  show: false,
                },
                data: ['志愿者', '热点回答', '在线咨询', '蚕宝课堂', '网上调查', '残疾人风采']
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
                data: ['志愿者', '热点回答', '在线咨询', '蚕宝课堂', '网上调查', '残疾人风采'].map(name => res[name] || 0),
              },
            ]
          },
          '1-4': {
            data: ['残疾预防', '辅具大厅', '残疾人证查询', '爱心地图',].map(name => ({ name, value: res[name] || 0 })),
            unit: '人',
          },
        })
      }),
      // 1-3
      getOnlineServicePosition(params).then(res => {
        mergeEchartsOptions({
          '1-3': {
            color: ['#FF1494', '#01F5FF', '#FF8347'],
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
                data: ['投递简历数', '发布职位数'].map(name => ({ name, value: res[name] || 0 })),
              }
            ]
          },
        })
      }),
      // 2-1
      Promise.resolve().then(() => {
        setMiniProgramTotal(parseNumber(12273684));
        setMiniProgramStatisticsList([
          { name: "科室1服务数量", value: parseNumber(885369) },
          { name: "科室2服务数量", value: parseNumber(685369) },
          { name: "科室3服务数量", value: parseNumber(465369) },
        ]);
      }),
      // 2-1
      Promise.resolve().then(() => {
        const names = Array(30).fill(0).map((d, i) => i + 1);
        const data = names.map(d => Math.random() * 25 + 25);
        mergeEchartsOptions({
          '2-1': {
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
                boundaryGap: '5%',
                data: names,
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  interval: 0,
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                boundaryGap: '50%',
                splitLine: {
                  show: true,
                  lineStyle: {
                    opacity: 0.2
                  }
                },
                axisLine: {
                  show: true,
                },
              },
            ],
            series: [
              {
                type: 'line',
                areaStyle: {
                  opacity: 0.2,
                },
                symbol: 'none',
                data,
              }
            ]
          },
        })
      }),
      // 2-2
      getOnlineServiceSignLog(params).then(res => {
        const names = Object.keys(res);
        const data = names.map(name => res[name]);
        // 没有数据
        if (!data.length) return;
        mergeEchartsOptions({
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
                data: names,
                axisLabel: {
                  interval: 0,
                }
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
                data,
              },
              {
                type: 'line',
                data,
              }
            ]
          },
        })
      }),
      // 3-1
      getOnlineServiceInteractCnt(params).then(res => {
        const names = Object.keys(res);
        const data = names.map(name => ({ name, value: res[name] }));
        // 没有数据
        if (!data.length) return;
        mergeEchartsOptions({
          '3-1': {
            color: ['#FF1494', '#01F5FF', '#FF8347'],
            series: [
              {
                type: 'pie',
                radius: ['40%', '80%'],
                label: {
                  color: "#fff",
                  formatter: `{d}%\n{b}`,
                  backgroundColor: "transparent",
                },
                data,
              }
            ]
          },
        });
      }),
      // 3-2
      getOnlineServiceBsBuild(params).then(res => {
        const names = Object.keys(res);
        const data = names.map(name => ({ name, value: res[name] }));
        if (!data.length) return;
        mergeEchartsOptions({
          '3-2': {
            color: ['#FF1494', '#01F5FF', '#FF8347'],
            // legend: {
            //   textStyle: {
            //     fontSize: 10,
            //     color: 'white'
            //   },
            //   bottom: 0,
            //   left: 'center',
            //   itemWidth: 14,
            // },
            series: [
              {
                type: 'pie',
                radius: ['60%', '70%'],
                center: ['50%', '40%'],
                label: {
                  show: false,
                  color: "#fff",
                  fontSize: 20,
                  position: 'center',
                  formatter: `{d}%\n{b}`,
                  backgroundColor: "transparent",
                },
                emphasis: {
                  label: {
                    show: true,
                  }
                },
                data,
              }
            ]
          },
        })
      }),
      // 3-3
      getOnlineServiceBsBuildingFacilityEvalution(params).then(res => {
        console.log(res);
      }).finally(() => {
        Promise.resolve().then(() => {
          mergeEchartsOptions({
            '3-3': {
              color: ['#00A8E7'],
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
                  axisTick: {
                    show: false,
                  },
                  data: ['一分', '二分', '三分', '四分', '五分'],
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
                  data: [3, 4, 6, 6, 7],
                },
              ]
            },
          })
        })
      }),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);
  // 请求参数
  const [params, setParams] = useReducer((state, newState) => {
    const newParams = { ...state, ...newState };
    getData(newParams);
    return newParams;
  }, {
    startDate: moment().subtract(1, 'years').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });
  // 触发首次请求
  useEffect(() => {
    setParams({});
  }, []);
  return (
    <Layout className="service-online">
      <CommonNavBar
        showRangeDate
        timeRange={params}
        setTimeRange={setParams}
        showTime={true}
        title="网上服务"
        btnType="back"
      />
      <ContainerWithCorner
        component={Content}
        className="service-online-content">
        <GridLayout layout={layout}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>注册人数据统计</span>
            </div>
            <div className="grid-item-content" style={{ flex: 'none' }}>
              <div className="registered-count">
                <span className="registered-count-label">残疾人数</span>
                <span className="registered-count-value">
                  {registeredCountList.map((item, index) => {
                    const key = index;
                    const className = item === ',' ? 'registered-count-separate' : 'registered-count-number';
                    return (
                      <span key={key} className={className}>{item}</span>
                    )
                  })}
                </span>
              </div>
              <div className="user-statistics">
                {userStatisticsList.map((item, index) => {
                  const { name, value, icon } = item;
                  const key = index;
                  return (
                    <div key={key} className="user-statistics-item">
                      <img alt="" src={icon} className="item-icon" />
                      <div>
                        <div className="item-value">{value}</div>
                        <div className="item-name">{name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid-item-title">
              <span>互动交流</span>
            </div>
            <Echarts
              option={echartsOptions['1-2']}
              className="grid-item-content"
            />
            <div className="grid-item-title">
              <span>求职招聘</span>
            </div>
            <Echarts
              option={echartsOptions['1-3']}
              className="grid-item-content"
            />
            <div className="grid-item-title">
              <span>热点服务</span>
            </div>
            <RowChart
              option={echartsOptions['1-4']}
              className="grid-item-content"
              style={{ height: '200rem', flexShrink: 0 }}
            />
          </ContainerWithBorder >
          <ContainerWithBorder
            key="2-1"
            className="grid-item"
            style={{ color: '#01DEF6', textAlign: 'center' }}
          >
            <div className="mini-program-statistics" style={{ flex: 1 }}>
              <div style={{
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'rgba(4, 49, 128, 0.2)',
                boxShadow: '0 0 12rem 10rem rgba(4, 49, 128, 0.6) inset',
                marginRight: '5rem',
                position: 'relative',
              }}>
                <div>小程序服务总数</div>
                <br />
                <div style={{ fontSize: '30rem', }}>{miniProgramTotal}</div>
                <div style={{ width: '10rem', height: '10rem', position: 'absolute', top: '-1rem', left: '-1rem', borderTop: '2rem solid #00A8E7', borderLeft: '2px solid #00A8E7' }}></div>
                <div style={{ width: '10rem', height: '10rem', position: 'absolute', top: '-1rem', right: '-1rem', borderTop: '2rem solid #00A8E7', borderRight: '2px solid #00A8E7' }}></div>
                <div style={{ width: '10rem', height: '10rem', position: 'absolute', bottom: '-1rem', right: '-1rem', borderBottom: '2rem solid #00A8E7', borderRight: '2px solid #00A8E7' }}></div>
                <div style={{ width: '10rem', height: '10rem', position: 'absolute', bottom: '-1rem', left: '-1rem', borderBottom: '2rem solid #00A8E7', borderLeft: '2px solid #00A8E7' }}></div>
              </div>
              {miniProgramStatisticsList.map((item, index) => {
                const { name, value } = item;
                const key = index;
                return (
                  <div key={key} className="mini-program-item" >
                    <span className="item-value">{value}</span>
                    <img className="item-icon" src={icons.computer} alt="" />
                    <span className="item-name">{name}</span>
                  </div>
                )
              })}
            </div>
            <Echarts
              option={echartsOptions['2-1']}
              style={{ height: '65%' }}
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>康复签到</span>
            </div>
            <Echarts
              option={echartsOptions['2-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-1" className="grid-item">
            <div className="grid-item-title">
              <span>点击量</span>
            </div>
            <Echarts
              option={echartsOptions['3-1']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-2" className="grid-item">
            <div className="grid-item-title">
              <span>无障碍地图</span>
            </div>
            <Echarts
              option={echartsOptions['3-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-3" className="grid-item">
            <div className="grid-item-title">
              <span>无障碍建筑与设施评分</span>
            </div>
            <Echarts
              option={echartsOptions['3-3']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
        </GridLayout >
        {loading && (
          <Spin style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }} />
        )}
      </ContainerWithCorner >
    </Layout >
  )
}

export default ServiceOnline;