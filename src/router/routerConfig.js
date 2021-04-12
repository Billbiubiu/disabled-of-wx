import { commonConfig } from "../shared/config/";
import {Home} from '../pages/index'

let routes = [
  {
    name: "首页",
    text: "首页",
    path: commonConfig.routeBasePath + "/home",
    component: Home,
  },
];

export default routes;
