import ajax from "../config/axios.config";

// 1、服务机构总数、工作人员总数
export const getOrganizationTotal = (params) => {
  return ajax({
    url:'organization/total',
    method:'get',
    params,
  })
}
// 2、服务机构根据残联机构、康复机构+辅具康复中心、托养机构、残疾人之家几大类型统计服务机构总数
export const getOrganizationCategoryTotal = (params) => {
  return ajax({
    url:'organization/category/total',
    method:'get',
    params,
  })
}
// 2、服务机构根据残联机构、康复机构+辅具康复中心、托养机构、残疾人之家几大类型统计服务机构工作人员总数
export const getOrganizationCategoryWorkPersonnelTotal = (params) => {
  return ajax({
    url:'organization/category/work/personnel/total',
    method:'get',
    params,
  })
}
// 2、服务机构根据残联机构、康复机构+辅具康复中心、托养机构、残疾人之家几大类型统计服务机构服务对象总数
export const getOrganizationCategoryServiceObjectTotal = (params) => {
  return ajax({
    url:'organization/category/service/object/total',
    method:'get',
    params,
  })
}
// 4. 助残单位数量总数、安置残疾人总数，和各个单位安置数
export const getOrganizationCompanyTotal = (params) => {
  return ajax({
    url:'organization/company/count',
    method:'get',
    params,
  })
}
// 3. 子类机构统计
export const getOrganizationTypeList = (params) => {
  return ajax({
    url:'organization/type/list',
    method:'get',
    params,
  })
}
