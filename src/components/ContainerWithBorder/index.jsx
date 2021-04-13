import React from 'react';
import classNames from 'classnames';
import './index.scss';

const defaultContainer = (props) => {
  const {
    children,
    ...restProps
  } = props;
  return (
    <div {...restProps}>
      {children}
    </div>
  )
}

const Borders = () => {
  return (
    <>
      <div className="container-border top-border"></div>
      <div className="container-border right-border"></div>
      <div className="container-border bottom-border"></div>
      <div className="container-border left-border"></div>
    </>
  )
}

const Corner = (props) => {
  const { className } = props;
  return (
    <svg width="30" height="30" className={classNames('container-corner', className)}>
      <defs>
        <filter id="borderr-box-12-filterId-c50070dbbd59479882ef7de4f37cbcc7" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken"></feMorphology>
          <feGaussianBlur in="thicken" stdDeviation="2" result="blurred"></feGaussianBlur>
          <feFlood floodColor="rgba(124,231,253,0.7)" result="glowColor">
            <animate attributeName="floodColor" values="
                rgba(124,231,253,0.7);
                rgba(124,231,253,0.3);
                rgba(124,231,253,0.7);
              " dur="3s" begin="0s" repeatCount="indefinite">
            </animate>
          </feFlood>
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored"></feComposite>
          <feMerge>
            <feMergeNode in="softGlowColored"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <path
        strokeWidth="2"
        fill="transparent"
        strokeLinecap="round"
        filter="url(#borderr-box-12-filterId-c50070dbbd59479882ef7de4f37cbcc7)"
        d="M 20 5 L 15 5 Q 5 5 5 15 L 5 20" stroke="#7ce7fd"></path>
    </svg>
  )
}

const Corners = () => {
  return (
    <>
      <Corner className="top-left-corner" />
      <Corner className="top-right-corner" />
      <Corner className="bottom-right-corner" />
      <Corner className="bottom-left-corner" />
    </>
  )
}

const ContainerWithBorder = (props) => {
  const {
    component: Container = defaultContainer,
    children,
    className,
    ...restProps
  } = props;
  return (
    <Container {...restProps} className={classNames('container-with-border', className)}>
      <Borders />
      <Corners />
      {children}
    </Container>
  )
}

export default ContainerWithBorder;