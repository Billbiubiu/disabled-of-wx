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