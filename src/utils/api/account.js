import {postRequest} from '../request.js';
import API_ACCOUNT from '../apiUrl';

//用户
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