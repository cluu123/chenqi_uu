const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const createCommand = require('./createComm');

module.exports = async function (projectName, options) {
    // 获取当前工作目录
    const cwd = process.cwd();
    // 拼接得到项目目录
    const targetDirectory = path.join(cwd, projectName);
    // 判断目录是否存在
    if (fs.pathExistsSync(targetDirectory)) {
        // 判断是否使用 --force 参数
        if (options.force) {
            // 删除重名目录(remove是个异步方法)
            try {
                await fs.remove(targetDirectory);
                createCommand(targetDirectory)
            }
            catch(err) {
                console.log(chalk.red(err));
            }
            return;
        }
        console.log(chalk.red('file is early exists, you should niffler create <project name> --force'));
        return;
    }
    createCommand(targetDirectory);
};