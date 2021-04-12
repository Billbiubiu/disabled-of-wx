import moment from 'moment';
import ajax from "../config/axios.config";
import axios from "axios";
import { commonConfig } from "../shared/config/index";


export const getUserInfo = (requestCode) => {
  return axios({
    url: `/wx/lx/getUserInfo?requestCode=${requestCode}`,
    method: "get",
    baseURL: commonConfig.baseURL,
  })
}