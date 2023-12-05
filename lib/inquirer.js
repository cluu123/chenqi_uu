const Inquirer = require('inquirer');

module.exports = class InitInquirer {
    constructor(targetPath) {
        this.base = targetPath;
        this.params = {
            package: 'name=chen-niffler&auth=""'
        };
        
    }
    async selectVue() {
        const { vue } = await Inquirer.prompt([
            {
                name: 'vue', // 与返回值对应
                type: 'list', // list 类型
                message: '使用vue版本',
                choices: [
                    {
                        name: 'vue2',
                        value: false
                    },
                    {
                        name: 'vue3',
                        value: true
                    }
                ]
            }
        ]);
        vue && (this.params.vue = true);
        return;
    }
    async selectVuex() {
        const { vuex } = await Inquirer.prompt([
            {
                name: 'vuex', // 与返回值对应
                type: 'list', // list 类型
                message: '使用vuex还是pinia',
                choices: [
                    {
                        name: 'vuex',
                        value: 'vuex'
                    },
                    {
                        name: 'pinia',
                        value: 'pinia'
                    }
                ]
            }
        ]);
        this.params.vuexV3 = vuex;
        return;
    }
    async prompt() {
        const { index } = await Inquirer.prompt([
            {
                name: 'index', // 与返回值对应
                type: 'list', // list 类型
                message: '是否使用html模板',
                choices: [
                    {
                        name: '是',
                        value: true
                    },
                    {
                        name: '否',
                        value: false
                    }
                ]
            }
        ]);
        index && (this.params['index'] = true);
        return;
    }
    async checkbox() {
        const { checkbox } = await Inquirer.prompt([
            {
                name: 'checkbox', // 与返回值对应
                type: 'checkbox', // list 类型
                message: '使用vue模块',
                choices: [
                    {
                        value: 'router',
                        name: 'router',
                        checked: true
                    },
                    {
                        value: 'vuex',
                        name: 'vuex',
                        checked: false
                    }
                ]
            }
        ]);
        if (checkbox.length) {
            checkbox.forEach(ele => {
                this.params[ele] = true;
            });
        }
        return;
    }
    async input() {
        const { inputName } = await Inquirer.prompt([
            {
                name: 'inputName', // 与返回值对应
                type: 'input', // list 类型
                message: '请输入项目名(默认为chen-niffler)',
                default: 'chen-niffler'
            },
        ]);
        const { inputAuth } = await Inquirer.prompt([
            {
                name: 'inputAuth', // 与返回值对应
                type: 'input', // list 类型
                message: '请输入项目名'
            },
        ]);
        this.params.package = `name=${inputName}&auth=${inputAuth}`;
        return;
    }
    valueType(opt) {
        const res = Object.prototype.toString.call(params).slice(8, -1);
        if (res === 'String') {
            return 'String';
        }
        else if (res === 'Array') {
            return 'Array';
        }
        else if (res === 'Object') {
            return 'Object';
        }
    }
    resolvePath(options, obj = {}) {
        for(let i in options) {
            // if (i.includes('.')) {
            //     const key = options[i].split('.')[0];
            //     obj[key] = `${this.base}/${options[i]}`;
            //     continue;
            // }
            if (i !== 'name' && i !== 'path') {
                obj[i] = `${this.base}/${options[i]}`;
            }
            if (i === 'path') {
                obj[options.name] = `${this.base}/${options.path}`;
            }
        }
        return obj;
    }
    async init() {
        try {
            await this.selectVue();
            if (this.params.vue) {
                await this.selectVuex();
                this.params.index = this.params.package;
                this.params.routerV3 = true;
                return {
                    params: this.params
                }
            }
            await this.prompt();
            await this.checkbox();
            await this.input();
            // this.resolveFilePath(baseFile);
        }
        catch(err) {
            console.log(err);
            process.exit(1);
        }
        this.params.index = this.params.package;
        return {
            // filePath: this.checkFilePath,
            params: this.params
        }
    }
}