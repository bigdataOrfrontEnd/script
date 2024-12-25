const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const baseConfig = require('../config/base');

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