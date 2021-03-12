import {postRequest} from '../request.js';
import API_ACCOUNT from '../apiUrl';

//测评
export async function getTableCat(data){
    let res = await postRequest(API_ACCOUNT.tableCat, data);
    return res && res.data;
}
export async function subTable(data){
    let res = await postRequest(API_ACCOUNT.subTable, data);
    return res && res.data;
}
export async function subTableById(data){
    let res = await postRequest(API_ACCOUNT.subTableById, data);
    return res && res.data;
}