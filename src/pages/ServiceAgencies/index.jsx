import React, { useCallback, useReducer, useState } from 'react';
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
import * as icons from '../../assets/images/service-agency';
import {
  getOrganizationTotal,
  getOrganizationCategoryTotal,
  getOrganizationCategoryWorkPersonnelTotal,
  getOrganizationCategoryServiceObjectTotal,
  getOrganizationCompanyTotal,
} from '../../service/ServiceAgencies';
import StachChart from './StackChart';
import './index.scss';

const { Content } = Layout;

// 布局数据
const layout = [
  { i: '1-1', x: 0, y: 0, w: 6, h: 24 },
  { i: '2-1', x: 6, y: 0, w: 12, h: 16 },
  { i: '2-2', x: 6, y: 16, w: 12, h: 8 },
  { i: '3-1', x: 18, y: 0, w: 6, h: 6 },
  { i: '3-2', x: 18, y: 6, w: 6, h: 18 },
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

const ServiceAgencies = () => {
  const [loading, setLoading] = useState(false);
  // 残疾人康复机构数据统计
  const [agencyStatisticsData, setAgencyStatisticsData] = useState([
    { name: '服务机构数量', value: 0 },
    { name: '工作人员数量', value: 0 },
    { name: '服务对象数量', value: 0 },
  ]);
  // echarts图表配置
  const [echartsOptions, mergeEchartsOptions] = useReducer((state, newState) => ({
    ...state,
    ...newState,
  }), {
    // 服务机构数据
    '1-2': null,
    // 残疾人变化趋势
    '2-2': null,
    // 残联机构
    '3-2': null,
    // 月度统计
    '4-1': null,
    // 年度统计
    '4-2': null,
  });
  // 残疾人服务机构办理事务情况统计
  const [businessStatisticsData, setBusinessStatisticsData] = useState([
    { name: '单位数量', value: 0, unit: '个' },
    { name: '安置残疾人数', value: 0, unit: '人' },
  ]);
  // 请求数据
  const getData = useCallback((params) => {
    setLoading(true);
    Promise.all([
      // 1-1
      getOrganizationTotal(params).then(res => {
        const { organizationTotal, workPersonnelSum, 服务对象数量 } = res;
        setAgencyStatisticsData([
          { name: '服务机构数量', value: parseNumber(organizationTotal) },
          { name: '工作人员数量', value: parseNumber(workPersonnelSum) },
          { name: '服务对象数量', value: parseNumber(服务对象数量) },
        ])
      }),
      Promise.all([
        // 1-2
        getOrganizationCategoryTotal(params).then(res => {
          return res;
        }),
        // 1-2
        getOrganizationCategoryWorkPersonnelTotal(params).then(res => {
          return res;
        }),
        // 1-2
        getOrganizationCategoryServiceObjectTotal(params).then(res => {
          return res;
        }),
      ]).then(res => {
        const data = [res[0] || {}, res[1] || {}, res[2] || {}];
        const namesSet = new Set([...Object.keys({ ...data[0], ...data[1], ...data[2] })]);
        namesSet.delete('其他');
        const names = [...namesSet, '其他'];
        mergeEchartsOptions({
          '1-2': {
            data: names.map(name => ({
              name,
              values: [
                data[0][name] || 0,
                data[1][name] || 0,
                data[2][name] || 0,
              ],
            })),
          },
        })
      }),
      // 2-2
      Promise.resolve().then(() => {
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
        })
      }),
      // 3-1
      getOrganizationCompanyTotal(params).then(res => {
        const { companyTotal, disabledPeopleSum } = res;
        setBusinessStatisticsData([
          { name: '单位数量', value: parseNumber(companyTotal), unit: '个' },
          { name: '安置残疾人数', value: parseNumber(disabledPeopleSum), unit: '人' },
        ])
      }),
      // 3-2
      Promise.resolve().then(() => {
        mergeEchartsOptions({
          '3-2': {
            data: [
              { name: '无锡残疾人辅助器具中心', value: 543769 },
              { name: '无锡市残疾人就业信息网', value: 358125 },
              { name: '无锡市残疾人联合会', value: 335155 },
              { name: '无锡市残疾人康复中心', value: 255145 },
              { name: '无锡市残疾人康复研究会', value: 228131 },
              { name: '无锡市盲人联合会', value: 213154 },
              { name: '无锡市肢体残障联合会', value: 185354 },
              { name: '无锡市治理残障康复中心', value: 165835 },
              { name: '无锡市听力康复中心', value: 164528 },
            ],
            unit: '人',
          },
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
  const setArea = useCallback(({ name }) => {
    setParams({ area: name });
  }, []);
  // 弹窗状态
  const [commonModalVisible, setCommonModalVisible] = useState(false);
  return (
    <Layout className="service-agencies">
      <CommonNavBar
        showRangeDate
        timeRange={params}
        setTimeRange={setParams}
        showTime={true}
        title="服务机构"
        btnType="back"
      />
      <ContainerWithCorner
        component={Content}
        className="service-agencies-content"
      >
        <GridLayout layout={layout}>
          <ContainerWithBorder key="1-1" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人康复机构数据统计</span>
            </div>
            <div className="grid-item-content agency-statistics" style={{ flex: 'none' }}>
              {agencyStatisticsData.map((item, index) => {
                const { name, value } = item;
                const key = index;
                return (
                  <div key={key} className="agency-statistics-item">
                    <div className="agency-statistics-value">
                      <img
                        alt=""
                        src={icons.agencyStatisticsIcon}
                        className="agency-statistics-icon"
                      />
                      {value}
                    </div>
                    <div className="agency-statistics-name">{name}</div>
                  </div>
                )
              })}
            </div>
            <div className="grid-item-title">
              <span>服务机构数据</span>
            </div>
            <StachChart
              className="grid-item-content"
              option={echartsOptions['1-2']}
              style={{ flex: 1 }}
            />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-1" className="grid-item">
            <CommonMap initData={0} callBack={setArea} />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>残疾人变化趋势</span>
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
              <span>按比例就业情况统计</span>
            </div>
            <div className="grid-item-content business-statistics">
              {businessStatisticsData.map((item, index) => {
                const { name, value, unit } = item;
                const key = index;
                return (
                  <div
                    key={key}
                    className="business-statistics-item"
                  >
                    <div>
                      <div>
                        <span className="business-statistics-value">{value}</span>
                        <span>&nbsp;</span>
                        <span className="business-statistics-unit">{unit}</span>
                      </div>
                      <div className="business-statistics-name">{name}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ContainerWithBorder>
          <ContainerWithBorder key="3-2" className="grid-item">
            <div className="grid-item-title">
              <span>残联机构</span>
            </div>
            <RowChart
              option={echartsOptions['3-2']}
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
          '1': echartsOptions['2-2']
        }}
        visible={commonModalVisible}
        setVisible={() => setCommonModalVisible(false)}
      />
    </Layout>
  )

}


export default ServiceAgencies