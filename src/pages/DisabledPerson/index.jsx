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

const { Content } = Layout;

const DisabledPerson = (props) => {

  // 是否切换到第二屏幕
  const [switchFlag, setSwtichFlag] = useState(false)

  return (
    <Layout className="disabled-person">
      <CommonNavBar showTime={true} title="执政残疾人" btnType="back" />
      <ContainerWithCorner
        component={Content}
        className="disabled-person-content">
        {
          switchFlag ? <SecordLayout></SecordLayout> : <FirstLayout></FirstLayout>
        }
        <div onClick={() => { setSwtichFlag(!switchFlag) }} className={switchFlag ? "switch-btn" : "switch-btn-two "} >
          <img src={switchFlag ? Icons.left : Icons.right} alt="" />
        </div>
      </ContainerWithCorner>
    </Layout>
  )
}


export default DisabledPerson