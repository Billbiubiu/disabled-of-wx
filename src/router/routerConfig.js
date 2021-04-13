import { commonConfig } from "../shared/config/";
import {
  Home,
  Login,
  DisabledPerson,
} from '../pages/index';

let routes = [
  {
    name: "首页",
    text: "首页",
    path: commonConfig.routeBasePath + "/home",
    component: Home,
  },
  {
    path: commonConfig.routeBasePath + "/login",
    component: Login,
  },
  {
    path: commonConfig.routeBasePath + "/disabled",
    component: DisabledPerson,
  },
];

export default routes;
