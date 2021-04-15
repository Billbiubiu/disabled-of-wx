import React, { useMemo } from 'react';
import './index.scss';

const RowChart = (props) => {
  const {
    option: {
      data = [], // 数据
      unit = '', // 单位
    } = {},
  } = props;
  const parsedData = useMemo(() => {
    return data.map(item => {
      const { value } = item;
      return {
        ...item,
        value: parseFloat(value) || 0,
      };
    }).sort((a, b) => {
      return a.value - b.value;
    });
  }, [data]);
  const maxValue = useMemo(() => {
    const values = parsedData.map(item => item.value);
    return Math.max.apply(null, values) || Number.MAX_SAFE_INTEGER;
  }, [parsedData]);
  if (!data || !data.length) return null;
  return (
    <div className="row-chart">
      {data.map((item, index) => {
        const key = index;
        const { name, value } = item;
        return (
          <div key={key} className="row-chart-row">
            <div className="row-chart-row-header">
              <span className="row-chart-row-index">No.{index + 1}</span>
              <span className="row-chart-row-name">{name}</span>
              <span className="row-chart-row-value">{value}{unit}</span>
            </div>
            <div className="row-chart-row-body" style={{ width: `${value / maxValue * 100}%` }} />
            <div className="row-chart-row-footer" />
          </div>
        )
      })}
    </div>
  )
};

export default RowChart;