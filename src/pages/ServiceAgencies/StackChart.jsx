import React, { useMemo, useState } from 'react';
import ArrowOrange from '../../assets/images/orange.png'
import ArrowWhite from '../../assets/images/white.png'

const rowList = [
  { name: '机构数量', color: '#BC3A00' },
  { name: '工作人员数量', color: '#00AAE8' },
  { name: '服务人员数量', color: '#70F1A9' },
]

const StackChart = (props) => {
  const {
    option: {
      data = [],
    } = {},
    onRowClick = () => { },
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const parsedData = useMemo(() => {
    return data.map(item => {
      return {
        ...item,
        values: item.values.map(value => parseFloat(value) || 0),
      };
    });
  }, [data]);

  const maxValue = useMemo(() => {
    const values = parsedData.reduce((result, item) => {
      return [...result, ...item.values];
    }, []);
    return Math.max.apply(null, values) || Number.MAX_SAFE_INTEGER;
  }, [parsedData]);


  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'stretch',
    }}>
      {data.map((item, index) => {
        const key = index;
        const { name, values } = item;
        return (
          <div
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ marginBottom: '5rem' }}>
              <span>No.{index + 1}</span>
              <span>{name}</span>
            </div>
            <div style={{ position: 'relative', paddingRight: '50rem' }}>
              {values.map((value, index) => {
                const key = index;
                const { name, color } = rowList[index];
                return (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}>
                    <div style={{
                      width: '7em',
                      textAlign: 'right',
                      lineHeight: 1,
                      marginRight: '10rem',
                    }}>{name}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        textAlign: 'right',
                      }}>{value}</div>
                      <div style={{
                        height: '4rem',
                        width: `${value / maxValue * 100}%`,
                        backgroundColor: color,
                      }}></div>
                    </div>
                  </div>
                )
              })}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveIndex(index);
                  onRowClick(index);
                }}
              >
                <img
                  alt=""
                  src={index === activeIndex ? ArrowOrange : ArrowWhite}
                  style={{ width: '40rem' }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default StackChart;