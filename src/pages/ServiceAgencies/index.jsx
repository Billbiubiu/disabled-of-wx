import React from 'react'
import { CommonNavBar, ContainerWithCorner } from '../../components/index'
import './index.scss'
import { useHistory } from "react-router-dom";


const ServiceAgencies = () => {
  const history = useHistory();

  return (
    <div className="service-agencies">
      <CommonNavBar showTime={true} title="服务机构" btnType="back"></CommonNavBar>
      <ContainerWithCorner className="service-agencies-content">
      </ContainerWithCorner>
    </div >
  )

}


export default ServiceAgencies