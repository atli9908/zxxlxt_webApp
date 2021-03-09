import axios from 'axios';
import global from '../global.js'

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

//请求拦截器
server.interceptors.request.use(
    config => {
        config.data = {
            ...config.data,
            device:'mobile'
        }
        console.log(config)
        return config;
    },
    error => {
        console.log(error)
    }
);

//响应拦截器
// request.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         console.log(error)
//     }
// )
export{
    server,
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
};