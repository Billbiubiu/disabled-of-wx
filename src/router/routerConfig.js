import { commonConfig } from "../shared/config/";
import { Home, Login } from '../pages/index';

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
];

export default routes;
