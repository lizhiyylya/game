
tywx.LimiteHelper = {

    
    init: function(){
        tywx.NotificationCenter.listen(tywx.EventType.MSG_LIMITE_TIME,this._msgLimiteTimeCallback,this)
    },
    destory : function(){
        tywx.NotificationCenter.ignore(tywx.EventType.MSG_LIMITE_TIME,this._msgLimiteTimeCallback,this)
    },

    _msgLimiteTimeCallback : function(){
        this.getFirstActiveStatus()
        this.getSecondActiveStatus()
    },

    getStateByTimeAndCityAndControl : function(control){
        // true jianguan状态 false 非jianguan状态
        var limiteState = false 
        if(control != 0){
        
            if(tywx.UserInfo.cityLimited == false && tywx.UserInfo.timeLimited == false){
                limiteState == false
            }else{
                limiteState = true
            }
        
        }else{
            limiteState = true
        }
        tywx.UserInfo.isLimited = limiteState;
        return limiteState;
    },

    /*
        0 提审版本 1 疯狂模式(视频都变为分享) 2 视频正常模式(youdao分享都做成正常的激励视频) 3 纯净模式(没有视频，没有分享，玩家正常玩)
     */
    //  获取服务器下发按钮状态
    getFirstActiveStatus:function(){       
        var sdkPath = tywx.SystemInfo.loginUrl
        var self = this;
        
        var successCb = function(resp){
            console.log("++++++++++++++++++++++++++++++++++++++getFirstActiveStatus1 , resp:\n",resp)
            console.log("++++++++++++++++++++++++++++++++++++++getFirstActiveStatus , resp:\n" + JSON.stringify(resp))
            if(resp && resp.code == 0){              
                tywx.UserInfo.firstActiveStatus = resp.data;
            }
            var isLimited = self.getStateByTimeAndCityAndControl(tywx.UserInfo.firstActiveStatus)
            tywx.NotificationCenter.trigger(tywx.EventType.FRIST_ACTIVITY_STATE,{state : tywx.UserInfo.firstActiveStatus , isLimited : isLimited})
        }
        var failCb = function(resp){
            tywx.UserInfo.firstActiveStatus = 1;
            var isLimited = self.getStateByTimeAndCityAndControl(tywx.UserInfo.firstActiveStatus)
            tywx.NotificationCenter.trigger(tywx.EventType.FRIST_ACTIVITY_STATE,{state : tywx.UserInfo.firstActiveStatus , isLimited : isLimited})
        }
        var cfgObj = {
            url:sdkPath + 'monster/getFirstVersionStatus/' + miCfg.GameConfig.version
        }
        tywx.HttpUtil.httpGet(cfgObj, successCb, failCb);
    },



    getSecondActiveStatus:function(){       
        var self = this;
        var sdkPath = tywx.SystemInfo.loginUrl
        var statusPath = tywx.SystemInfo.statusUrl
        var successCb = function(resp){
            var tempList = {}
            console.log("++++++++++++++++++++++++++++++++++++++getSecondActiveStatus , resp:\n" + JSON.stringify(resp))
            if(resp && resp.code == 0){              
                // tywx.UserInfo.secondActiveStatus = resp.data;
                tempList = JSON.parse(resp.data.str) || {}
            }
            if(tempList == {}){
                return
            }
            tywx.UserInfo.modelActiveStatusList=[];
            var keys = Object.keys(tempList)
            for(var i=0;i<keys.length;i++){
                var isLimited = self.getStateByTimeAndCityAndControl(tempList[keys[i]])
                var data = {
                    key : keys[i],
                    // status : parseInt(tempList[keys[i]]),
                    status : 0,
                    strategy: tempList[keys[i]],
                    isLimited : isLimited
                }

                if ( typeof tempList[keys[i]] === 'object')
                {
                    data.status =tempList[keys[i]][0];
                }else 
                {
                    data.status =parseInt(tempList[keys[i]]);
                }

                tywx.UserInfo.modelActiveStatusList.push(data)
            }

            tywx.LOGE(JSON.stringify(tywx.UserInfo.modelActiveStatusList))
            tywx.NotificationCenter.trigger(tywx.EventType.SECOND_ACTIVITY_STATE,tywx.UserInfo.modelActiveStatusList)
        }
        var failCb = function(resp){
            tywx.NotificationCenter.trigger(tywx.EventType.SECOND_ACTIVITY_STATE,[])
        }
        var cfgObj = {
            url:statusPath + '/handler/getVersion?appName=monster&version=' + miCfg.GameConfig.version
        }
        tywx.HttpUtil.httpGet(cfgObj, successCb, failCb);
    },

    getSecondeStatusByPoint : function(point){

        for(var i = 0;i< tywx.UserInfo.modelActiveStatusList.length;i++){
            var data = tywx.UserInfo.modelActiveStatusList[i];
            if(data.key == point){
                return data
            }
        }

        return {
            key : "NONE",
            status : 0,
            isLimited : true,
            strategy:[0]
        }
    }


}