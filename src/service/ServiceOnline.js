import ajax from "../config/axios.config";

// 1. 注册人数统计
export const getOnlineServiceZcptUser = (params) => {
  return ajax({
    url:'online/service/zcpt/user',
    method:'get',
    params,
  })
}
// 2.互动交流 和 热点服务: 志愿者,热点回答在线咨询,蚕宝课堂,网上调查,残疾人风采 和 残疾人预防,辅具大厅,残疾人证查询,爱心地图
export const getOnlineServiceInteract = (params) => {
  return ajax({
    url:'online/service/interact',
    method:'get',
    params,
  })
}
// 3.业务模块: 发布职位数, 投递简历数和占比
export const getOnlineServicePosition = (params) => {
  return ajax({
    url:'online/service/position',
    method:'get',
    params,
  })
}
// 4.康复签到: 按月折线统计
export const getOnlineServiceSignLog = (params) => {
  return ajax({
    url:'online/service/sign/log',
    method:'get',
    params,
  })
}
// 5.点击量: 机构, 政策, 服务数量占比
export const getOnlineServiceInteractCnt = (params) => {
  return ajax({
    url:'online/service/interact/cnt',
    method:'get',
    params,
  })
}
// 6.无障碍地图: 康复机构,教育,就业 数量和占比
export const getOnlineServiceBsBuild = (params) => {
  return ajax({
    url:'online/service/bsBuild',
    method:'get',
    params,
  })
}
// 7.无障碍建筑与设施评分: 一至五 的平分数统计
export const getOnlineServiceBsBuildingFacilityEvalution = (params) => {
  return ajax({
    url:'online/service/bsBuilding/facility/evaluation',
    method:'get',
    params,
  })
}
