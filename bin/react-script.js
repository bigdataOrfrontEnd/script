#!/usr/bin/env node

const path = require("path");
const yargs = require("yargs");
const chalk = require("chalk");
const pkg = require("../package.json");

const argv = yargs
  .command("start", "只是对命令的简短描述", () => {
    console.log(chalk.red("start"));
  })
  .help()
  .alias("help", "h")
  .version(pkg.version)
  .alias("version", "v")
  .argv;

const cmd = argv._[0]; // 获取非连词线开头的第一个参数,得到启动命令

require('ts-node/register/transpile-only'); // 支持运行ts代码

switch (cmd) {
  case "start":
    require("../scripts/start");
    break;
    case "build":
      require("../scripts/build");
      break;
  default:
    console.log(chalk.red(`未知的命令: ${cmd}`));
    yargs.showHelp();
    break;
}