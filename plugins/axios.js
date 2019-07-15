/*
 * @Author: TanZer.hanyu 
 * @Date: 2019-05-09 11:53:15
 */
// import Vue from 'vue';
// import _http from '../utils/http';

// export default () => {
//     // Vue.use(_)
//     // Window.$http = Vue.prototype.$http = _http;
//     Window.$POST = Vue.prototype.$POST = _http.$POST;
//     Window.$GET = Vue.prototype.$GET = _http.$GET;
// }

import ApiConfig from '@/config/api'
import qs from 'qs'

export default function({ $axios, redirect }) {

    // 基本配置
    $axios.defaults.baseURL = "/gsafetyclound"
    // $axios.defaults.timeout = 60000
    $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    // 请求回调
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    // 返回回调
    $axios.onResponse(res => {})

    // 错误回调
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        // if (code === 404) {
        //     redirect('/404')
        // }
    })

    $axios.$GET = ({ api_name, params, time }) => {
        let url = ApiConfig.api[api_name];
        return $axios({
            method: 'get',
            url: url,
            params: params,
            timeout: time || 60000,
        })
    };

    $axios.$POST = ({ api_name, params, time }) => {
        let url = ApiConfig.api[api_name];
        return $axios({
            method: 'post',
            url: url,
            data: qs.stringify(params),
            timeout: time || 60000,
        })
    };
}