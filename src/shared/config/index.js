// 默认配置文件
let defaultConfig = {
  //登录请求的基础地址
  loginURL: "",
  // 其他请求的基础地址
  baseURL: "http://2.20.103.134/api/",
  //所有路由前缀
  routeBasePath: "",
};

if (window.YWConfig) {
  for (var key in defaultConfig) {
    if (window.YWConfig[key]) {
      defaultConfig[key] = window.YWConfig[key];
    }
  }
}
defaultConfig.ls = window.ls
// 获取存储配置
export const commonConfig = defaultConfig;
