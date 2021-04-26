import {postRequest} from '../request.js';
import API_ACCOUNT from '../apiUrl';

//用户
//首页
export async function getHome(data){
    let res = await postRequest(API_ACCOUNT.index, data);
    return res && res.data;
}
//登录
export async function getLogin(data){
    let res = await postRequest(API_ACCOUNT.login, data);
    return res && res.data;
}
//注册
export async function reg(data){
    let res = await postRequest(API_ACCOUNT.reg, data);
    return res && res.data;
}
//班级部门列表
export async function getDept(data){
    let res = await postRequest(API_ACCOUNT.dept, data);
    return res && res.data;
}
//修改个人资料
export async function userInfo(data){
    let res = await postRequest(API_ACCOUNT.userInfo, data);
    return res && res.data;
}
//数据统计
export async function getStatistic(data){
    let res = await postRequest(API_ACCOUNT.statistic, data);
    return res && res.data;
}
export async function appeal(data){
    let res = await postRequest(API_ACCOUNT.appeal, data);
    return res && res.data;
}