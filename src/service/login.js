import ajax from "../config/axios.config";

// 1、服务机构总数、工作人员总数
export const postLogin = params => {
  return ajax({
    url:'login',
    method:'post',
    params,
  })
}