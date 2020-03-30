/**
 * @author zhaoliang
 * @date 1.28
 * 
 * 全局对象
 * 系统信息
 * 包括clientId，loginUrl等
 */
console.log("TuyooSDK loaded");
tywx.TuyooSDK = {
    SESSION_KEY: 'TU_SESSION_STORAGE',

    /***************************以下为登录相关接口*********************************/
    login: function () {
        if (tywx.IsWechatPlatform()) {
            tywx.LOGD("login 微信")
            tywx.LimiteHelper.init()
            tywx.TuyooSDK.getSystemInfo();
            tywx.TuyooSDK.wechatLogin();

        }
        else {
            //其他平台,待添加
        }
    },



    /**
     * 判断游戏是否已经登录
     */
    checkIsLogin: function () {
        if (!tywx.UserInfo.userId)
            return false;
        return true;
    },
    // 微信登录
    wechatLogin: function () {
        var self = this
        if (!tywx.IsWechatPlatform()) {
            return;
        }
        tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeWxLoginStart, []);
        wx.login({
            success: function (params) {
                tywx.LOGD(null, 'wx login success, params:' + JSON.stringify(params));
                tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeWxLoginSuccess, [params.code]);
                if (params.code) {
                    var code = params.code;

                    tywx.TuyooSDK.loginTuyooWithCode(code, {});
                    tywx.NotificationCenter.trigger(tywx.EventType.WEIXIN_LOGIN_SUCCESS);
                }
            },

            fail: function (params) {
                tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeWxLoginFailed, []);
                tywx.LOGD(null, 'wx login fail, params:' + JSON.stringify(params));
                tywx.NotificationCenter.trigger(tywx.EventType.WEIXIN_LOGIN_FAIL);
            },

            complete: function (params) {

            }
        });


    },

    /*
    城市限制
    */
    getLimitCityInfo: function (areaName) {
        var self = this
        var cname = Math.floor(Number(areaName) / 10000) || 10
        if (tywx.IsWechatPlatform()) {
            wx.request({
                url: "https://dddlo.com/small/sys/getAreaAd/" + cname,
                method: 'GET',
                success: function (res) {
                    tywx.LOGE("--->> areaAd ", JSON.stringify(res))
                    if (res.statusCode == 200) {
                        // 1 表示监管区域
                        if (res.data && res.data.data && Number(res.data.data) == 1) {

                            tywx.UserInfo.cityLimited = true
                            tywx.NotificationCenter.trigger(tywx.EventType.MSG_LIMITE_TIME)

                        } else {
                            // 请求失败就不在地区监管区
                            tywx.UserInfo.cityLimited = false
                            self.getLimitTimeInfo()
                        }
                    } else {
                        // 请求失败就不在地区监管区
                        tywx.UserInfo.cityLimited = false
                        self.getLimitTimeInfo()
                    }
                },
                fail: function (res) {

                    // 请求失败就不在地区监管区
                    tywx.UserInfo.cityLimited = false
                    self.getLimitTimeInfo()
                }
            });
        }
    },
    /*
    时间限制 0 工作日  1 休息日  2 节假日
    */
    getLimitTimeInfo: function () {


        var dataCfg = [
            [2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2],
            [2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
        ]
        var now = new Date()
        var year = now.getFullYear();
        var month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
        var date = now.getDate() >= 10 ? now.getDate() : "0" + (now.getDate());

        var hour = now.getHours()

        var time = year + "" + month + "" + date


        var dataState = dataCfg[now.getMonth()][now.getDate() - 1];
        // tywx.LOGE(" dataState = ",dataState)
        if (hour >= 10 || hour <= 6 || (dataState != 0)) {
            tywx.UserInfo.timeLimited = false
        } else {
            tywx.UserInfo.timeLimited = true
        }
        tywx.NotificationCenter.trigger(tywx.EventType.MSG_LIMITE_TIME)
        // if(tywx.IsWechatPlatform()) {
        //     wx.request({
        //         url : "https://api.goseek.cn/Tools/holiday?date="+time, 
        //         method : 'GET',
        //         success : function (res) {
        //             if (res.statusCode == 200){
        //                 tywx.LOGD("getLimitInfo = ",JSON.stringify(res))
        //                 // 晚上 11 点到次日6点为非监管时间段 或者 非工作日
        //                 if(hour >= 23 || hour <=6 || (res.data && res.data.data != 0)){
        //                     tywx.UserInfo.timeLimited = false
        //                 }else{
        //                     tywx.UserInfo.timeLimited = true
        //                 }
        //             }
        //             else{
        //                 tywx.UserInfo.timeLimited = false
        //                 tywx.LOGD('getLimitTimeInfo fail =', 'statusCode:' + res.statusCode);
        //             }
        //             tywx.NotificationCenter.trigger(tywx.EventType.MSG_LIMITE_TIME)
        //         },
        //         fail : function (res) {
        //             tywx.UserInfo.timeLimited = false
        //             tywx.NotificationCenter.trigger(tywx.EventType.MSG_LIMITE_TIME)
        //         }
        //     });
        // }
    },

    // 微信不需要重新授权，使用
    loginTuyooWith3rdSession: function () {
        if (!tywx.IsWechatPlatform()) {
            return;
        }
        wx.getStorage({
            key: tywx.TuyooSDK.SESSION_KEY,
            success: function (params) {
                if (!params.data) {
                    tywx.TuyooSDK.wechatLogin();
                    return;
                }
                // 微信授权成功后使用code登录途游服务器

                //console.log (tywx.SystemInfo.loginUrl);

                wx.request({
                    url: tywx.SystemInfo.loginUrl + 'monsterUser/getOpenId/',

                    //url: tywx.SystemInfo.loginUrl,
                    data: {
                        snsId: params.data,
                        deviceName: 'wechatGame',
                        clientId: tywx.SystemInfo.clientId,
                        appId: tywx.SystemInfo.appId
                    },

                    success: function (params) {
                        tywx.LOGD(null, 'tuyoo login success, params1:' + JSON.stringify(params));
                    },

                    fail: function (params) {
                        tywx.LOGD(null, 'loginTuyooWith3rdSession  fail, params:' + JSON.stringify(params));
                    },

                    complete: function (params) {

                    }
                });
            },
            fail: function (params) {
                tywx.TuyooSDK.wechatLogin();
            },
            complete: function (params) {

            }
        });
    },

    // 微信授权成功后，使用
    /* {
        "data": {
            "result": {
                "code": 0,
                "userId": 10116,
                "exception_report": 0,
                "userType": 4,
                "authInfo": "{\"authcode\": \"eyJ1aWQiOiAxMDExNiwgInVuYW1lIjogIlx1Njc2NVx1NWJiZTAwNzRBaWJzVCIsICJ1dG9rZW4iOiAiMjAxOC0wMS0yOSAxNDoxMzoxMi40NzEzMzgiLCAiY29pbiI6IDAsICJlbWFpbCI6ICIiLCAidXRpbWUiOiAiMjAxOC0wMS0yOSAxNDoxMzoxMi40NzA0NzEifQ==\", \"account\": \"\", \"uid\": 10116, \"usercode\": \"\"}",
                "tcpsrv": {
                    "ip": "192.168.10.88",
                    "port": 8041
                },
                "isCreate": 1,
                "changePwdCount": 0,
                "360.vip": 0,
                "logclient": {
                    "loguploadurl": "",
                    "logreporturl": ""
                },
                "userPwd": "ty817142",
                "purl": "http://ddz.image.tuyoo.com/avatar/head_female_0.png",
                "snsId": "wxapp:071Nehqt0Z4XEe1jN6qt007Cqt0Nehqz",
                "userEmail": "",
                "connectTimeOut": 35,
                "appId": 9999,
                "heartBeat": 6,
                "userName": "来宾0074AibsT",
                "mobile": "",
                "token": "cce362d6-68a8-485e-b137-86ae6828e07a",
                "authorCode": "eyJ1aWQiOiAxMDExNiwgInVuYW1lIjogIlx1Njc2NVx1NWJiZTAwNzRBaWJzVCIsICJ1dG9rZW4iOiAiMjAxOC0wMS0yOSAxNDoxMzoxMi40NzEzMzgiLCAiY29pbiI6IDAsICJlbWFpbCI6ICIiLCAidXRpbWUiOiAiMjAxOC0wMS0yOSAxNDoxMzoxMi40NzA0NzEifQ==",
                "log_report": 0,
                "showAd": 1
            }
        },
        "header": {
            "Server": "nginx/1.4.1",
            "Date": "Mon, 29 Jan 2018 06:13:12 GMT",
            "Content-Type": "application/json;charset=UTF-8",
            "Transfer-Encoding": "chunked",
            "Connection": "keep-alive",
            "Content-Encoding": "gzip"
        },
        "statusCode": 200,
        "errMsg": "request:ok"
    }
    */


    tuYouLogin(opendid, userInfo) {
        var self = this
        console.log("opendid = = ==  " + opendid)
        var local_uuid = tywx.Util.getLocalUUID();
        var sdkPath = tywx.SystemInfo.loginUrl;
        var dataObj = {
            // appId: tywx.SystemInfo.appId,
            // wxAppId: tywx.SystemInfo.wxAppId,
            // clientId: tywx.SystemInfo.clientId,
            // snsId: 'wxapp:' + code,
            // uuid : local_uuid,
            // //以下为上传玩家的微信用户信息
            // //nickName: userInfo.nickName,
            // //avatarUrl: userInfo.avatarUrl,
            // scene_id : tywx.UserInfo.scene_id || "",
            // scene_param : tywx.UserInfo.scene_param || "",
            // invite_id : tywx.UserInfo.invite_id || 0

            openId: opendid,
            nickName: tywx.UserInfo.nickName,
            wxImg: tywx.UserInfo.avatarUrl,
            gender: tywx.UserInfo.gender,
            city: tywx.UserInfo.city,
            province: tywx.UserInfo.province,
            country: tywx.UserInfo.country,
            inviteOpenId: ""

        };
        if (userInfo && userInfo.nickName) {
            dataObj.nickName = userInfo.nickName;
        }
        if (tywx.UserInfo.invite_id) {
            dataObj.inviteOpenId = tywx.UserInfo.invite_id;
        }
        if (userInfo && userInfo.avatarUrl) {
            dataObj.avatarUrl = userInfo.avatarUrl;
        }
        tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeLoginSDKStart, [tywx.UserInfo.openid, local_uuid, userInfo.nickName]);
        wx.request({
            url: sdkPath + "monsterUser/login/" + tywx.UserInfo.openid,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: dataObj,
            method: 'POST',

            success: function (params) {

                tywx.LOGD(null, 'tuyoo login success, params2:' + JSON.stringify(params));

                var checkData = params.data;
                if (checkData.code == 0) {
                    // console.log("sdkPht------->>> = "+sdkPath +"player/login/"+code)
                    console.log("我方服务器登陆成功！");
                }

                var result = checkData.data;
                console.log(result);
                // tywx.UserInfo.openid= code;      
                tywx.UserInfo.userId = result.MonsterUser.id;
                tywx.UserInfo.userName = result.MonsterUser.nickName || "无名氏";
                tywx.UserInfo.userPic = result.MonsterUser.wxImg || "0"
                tywx.UserInfo.authorCode = result.MonsterUser.city || "无";
                tywx.UserInfo.buildCity = [];
                tywx.UserInfo.isNewPlayer=result.MonsterUser.isNewPlayer || -1;
                tywx.UserInfo.gameData = result;
                tywx.UserInfo.isWxLoginSuccess = true;
                tywx.NotificationCenter.trigger(miDB.EVENT.WECHAT_GAME_LOGIN, tywx.UserInfo.gameData);


                if (tywx.UserInfo.extraAdd == "friendHelp") {

                    var data = {
                        beHelped: tywx.UserInfo.invite_id,
                        helped: tywx.UserInfo.openid,
                        spare: ""
                    }
                    tywx.postMethod("monster/help", data, function (params) {
                        if (params.data.code == 0) {
                            tywx.BiLog.clickStat(miDB.BIEVENT.FRIEND_HELP_SHARE_SUCCESS, [tywx.UserInfo.isNewPlayer]);
                        }
                    }, function () {

                    });

                }

                if (tywx.IsWechatPlatform()) {
                    wx.request({
                        url: "https://pv.sohu.com/cityjson",
                        method: 'GET',
                        success: function (res) {
                            //{"cip": "121.69.133.202", "cid": "220100", "cname": "吉林省长春市"}
                            var locationInfo = JSON.parse(res.data.split("=")[1].replace(";", ""))
                            console.log(" cip =" + locationInfo.cip)
                            console.log(" cid =" + locationInfo.cid)
                            console.log(" cname =" + locationInfo.cname)
                            if (res.statusCode == 200) {
                                tywx.UserInfo.userArea = locationInfo.cname
                                tywx.UserInfo.ip = locationInfo.cip
                                tywx.UserInfo.cityId = locationInfo.cid
                                self.getLimitCityInfo(tywx.UserInfo.cityId)


                                tywx.NotificationCenter.trigger(tywx.EventType.MSG_LOGIN_SUCCESS)
                            } else {
                                // 请求失败就不在地区监管区
                                tywx.UserInfo.cityLimited = false
                                self.getLimitTimeInfo()
                            }
                        },
                        fail: function (res) {
                            // 请求失败就不在地区监管区
                            tywx.UserInfo.cityLimited = false
                            self.getLimitTimeInfo()
                        }
                    });
                }
                tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeLoginSDKSuccess, [tywx.UserInfo.openid, local_uuid, tywx.UserInfo.userName, tywx.UserInfo.userId,tywx.UserInfo.isNewPlayer  ]);
            },

            fail: function (params) {
                tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeLoginSDKFailed, [tywx.UserInfo.openid, local_uuid, tywx.UserInfo.userName ]);
                tywx.TuyooSDK.tuYouLogin(opendid, userInfo);
                tywx.LOGD(null, 'tuYouLogin  fail, params:');
            },
            complete: function (params) {

            }
        });
    },


    /*
    检查登陆状态
    */
    checkSessionState: function (shareFunc) {
        var sdkPath = tywx.SystemInfo.loginUrl;
        wx.checkSession({
            success: function (res) {
                console.log("++++++++++++++++++++++++===========================处于登录态");
                if (shareFunc) {
                    shareFunc();
                }
            },
            fail: function (res) {
                console.log("++++++++++++++++++++++++===========================需要重新登录");
                wx.login({
                    success: function (params) {


                        // var successCb = function(resp){
                        //     var info = JSON.parse(JSON.stringify(resp));
                        //     var checkData = params.data;
                        //     tywx.UserInfo.wxgame_session_key = checkData.sessionkey;
                        //     if(shareFunc){
                        //         shareFunc();
                        //     }
                        // }
                        // var failCb = function(resp){
                        //     tywx.LOGD("login for sessionKey is fail!")
                        // }
                        // var cfgObj = {
                        //     url:'player/getOpenId/' + params.code,
                        // }
                        // HttpUtils.httpGet(cfgObj, successCb, failCb);




                        wx.request({
                            url: sdkPath + 'monsterUser/getOpenId/' + params.code,
                            method: 'GET',
                            success: function (res) {
                                if (res.statusCode == 200) {
                                    // tywx.LOGD('ty.HttpUtil.httpGet', 'res:' + JSON.stringify(res.data));
                                    // var checkData = params.data;
                                    // tywx.UserInfo.wxgame_session_key = checkData.sessionkey;
                                    // tywx.LOGD("sessionKey = ",JSON.stringify(checkData))
                                    if (shareFunc) {
                                        shareFunc();
                                    }
                                }
                                else {
                                    tywx.LOGD("login for sessionKey is fail!")
                                }
                            },
                            fail: function (res) {
                                tywx.LOGD("login for sessionKey is fail!")
                            }
                        });
                    },
                    fail: function (params) {
                    },
                    complete: function (params) {
                    }
                });

            }
        })
    },

    loginTuyooWithCode: function (code, userInfo) {
        var that = this
        if (!tywx.IsWechatPlatform()) {
            return;
        }
        console.log("微信授权成功后使用code登录途游服务器");

        // 微信授权成功后使用code登录途游服务器


        var local_uuid = tywx.Util.getLocalUUID();
        tywx.LOGD("local_uuid:", local_uuid);
        var sdkPath = tywx.SystemInfo.loginUrl;

        wx.request({
            url: sdkPath + "monsterUser/getOpenId/" + code,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },

            method: 'POST',

            success: function (params) {

                console.log("******************************");
                // tywx.LOGD(null, 'tuyoo login success, params:' + JSON.stringify(params));

                var checkData = params.data;
                console.log(checkData);
                tywx.UserInfo.wxgame_session_key = checkData.data.sessionkey;
                tywx.SystemInfo.openid = checkData.data.openId;

                console.log(tywx.SystemInfo.openid);



                tywx.TuyooSDK.loginTuyooPic(checkData.data, userInfo);


            },

            fail: function (params) {
                tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeLoginSDKFailed, [code, local_uuid, userInfo.nickName]);
                tywx.LOGD(null, 'sdkPath:' + sdkPath + "monsterUser/getOpenId/" + code);
                tywx.LOGD(null, 'loginTuyooWithCode, params:' + JSON.stringify(params));
                that.loginTuyooWithCode(code, userInfo)
                tywx.NotificationCenter.trigger(tywx.EventType.SDK_LOGIN_FAIL);
            },

            complete: function (params) {

            }
        });
    },


    loginTuyooPic: function (code, data) {
        tywx.UserInfo.openid = code.openId;
        wx.authorize({
            scope: "scope.userInfo", success: function () {
                wx.getUserInfo({
                    success: function (res) {
                        var userInfo = res.userInfo;
                        tywx.UserInfo.nickName = userInfo.nickName;
                        tywx.UserInfo.avatarUrl = userInfo.avatarUrl;
                        tywx.UserInfo.gender = userInfo.gender;
                        tywx.UserInfo.province = userInfo.province;
                        tywx.UserInfo.city = userInfo.city;
                        tywx.UserInfo.country = userInfo.country;
                        console.log("--------------------------");
                        tywx.TuyooSDK.tuYouLogin(tywx.UserInfo.openid, data);
                    },
                    fail: function () {
                        console.log("获取用户信息失败");
                        tywx.TuyooSDK.loginTuyooPic(code, data);

                    },
                });
            },
            fail: function () {
                tywx.UserInfo.nickName = "";
                tywx.UserInfo.avatarUrl = "";
                tywx.UserInfo.gender = 0;
                tywx.UserInfo.province = "";
                tywx.UserInfo.city = "";
                tywx.UserInfo.country = "";

                tywx.TuyooSDK.tuYouLogin(tywx.UserInfo.openid, data);
            },
        });

    },



    loginTuyooAuthorize: function () {
        wx.authorize({
            scope: "scope.userInfo", success: function () {
                wx.getUserInfo({
                    success: function (res) {
                        var userInfo = res.userInfo;
                        tywx.UserInfo.nickName = userInfo.nickName;
                        tywx.UserInfo.avatarUrl = userInfo.avatarUrl;
                        tywx.UserInfo.gender = userInfo.gender;
                        tywx.UserInfo.province = userInfo.province;
                        tywx.UserInfo.city = userInfo.city;
                        tywx.UserInfo.country = userInfo.country;
                    },
                    fail: function () {
                        console.log("获取用户信息失败");
                    },
                });

            },
            fail: function () {
                tywx.UserInfo.nickName = "";
                tywx.UserInfo.avatarUrl = "";
                tywx.UserInfo.gender = 0;
                tywx.UserInfo.province = "";
                tywx.UserInfo.city = "";
                tywx.UserInfo.country = "";
            },
        });
    },




    // loginTuyooWithCode: function(code, userInfo) {
    //     if(!tywx.IsWechatPlatform()) {
    //         return;
    //     }
    //     console.log ("微信授权成功后使用code登录疯狂打鱼服务器");

    //     // 微信授权成功后使用code登录疯狂打鱼服务器


    //     var local_uuid = tywx.Util.getLocalUUID();
    //     tywx.LOGD("local_uuid:",local_uuid);
    //     var sdkPath = tywx.SystemInfo.loginUrl;
    //     tywx.LOGE("code------->>>> code :",code);
    //     // tywx.UserInfo.openid = code
    //     wx.request({
    //         url: sdkPath + "monsterUser/getOpenId/" + code,
    //         header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //         },

    //         method:'GET',

    //         success: function(params) {

    //             console.log ("******************************");
    //             tywx.LOGD(null, 'tuyoo login success, params3:' + JSON.stringify(params));

    //             var checkData = params.data;
    //             tywx.UserInfo.wxgame_session_key = checkData.sessionkey;
    //             tywx.LOGD("checkData -= ",JSON.stringify(checkData));
    //             tywx.TuyooSDK.tuYouLogin(checkData.data , userInfo);
    //         },

    //         fail: function(params) {
    //             tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeLoginSDKFailed, [code, local_uuid, userInfo.nickName]);
    //             tywx.LOGD(null, 'tuyoo login fail, params:' + JSON.stringify(params));
    //             tywx.NotificationCenter.trigger(tywx.EventType.SDK_LOGIN_FAIL);
    //         },

    //         complete: function(params) {

    //         }
    //     });
    // },

    /**
     * 使用sdk登陆返回信息解析得到服务器连接地址,对于单机游戏来说无效
     * @param loginResult
     */
    initWebSocketUrl: function (loginResult) {
        if (loginResult && loginResult.tcpsrv) {
            var ip = loginResult.tcpsrv.ip;
            var port = loginResult.tcpsrv.wsport || loginResult.tcpsrv.port; //优先使用wsport
            var webSocketUrl;
            if (tywx.SystemInfo.loginUrl.indexOf("https://") > -1) {
                webSocketUrl = 'wss://' + ip + '/';
            }
            else {
                webSocketUrl = 'ws://' + ip + ':' + port.toString() + '/';
            }
            tywx.LOGD(null, 'webSocketUrl:' + webSocketUrl);
            tywx.SystemInfo.webSocketUrl = webSocketUrl;
        }
    },

    getSystemInfo: function () {
        if (!tywx.IsWechatPlatform()) {
            return;
        }
        wx.getSystemInfo({
            success: function (result) {
                var model = result.model;
                var isiPhone = model.indexOf("iPhone") >= 0;
                var windowHeight = result.windowHeight;
                var resultType = 0;
                if (isiPhone) {
                    if (windowHeight == 812) {   //iPhoneX
                        resultType = 2;
                    } else if (windowHeight == 736) { // 7p 8p
                        resultType = 4;
                    } else {  //其他iPhone
                        resultType = 1;
                    }
                } else { //cc.sys.OS_ANDROID
                    resultType = 3;
                }
                tywx.UserInfo.systemType = resultType;
                tywx.UserInfo.wechatType = result.version;
                tywx.UserInfo.model = result.model;
                tywx.UserInfo.system = result.system;
                tywx.UserInfo.SDKVersion = result.SDKVersion;
                //上报顺序为微信版本 基础库版本 平台 操作系统版本
                tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeSubmitVersionInfo,
                    [result.version, result.SDKVersion, result.platform, result.system]);
            },
            fail: function () {
            },
            complete: function () {
            }
        });
    },

    wechatAuthorize: function () {
        if (!tywx.IsWechatPlatform()) {
            return;
        }
        wx.getSetting({
            success: function (res) {
                if (!res.authSetting['scope.userInfo']) {
                    tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeAuthorizationStart, []);
                    wx.authorize({
                        scope: "scope.userInfo",
                        success: function () {
                            tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeAuthorizationSuccess, []);
                            tywx.NotificationCenter.trigger(tywx.EventType.START_AUTHORIZATION_SUCCESS);
                        },
                        fail: function () {
                            tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeAuthorizationFailed, []);
                            tywx.NotificationCenter.trigger(tywx.EventType.START_AUTHORIZATION_FAILED);
                        },
                        complete: function () {
                        }
                    });
                }
                else {
                    tywx.NotificationCenter.trigger(tywx.EventType.START_AUTHORIZATION_SUCCESS);
                }
            }
        })
    },

    compareSDkVersion: function (SDkVersion) {
        if (SDkVersion == "2.0.1") {
            return true;
        }
        var data = SDkVersion.split(".");
        var index = 2;
        console.log("data" + JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
            var per = parseInt(data[i]);
            if (i == 0) {
                index = 2;
            } else if (i == 1) {
                index = 0;
            } else {
                index = 1;
            }
            console.log("per" + per + "index" + index);
            if (per > index) {
                return true;
            } else if (per < index) {
                return false;
            } else {
                continue;
            }
        }
        return false;
    },

    wxInviteFriendShare: function (titlestr, imageUrl, successCallBackFun, failCallBackFun) {
        var query = minihall.GlobalFuncs.getInvitedQuery();
        wx.shareAppMessage({
            title: titlestr,
            imageUrl: imageUrl,//5:4
            query: query,//'key1=val1&key2=val2',
            success: function (result) {
                tywx.LOGE(null, "shareAppMessage+++++++++++++++++" + JSON.stringify(result));
                if (successCallBackFun) {
                    successCallBackFun(result);
                }
            },
            fail: function () {
                if (failCallBackFun) {
                    failCallBackFun();
                }
                tywx.LOGD(null, JSON.stringify(arguments));
            },
            complete: function () {
            }
        })
    },

    wxShare: function (titlestr, imageUrl, successCallBackFun, failCallBackFun, isforce) {
        wx.shareAppMessage({
            title: titlestr,
            imageUrl: imageUrl,//5:4
            query: 'shareid=' + tywx.UserInfo.userId,
            success: function (result) {
                if (isforce == true)
                    tywx.NotificationCenter.trigger(tywx.EventType.SHARE_RESULT, result);
                tywx.LOGE(null, "shareAppMessage+++++++++++++++++" + JSON.stringify(result));
                if (successCallBackFun) {
                    successCallBackFun(result);
                }
            },
            fail: function () {
                if (failCallBackFun) {
                    failCallBackFun();
                }
                tywx.LOGD(null, JSON.stringify(arguments));
            },
            complete: function () {
            }
        })
    }
};
wx.onShareAppMessage(function (result) {
    tywx.UserInfo.isShare = true;
    // if (result.from === 'button') {
    // }
    // var _index = Math.floor(Math.random()*2);

    // var config = {
    //     "sharePicUrl": "res/raw-assets/resources/image/shareImg.png",
    //     "shareContent": "@我 好久不见，能跟我一起打鱼吗！",
    //     "sharePointId": "024",
    //     "shareSchemeId": "035032",
    //     "extraAdd": [],
    //     "weight": 10
    // }

    var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.NONE)
    var config = cofigInfo.config;
    return {
        title: config.shareContent,
        imageUrl: config.sharePicUrl,
        success: function (result) {
        },
        fail: function (result) {
        },
        complete: function () {

            setTimeout(function () {
                tywx.UserInfo.isShare = false;
            }, 1000);

        }
    }



    // tywx.ShareInterface.share(config.shareContent, config.sharePicUrl, config.sharePointId, config.shareSchemeId
    //     , function (result) {
    //         wx.showToast({ title: "分享成功" });
    //     }, function (res) {
    //         wx.showToast({ title: "分享失败" });
    //     }, null, "");
});
/**
 * post请求封装
 */
