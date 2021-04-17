import React, { useMemo } from 'react';
import classNames from 'classnames';
import './index.scss';

const RowChart = (props) => {
  const {
    option: {
      data = [], // 数据
      unit = '', // 单位
    } = {},
    className,
    style = {},
    rowStyle = {},
    rowHeaderStyle = {},
    rowIndxStyle = {},
    rowNameStyle = {},
    rowValueStyle = {},
    rowBodyStyle = {},
    rowFooterStyle = {},
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
    <div
      className={classNames('row-chart', className)}
      style={style}
    >
      {data.map((item, index) => {
        const key = index;
        const { name, value } = item;
        return (
          <div
            key={key}
            className="row-chart-row"
            style={rowStyle}
          >
            <div
              className="row-chart-row-header"
              style={rowHeaderStyle}
            >
              <span
                className="row-chart-row-index"
                style={rowIndxStyle}
              >No.{index + 1}</span>
              <span
                className="row-chart-row-name"
                style={rowNameStyle}
              >{name}</span>
              <span
                className="row-chart-row-value"
                style={rowValueStyle}
              >{value}{unit}</span>
            </div>
            <div
              className="row-chart-row-body"
              style={{
                ...rowBodyStyle,
                width: `${value / maxValue * 100}%`
              }}
            />
            <div
              className="row-chart-row-footer"
              style={rowFooterStyle}
            />
          </div>
        )
      })}
    </div>
  )
};

export default RowChart;