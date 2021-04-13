import { commonConfig } from "../shared/config/";
import { Home, Login ,MainPage,ServiceAgencies} from '../pages/index';

let routes = [
  {
    name: "首页",
    text: "首页",
    path: commonConfig.routeBasePath + "/home",
    component: Home,
  },
  {
    name: "导航页面",
    text: "导航页面",
    path: commonConfig.routeBasePath + "/mainpage",
    component: MainPage,
  },
  {
    name: "登录页面",
    text: "登录页面",
    path: commonConfig.routeBasePath + "/login",
    component: Login,
  },
  {
    name: "服务机构",
    text: "服务机构",
    path: commonConfig.routeBasePath + "/serviceAgencies",
    component: ServiceAgencies,
  },
];

export default routes;
