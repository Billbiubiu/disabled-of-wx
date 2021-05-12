import ajax from "../config/axios.config";
import { commonConfig } from "../shared/config/index";

export const loginOut = (requestCode) => {
  return ajax({
    url: ``,
    method: "get",
    baseURL: commonConfig.baseURL,
  })
}

export const getStatistics = ({ area, startDate, endDate}) => {
  return ajax({
    url:'orgnization/total',
    method:'get',
    params:{
      area:area,
      startDate:startDate,
      endDate:endDate
    }
  })
}