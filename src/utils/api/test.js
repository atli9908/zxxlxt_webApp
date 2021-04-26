import {postRequest} from '../request.js';
import API_ACCOUNT from '../apiUrl';

//量表测评
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
export async function commitTableBreak(data){
    let res = await postRequest(API_ACCOUNT.commitTableBreak, data);
    return res && res.data;
}
export async function getTableBreak(data){
    let res = await postRequest(API_ACCOUNT.getTableBreak, data);
    return res && res.data;
}
export async function commitTableResult(data){
    let res = await postRequest(API_ACCOUNT.commitTableResult, data);
    return res && res.data;
}

//问卷
export async function getQuestionnaireList(data){
    let res = await postRequest(API_ACCOUNT.getQuestionnaireList, data);
    return res && res.data;
}
export async function startQuestionnaire(data){
    let res = await postRequest(API_ACCOUNT.startQuestionnaire, data);
    return res && res.data;
}
export async function startSubtest(data){
    let res = await postRequest(API_ACCOUNT.startSubtest, data);
    return res && res.data;
}
export async function submitQuestionnaire(data){
    let res = await postRequest(API_ACCOUNT.submitQuestionnaire, data);
    return res && res.data;
}   
export async function breakQuestionnaire(data){
    let res = await postRequest(API_ACCOUNT.breakQuestionnaire, data);
    return res && res.data;
}
export async function getBreakQuestionnaire(data){
    let res = await postRequest(API_ACCOUNT.getBreakQuestionnaire, data);
    return res && res.data;
}
export async function getQuestionPublishers(data){
    let res = await postRequest(API_ACCOUNT.getQuestionPublishers, data);
    return res && res.data;
}
export async function delQuestionnaireInfo(data){
    let res = await postRequest(API_ACCOUNT.delQuestionnaireInfo, data);
    return res && res.data;
}

//心理普查
export async function getSurvey(data){
    let res = await postRequest(API_ACCOUNT.getSurvey, data);
    return res && res.data;
}
export async function getSurveyById(data){
    let res = await postRequest(API_ACCOUNT.getSurveyById, data);
    return res && res.data;
}
export async function getSurveyByIdTable(data){
    let res = await postRequest(API_ACCOUNT.getSurveyByIdTable, data);
    return res && res.data;
}
export async function getPublishers(data){
    let res = await postRequest(API_ACCOUNT.getPublishers, data);
    return res && res.data;
}
export async function deleteSurvey(data){
    let res = await postRequest(API_ACCOUNT.deleteSurvey, data);
    return res && res.data;
}