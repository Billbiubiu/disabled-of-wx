import moment from 'moment';
import ajax from "../config/axios.config";
import axios from "axios";
import { commonConfig } from "../shared/config/index";


export const loginOut = (requestCode) => {
  return ajax({
    url: ``,
    method: "get",
    baseURL: commonConfig.baseURL,
  })
}

/**  执证残疾人页面1 begin */

//执证残疾人总数
export const getDisabledNum = (area,startDate,endDate)=>{
    return ajax({
      url:'disabled/id/sum',
      method:'get',
      params:{
        area:area,
        startDate:startDate,
        endDate:endDate
      }
    })
}
// 残疾人类型统计
export const disabeldType = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/type',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
// 残疾人性别数量
export const disabeldSex= (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/sex',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//残疾人婚姻状况
export const disabeldMarry = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/marry',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//残疾人在读状况
export const disabeldStudy = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/study',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//残疾人就业占比
export const disabeldEmploy = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/employ',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//残疾人养老保险缴纳占比
export const disabeldYanglaobx = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/yanglaobx',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//残疾人医疗保险缴纳占比
export const disabeldYiliaobx = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/yiliaobx',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//残疾人低保、低收入、一户多残、人均面积
export const disabeldDbNum = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/db/num',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}

/**  执证残疾人页面 end */
