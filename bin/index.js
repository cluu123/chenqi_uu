#! /usr/bin/env node
const { program, Command } = require('commander');
const chalk = require('chalk');
const create  = require('../lib/create');

program
    .name('chen')
    .usage(`<command>`)
    .version('1.0.0');

/**
 * @description action回调函数中value 为第一个参数, key 为第二个参数, 如果有第三个参数则为 Command基本参数
 */

program
    .command('test [val]')
    .description('this is test command')
    .option('-c, --chen [val]', 'name is chen, params is require')
    .action((value, key) => {       
        console.log(value, key);
    });

program
    .command('create <project-name>')
    .description('创建一个新项目')
    // .option('-a, --ad <value>', 'create test')
    .option('-f, --force', 'overwrite target directory if it exists')
    .action((projectName, cmd) => {
        // 处理用户输入create 指令附加的参数
        // console.log(projectName, cmd);
        create(projectName, cmd);
    });

program
    .command('config [value]') // config 命令
    .description('inspect and modify the config, params is not require')
    .option('-g, --get <key>', 'get value by key')
    .option('-s, --set <key1> <value1>', 'set option[key] is value')
    .option('-d, --delete <key>', 'delete option by key')
    .action((value, keys) => {
        // value 可以取到 [value] 值，keys会获取到命令参数
        process.exit(1)
        console.log(process.version)
    });

program.on('--help', function () {
    // 前后两个空行调整格式，更舒适
    console.log();
    console.log(
        `Run ${chalk.green('niffler <command> --help')} for detailed usage of given command`
    );
    console.log();
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

// new Inquirer.prompt([
//     {
//         name: 'vue',
//         // 多选交互功能
//         // 单选将这里修改为 list 即可
//         type: 'checkbox',
//         message: 'Check the features needed for your project:',
//         choices: [
//             {
//                 name: 'Babel',
//                 checked: true,
//             },
//             {
//                 name: 'TypeScript',
//             },
//             {
//                 name: 'Progressive Web App (PWA) Support',
//             },
//             {
//                 name: 'Router',
//             },
//         ],
//     }
//     ]).then((data) => {
//         console.log(data);
//     });

