import { commonConfig } from "../shared/config/";
import {
  Login,
  Home,
  DisabledPerson,
  ServiceAgencies,
  ServiceApplications,
  ServiceOnline,
  Satisfaction,
} from '../pages/index';

let routes = [
  {
    name: "登录页面",
    text: "登录页面",
    path: commonConfig.routeBasePath + "/login",
    component: Login,
  },
  {
    name: "导航页面",
    text: "导航页面",
    path: commonConfig.routeBasePath + "/home",
    component: Home,
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
    path: commonConfig.routeBasePath + "/service-agencies",
    component: ServiceAgencies,
  },
  {
    name: "服务申请",
    text: "服务申请",
    path: commonConfig.routeBasePath + "/service-applications",
    component: ServiceApplications,
  },
  {
    name: "网上服务",
    text: "网上服务",
    path: commonConfig.routeBasePath + "/service-online",
    component: ServiceOnline,
  },
  {
    name: "满意度",
    text: "满意度",
    path: commonConfig.routeBasePath + "/satisfaction",
    component: Satisfaction,
  },
];

export default routes;
