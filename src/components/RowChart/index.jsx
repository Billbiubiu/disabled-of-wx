import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import orange from '../../assets/images/orange.png'
import white from '../../assets/images/white.png'

const RowChart = (props) => {
  const {
    option: {
      data = [], // 数据
      unit = '', // 单位
    } = {},
    ifShowArrow = false,// 是否展示箭头,有箭头代表可以点击
    arrowInitIndex = 0,// 有箭头 默认展示下标
    clickCallBack = () => { }, // 点击事件的回调
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

  const [clickIndex, setClickIndex] = useState(arrowInitIndex)

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

  // 可点击后触发的事件
  const arrowClick = (key) => {
    setClickIndex(key)
    clickCallBack(key)
  }

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
            onClick={() => ifShowArrow && arrowClick(key)}
          >
            <div
              className="row-container"
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
                className={ifShowArrow && clickIndex === key ? "row-chart-row-body row-click" : "row-chart-row-body"}
                style={{
                  ...rowBodyStyle,
                  width: `${value / maxValue * 100}%`
                }}
              />
              <div
                className={ifShowArrow && clickIndex === key ? "row-chart-row-footer row-click" : "row-chart-row-footer"}
                style={rowFooterStyle}
              />
            </div>
            {ifShowArrow && <div className="row-arrow">
              <img alt="" src={clickIndex === key ? orange : white} />
            </div>
            }
          </div>
        )
      })}
    </div>
  )
};

export default RowChart;