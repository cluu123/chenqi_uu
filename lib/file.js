function entryTemplate(params) {
    const router = 
`import Vue from 'vue';
import App from './app';
import VueRouter from 'vue-router';
import routes from '@/router';

Vue.use(VueRouter);

const router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router,
    render: c => c(App)
});`
    const vuex = 
`import Vue from 'vue';
import App from './src/App';
import Vuex from 'vuex';
import storeDef from '@/vuex/index';

const store = new Vuex.Store(storeDef);

new Vue({
    el: '#app',
    store,
    render: c => c(App)
});`
    const routerAndVuex = 
`import Vue from 'vue';
import App from './src/App';
import VueRouter from 'vue-router';
import routes from '@/router';
import Vuex from 'vuex';
import storeDef from '@/vuex/index';

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({ routes });
const store = new Vuex.Store(storeDef);

new Vue({
    el: '#app',
    router,
    store,
    render: c => c(App)
});`
    if (params.router && params.vuex) {
        return routerAndVuex;
    }
    if (params.router) {
        return router;
    }
    if (params.vuex) {
        return vuex;
    }
}

function htmlTemplate(params) {
    const template = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${params.name}</title>
</head>
<body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
</body>
</html>`;
    return template;
}

function packageTemplate(params) {
    const template = 
`{
    "name": "${params.name}",
    "version": "1.0.0",
    "description": "",
    "scripts": {
        "dev": "uu-server",
        "build": "uu-server"
    },
    "keywords": [],
    "author": "${params.auth}",
    "license": "ISC",
    "dependencies": {
        "@chenqi_uu/uu-server": "^1.0.0",
        "vue": "2.7.14",
        "vue-router": "^3.4.8",
        "vuex": "^3.6.2"
    },
    "devDependencies": {
        "vue-template-compiler": "2.7.14"
    }
}`;
    return template;
}

function devTemplate() {
    const template = 
`module.exports = {
    port: 8898
};`;
    return template;
}

function appIndexTemplate() {
    const template = 
`<template>
    <h1>Hello World!</h1>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style>
</style>`;
    return template;
}

function styleTemplate() {
    const template = 
`* {
    padding: 0;
    margin: 0;
}
html, body {
    width: 100%;
    height: 100%;
}`;
    return template;
}

function routerIndexTemplate() {
    const template = 
`export default [
    {
        path: '/',
        redirect: '/index'
    }
];`;
    return template;
}

function vuexIndexTemplate() {
    const template = 
`export default {
    state: {

    },
    mutations: {

    },
    getters: {

    },
    actions: {

    },
    modules: {

    }
};`;
    return template;
}

const entryTemplateV3 = store => {
    const vuex = 
`import { createApp } from 'vue';
import Vuex from 'vuex';
import storeDef from '@/vuex/index';

import router from './router';
import App from './app.vue';

const Vue = createApp(App);
const store = new Vuex.Store(storeDef);

Vue.use(store);
Vue.use(router);

Vue.mount('#app');
`;
    const pinia = 
`import { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from './router';
import App from './app.vue';

const Vue = createApp(App);

Vue.use(createPinia());
Vue.use(router);

Vue.mount('#app');
`;
    return store === 'vuex' ? vuex : pinia;
}

const routerIndexTemplateV3 = () => `
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes:RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/info'
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
`;

const  vuexIndexTemplateV3 = store => {
    const pinia = 
`import { defineStore } from 'pinia';

export const store = defineStore('store', {
    state: () => {
        return {
          count: 0
        }
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {

    }
});`;
const vuex = 
`export default {
    state: {},
    mutations: {},
    getters: {},
    actions: {},
    modules: {}
};`;
    return store === 'vuex' ? vuex : pinia;
}

function packageTemplateV3(params, store) {
    const templateVuex = 
`{
    "name": "${params.name || ''}",
    "version": "1.0.0",
    "description": "",
    "scripts": {
        "dev": "uu-server",
        "build": "uu-server"
    },
    "keywords": [],
    "author": "${params.auth || ''}",
    "license": "ISC",
    "dependencies": {
        "@chenqi_uu/uu-server": "^1.0.0",
        "vue": "^3.3.4",
        "vue-router": "^4.2.4",
        "vuex": "^3.6.2"
    }
}`;
    const templatePinia = 
`{
    "name": "${params.name || ''}",
    "version": "1.0.0",
    "description": "",
    "scripts": {
        "dev": "uu-server",
        "build": "uu-server"
    },
    "keywords": [],
    "author": "${params.auth || ''}",
    "license": "ISC",
    "dependencies": {
        "@chenqi_uu/uu-server": "^1.0.0",
        "vue": "^3.3.4",
        "vue-router": "^4.2.4",
        "pinia": "^2.1.6"
    }
}`;
    return store === 'vuex' ? templateVuex : templatePinia;
}

const envTemplateV3 = () => {
    const template = 
`declare module "*.vue" {
    import type { DefineComponent } from "vue"; 
    const vueComponent: DefineComponent<{}, {}, any>; 
    export default vueComponent;
}`
    return template;
};

module.exports = {
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
};