import React, { useMemo, useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Layout } from 'antd';
import { useMergeState } from '../../shared/hooks';
import {
  CommonNavBar,
  ContainerWithCorner,
  GridLayout,
  ContainerWithBorder,
  CommonMap,
  RowChart,
} from '../../components';
import {
  getOnlineServiceZcptUser,
  getOnlineServiceInteract,
  getOnlineServicePosition,
  getOnlineServiceSignLog,
  getOnlineServiceInteractCnt,
  getOnlineService,
  getOnlineServiceBsBuildingFacilityEvalution,
} from '../../service/ServiceOnline';
import * as userIcon from '../../assets/images/service-online';
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

const ServiceOnline = (props) => {
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
  useEffect(() => {
    setRegisteredCount(1368422);
  }, []);
  // 用户类型统计
  const [userStatisticsList, setUserStatisticList] = useState([]);
  useEffect(() => {
    setUserStatisticList([
      { name: '普通用户', value: parseNumber(1222), icon: userIcon.ptyh },
      { name: '持证残疾人', value: parseNumber(1222), icon: userIcon.czcjr },
      { name: '企业机构', value: parseNumber(1222), icon: userIcon.qyjg },
    ])
    getOnlineServiceZcptUser({}).then(res => {
      setUserStatisticList([
        { name: '普通用户', value: parseNumber(res['普通用户']), icon: userIcon.ptyh },
        { name: '持证残疾人', value: parseNumber(res['持证残疾人']), icon: userIcon.czcjr },
        { name: '企业机构', value: parseNumber(res['企业机构']), icon: userIcon.qyjg },
      ])
    });
  }, []);
  // echarts图表
  const [echartsOptions, mergeEchartsOptions] = useMergeState({
    // 互动交流
    '1-2': {},
    // 业务模块
    '1-3': {},
    // 热点服务
    '1-4': {},
    // 康复签到
    '2-2': {},
    // 点击量
    '3-1': {},
    // 无障碍地图
    '3-2': {},
    // 无障碍建筑与设施评分
    '3-3': {},
  });
  useEffect(() => {
    // 1-2、1-4
    getOnlineServiceInteract({}).then(res => {
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
    });
    // 1-3
    getOnlineServicePosition({}).then(res => {
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
              data: ['沟通数', '投递简历数', '发布职位数'].map(name => ({ name, value: res[name] || 0 })),
            }
          ]
        },
      })
    });
    // 2-2
    getOnlineServiceSignLog({}).then(res => {
      const names = Object.keys(res);
      const data = names.map(name => res[name]);
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
    });
    // 3-1
    getOnlineServiceInteractCnt({}).then(res => {
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
              data: Object.keys(res).map(name => ({ name, value: res[name] })),
            }
          ]
        },
      });
    });
    // 3-2
    getOnlineService({}).then(res => {

    });
    // 3-3
    getOnlineServiceBsBuildingFacilityEvalution({}).then(res => {

    });
    mergeEchartsOptions({

      '3-2': {
        color: ['#FF1494', '#01F5FF', '#FF8347'],
        legend: {
          textStyle: {
            fontSize: 10,
            color: 'white'
          },
          bottom: 0,
          left: 'center',
          itemWidth: 14,
        },
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
            data: [
              { value: 70, name: '康复机构' },
              { value: 10, name: '教育' },
              { value: 20, name: '就业' },
            ],
          }
        ]
      },
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
  }, [mergeEchartsOptions]);
  return (
    <Layout className="service-online">
      <CommonNavBar showTime={true} title="网上服务" btnType="back" />
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
            <ReactEcharts
              option={echartsOptions['1-2']}
              className="grid-item-content"
            />
            <div className="grid-item-title">
              <span>业务模块</span>
            </div>
            <ReactEcharts
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
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">
            <CommonMap />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>康复签到</span>
            </div>
            <ReactEcharts
              option={echartsOptions['2-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-1" className="grid-item">
            <div className="grid-item-title">
              <span>点击量</span>
            </div>
            <ReactEcharts
              option={echartsOptions['3-1']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-2" className="grid-item">
            <div className="grid-item-title">
              <span>无障碍地图</span>
            </div>
            <ReactEcharts
              option={echartsOptions['3-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="3-3" className="grid-item">
            <div className="grid-item-title">
              <span>无障碍建筑与设施评分</span>
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

export default ServiceOnline;