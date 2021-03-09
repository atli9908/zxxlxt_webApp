import {postRequest} from '../request.js';
import API_ACCOUNT from '../apiUrl';

//用户
//登录
export async function getLogin(data){
    let res = await postRequest(API_ACCOUNT.login, data);
    return res && res.data;
}