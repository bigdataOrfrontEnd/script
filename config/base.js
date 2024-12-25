const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 在此处指定 babel-loader 的路径
const babelLoaderPath = require.resolve("babel-loader");

let config = {
  entry: [
    "react-script/node_modules/webpack-hot-middleware/client?reload=true",
    "./app/index.ts",
  ],
  // output: {
  //   filename: "bundle.js",
  //   path: path.resolve(process.cwd(), "dist"), // 使用 path.resolve 将相对路径转换为绝对路径
  //   publicPath: "/", //可以不配置
  // },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
  },
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // 匹配 .ts 和 .tsx 文件
        exclude: /node_modules/,
        include: path.resolve(process.cwd(), "app"), //限定这个loader处理哪个里面的代码
        use: {
          loader: babelLoaderPath,
          options: {
            presets: [
              require.resolve("@babel/preset-env"), //转换 ES6+ 语法
              require.resolve("@babel/preset-react"), // 转换 JSX 语法
              require.resolve("@babel/preset-typescript"), //转换ts语法
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          require.resolve("style-loader"), // 将 CSS 插入到 <style> 标签中
          require.resolve("css-loader"), // 解析 CSS 文件
        ],
      },
      {
        test: /\.scss$/, // 非模块化 SCSS 文件
        use: [
          { loader: require.resolve("style-loader") }, // 将 CSS 注入到 DOM
          {
            loader: require.resolve("css-loader"),
            options: {
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]", // 定义模块化样式的类名格式
              },
            },
          },
          { loader: require.resolve("sass-loader") }, // 编译 SCSS 为 CSS
        ],
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), "app/index.html"),
    }),
  ],
};
module.exports = config;
