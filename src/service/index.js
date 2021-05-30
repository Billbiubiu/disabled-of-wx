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
//执证残疾人年纪
export const getAgeGroup = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/age/group',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}

//多重残疾人
export const getMultipleNum = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/multiple',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//重度残疾人
export const getSevereNum = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/severe',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//孤独症人数
export const getAutismNum = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/autism',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//疑似残疾人
export const getSuspectedNum = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/suspected',
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

//残疾人人均年收入
export const disabeldAvg = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/oneincome/avg',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
// 市人均年收入最新一年的数据
export const disabeldPersonAvg = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/city/person/avg',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}

//残疾人人均年收入年度增长率和市人均年收入增长率 每年的折线图
export const disabeldIncome = ()=>{
  return ajax({
    url:'disabled/Income',
    method:'get',
  })
}

/**  执证残疾人页面1  end */

/**  执证残疾人页面2  start */

// 残疾人文化程度group数量（无、小学、本科。。。）
export const disabeldDegree = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/education/degree',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//残疾人的特长 group类型和占比
export const disabeldSpecial = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/special',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//残疾人在读学习group 学历的数量
export const disabeldEducation = (area,startDate,endDate,studyState)=>{
  return ajax({
    url:'disabled/education/degree',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate,
      studyState:1
    }
  })
}
//残疾人养老保险缴纳和未缴纳数量和占比
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
//医疗保险缴纳和未缴纳数量和占比
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
//养老保险分布职工养老和居民养老数量
export const disabeldYanglaobxJMZG = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/yanglaobxjmzg',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//医疗保险分布职工养老和居民养老数量
export const disabeldYiliaobxJMZG = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/yiliaobxjmzg',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//残疾人就业 已就业和未就业数量和占比
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
//已就业的残疾人中，年龄段的数量
export const disabeldAge = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/age',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}
//已就业的残疾中 残疾人的类型和占比
export const disabeldTypeForYJY = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/type',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate,
      employState:1
    }
  })
}
//残疾人就业形式分类
export const disabeldEmployment = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/from/of/employment',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}

//残疾人就业单位性质分类
export const disabeldUnit = (area,startDate,endDate)=>{
  return ajax({
    url:'disabled/employment/unit',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}

/**  执证残疾人页面2  end */

/** 满意度页面 start */

//满意统计
export const satisfactionCitywide = ()=>{
  return ajax({
    url:'satisfaction/citywide',
    method:'get',
  })
}
//各区平均满意度
export const areaSatisfaction = ()=>{
  return ajax({
    url:'satisfaction/area',
    method:'get',
  })
}
//机构满意度 每年满意度 变化趋势
export const areaEveryYear = ()=>{
  return ajax({
    url:'satisfaction/area/every/year',
    method:'get',
  })
}
//各区的详细满意度
export const areaDetail = (area)=>{
  return ajax({
    url:'satisfaction/area/detail',
    method:'get',
    params:{
      area:area
    }
  })
}
//添加满意度
export const addSatisfaction = (data,year)=>{
  return ajax({
    url:'satisfaction/add',
    method:'post',
    data:{
      data:data,
      year:year
    }
  })
}
/** 满意度页面 end */
