/*
 * api 全局配置
 */

const remoteTargetUrl = 'http://172.19.12.209:9832'; //接口ip地址

let remoteApiString = '/remoteApi'; //跨域代理关键字


export default {
    cdnUrl: 'http://',
    baseUrl: 'http://',
    socketHost: 'http://',
    imgUrl: 'https://',
    seoKeyWords: '',
    remoteApiKey: 'remoteApi', // 远程api关键字
    remoteTarget: remoteTargetUrl, // 远程api 地址
    forent_api: {
        ajaxUrl: remoteApiString + '/upmsPlatform/',
        url: remoteApiString + '/enterprise-pc',
        base_url: remoteApiString + '/api/v1/fire-society', //企业APP rest接口基地址
        maintenance: remoteApiString + '/api/v1.1/maintenance-service', //维保助手服务接口
        base_socket_url: remoteApiString + '/firesocietywebsocket', //websocket接口
        monitor_url: remoteApiString + '/api/v1/monitorCenter', //监控中心接口
        e_record_url: remoteApiString + '/api/v1/eRecord', //电子档案接口
        pic_url: 'http://112.27.198.15:9832/image', //平面图及其他图片接口
        moblie_url: remoteApiString + '/api/v1/fire-society', //移动端企业APP rest接口地址
        upms_service_url: remoteApiString + '/api/v1/upms-service', //岗位管理相关API接口
        floor_url: remoteApiString + '/api/v1', //楼层接口
        // localHostName : '/fire_pc',
        special_base_url: remoteApiString + '/zuul/api/v1/fire-society',
    }
}