tywx.postMethod = function (url, data, sucCallback, failCallback) {

    console.log("postMethod");

    wx.request({
        url: tywx.SystemInfo.loginUrl + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        method: 'POST',

        success: function (params) {
            console.log(params);
            if (sucCallback) {
                sucCallback(params)
            }
            // callBack.call(target, params);
        },

        fail: function (params) {
            if (failCallback) {
                failCallback(params)
            }

        },
        complete: function (params) {

        }
    });


};


tywx.postMethodCall = function (url, data, callBack, target) {

    console.log("postMethodCall");

    wx.request({
        url: tywx.SystemInfo.loginUrl + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        method: 'POST',

        success: function (params) {
            callBack.call(target, params);
        },

        fail: function (params) {


        },
        complete: function (params) {

        }
    });

};

tywx.postMethodTurnCall = function (url, data, callBack,   target,failCallBack, ) {

    console.log("postMethodCall");

    wx.request({
        url: tywx.SystemInfo.loginUrl + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        method: 'POST',

        success: function (params) {
            callBack.call(target, params);
        },

        fail: function (params) {

            if (failCallBack)
            {
                failCallBack.call(target, params);
            }
       
        },
        complete: function (params) {

        }
    });
};






tywx.WechatInterfaceInit = function () {

    if (tywx.IsWechatPlatform()) {
        /**
         * 小程序回到前台,具体逻辑自己实现
         */

        console.log("befre SHow ");
        wx.onShow(function (result) {

            //test 盒子导量测试
            // result = {"scene":1037,"path":"miniProgram=mj5000","query":{},"referrerInfo":{"appId":"wx9392c5bf417e1628","extraData":{},"privateExtraData":{}},"scene_note":"wx9392c5bf417e1628:SessionId@151948445#1536042219816:1000","sessionId":"SessionId@245455148#1536042232523","usedState":3,"prescene":0,"prescene_note":"","referpagepath":"wx9392c5bf417e1628","clickTimestamp":1536042238511,"__public":{"path":"miniProgram=mj5000","query":{},"scene":1037,"referrerInfo":{"appId":"wx9392c5bf417e1628","extraData":{}}}}
            //test 小程序二维码进入测试
            // result = {"scene":1047,"path":"index","query":{},"scene_note":"https%3A%2F%2Fmp.weixin.qq.com%2Fa%3Fusername%3Dgh_08e2744655d8%40app%26version%3D5%26lang%3Dzh_CN%26devicetype%3Dandroid-24","sessionId":"SessionId@232654318#1536043294114","usedState":2,"prescene":0,"prescene_note":"","referpagepath":"","clickTimestamp":1536043306592,"referrerInfo":{},"__public":{"path":"index","query":{},"scene":1047,"referrerInfo":{}}}
            //test 卡片进入测试
            // result = {"scene":1044,"path":"","query":{"extraAdd":"","imageType":"035032","inviteName":"无名氏","sourceCode":"024","shareid":"26","inviteCode":"26"},"scene_note":"0_wxf48bd546ec49617f_342199720_1536028567_0","sessionId":"SessionId@38333751#1536044716745","usedState":2,"prescene":1,"prescene_note":"wa1085774200","referpagepath":"","clickTimestamp":1536044719468,"referrerInfo":{},"__public":{"path":"","query":{"extraAdd":"","imageType":"035032","inviteName":"无名氏","sourceCode":"024","shareid":"26","inviteCode":"26"},"scene":1044,"referrerInfo":{}}}
            // {"0":{"scene":1044,"shareTicket":"beecdf9e-e881-492c-8a3f-a7d8c54dfcdb","query":{}}}  (从后台切到前台才有shareTicket,启动时没有)
            //  result = {"scene":1044,"path":"","query":{"extraAdd":"undefined","imageType":"10","inviteName":"无名氏","sourceCode":"10001","shareid":"37452","inviteCode":"37452"},"scene_note":"0_wxf48bd546ec49617f_1107555500_1537849595_0","sessionId":"SessionId@224361135#1537851381998","usedState":2,"prescene":1,"prescene_note":"wyt136841498","referpagepath":"","clickTimestamp":1537851383482,"referrerInfo":{},"__public":{"path":"","query":{"extraAdd":"undefined","imageType":"10","inviteName":"无名氏","sourceCode":"10001","shareid":"37452","inviteCode":"37452"},"scene":1044,"referrerInfo":{}}}

            //var  result ={"prescene_note":"qzsyzxwq","sessionid":"Session@83027385#1362323#1538023572196","scene":1007,"prescene":1,"costtime":0,"clickTimestamp":1538023111,"usedstate":2,"referrerInfo":{"appId":"wxaf7a75ceaa29f788"},"scene_note":"qzsyzxwq:1_wxaf7a75ceaa29f788_219888455_1538023546_0","query":{"inviteCode":"oewAN5J3pkjhUYbzgaGQlkcOOS2A","sourceCode":"NONE","inviteName":"风华","imageType":"035032","shareid":"6","extraAdd":"friendHelp"}};

          //  var result= {"relaunch":true,"rawPath":"?inviteCode=10753&sourceCode=FRIEND_HELP&openId=undefined&inviteName=wind&imageType=7&shareid=10753&timeStamp=1541474279555&action=null&actionType=self&lifeTime=43200000&extraAdd=friendHelp","query":{"extraAdd":"friendHelp","action":"null","imageType":"7","inviteName":"wind","sourceCode":"FRIEND_HELP","actionType":"self","lifeTime":"43200000","openId":"undefined","timeStamp":"1541474279555","shareid":"10753","inviteCode":"10753"},"scene":1044,"reLaunch":true,"scene_note":"0_wxaf7a75ceaa29f788_83027385_1541474283_0","sessionId":"SessionId@165313840#1541474585852","usedState":2,"prescene":2,"prescene_note":"12721132406@chatroom:tfuoqw","referpagepath":"","clickTimestamp":1541474585948,"shareTicket":"f3d420b4-a134-4df0-9f15-0decca71449c"};
            tywx.LOGE('', "+++++++++++++++++onShow+++++++++++++++++" + JSON.stringify(result));

            // 用户获得地区
            // tywx.PropagateInterface.getUserAreaInfo();
            //取相关参数
            var scene = result.scene;
            var query = result.query;
            var scenePath = '';
            tywx.showScene = scene;
            tywx.showQuery = query;
            //来源处理
            tywx.UserInfo.scene_id = scene;

            tywx.UserInfo.scene_param = query.from || "";
            tywx.UserInfo.invite_id = query.shareid || 0;
            tywx.StateInfo.isOnForeground = true;
          

        
            //好友助力
            if (result.query && result.query.inviteCode) {

                tywx.UserInfo.invite_id = result.query.inviteCode;
            }

            tywx.UserInfo.extraAdd  ="";
            if (result.query && result.query.extraAdd) {

                tywx.UserInfo.extraAdd = result.query.extraAdd;

            }
            tywx.UserInfo.shareTicket="";
            if (result.shareTicket) {

                tywx.UserInfo.shareTicket =result.shareTicket;

            }

            

            if (result.query && result.query.messageCartTime) {

                tywx.UserInfo.messageCartTime = result.query.messageCartTime;

            }
            
            if (result.query && result.query.sendOpenId) {

                tywx.UserInfo.sendOpenId = result.query.sendOpenId;

            }

            if (result.query && result.query.giftTypeId) {

                tywx.UserInfo.giftTypeId = result.query.giftTypeId;

            }

            

            


            
            tywx.NotificationCenter.trigger(tywx.EventType.GAME_SHOW, result);
            var hasUUID = tywx.Util.checkLocalUUID();



            if (query && query.shareid) {
                //进行相应的处理和记录
                tywx.ShareInfo.queryId = query.shareid;
                tywx.LOGD("fengbing", "========share id : " + tywx.ShareInfo.queryId);
            }
            var newUserFlag = hasUUID ? 1 : 0;
            if (query && query.gdt_vid && query.weixinadinfo) {
                //从广点通广告跳过来的，from的开头加入gdt标识区分
                var from = "gdt." + query.weixinadinfo;
                tywx.UserInfo.scene_param = from;

                tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeUserFrom, [scene, from, newUserFlag]);
            }
            else if (query && query.sourceCode) {
                //从小程序消息卡片中点入,该场景为"点击用户分享卡片进入游戏注册时，分享用户的user_id直接当做场景参数放在param02，param03和param04分别代表分享点id和分享图文id"
                //var query = "inviteCode="+ty.UserInfo.userId+"&sourceCode="+type +"&imageType="+imageMap.imageType+"&inviteName="+ty.UserInfo.userName;
                tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeUserFrom, [scene, query.shareid, query.sourceCode, query.imageType, "CardActive", newUserFlag]);
            } else {
                if (result.hasOwnProperty('path')) {
                    scenePath = result.path;
                }
                scenePath.replace(".html", "");     //生成时可能会在path后面添加.html
                scenePath = decodeURIComponent(scenePath);

                if (tywx.Util.isSceneQrCode(scene)) {
                    //从小程序码进入,相关见文档https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/qrcode.html

                    tywx.UserInfo.scene_param = scenePath;
                    tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeUserFrom, [scene, scenePath, newUserFlag]);
                } else {
                    // 小程序的appId
                    var appId = 0
                    if (result.referrerInfo && result.referrerInfo.appId) {
                        appId = result.referrerInfo.appId
                    }

                    //场景值和场景参数分别记录到可选参数param01和param02当中，如param01=1058，param02=tuyouqipai
                    //场景参数由项目组接入推广渠道时配置，如公众号dacihua、tuyouqipai，二维码填写企业或个人标识
                    tywx.BiLog.clickStat(tywx.clickStatEventType.clickStatEventTypeUserFrom, [scene, scenePath, newUserFlag, appId]);
                }
            }
            if (!tywx.isFristLogin) {
                tywx.isFristLogin = true;
                tywx.TuyooSDK.login();
            }

            if (tywx.IsWechatPlatform()) {
                wx.updateShareMenu({
                    withShareTicket: true
                });
            }

        });
    }
}

/**
 * 小程序进入后台
 */
wx.onHide(function () {

    tywx.UserInfo.scene_id = 0;
    tywx.StateInfo.isOnForeground = false;
    var date = new Date().getTime();
    tywx.LOGE('', "+++++++++++++++++onHide+++++++++++++++++");
    if (tywx.UserInfo.isShare == false) {
        tywx.NotificationCenter.trigger(tywx.EventType.GAME_HIDE);
    }

    // tywx.TCPClient.close();
});

var getNetSuccess = function (res) {
    if (res.hasOwnProperty('isConnected')) {
        tywx.StateInfo.networkConnected = res.isConnected;
    }
    else if (res.hasOwnProperty('errMsg')) {
        tywx.StateInfo.networkConnected = res.errMsg == 'getNetworkType:ok'
    }
    else {
        tywx.StateInfo.networkConnected = res.networkType != 'none';
    }

    tywx.StateInfo.networkType = res.networkType;//wifi,2g,3g,4g,none,unknown
};

wx.getNetworkType({
    success: getNetSuccess
});

wx.onNetworkStatusChange(getNetSuccess);

wx.onError(function (res) {
    // tywx.ErrorUploadInterface.uploadErrorLog(res.message);
});


tywx.WechatInterfaceInit();
