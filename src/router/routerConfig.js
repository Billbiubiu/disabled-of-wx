import { commonConfig } from "../shared/config/";
import {
  Login,
  MainPage,
  DisabledPerson,
  ServiceAgencies,
} from '../pages/index';

let routes = [
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
    name: "残疾人",
    text: "残疾人",
    path: commonConfig.routeBasePath + "/disabled-person",
    component: DisabledPerson,
  },
  {
    name: "服务机构",
    text: "服务机构",
    path: commonConfig.routeBasePath + "/serviceAgencies",
    component: ServiceAgencies,
  },
];

export default routes;
