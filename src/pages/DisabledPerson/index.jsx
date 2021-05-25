import React, { useState } from 'react';
import { Layout } from 'antd';
import FirstLayout from './firstLayout'
import SecordLayout from './secordLayout'
import {
  CommonNavBar,
  ContainerWithCorner,
} from '../../components';

import './index.scss';
import * as Icons from '../../assets/images/disabled-person';
import moment from 'moment';

const { Content } = Layout;

const DisabledPerson = (props) => {

  // 是否切换到第二屏幕
  const [switchFlag, setSwtichFlag] = useState(false)
  //选择地图的区域
  const [area, setArea] = useState()
  // 时间范围
  // const [timeRange, setTimeRange] = useState({startDate:moment().format('YYYY-MM-DD'),endDate:moment().format('YYYY-MM-DD')})
  const [timeRange, setTimeRange] = useState({})

  return (
    <Layout className="disabled-person">
      <CommonNavBar showRangeDate={true} timeRange={timeRange} setTimeRange={setTimeRange} showTime={true} title="执证残疾人" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="disabled-person-content">
        {
          switchFlag ? <SecordLayout timeRange={timeRange} area={area}></SecordLayout> : <FirstLayout timeRange={timeRange} area={area} setArea={setArea}></FirstLayout>
        }
        <div onClick={() => { setSwtichFlag(!switchFlag) }} className={switchFlag ? "switch-btn" : "switch-btn-two "} >
          <img src={switchFlag ? Icons.left : Icons.right} alt="" />
        </div>
      </ContainerWithCorner>
    </Layout>
  )
}


export default DisabledPerson