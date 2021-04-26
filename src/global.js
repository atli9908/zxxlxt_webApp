//服务器接口
//let ip = 'http://192.168.1.217/';
//let ip = 'http://127.0.0.1/';

let ip = '';
try {
    /* eslint-disable */
    ip = FingerprintObj.getLocalIp();
} catch (err) {
    ip = location.protocol + "//" + location.hostname + "/";
} finally {
    if (location.hostname == 'localhost') {
        ip = 'http://127.0.0.1/';
    }
}
//图片
const iconPic = {
    //account
    account_bg: require("@/assets/img/account/bg.png"),
    account_logo: require("@/assets/img/account/logo.png"),
    menu1: require("@/assets/img/account/menu1.png"),
    menu2: require("@/assets/img/account/menu2.png"),
    menu3: require("@/assets/img/account/menu3.png"),
    menu4: require("@/assets/img/account/menu4.png"),
    menu5: require("@/assets/img/account/menu5.png"),
    menu6: require("@/assets/img/account/menu6.png"),
    menu7: require("@/assets/img/account/menu7.png"),
    //login 
    login_logo: require("@/assets/img/login/logo2.png"),
    user: require("@/assets/img/login/user.png"),
    pwd: require("@/assets/img/login/pwd.png"),
    //expert
    date: require("@/assets/img/expert/date.png"),
    time: require("@/assets/img/expert/time.png")
}

export default {
    ip,
    iconPic
}