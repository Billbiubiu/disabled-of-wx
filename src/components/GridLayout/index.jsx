import React, { useMemo } from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

function GridLayout(props) {
  const {
    width,  // 容器宽度
    height, // 容器高度
    rowNum, // 行数
    colNum, // 列数
    margin, // 间距
    layout, // 布局
    ...restProps
  } = props
  // 根据容器高度、行数、间距计算行高
  const rowHeight = useMemo(() => {
    return (height - ((rowNum + 1) * margin[1])) / rowNum;
  }, [height, rowNum, margin])
  return (
    <ReactGridLayout
      layout={layout}
      margin={margin}
      cols={colNum}
      width={width}
      rowHeight={rowHeight}
      isDraggable={false}
      isResizable={false}
      useCSSTransforms={false}
      {...restProps}
    >
      {props.children}
    </ReactGridLayout>
  )
}

export default GridLayout;