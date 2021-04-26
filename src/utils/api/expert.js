import {postRequest} from '../request.js';
import API_ACCOUNT from '../apiUrl';

export async function expertsList(data){
    let res = await postRequest(API_ACCOUNT.expertsList, data);
    return res && res.data;
}
export async function workDate(data){
    let res = await postRequest(API_ACCOUNT.workDate, data);
    return res && res.data;
}
export async function workDateTime(data){
    let res = await postRequest(API_ACCOUNT.workDateTime, data);
    return res && res.data;
}
export async function consultExpert(data){
    let res = await postRequest(API_ACCOUNT.consultExpert, data);
    return res && res.data;
}
export async function ordersList(data){
    let res = await postRequest(API_ACCOUNT.ordersList, data);
    return res && res.data;
}
export async function deleteOrder(data){
    let res = await postRequest(API_ACCOUNT.deleteOrder, data);
    return res && res.data;
}
export async function getDetailById(data){
    let res = await postRequest(API_ACCOUNT.getDetailById, data);
    return res && res.data;
}
export async function readOrder(data){
    let res = await postRequest(API_ACCOUNT.readOrder, data);
    return res && res.data;
}
export async function expertInfo(data){
    let res = await postRequest(API_ACCOUNT.expertInfo, data);
    return res && res.data;
}