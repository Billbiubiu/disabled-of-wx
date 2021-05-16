import React, { useEffect, useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useMergeState } from '../../shared/hooks';
import {
  CommonNavBar,
  ContainerWithCorner,
  GridLayout,
  ContainerWithBorder,
  RowChart,
  CommonMap,
  CommonModal,
} from '../../components';
import {
  getServiceTotal,
  getServiceWeiwen,
  getServiceKangfu,
  getServiceJiaojiu,
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

const params = {};

const ServiceApplications = (props) => {
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
  useEffect(() => {
    getServiceTotal(params).then(res => {
      const { serviceTotal } = res;
      setApplicantCount(serviceTotal);
    });
  }, []);
  // echarts图表
  const [echartsOptions, mergeEchartsOptions] = useMergeState({
    // 维文
    '1-2': {},
    // 康复
    '1-3': {},
    // 机构每月残疾人服务申请变化趋势
    '2-2': {},
    // 教就
    '3-1': {},
  });
  useEffect(() => {
    // 1-2
    getServiceWeiwen(params).then(res => {
      const { wza, dbc } = res;
      const data = [
        { name: '无障碍改造', value: wza },
        { name: '代步车购买', value: dbc },
      ].sort((a, b) => b.value - a.value);
      mergeEchartsOptions({ '1-2': { data, unit: '人' } });
    });
    // 1-3
    getServiceKangfu(params).then(res => {
      const data = Object.keys(res).map(key => {
        const name = KANGFU_MAP[key];
        const value = res[key];
        return { name, value };
      }).sort((a, b) => b.value - a.value);
      mergeEchartsOptions({ '1-3': { data } });
    });
    // 2-2
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
    });
    // 3-1
    getServiceJiaojiu(params).then(res => {
      const data = Object.keys(res).map(key => {
        const name = JIAOJIU_MAP[key];
        const value = res[key];
        return { name, value };
      }).sort((a, b) => b.value - a.value);
      mergeEchartsOptions({ '3-1': { data } });
    });
  }, [mergeEchartsOptions]);
  // 弹窗状态
  const [commonModalVisible, setCommonModalVisible] = useState(false);
  return (
    <Layout className="service-applications">
      <CommonNavBar showTime={true} title="服务申请" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="service-applications-content">
        <GridLayout layout={layout} margin={[5, 5]}>
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
            <CommonMap />
          </ContainerWithBorder>
          <ContainerWithBorder key="2-2" className="grid-item">
            <div className="grid-item-title">
              <span>机构每月残疾人服务申请变化趋势</span>
            </div>
            <ReactEcharts
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
      </ContainerWithCorner>
      <CommonModal
        visible={commonModalVisible}
        setVisible={() => setCommonModalVisible(false)}
      />
    </Layout>
  )
}

export default ServiceApplications;