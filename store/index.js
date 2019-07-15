/*  
 *@Author: TanZer.hanyu  
 *@Date: 2019-05-09 17:02:36
 */
import Vue from 'vue';
import Vuex from 'vuex';

/*  
 *@Author: TanZer.hanyu  
 *@ global -- 全局公用store
 *@ login -- 登录store
 */

import global from './modules/global'
import login from './modules/login'


Vue.use(Vuex);

export default () => {
    return new Vuex.Store({
        state: {
            downData: {},
        },
        mutations: {
            updateDownData(state, downData) {
                state.downData = downData;
            },
        },
        modules: {
            global,
            login,
        },
        strict: false,
        plugins: [],

    })
}
