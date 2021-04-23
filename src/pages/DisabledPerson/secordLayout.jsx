import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  GridLayout,
  ContainerWithBorder,
  CommomMap,
  RowChart
} from '../../components';
import * as Icons from '../../assets/images/disabled-person';
import './firstLayout.scss';

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


const SecordLayout = (props) => {

  return (
    <GridLayout layout={layout}>
      <ContainerWithBorder key="1-1" className="grid-item">
        <div className="grid-item-title">
          <span>残疾人数据统计</span>
        </div>
      </ContainerWithBorder>
      <ContainerWithBorder key="2-1" className="grid-item">
      </ContainerWithBorder>
      <ContainerWithBorder key="2-2" className="grid-item">
        <div className="grid-item-title">
          <span>残疾人和全市人均收入增长趋势图</span>
        </div>

      </ContainerWithBorder>
      <ContainerWithBorder key="3-1" className="grid-item">
        <div className="grid-item-title">
          <span>残疾人数据统计</span>
        </div>

      </ContainerWithBorder>
      <ContainerWithBorder key="3-2" className="grid-item">

      </ContainerWithBorder>
      <ContainerWithBorder key="3-3" className="grid-item">

      </ContainerWithBorder>
    </GridLayout>
  )
}

export default SecordLayout;