import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './index.scss'
import { useHistory } from "react-router-dom";
import { message } from 'antd'
import { loginOut } from '../../service/index'

/**
 * 
 * @param {Boolean} showTime  是否展示当前时间
 * @param {String} title  标题
 * @param {String} btnType  右侧button的类型  back(返回按钮)/logout(注销)/none(无按钮)
 */
let interval = null

const CommonNavBar = (props) => {
  const { showTime = true, title = "服务申请", btnType = "logout" } = props
  const [time, setTime] = useState()
  const history = useHistory();

  // 注销
  const logout = () => {
    loginOut().then((res) => {
      if (res.status === 0) {
        message.success('注销成功')
        history.goBack('/login')
      } else {
        message.error(res.error)
      }
    })
  }



  useEffect(() => {
    if (showTime) {
      interval = setInterval(() => {
        setTime(moment().format("HH:mm:ss YYYY-MM-DD dddd "))
      }, 1000);
    }
    return () => {
      if (interval != null) {
        clearInterval(interval)
      }
    }
  }, [])

  return (
    <div className="common-bar">
      {
        showTime && <div className="bar-time">
          {time}
        </div>
      }
      <div className="bar-title">{title}</div>
      <div className="bar-btn">
        {
          btnType === "back" && <div className="btn-back">
            <svg width="120" height="50" className="dv-border-svg-container">
              <polygon fill="transparent" points="7, 7 113, 7 113, 43 7, 43"></polygon><polyline points="2, 2 118 ,2 118, 48 2, 48 2, 2" stroke="#fff"></polyline>
              <polyline points="6, 6 114, 6 114, 44 6, 44 6, 6" stroke="rgba(255, 255, 255, 0.6)"></polyline>
              <circle cx="11" cy="11" r="1" fill="#fff"></circle>
              <circle cx="109" cy="11" r="1" fill="#fff"></circle>
              <circle cx="109" cy="39" r="1" fill="#fff"></circle>
              <circle cx="11" cy="39" r="1" fill="#fff"></circle>
            </svg>
            <div className="btn-content" onClick={() => { history.goBack() }}>返回</div>
          </div>
        }
        {
          btnType === "logout" && <div className="btn-back">
            <svg width="120" height="50" className="dv-border-svg-container">
              <polygon fill="transparent" points="7, 7 113, 7 113, 43 7, 43"></polygon><polyline points="2, 2 118 ,2 118, 48 2, 48 2, 2" stroke="#fff"></polyline>
              <polyline points="6, 6 114, 6 114, 44 6, 44 6, 6" stroke="rgba(255, 255, 255, 0.6)"></polyline>
              <circle cx="11" cy="11" r="1" fill="#fff"></circle>
              <circle cx="109" cy="11" r="1" fill="#fff"></circle>
              <circle cx="109" cy="39" r="1" fill="#fff"></circle>
              <circle cx="11" cy="39" r="1" fill="#fff"></circle>
            </svg>
            <div className="btn-content" onClick={() => logout()}>注销</div>
          </div>
        }
      </div>
    </div>
  )

}


export default CommonNavBar