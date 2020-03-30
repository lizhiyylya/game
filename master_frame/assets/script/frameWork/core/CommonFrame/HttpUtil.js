/**
 * Created by xiaochuntian on 2018/5/2.
 */

tywx.HttpUtil = {
    httpPost:function (cfgObj, httpType) {
        if(tywx.IsWechatPlatform()) {
            wx.request({
                url : cfgObj.url,
                data : cfgObj.postData,
                header : cfgObj.header,
                method : 'POST',
                dataType : 'json',
                success : function (res) {

                    tywx.LOGD('POST data ' , JSON.stringify(cfgObj.postData));

                    tywx.LOGD('POST 请求成功 ' , JSON.stringify(res));
                    if (res.statusCode == 200){
                        tywx.LOGD('ty.HttpUtil.httpPost', 'post success! ');
                        if(cfgObj.sucCallback){
                            cfgObj.sucCallback(res)
                        }
                    }
                    else{
                        tywx.LOGD('ty.HttpUtil.httpPost', 'statusCode:' + res.statusCode);
                    }
                },
                fail : function (res) {
                    if(cfgObj.failCallback){
                        cfgObj.failCallback(res)
                    }
                    tywx.LOGD('POST 请求失败 ' , cfgObj.url);
                }
            });
        }
    },

    httpPostLog:function (cfgObj, httpType) {
        if(tywx.IsWechatPlatform()) {
            wx.request({
                url : cfgObj.url,
                data : {
                    logJson : cfgObj.postData
                },
                header : cfgObj.header,
                method : 'POST',
                dataType : 'json',
                success : function (res) {

                    // tywx.LOGD('POST data ' , JSON.stringify(cfgObj.postData));

                    // tywx.LOGD('POST 请求成功 ' , JSON.stringify(res));
                    if (res.statusCode == 200){
                        //正常连接{"/api/bilog5/clientlog": "ok"}
                        if (res.data && res.data.hasOwnProperty('/api/bilog5/clientlog')
                            && res.data['/api/bilog5/clientlog'] == "ok") {
                            tywx.LOGD('ty.HttpUtil.httpPost', 'post success! ');
                        }
                    }
                    else{
                        tywx.LOGD('ty.HttpUtil.httpPost', 'statusCode:' + res.statusCode);
                    }
                },
                fail : function (res) {
                    tywx.LOGD('POST 请求失败 ' , cfgObj.url);
                }
            });
        }
    },

    httpGet:function (cfgObj, successcb, failcb) {
        if(tywx.IsWechatPlatform()) {
            tywx.LOGD('ty.HttpUtil.httpGet', 'url:' + cfgObj.url);
            wx.request({
                url : cfgObj.url,
                method : 'GET',
                success : function (res) {
                    if (res.statusCode == 200){
                        tywx.LOGD('ty.HttpUtil.httpGet', 'res:' + JSON.stringify(res.data));
                        if(successcb) {
                            successcb(res.data);
                        }
                    }
                    else{
                        tywx.LOGD('ty.HttpUtil.httpGet', 'statusCode:' + res.statusCode);
                    }
                },
                fail : function (res) {
                    tywx.LOGD('ty.HttpUtil.httpGet', 'post error! ' + cfgObj.url);
                    if(failcb) {
                        failcb(res);
                    }
                }
            });
        }
    },
};