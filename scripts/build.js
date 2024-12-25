const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const baseConfig = require('../config/base');
// 设置环境变量：BABEL_ENV、NODE_ENV=“production”；
// 加载自定义的环境变量配置；
// 必要的入口文件检测：作为入口的index.html和js;
// 生成webpack配置；
// 检测是否配置browserslist；
// 检测是否配置browserslist。如果最终都没有browserlist则直接退出
// 在构建前，检测出所有文件大小的map
// 清空构建的输出目录
// 复制待构建目录的public目录到构建目录：静态文件夹名——paths.appPublic
// 开始webpack构建
// 构建完成后，输出相关的构建信息：警告/警告/错误、文件大小信息、后续操作的提示

function build() {
  console.log('开始打包...');

  // 清理输出目录
  const outputPath = path.resolve(process.cwd(), "dist");
  fs.emptyDirSync(outputPath);

  // 修改 baseConfig 的输出配置
  const config = {
    ...baseConfig,
    output: {
      filename: 'bundle.js',
      path: outputPath,
      publicPath: '/',
    },
    mode: 'production', // 设置为生产模式
  };

  // 使用 webpack 进行打包
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error('打包失败:', err || stats.toJson().errors);
      return;
    }

    console.log('打包成功');
    console.log(stats.toString({
      chunks: false,
      colors: true
    }));
  });
}

build();
// const webpack = require("webpack");
// const { merge } = require("webpack-merge");
// const config = require("../config/webpack.prod");
// const fs = require('fs');
// const path = require('path');
// const { execSync } = require('child_process');

// // 设置环境变量：BABEL_ENV、NODE_ENV=“production”
// process.env.BABEL_ENV = "production";
// process.env.NODE_ENV = "production";

// // 加载自定义的环境变量配置
// require('dotenv').config();

// // 必要的入口文件检测：作为入口的index.html和js
// if (!fs.existsSync('./src/index.html') || !fs.existsSync('./src/index.js')) {
//   console.error('必要的入口文件缺失');
//   process.exit(1);
// }

// // 生成webpack配置
// const webpackConfig = merge(config, {
//   mode: 'production',
// });

// // 检测是否配置browserslist
// const browserslist = require('browserslist');
// if (!browserslist.findConfig(process.cwd())) {
//   console.error('未配置browserslist');
//   process.exit(1);
// }

// // 在构建前，检测出所有文件大小的map
// const fileSizeMap = new Map();
// const outputPath = path.resolve(__dirname, '../dist');
// fs.readdirSync(outputPath).forEach(file => {
//   const filePath = path.join(outputPath, file);
//   const stats = fs.statSync(filePath);
//   fileSizeMap.set(file, stats.size);
// });

// // 清空构建的输出目录
// fs.rmdirSync(outputPath, { recursive: true });
// fs.mkdirSync(outputPath);

// // 复制待构建目录的public目录到构建目录：静态文件夹名——paths.appPublic
// const publicPath = path.resolve(__dirname, '../public');
// fs.readdirSync(publicPath).forEach(file => {
//   const srcPath = path.join(publicPath, file);
//   const destPath = path.join(outputPath, file);
//   fs.copyFileSync(srcPath, destPath);
// });

// // 开始webpack构建
// webpack(webpackConfig, (err, stats) => {
//   if (err || stats.hasErrors()) {
//     console.error(err || stats.toString());
//     process.exit(1);
//   }

//   // 构建完成后，输出相关的构建信息：警告/错误、文件大小信息、后续操作的提示
//   console.log(stats.toString({
//     colors: true,
//     warnings: true,
//     errors: true,
//   }));

//   fileSizeMap.forEach((size, file) => {
//     console.log(`${file}: ${size} bytes`);
//   });

//   console.log('构建完成');
// });