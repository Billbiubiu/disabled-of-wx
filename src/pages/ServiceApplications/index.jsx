import React, { useCallback, useMemo, useReducer, useState } from 'react';
import moment from 'moment';
import { Layout, Spin } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import {
  CommonMap,
  CommonModal,
  CommonNavBar,
  ContainerWithCorner,
  ContainerWithBorder,
  Echarts,
  GridLayout,
  RowChart,
} from '../../components';
import {
  getServiceTotal,
  getServiceWeiwen,
  getServiceKangfu,
  getServiceJiaojiu,
  getServiceEveryMonth,
  getServiceEveryYear,
} from '../../service/ServiceApplications';
import './index.scss';

const { Content } = Layout;
const KANGFU_MAP = {
  1: '精神病人门诊救助数量',
  2: '肢体矫治救助数量',
  3: '儿童康复评定数量',
  4: '精神病人机构康复救助数量',
  5: '辅助器具数量',
  6: '苯丙酮尿症救助数量',
  7: '精神病人住院救助数量',
  8: '医疗救助数量',
  9: '人工耳蜗救助数量',
};
const JIAOJIU_MAP = {
  1: '子女助学金数量',
  2: '残疾学生奖学金数量',
  3: '残疾学生助学金数量',
  4: '盲生交通伙食补贴数量',
  5: '助残大学生一次性入学补助数量',
  6: '个体创业扶持数量',
  7: '临时救助数量',
  8: '日间照料服务补贴数量',
  9: '集中托养服务补贴数量',
  10: '居家安养服务补贴数量',
  11: '老年重残救助数量',
  12: '社保补贴数量',
  13: '辅助性就业资格认定数量',
};

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 4 },
  { i: '1-2', x: 0, y: 4, w: 6, h: 5 },
  { i: '1-3', x: 0, y: 9, w: 6, h: 15 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 16 },
  { i: '2-2', x: 6, y: 16, w: 12, h: 8 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 24 },
];

const ServiceApplications = () => {
  const [loading, setLoading] = useState(true);
  // 申请人数量
  const [applicantCount, setApplicantCount] = useState(0);
  const applicantCountList = useMemo(() => {
    const list = applicantCount.toString().split('').reverse();
    while (list.length < 7) list.push('0');
    return list.reduce((result, item, index) => {
      if (index && index % 3 === 0) {
        result.push(',');
      }
      result.push(item);
      return result;
    }, []).reverse();
  }, [applicantCount]);
  // echarts图表
  const [echartsOptions, mergeEchartsOptions] = useReducer((state, newState) => ({
    ...state,
    ...newState,
  }), {
    // 维文
    '1-2': null,
    // 康复
    '1-3': null,
    // 机构每月残疾人服务申请变化趋势
    '2-2': null,
    // 年度统计
    '2-3': null,
    // 教就
    '3-1': null,
  });
  // 请求数据
  const getData = useCallback((params) => {
    setLoading(true);
    Promise.all([
      getServiceTotal(params).then(res => {
        const { serviceTotal } = res;
        setApplicantCount(serviceTotal);
      }),
      // 1-2
      getServiceWeiwen(params).then(res => {
        const { wza, dbc } = res;
        const data = [
          { name: '无障碍改造', value: wza },
          { name: '代步车购买', value: dbc },
        ].sort((a, b) => b.value - a.value);
        mergeEchartsOptions({ '1-2': { data, unit: '人' } });
      }),
      // 1-3
      getServiceKangfu(params).then(res => {
        const data = Object.keys(res).map(key => {
          const name = KANGFU_MAP[key];
          const value = res[key];
          return { name, value };
        }).sort((a, b) => b.value - a.value);
        mergeEchartsOptions({ '1-3': { data } });
      }),
      // 2-2
      getServiceEveryMonth(params).then(res => {
        const names = Object.keys(res);
        const values = names.map(key => res[key]);
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
                data: values,
              },
              {
                type: 'line',
                data: values,
              }
            ]
          },
        });
      }),
      // 2-3
      getServiceEveryYear(params).then(res => {
        const names = Object.keys(res);
        const values = names.map(key => res[key]);
        mergeEchartsOptions({
          '2-3': {
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
                data: values,
              },
              {
                type: 'line',
                data: values,
              },
            ]
          }
        });
      }),
      // 3-1
      getServiceJiaojiu(params).then(res => {
        const data = Object.keys(res).map(key => {
          const name = JIAOJIU_MAP[key];
          const value = res[key];
          return { name, value };
        }).sort((a, b) => b.value - a.value);
        mergeEchartsOptions({ '3-1': { data } });
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
  const setArea = useCallback(({ name }) => {
    setParams({ area: name });
  }, []);
  // 弹窗状态
  const [commonModalVisible, setCommonModalVisible] = useState(false);
  return (
    <Layout className="service-applications">
      <CommonNavBar
        showRangeDate
        timeRange={params}
        setTimeRange={setParams}
        showTime={true}
        title="服务申请"
        btnType="back"
      />
      <ContainerWithCorner
        component={Content}
        className="service-applications-content">
        <GridLayout layout={layout} style={{ visibility: loading ? 'hidden' : 'visible' }}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>服务申请人数统计</span>
            </div>
            <div className="grid-item-content applicant-count">
              <span className="applicant-count-label">申请人数量</span>
              <span className="applicant-count-value">
                {
                  applicantCountList.map((item, index) => {
                    const key = index;
                    const className = item === ',' ? 'applicant-count-separate' : 'applicant-count-number';
                    return (
                      <span key={key} className={className}>{item}</span>
                    )
                  })
                }
              </span>
            </div>
          </ContainerWithBorder>
          <ContainerWithBorder key="1-2" className="grid-item">
            <div className="grid-item-title">
              <span>维文</span>
            </div>
            <RowChart
              option={echartsOptions['1-2']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="1-3" className="grid-item">
            <div className="grid-item-title">
              <span>康复</span>
            </div>
            <RowChart
              option={echartsOptions['1-3']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">
            <CommonMap callBack={setArea} />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>机构每月残疾人服务申请变化趋势</span>
            </div>
            <Echarts
              option={echartsOptions['2-2']}
              className="grid-item-content"
            />
            <div style={{ position: 'absolute', top: '20rem', right: '20rem' }}>
              <MenuOutlined
                onClick={() => setCommonModalVisible(true)}
                style={{ fontSize: '1.5em' }}
              />
            </div>
          </ContainerWithBorder>
          <ContainerWithBorder key="3-1" className="grid-item">
            <div className="grid-item-title">
              <span>教就</span>
            </div>
            <RowChart
              option={echartsOptions['3-1']}
              className="grid-item-content"
            />
          </ContainerWithBorder>
        </GridLayout>
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
      </ContainerWithCorner>
      <CommonModal
        options={{
          '1-1': echartsOptions['2-2'],
          '1-2': echartsOptions['2-3'],
        }}
        visible={commonModalVisible}
        setVisible={() => setCommonModalVisible(false)}
      />
    </Layout>
  )
}

export default ServiceApplications;