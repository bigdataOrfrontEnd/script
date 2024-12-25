const webpack = require("webpack");
const { merge } = require("webpack-merge");
const config = require("../config/base");
const express = require("express");
const app = express();
// 设置环境变量：BABEL_ENV、NODE_ENV=“development”；
// 加载自定义的环境变量配置；
// 必要的入口文件检测：作为入口的index.html和js;
// 读取ip和port；
// 检测是否配置browserslist。如果最终都没有browserlist则直接退出；
// 查找可用端口：先确认默认端口是否可用，不可用则确认是否自动查找可用端口，不查找则直接退出，查找则返回一个可用端口；
// 配置createCompiler的options并执行，返回一个compiler；
// 载入代理配置，并配置代理服务prepareProxy；
// const compiler = webpack(config)
//自动更新编译代码中间件
const devMiddleWare = require('webpack-dev-middleware')(compiler, {
  stats: {
    colors: true,
    chunks: false,
  },});
//自动刷新浏览器中间件
const hotMiddleWare = require('webpack-hot-middleware')(compiler);
//调用2个中间件
app.use(devMiddleWare);
app.use(hotMiddleWare);
// 把项目根目录作为静态资源目录，用于服务 HTML 文件
// app.use(express.static('./dist'));//指的是当前的cmd运行的位置process.cwd()
// 启动 HTTP 服务器，服务器监听在 process.env.PORT 端口
const server = app.listen("8081", () => {
  console.log(process.cwd());
  console.log("server is running");
});
// const webpack = require("webpack");
// const { merge } = require("webpack-merge");
// const config = require("../config/base");
// const express = require("express");
// const app = express();

// // 设置环境变量：BABEL_ENV、NODE_ENV=“development”
// process.env.BABEL_ENV = "development";
// process.env.NODE_ENV = "development";

// // 加载自定义的环境变量配置
// require('dotenv').config();

// // 必要的入口文件检测：作为入口的index.html和js
// const fs = require('fs');
// if (!fs.existsSync('./src/index.html') || !fs.existsSync('./src/index.js')) {
//   console.error('必要的入口文件缺失');
//   process.exit(1);
// }

// // 读取ip和port
// const ip = process.env.IP || 'localhost';
// const port = process.env.PORT || 8081;

// // 检测是否配置browserslist。如果最终都没有browserlist则直接退出
// const browserslist = require('browserslist');
// if (!browserslist.findConfig(process.cwd())) {
//   console.error('未配置browserslist');
//   process.exit(1);
// }

// // 查找可用端口：先确认默认端口是否可用，不可用则确认是否自动查找可用端口，不查找则直接退出，查找则返回一个可用端口
// const detect = require('detect-port');
// detect(port, (err, _port) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   if (port !== _port) {
//     console.log(`端口 ${port} 被占用，尝试使用端口 ${_port}`);
//     port = _port;
//   }

//   // 配置createCompiler的options并执行，返回一个compiler
//   const compiler = webpack(config);

//   // 载入代理配置，并配置代理服务prepareProxy
//   const proxy = require('http-proxy-middleware');
//   const proxyConfig = require('../config/proxy');
//   if (proxyConfig) {
//     app.use(proxy(proxyConfig));
//   }

//   // 自动更新编译代码中间件
//   const devMiddleWare = require('webpack-dev-middleware')(compiler, {
//     stats: {
//       colors: true,
//       chunks: false,
//     },
//   });

//   // 自动刷新浏览器中间件
//   const hotMiddleWare = require('webpack-hot-middleware')(compiler);

//   // 调用2个中间件
//   app.use(devMiddleWare);
//   app.use(hotMiddleWare);

//   // 把项目根目录作为静态资源目录，用于服务 HTML 文件
//   app.use(express.static('./dist'));

//   // 启动 HTTP 服务器，服务器监听在 process.env.PORT 端口
//   const server = app.listen(port, ip, () => {
//     console.log(`Server is running at http://${ip}:${port}`);
//   });
// });