const {
    entryTemplate,
    htmlTemplate,
    packageTemplate,
    devTemplate,
    appIndexTemplate,
    styleTemplate,
    routerIndexTemplate,
    vuexIndexTemplate,
    entryTemplateV3,
    routerIndexTemplateV3,
    vuexIndexTemplateV3,
    packageTemplateV3,
    envTemplateV3
} = require('./file');

const Deal = string => {
    const arr = string.split('&');
    const res = {};
    for(let i = 0; i < arr.length; i++) {
        const key = arr[i].split('=');
        res[key[0]] = key[1];
    }
    return res;
};

const paramsType = params => {
    const res = Object.prototype.toString.call(params).slice(8, -1);
    if (res === 'String') {
        return Deal(params);
    }
    return;
};

module.exports = (value, key, params, vuex) => {
    const result = value && paramsType(value);
    console.log(value, key, vuex, 999);
    const format = {
        index() {
            return htmlTemplate(result || {});
        },
        package() {
            return packageTemplate(result || {});
        },
        'dev'() {
            return devTemplate();
        },
        'entry'() {
            return entryTemplate(params);
        },
        'src/app/index'() {
            return appIndexTemplate();
        },
        'style/app'() {
            return styleTemplate();
        },
        'router'() {
            return routerIndexTemplate();
        },
        'vuex'() {
            return vuexIndexTemplate();
        },
        'entryV3'() {
            return entryTemplateV3(vuex);
        },
        'routerV3'() {
            return routerIndexTemplateV3();
        },
        'vuexV3'() {
            return vuexIndexTemplateV3(vuex);
        },
        'packageV3'() {
            return packageTemplateV3(result || {}, vuex);
        },
        'env'() {
            return envTemplateV3();
        }
    };
    return format[key]();
};