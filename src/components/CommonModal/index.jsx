import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Modal, Button } from 'antd';

const defaultOptions = {
  '1': {
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
  '2': {
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
        data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']
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
        data: [4, 3, 6, 6, 7, 7, 2, 6, 3, 2, 5],
      },
      {
        type: 'line',
        data: [4, 3, 6, 6, 7, 7, 2, 6, 3, 2, 5],
      },
    ]
  },
  '3': {
    color: ['#FF1494', '#FF9F7F', '#FFDB5C', '#9FE6B8', '#67E0E3', '#32C5E9', '#37A2DA'],
    series: [
      {
        type: 'pie',
        radius: '80%',
        label: {
          formatter: `{b} {c}`,
          backgroundColor: "transparent",
        },
        data: [
          { value: 40, name: '江阴市' },
          { value: 30, name: '宜兴市' },
          { value: 50, name: '惠山区' },
          { value: 10, name: '滨湖区' },
          { value: 40, name: '锡山区' },
          { value: 30, name: '新吴区' },
          { value: 20, name: '梁溪区' },
        ],
      }
    ]
  },
};

const CommonModal = (props) => {
  const {
    options = {},
    visible = false,
    setVisible = () => { },
  } = props;
  const echartsOptions = { ...defaultOptions, ...options };
  const [activeKey, setActiveKey] = useState('1');
  return (
    <Modal
      centered
      width="auto"
      footer={null}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div style={{ width: '50vw', height: '50vh', position: 'relative' }}>
        <ReactEcharts
          notMerge
          option={echartsOptions[activeKey]}
          style={{ width: '100%', height: '100%' }}
        />
        <div style={{ position: 'absolute', top: '20rem', right: '20rem', zIndex: 1 }}>
          <Button
            type="text"
            danger={activeKey === '1'}
            onClick={() => setActiveKey('1')}
          >月度分布</Button>
          <Button
            type="text"
            danger={activeKey === '2'}
            onClick={() => setActiveKey('2')}
          >年度分布</Button>
          <Button
            type="text"
            danger={activeKey === '3'}
            onClick={() => setActiveKey('3')}
          >地区分布</Button>
        </div>
      </div>
    </Modal>
  )
};

export default CommonModal;