import axios from 'axios';

const request = axios.create({
    timeout:65000,
    baseURL:''
})
//GET
const getRequest = function(url){
    return request({
        method: 'get',
        url: url
    })
}
//POST
const postRequest = function(url,data){
    return request({
        method: 'post',
        url: url,
        data: data
    })
}
//PUT
const putRequest = function(url,data){
    return request({
        method: 'put',
        url: url,
        data: data
    })
}
//DELETE
const deleteRequest = function(url){
    return request({
        method: 'delete',
        url: url
    })
}

//请求拦截器
require.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error)
    }
);

//响应拦截器
require.interceptors.response.use(
    response => {
        return response;
    },
    error => {

    }
)
export default request;