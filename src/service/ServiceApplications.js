import ajax from "../config/axios.config";

// 1、服务申请人总数
export const getServiceTotal = (params) => {
  return ajax({
    url:'service/total',
    method:'get',
    params,
  })
}
// 2、维文：无障碍改造、代步车购买的数量
export const getServiceWeiwen = params => {
  return ajax({
    url: 'service/weiwen',
    method: 'get',
    params,
  })
}
// 3. 康复：精神病人门诊救助数量、肢体矫治救助数量、儿童康复评定数量、精神病人机构康复救助数量、辅助器具数量、苯丙酮尿症救助数量、精神病人住院救助数量、医疗救助数量、人工耳蜗救助数量。
export const getServiceKangfu = params => {
  return ajax({
    url: 'service/kangfu',
    method: 'get',
    params,
  })
}
// 4. 教就：子女助学金数量、残疾学生奖学金数量、残疾学生助学金数量、盲生交通伙食补贴数量、助残大学生一次性入学补助数量、临时救助数量、日间照料服务补贴数量、集中托养服务补贴数量、居家安养服务补贴数量、老年重残救助数量、社保补贴数量、辅助性就业资格认定数量、个体创业扶持数量。
export const getServiceJiaojiu = params => {
  return ajax({
    url: 'service/jiaojiu',
    method: 'get',
    params,
  })
}
// 5、机构每月申请服务变化趋势
export const getServiceEveryMonth = params => {
  return ajax({
    url: 'service/every/month',
    method: 'get',
    params,
  })
}
// 5、机构申请服务年度变化
export const getServiceEveryYear = params => {
  return ajax({
    url: 'service/every/year',
    method: 'get',
    params,
  })
}