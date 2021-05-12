import ajax from "../config/axios.config";
import { commonConfig } from "../shared/config/index";

export const loginOut = (requestCode) => {
  return ajax({
    url: ``,
    method: "get",
    baseURL: commonConfig.baseURL,
  })
}