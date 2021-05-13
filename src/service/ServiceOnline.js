import ajax from "../config/axios.config";

export const getServiceTotal = (params) => {
  return ajax({
    url:'online/service',
    method:'get',
    params,
  })
}