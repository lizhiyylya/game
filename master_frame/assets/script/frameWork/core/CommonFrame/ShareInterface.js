/**
 * Created by  on 2018/5/3.
 */

tywx.ShareInterface = {
    OnShareAppMessageInfo: null,   //右上角转发对应的分享点信息

    tempShareList : [],
    /**
     * 设置右上角"转发"对应的分享信息
     * @param title
     * @param imageUrl
     * @param sharePointId
     * @param shareSchemeId
     */
    setOnShareAppMessageInfo: function(title, imageUrl, sharePointId, shareSchemeId){
        this.OnShareAppMessageInfo = {
            title: title,
            imageUrl: imageUrl,
            sharePointId: sharePointId,
            shareSchemeId: shareSchemeId
        }
    },

    checkTempShare : function(pointName){
        for(var i=0;i<this.tempShareList.length;i++){
            var point = this.tempShareList[i]
            if(point == pointName){
                this.cleanTempShare(pointName)
                return true
            }
        }
        this.tempShareList.push(pointName)
        return false
    },

    cleanTempShare : function(pointName){
        if(this.tempShareList.length == 0){
            return
        }
        for(var i=this.tempShareList.length-1;i>=0;i--){
            var point = this.tempShareList[i]
            if(point == pointName){
                this.tempShareList.splice(i,1)
            }
        }
    },
    /**
     * 获取右上角"转发"对应的分享信息
     * @returns {null}
     */
    getOnShareAppMessageInfo: function() {
        return this.OnShareAppMessageInfo;
    },

    /**
     * 随机获取一个分享点作为"转发"对应的分享信息
     * @returns {*}
     */
    getRandomOnShareAppMessageInfo: function() {
        var shareKeys = Object.keys(tywx.PropagateInterface.ShareConfig);
        if(shareKeys && shareKeys.length > 0) {
            var randomIndex = (Math.floor(Math.random()*10000))%shareKeys.length;
            var sharePointKey = shareKeys[randomIndex];
            var sharePointInfo = tywx.PropagateInterface.ShareConfig[sharePointKey];
            if(sharePointInfo && sharePointInfo.length > 0) {
                randomIndex = (Math.floor(Math.random()*10000))%sharePointInfo.length;
                var config = {
                    title: sharePointInfo[randomIndex].shareContent,
                    imageUrl: sharePointInfo[randomIndex].sharePicUrl,
                    sharePointId: sharePointInfo[randomIndex].sharePointId,
                    shareSchemeId: sharePointInfo[randomIndex].shareSchemeId
                }
                return config;
            }
        }
        return null;
    },

    
    /**
     * 根据分享信息调用分享接口,并封装了必要的打点和处理
     * @param title
     * @param imageUrl
     * @param sharePointId
     * @param shareSchemeId
     * @param successCallback
     * @param failCallback
     */
    share: function(title, imageUrl, sharePointId, shareSchemeId, successCallback, failCallback, sharePointName,extraAdd,shareAction,lifeTime,actionType) {
        tywx.UserInfo.isShare=true;
        if(tywx.IsWechatPlatform()) {
            tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeUserShare,[sharePointId, 1, shareSchemeId, sharePointName]);
            wx.shareAppMessage({
                title: title,
                imageUrl : imageUrl,
                query : 'inviteCode='+tywx.UserInfo.openid
                        +'&sourceCode='+sharePointId
                        +'&openId='+tywx.UserInfo.openid
                        +"&inviteName="+tywx.UserInfo.userName
                        +"&imageType="+shareSchemeId
                        +'&shareid='+tywx.UserInfo.userId
                        +'&timeStamp='+(new Date()).getTime()       //分享出去时间戳
                        +'&action='+(shareAction || "null")         //分享动作（所有的分享回调卡片，都有动作）
                        +'&actionType='+(actionType || "self")      //分享动作触发对象范围   self 自己点击有效   other 别人点击生效  all 所有人点击都有效哦
                        +'&lifeTime='+(lifeTime || 12*60*60*1000)   //卡片有效时间
                        +"&extraAdd="+extraAdd,
                success : function (result) {
                    //分享成功相关处理
                    if(successCallback) {
                        if(!tywx.SystemInfo.newShare){
                            successCallback(result);
                        }
                        tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeUserShare,[sharePointId, 2, shareSchemeId, sharePointName]);
                    }
                    
                },
                fail : function (result) {
                    //分享失败相关处理
                    if(failCallback) {
                        if(!tywx.SystemInfo.newShare){
                            failCallback(result);
                        }
                    }
                },
                complete : function () {
                    setTimeout(function () {
                        tywx.UserInfo.isShare=false;
                    }, 1000);
                }
            });
        }
    }
};

tywx.onShareAppMessageInit = function() {
    if(tywx.IsWechatPlatform()) {
        wx.onShareAppMessage(function (result) {
            /**
             * 获取转发信息,手动设置过则使用设置信息,否则随机获取一个分享点信息
             */
            var config = tywx.ShareInterface.getOnShareAppMessageInfo();
            if(config == null) {
                config = tywx.ShareInterface.getRandomOnShareAppMessageInfo();
            }
            tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeUserShare,[config.sharePointId, 1, config.shareSchemeId]);
            return {
                title: config.title,
                imageUrl : config.imageUrl,
                query : "inviteCode="+tywx.UserInfo.openid+"&sourceCode="+config.sharePointId+"&inviteName="+tywx.UserInfo.userName+"&imageType="+config.shareSchemeId,
                success : function (shareTickets,groupMsgInfos) {
                    tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeUserShare,[config.sharePointId, 2, config.shareSchemeId]);
                },
                fail : function () {
                    
                },
                complete : function () {
                }
            }
        });
    }
    if(tywx.IsWechatPlatform()) {
        // tywx.LOGD(" -- getImage = ",tywx.SystemInfo.shareManagerUrl + "sys/getImgs/10001")

        wx.request({
            // url: HttpUtils.baseUrl + cfgObj.url,
            url: tywx.SystemInfo.shareManagerUrl + "sys/getImgs/10006",
            method: 'GET', 
            success: function(res){
                var resp = JSON.parse(JSON.stringify(res))
                if(resp.statusCode == 200){
                    tywx.ShareInterface.shareConfigList = resp.data.data

                    tywx.LOGD("---->>> getImage ",JSON.stringify(tywx.ShareInterface.shareConfigList))
                }else{

                }
            },
            fail: function(res){
                var resp = JSON.parse(JSON.stringify(res))
                // if(failCallBack) failCallBack(resp);
            }
        });
    }
};

tywx.onShareAppMessageInit();