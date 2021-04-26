//时间戳转换方法    yyyy-MM-dd HH:mm:ss

const formatDate = function(time) {
    var date = new Date(time*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
}

const formatDate2 = function(time) {
    var date = new Date(time*1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    return YY + MM + DD 
}

const formatDate3 = function(time) {
    var date = new Date(time*1000);
    var YY = date.getFullYear() + '年';
    var MM = (date.getMonth() + 1) + '月';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日';
    return `${YY}${MM}${DD}`
}

//获取电脑ip
const getNetworkIp = function() {
            var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
            if (RTCPeerConnection) (function () {
                var rtc = new RTCPeerConnection({iceServers:[]});
                if (1 || window.mozRTCPeerConnection) {     
                    rtc.createDataChannel('', {reliable:false});
                }
                
                rtc.onicecandidate = function (evt) {
                    if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
                };
                rtc.createOffer(function (offerDesc) {
                    grepSDP(offerDesc.sdp);
                    rtc.setLocalDescription(offerDesc);
                }, 
                function (e) { console.warn("offer failed", e); });
                
                
                var addrs = Object.create(null);
                addrs["0.0.0.0"] = false;
                function updateDisplay(newAddr) {
                    if (newAddr in addrs) return;
                    else addrs[newAddr] = true;
                    var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
                    for(var i = 0; i < displayAddrs.length; i++){
                        if(displayAddrs[i].length > 16){
                            displayAddrs.splice(i, 1);
                            i--;
                        }
                    }
                    console.log('内网ip',displayAddrs);      //打印出内网ip
                    //this.user.ip_in = displayAddrs[0];//获取内网ip
                }
                
                function grepSDP(sdp) {
                    sdp.split('\r\n').forEach(function (line) { 
                    if (~line.indexOf("a=candidate")) {    
                            var parts = line.split(' '),       
                                addr = parts[4],
                                type = parts[7];
                            if (type === 'host') updateDisplay(addr);
                        } else if (~line.indexOf("c=")) {       
                            var parts1 = line.split(' '),
                                addr1 = parts1[2];
                            updateDisplay(addr1);
                        }
                    });
                }
            })();
            else{
                console.log("请使用主流浏览器：chrome,firefox,opera,safari");
            }
  }

export {
    formatDate,
    formatDate2,
    formatDate3,
    getNetworkIp
}