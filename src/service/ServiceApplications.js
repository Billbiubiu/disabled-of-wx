import ajax from "../config/axios.config";

export const getServiceTotal = (params) => {
  return ajax({
    url:'service/total',
    method:'get',
    params,
  })
}

export const getServiceWeiwen = params => {
  return ajax({
    url: 'service/weiwen',
    method: 'get',
    params,
  })
}

export const getServiceKangfu = params => {
  return ajax({
    url: 'service/kangfu',
    method: 'get',
    params,
  })
}

export const getServiceJiaojiu = params => {
  return ajax({
    url: 'service/jiaojiu',
    method: 'get',
    params,
  })
}