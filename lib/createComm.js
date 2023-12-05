const path = require('path');
const fs = require('fs-extra');

const chalk = require('chalk')
const fileContent = require('./formatFile');

const InitInquirer = require('./inquirer');

const baseDir = {
    'src': 'src',
    'src/app': 'src/app',
    'src/page': 'src/page',
    'src/assets': 'src/assets',
    'static': 'static',
    'style': 'src/style'
};

const checkDir = [
    {
        'name': 'router',
        'path': 'src/router'
    },
    {
        'name': 'vuex',
        'path': 'src/vuex'
    }
];

let baseFile = {
    'entry': 'src/main.js',
    'src/app/index': 'src/app/index.vue',
    'style/app': 'src/style/app.less',
    'package': 'package.json',
    'dev': '.devserverrc.js'
};

let checkFile = [
    {
        'name': 'index',
        'path': 'index.html'
    },
    {
        'name': 'router',
        'path': 'src/router/index.js'
    },
    {
        'name': 'vuex',
        'path': 'src/vuex/index.js'
    }
];

const baseFileV3 = {
    'entryV3': 'src/main.ts',
    'src/app/index': 'src/app/index.vue',
    'style/app': 'src/style/app.less',
    'packageV3': 'package.json',
    'dev': '.devserverrc.js',
    'env': 'src/env.d.ts'
};

const checkFileV3 = [
    {
        'name': 'index',
        'path': 'index.html'
    },
    {
        'name': 'routerV3',
        'path': 'src/router/index.ts'
    },
    {
        'name': 'vuexV3',
        'path': 'src/vuex/index.ts'
    }
]

module.exports = async targetPath => {
    const commCore = new InitInquirer(targetPath);
    const { params } = await commCore.init();
    if (params.vue) {
        baseFile = baseFileV3;
        checkFile = checkFileV3;
    }
    /**
     * @type 目录
     * @description base目录及check目录
     */
    const filterCheckDir = checkDir.filter(ele => {
        if (params[ele.name]) {
            return true;
        }
    });
    const integrationDir = [baseDir, ...filterCheckDir];
    for(let i = 0; i < integrationDir.length; i++) {
        const formatBaseDir = commCore.resolvePath(integrationDir[i]);
        for(let i in formatBaseDir) {
            fs.ensureDirSync(formatBaseDir[i]);
        }
    }
    /**
     * @type 文件
     * @description base文件及check文件
     */
    const filterCheckFile = checkFile.filter(ele => {
        if (params[ele.name]) {
            return true;
        }
    });
    const integrationFile = [baseFile, ...filterCheckFile];
    for(let i = 0; i < integrationFile.length; i++) {
        const formatBaseFile = commCore.resolvePath(integrationFile[i]);
        for(let i in formatBaseFile) {
            // console.log(formatBaseFile);
            const pathValue = formatBaseFile[i];
            const content = fileContent(params[i], i, params, params.vuexV3);
            fs.outputFileSync(pathValue, content);
        }
    }
};