/* 
* @Author: TanZer.hanyu 
* @Date: 2019-05-10 15:16:04
*  --- axios封装 ---
* */

import axios from 'axios'
import qs from 'qs'
import Cookie from 'js-cookie'
import _ from 'lodash'
import { Loading, Message } from 'element-ui'

import ApiConfig from '../config/api'

const http = axios.create({
    baseURL: "/gsafetyclound",
    // timeout: 60000,
    responseType: 'json',

    // 表示跨域请求时是否需要使用凭证
    withCredentials: true, 

    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },

    /*
    * 修改请求数据
    * 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    */ 
    transformRequest: [
        function (data) {
            let m = {
                token: "",
                COMPANYID: ""
            };
            return qs.stringify(_.assign(data, m));
        }
    ],

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 这里提前处理返回的数据
        return data;
    }],

    // 是一个负责 `params` 序列化的函数
    paramsSerializer(data) {
        return qs.stringify(data);
    }
});

function checkStatus (response) {
    if (response && response.data) {
        return response.data
    }
    if(response && response.data.code =="success"){
        return response
    }
}
  
function checkCode (error) {
    //==============  错误处理  ====================
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '请求错误(400)';
                break;
            case 401:
                error.message = '未授权，请重新登录(401)';
                break;
            case 403:
                error.message = '拒绝访问(403)';
                break;
            case 404:
                error.message = '请求出错(404)';
                break;
            case 408:
                error.message = '请求超时(408)';
                break;
            case 500:
                error.message = '服务器错误(500)';
                break;
            case 501:
                error.message = '服务未实现(501)';
                break;
            case 502:
                error.message = '网络错误(502)';
                break;
            case 503:
                error.message = '服务不可用(503)';
                break;
            case 504:
                error.message = '网络超时(504)';
                break;
            case 505:
                error.message = 'HTTP版本不受支持(505)';
                break;
            default:
                error.message = `连接出错(${error.response.status})!`;
        }
        Message.error({
            message: error.message
        })
    } else {
        error.message = '连接服务器失败!';
    }
    return error
}

// 添加请求拦截器
http.interceptors.request.use(config => {
    //完全不存在token 直接驳回请求，并跳转登录

    console.log(558,config)
    //超时时间
    if(config.timeout){
        config.timeout = config.timeout
    }

    if (config.method === 'get') {
        try {
            config.params.token = "";
            config.params.COMPANYID = "";
        } catch (error) {

        }
    }
    if (config.method === 'post') {
        //判断是否为流,对请求url做一些处理
        if (config.headers['Content-Type'] == 'application/json') {
            // config.url = `${config.url}`;  
        }
    }
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(response => {
    // 对响应数据做点什么
    checkStatus(response);
    return response;
}, error => {
    // 对响应错误做点什么
    checkCode(error)
    return Promise.reject(error);
});

const $POST = (api_name,params,time) => {
    let url = ApiConfig.api[api_name];
    return http({
        method: 'post',
        url: url ,
        data: params,
        timeout: time,
    })

};

const $GET = (api_name,params,time) => {
    let url = ApiConfig.api[api_name];
    return http({
        method: 'get',
        url: url ,
        params,
        timeout: time,
    })

};

// export default http;
export default {
    $POST: $POST,
    $GET: $GET,
};