const API_ACCOUNT = {
    //用户
    login:'/api/index/login',
    reg:'/api/index/register',
    dept:'/api/msg/dept',
    userInfo:'/api/index/userInfo',
    appeal:'/api/index/appeal',

    //首页
    index:'/api/m/statistic/index',

    //test 量表
    tableCat:'/api/test/tableCat',
    subTable:'/api/test/subTable',
    subTableById:'/api/test/subTableById',  //单套量表题目
    commitTableBreak:'/api/test/commitTableBreak',  //中途退出
    getTableBreak:'/api/test/getTableBreak',      //获取中断数据
    commitTableResult:'/api/test/commitTableResult', //提交

    //问卷
    getQuestionnaireList:'/api/admin/QuestionTest/getQuestionnaireList',   
    startQuestionnaire:'/api/admin/Questionnaire/startQuestionnaire',
    startSubtest:'/api/admin/Questionnaire/startSubtest',
    submitQuestionnaire:'/api/admin/Questionnaire/submitQuestionnaire',
    breakQuestionnaire:'/api/admin/Questionnaire/breakQuestionnaire',
    getBreakQuestionnaire:'/api/admin/Questionnaire/getBreakQuestionnaire',
    getQuestionPublishers:'/api/admin/QuestionTest/getQuestionPublishers',
    delQuestionnaireInfo:'/api/admin/Questionnaire/delQuestionnaireInfo',

    //心理普查
    getSurvey:'/api/test/getSurvey',
    getSurveyById:'/api/test/getSurveyById',
    getSurveyByIdTable:'/api/test/getSurveyByIdTable',
    getPublishers:'/api/test/getPublishers',        //获取发布人
    deleteSurvey:'/api/test/deleteSurvey',

    //专家咨询
    expertsList:'/api/m/expert/expertsList',
    workDate:'/api/expert/workDate',
    workDateTime:'/api/expert/workDateTime',
    consultExpert:'/api/expert/consultExpert',
    ordersList:'/api/m/expert/ordersList',
    deleteOrder:'/api/expert/deleteOrder',
    getDetailById:'/api/m/expert/getDetailById',
    readOrder:'/api/expert/readOrder',
    expertInfo:'/api/expert/expertInfo',
    
    //查看结果
    getResultList:'/api/m/report/getResultList',
    getReadTable:'/api/test/getReadTable',
    getResultById:'/api/m/report/getResultById',
    getSurveyResultList:'/api/test/getSurveyResultList',   //获取普查子报告
    searchQuestionResult:'/api/admin/Testresult/searchQuestionResult',
    checkQuestionResult:'/api/admin/Testresult/checkQuestionResult',  //问卷子报告
    checkSubtest:'/api/admin/Testresult/checkSubtest',
    delQuestionResult:'/api/admin/Testresult/delQuestionResult',
    tableResultOperate:'/api/test/tableResultOperate',

    //数据统计
    statistic:'/api/m/statistic/all',
}

export default API_ACCOUNT

