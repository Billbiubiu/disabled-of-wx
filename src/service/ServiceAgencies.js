import ajax from "../config/axios.config";

export const getOrganizationTotal = (params) => {
  return ajax({
    url:'organization/total',
    method:'get',
    params,
  })
}

export const getOrganizationCategoryTotal = (params) => {
  return ajax({
    url:'organization/category/total',
    method:'get',
    params,
  })
}

export const getOrganizationCategoryWorkPersonnelTotal = (params) => {
  return ajax({
    url:'organization/category/work/personnel/total',
    method:'get',
    params,
  })
}

export const getOrganizationCompanyTotal = (params) => {
  return ajax({
    url:'organization/company/count',
    method:'get',
    params,
  })
}
