import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

function GridLayout(props) {
  const {
    rowNum = 24, // 行数
    colNum = 24, // 列数
    margin = [10, 10], // 间距
    layout = [], // 布局
    layoutContainerRef, // 布局容器
    ...restProps
  } = props
  const [layoutVisible, setLayoutVisible] = useState(false); // 用于延迟渲染
  const [layoutSize, setLayoutSize] = useState({ width: 0, height: 0 }); // 布局组件宽高
  const { height, width } = layoutSize;
  // 确定布局组件宽高
  const resizeTimer = useRef();
  useEffect(() => {
    if (!layoutContainerRef) return;
    const onResize = () => {
      if (resizeTimer.current) {
        clearTimeout(resizeTimer.current)
      }
      resizeTimer.current = setTimeout(() => {
        const layoutContainer = layoutContainerRef.current;
        if (!layoutContainer) return;
        const { clientWidth: width, clientHeight: height } = layoutContainer;
        setLayoutSize({ width, height });
        setLayoutVisible(true);
        resizeTimer.current = null;
      }, 100)
    }
    // 触发初次计算
    onResize()
    // 监听resize事件，重新计算布局宽高
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [layoutContainerRef])
  // 根据布局容器高度、行数、间距计算行高
  const rowHeight = useMemo(() => {
    return (height - ((rowNum + 1) * margin[1])) / rowNum;
  }, [height, rowNum, margin])
  if (!layoutVisible) return null;
  return (
    <ReactGridLayout
      width={width}
      cols={colNum}
      layout={layout}
      margin={margin}
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