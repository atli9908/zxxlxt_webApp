import {postRequest} from '../request.js';
import API_ACCOUNT from '../apiUrl';

//查看结果
export async function getResultList(data){
    let res = await postRequest(API_ACCOUNT.getResultList, data);
    return res && res.data;
}
export async function getReadTable(data){
    let res = await postRequest(API_ACCOUNT.getReadTable, data);
    return res && res.data;
}
export async function getResultById(data){
    let res = await postRequest(API_ACCOUNT.getResultById, data);
    return res && res.data;
}
export async function getSurveyResultList(data){   //获取普查子列表
    let res = await postRequest(API_ACCOUNT.getSurveyResultList, data);
    return res && res.data;
}
export async function searchQuestionResult(data){
    let res = await postRequest(API_ACCOUNT.searchQuestionResult, data);
    return res && res.data;
}
export async function checkQuestionResult(data){  //问卷子列表
    let res = await postRequest(API_ACCOUNT.checkQuestionResult, data);
    return res && res.data;
}
export async function checkSubtest(data){  //问卷子列表
    let res = await postRequest(API_ACCOUNT.checkSubtest, data);
    return res && res.data;
}
export async function delQuestionResult(data){  //删除问卷
    let res = await postRequest(API_ACCOUNT.delQuestionResult, data);
    return res && res.data;
}
export async function tableResultOperate(data){  //删除量表/普查
    let res = await postRequest(API_ACCOUNT.tableResultOperate, data);
    return res && res.data;
}