import axios from 'axios';
import global from '../global.js'
import store from '../store/index.js';

import { Toast } from 'vant';

const server = axios.create({
    baseURL:global.ip,
    timeout:65000
})
//GET
const getRequest = function(url){
    return server({
        method: 'get',
        url: url
    })
}
//POST
const postRequest = function(url,data){
    return server({
        method: 'post',
        url: url,
        data: data
    })
}
//PUT
const putRequest = function(url,data){
    return server({
        method: 'put',
        url: url,
        data: data
    })
}
//DELETE
const deleteRequest = function(url){
    return server({
        method: 'delete',
        url: url
    })
}

// 正在进行中的请求列表
let reqList = []

// 阻止重复请求
// @param {array} reqList - 请求缓存列表
// @param {string} url - 当前请求地址
// @param {function} cancel - 请求中断函数
// @param {string} errorMessage - 请求中断时需要显示的错误信息

const stopRepeatRequest = function (reqList, url, cancel, errorMessage) {
  const errorMsg = errorMessage || ''
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      cancel(errorMsg)
      return
    }
  }
  reqList.push(url)
}

// 允许某个请求可以继续进行
// @param {array} reqList 全部请求列表
// @param {string} url 请求地址

const allowRequest = function (reqList, url) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      reqList.splice(i, 1)
      break
    }
  }
}

//请求拦截器
server.interceptors.request.use(
    config => {
        config.data = {
            ...config.data,
            device:'mobile'
        };

        let cancel
        // 设置cancelToken对象
        config.cancelToken = new axios.CancelToken(function(c) {
            cancel = c
        })
        // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
        stopRepeatRequest(reqList, config.url, cancel, `${config.url} 请求被中断`)

        console.log(config);
        store.commit('SHOW_LOADING');
        return config;
    },
    error => {
        Toast.fail('请求错误');
        console.log(error)
    }
);

//响应拦截器
server.interceptors.response.use(
    response => {
        // 增加延迟，相同请求不得在短时间内重复发送
        setTimeout(() => {
            allowRequest(reqList, response.config.url)
        }, 100)

        store.commit('HIDD_LOADING');
        return response;
    },
    error => {
        if(error.message.indexOf('请求被中断') != -1){
            console.log('请求被中断')
        }else{
            Toast.fail('加载失败，请刷新后重试或联系管理员');
        }
        store.commit('HIDD_LOADING');
        console.log(error)
    }
)
export{
    server,
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
};