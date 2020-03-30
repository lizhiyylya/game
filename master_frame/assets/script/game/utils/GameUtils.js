
window.Decimal = null;
miTools.Utils = {
    TAG: "Utils",
    spriteAtlasArray: [],
    game: undefined,
    shareBackAction: undefined,

    init: function (ab) {
        Decimal = ab;
        miTools.Utils.setExpPos(3);
        Decimal.set({ precision: 4 });
        tywx.NotificationCenter.listen(tywx.EventType.GAME_SHOW, this.onGameForeground, this);
    },
    destory: function () {
        tywx.NotificationCenter.ignore(tywx.EventType.GAME_SHOW, this.onGameForeground, this);
    },

    loadAtlas(path, name) {
        var url = path;
        var sprite = null;

    },

    loadSpriteAddHeight: function (target, path, name, parent) {
        var comSprite = target.getComponent(cc.Sprite);
        if (!comSprite) {
            console.log("not find cc.Sprite 组建");
        }
        var url = path;
        var sprite = null;
        for (var i = 0; i < miTools.Utils.spriteAtlasArray.length; i++) {
            if (miTools.Utils.spriteAtlasArray[i].key == url) {
                sprite = miTools.Utils.spriteAtlasArray[i].atlas.getSpriteFrame(name);
                break;
            }
        }
        if (sprite == null) {
            cc.loader.loadRes(url, cc.SpriteAtlas, function (err, atlas) {
                miTools.Utils.spriteAtlasArray.push({ key: url, atlas: atlas });
                sprite = atlas.getSpriteFrame(name);
                comSprite.spriteFrame = sprite;
                parent.height = target.height;
            });
        } else {

            comSprite.spriteFrame = sprite;
            parent.height = target.height;
        }

    },
    loadSpriteUrl: function (target, url) {

        var comSprite = target.getComponent(cc.Sprite);
        // console.log (url);
        // cc.loader.load(url, function (err, texture) {
        //     comSprite.spriteFrame.setTexture(texture); 
        // });

        if (url == undefined) {
            return;
        }

        cc.loader.load({ url: url, type: 'jpeg' }, function (err, texture) {
            if (!err) {
                comSprite.spriteFrame = new cc.SpriteFrame(texture);
            }
            else {
            }
        });


        // cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
        //     comSprite.spriteFrame = spriteFrame;
        // });

    },


    loadSprite: function (target, path, name) {

        var comSprite = target.getComponent(cc.Sprite);
        if (!comSprite) {
            console.log("not find cc.Sprite 组件");
        }
        var url = path;
        var sprite = null;
        for (var i = 0; i < miTools.Utils.spriteAtlasArray.length; i++) {
            if (miTools.Utils.spriteAtlasArray[i].key == url) {
                sprite = miTools.Utils.spriteAtlasArray[i].atlas.getSpriteFrame(name);
                break;
            }
        }
        if (sprite == null) {
            cc.loader.loadRes(url, cc.SpriteAtlas, function (err, atlas) {
                miTools.Utils.spriteAtlasArray.push({ key: url, atlas: atlas });
                sprite = atlas.getSpriteFrame(name);
                comSprite.spriteFrame = sprite;

            });
        } else {
            comSprite.spriteFrame = sprite;
        }
    },


    loadPrefab: function (path, callback) {
        //this._releaseResource(url, cc.Prefab);

        cc.loader.loadRes(path, function (err, prefab) {
            if (err) {
            } else {
                var node = cc.instantiate(prefab);
                callback(node)
            }
        });
    },

    loadLabel: function (target, url) {

        target.getComponent(cc.Label).string = url;

    },


    loadSpriteRes: function (target, url) {
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            target.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },

    loadSpriteFrame: function (path, name) {
        console.log("loadSpriteFrame");
        var url = path;
        var node = undefined;
        //this._releaseResource(url, cc.SpriteAtlas);
        cc.loader.loadRes(url, cc.SpriteAtlas, function (err, atlas) {
            //cc.loader.setAutoRelease(atlas, true);
            node = new cc.Node();
            node.position = cc.v2(0, 0);
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame(name);
        });
        return node;
    },


    _releaseResource: function (url, type) {
        var res = cc.loader.getRes(url, type);
        var all = cc.loader.getDependsRecursively(res);
        cc.loader.release(all);
    },

    createSprite: function (url) {
        var node = new cc.Node();
        var sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = new cc.SpriteFrame(cc.url.raw(url));
        return node;
    },

    decimal: function (value) {
        return new Decimal(value);
    },

    deAdd: function (x, y) {
        return Decimal.add(x, y);
    },

    deCeil: function (x) {
        return Decimal.ceil(x);
    },

    deFloor: function (x) {
        return Decimal.floor(x);
    },

    deLog: function (x) {
        console.log(x.toString());
    },

    deSub: function (x, y) {
        return Decimal.sub(x, y);
    },

    deGreaterOrEqual: function (x, y) {   // 大于等于
        return new Decimal(x).gte(y);
    },

    dePlus: function (x, y) {
        return new Decimal(x).plus(y);
    },

    deSqrt: function (x) {
        return Decimal.sqrt(x);
    },

    deSquare: function (x) {
        return new Decimal(x).times(x);
    },

    deTimes: function (x, y) {
        return new Decimal(x).times(y);
    },

    deMul: function (x, y) {
        return Decimal.mul(x, y);
    },

    deDividedBy: function (x, y) {
        return Decimal.div(x, y);
    },

    dividedToIntegerBy: function (x, y) {
        return new Decimal(x).dividedToIntegerBy(new Decimal(y));
    },

    dePower: function (x, y) {   // x 的 y 次方； 
        return new Decimal(x).toPower(y);
    },

    setExpPos: function (index) {
        Decimal.set({ toExpPos: index });
    },

    comparedTo: function (x, y) {

        var x1 = new Decimal(x);
        var y1 = new Decimal(y)

        return x1.comparedTo(y1);

    },

    toLabelString: function (str) {

        var e = new Decimal(str).e;
        str = miTools.Utils.deAdd(str, "0").toString();
        if (e >= 3) {
            var splitStr = str.split("e")[0];
            var unit = parseInt(e / 3);
            var mod = parseInt(e % 3);
            str = miTools.Utils.deDividedBy(miTools.Utils.deFloor(miTools.Utils.deMul(splitStr, Math.pow(10, mod + 2))), '100');
            str += miCfg.Master.unit[unit - 1];
        } else {
            // str = Math.floor(str * 100) / 100;
            str = parseInt(str);
        }
        return str;

    },

    gameSurplusTime(time) {
        var str = "";

        var hour = parseInt(time / (60 * 60));//计算小时数
        var afterHour = total - hour * 60 * 60;//取得算出小时数后剩余的秒数
        var min = parseInt(afterHour / 60);//计算整数分
        var afterMin = time - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数
        afterMin = parseInt(afterMin);
        str = hour + "小时" + min + "分";

        return str;

    },

    objectIsArray: function (value) {
        if (typeof Array.isArray === "function") {
            return Array.isArray(value);
        } else {
            return Object.prototype.toString.call(value) === "[object Array]";
        }
    },

    //banner广告
    openBannerAd: function (owner) {
        if (!tywx.interval)
            tywx.interval = 3000;
        var self = this;
        tywx.ad.createBannerAdOnBottom('adunit-70ca3ea03fa0b0d6');
        // tywx.Timer.setTimer(owner, this._createBanner, tywx.interval, cc.macro.REPEAT_FOREVER, 0);
    },
    _createBanner: function () {
        tywx.ad.createBannerAdOnBottom('adunit-70ca3ea03fa0b0d6');
    },
    destroyBannerAd: function (owner) {
        // tywx.Timer.cancelTimer(owner, this._createBanner);
        tywx.ad.bannerAdDestroy();
    },

    //min ≤ r < max
    RandomNum: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.floor(Rand * Range); //舍去
        return num;
    },

    //min ≤ r ≤ max
    RandomNumBoth: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    },

    //min < r ≤ max
    RandomNumMax: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        if (Math.round(Rand * Range) == 0) {
            return Min + 1;
        }
        var num = Min + Math.round(Rand * Range);
        return num;
    },

    //min < r < max
    RandomNumMin: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        if (Math.round(Rand * Range) == 0) {
            return Min + 1;
        } else if (Math.round(Rand * Max) == Max) {
            index++;
            return Max - 1;
        } else {
            var num = Min + Math.round(Rand * Range) - 1;
            return num;
        }
    },

    JSONLength: function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key))
                size++;
        }
        return size;
    },


    layerOpenAction: function (target) {

        var originScale = target.scale;
        target.stopAllActions();
        target.scale = originScale * 0.85;
        var scale2 = cc.scaleTo(0.2, originScale * 1.1);
        var scale3 = cc.scaleTo(0.05, originScale);

        target.runAction(cc.sequence(scale2, scale3));


    },




    jsonToPostData: function (fight) {
        var len = miTools.Utils.JSONLength(fight);

        console.log(fight);

        var agre = "";
        var index = 0;
        for (var key in fight) {


            if (typeof fight[key] == 'object') {
                agre += key + "=" + miFrame.EncodeDecode.base64Encode(JSON.stringify(fight[key]));
            } else {
                agre += key + "=" + fight[key];
            }




            if ((index + 1) < len) {
                agre += "&";
            }
            index++;
        }
        return agre;
    },
    /*
        分享信息
        */
    getShareConfigInfo: function (isMainUI, sharePointId) {
        var config = {

            "sharePicUrl": "res/raw-assets/shareImg.png",
            "shareContent": "@地球毁灭，人类迁移火星，能干嘛？",
            "sharePointId": sharePointId,
            "shareSchemeId": "035032",
            "extraAdd": [],
            "weight": 10

        }

        var isShowMorePic = true;
        // 状态
        var configArray = tywx.ShareInterface.shareConfigList || []
        var flag = (configArray.length >= 1);

        if (flag) {
            var shareList = []
            for (var i = 0; i < configArray.length; i++) {
                if (configArray[i].desc && configArray[i].desc != "") {
                    var list = configArray[i].desc.split("#")
                    for (var j = 0; j < list.length; j++) {
                        var pointList = list[j].split("$")
                        if (pointList[0] == sharePointId) {
                            shareList.push( JSON.parse(JSON.stringify(configArray[i])));
                        }
                    }
                }

            }
            if (shareList.length == 0) {
                shareList = JSON.parse(JSON.stringify(configArray));
            }
            config = shareList[Math.floor(shareList.length * Math.random())];
            config["sharePointId"] = sharePointId;
        }
        
        return { config: config, isShow: isShowMorePic };
    },

  






    autoVideoThreeFive: function (config, sucCallback, failCallback, tipsErrorCallabck) {
        var self = this
        var point = config.sharePointId;
        var data = tywx.LimiteHelper.getSecondeStatusByPoint(point);
        data.isDoubleShare = config.isDoubleShare;
        data.shareInfo = config.shareTwoText || ["别总骚扰同一个群，换个群分享吧！"];
        tywx.UserInfo.curShareModel = data;

        if (typeof (tywx.UserInfo.shareModelStrategyTime[point]) == "undefined") {
            tywx.UserInfo.shareModelStrategyTime[point] = 0;
        }
        if (typeof (config.strategyIndex) == "undefined") {
            config.strategyIndex ="isDefined";
            config.shareTimes=0;
            var strateCount = tywx.UserInfo.shareModelStrategyTime[point];
            if (typeof (strateCount) == "undefined") {

                tywx.UserInfo.shareModelStrategyTime[point] = 0;
            }
            data.status = data.strategy[tywx.UserInfo.shareModelStrategyTime[point]];
            if (tywx.UserInfo.shareModelStrategyTime[point] >= data.strategy.length) {
                data.status = data.strategy[data.strategy.length - 1];
       
            }
            tywx.UserInfo.shareModelStrategyTime[point]++;
           

        }
        config.shareTimes++;

        var sharePointCount = tywx.UserInfo.shareModelList[point];
        if (typeof (sharePointCount) == "undefined") {

            tywx.UserInfo.shareModelList[point] = 0
        }

        if (typeof (tywx.UserInfo.shareModelShareTime[point]) == "undefined") {
            tywx.UserInfo.shareModelShareTime[point] = 0

        }

        if (data.key == "NONE") {
            tywx.LOGE("不存在该分享 ，回去查代码！")
        }


        var completCallback = function () {

            if ( data.status == 7   )
            {
                if (config.shareTimes >=3)  // 两次弹框
                {
                    config.isDoubleShare = true;  
                }

            }
           else  if ( data.status == 6   )
            {
                if (config.shareTimes >=2)  // 两次弹框
                {
                    config.isDoubleShare = true;  
                }

            }else 
            {
                config.isDoubleShare = true;
            }
             
            self.autoVideoThreeFive(config, sucCallback, failCallback, completCallback)
            
        }

        if (data.status == 1 || data.status == 3 || data.status == 4 || data.status == 5 || data.status == 6 || data.status == 7 ) {

            //强制分享
           this.partForce(config, sucCallback, failCallback, completCallback)
            return;
        }



        
        tywx.ad.createRewardedVideoAd("adunit-70ca3ea03fa0b0d6", function () {
            if (sucCallback) {
                sucCallback()

            }

        }, function () {
            // if (tywx.UserInfo.cityLimited) {
            //     wx.showToast({ title: "今日观看视频次数已用完" });
            // } else {
            //     if (completCallback) {
            //         completCallback();
            //     }
            // }
            if (data.status ==0) {
                wx.showToast({ title: "视频次数已用完" });
            } else {
                this.partForce(config, sucCallback, failCallback, completCallback);
            }

        });
        
       // this.partForce(config, sucCallback, failCallback, completCallback);

    },


    partForce: function (config, sucCallback, failCallback, completCallback) {
        var self = this;
        var point = config.sharePointId;

        var data = tywx.LimiteHelper.getSecondeStatusByPoint(point);
        data.isDoubleShare = config.isDoubleShare;
        data.shareInfo = config.shareTwoText || ["别总骚扰同一个群，换个群分享吧！"];

        miTools.Utils.forceShare(config, function (res) {
            if (sucCallback) {
                var sharePointCount = tywx.UserInfo.shareModelList[point];
                if (sharePointCount) {
                    tywx.UserInfo.shareModelList[point]++
                } else {
                    tywx.UserInfo.shareModelList[point] = 0
                }
                tywx.UserInfo.shareModelShareTime[point]++;
                sucCallback(res)
            }
        }, function (res) {

            var shareText;
            if (tywx.UserInfo.shareModelShareTime[point] >= data.shareInfo.length) {
                shareText = data.shareInfo[data.shareInfo.length - 1];
            } else {
                shareText = data.shareInfo[tywx.UserInfo.shareModelShareTime[point]];
            }

            if (data.status ==6 || data.status ==7 )
            {
                if (data.shareInfo[config.shareTimes-1 ] )
                {
                    shareText = data.shareInfo[config.shareTimes-1 ];
                }
            

            }
            tywx.Util.wechatShowModal(shareText, false, "确定", function () {

                completCallback()
            }, function () {

            })

        });
    },




    /*
        forceShare 接口
        @param  inControl 1 只执行佳分享 2 只执行点击分享  3 通过标签控制
        @param  0 审核 1 加回调（3秒回调）  2 视频  3 点击回调  4 加回调2（0秒回调）
    */
    forceShare: function (config, sucCallback, failCallback, errorCallback) {
        var self = this
        if (config) {
            // var point = config.sharePointId;
            // var data = tywx.LimiteHelper.getSecondeStatusByPoint(point);
            // tywx.UserInfo.curShareModel = data;
            var shareAction = config.sharePointId;
            this.shareBackAction = shareAction;
            var inControl = config.inControl || 3;


            if (inControl == 1) {
                tywx.UserInfo.newShareTime = new Date().getTime()
                tywx.UserInfo.shareSucCallback = sucCallback
                tywx.UserInfo.shareFailCallback = failCallback

                shareAction = undefined

            } else if (inControl == 2) {
                tywx.UserInfo.newShareTime = -1 //分享时间
                tywx.UserInfo.shareSucCallback = undefined //成功的回调
                tywx.UserInfo.shareFailCallback = undefined //失败的回调

                shareAction = config.sharePointId
            } else if (inControl == 3) {
                var data = tywx.LimiteHelper.getSecondeStatusByPoint(shareAction)
                console.log("分享数据forceShare");
                console.log(data);
                if (data.status == 0) {

                    tywx.UserInfo.newShareTime = -1 //分享时间
                    tywx.UserInfo.shareSucCallback = undefined //成功的回调
                    tywx.UserInfo.shareFailCallback = undefined //失败的回调
                    shareAction = undefined

                } else if (data.status == 1) {

                    tywx.UserInfo.newShareTime = new Date().getTime()
                    tywx.UserInfo.shareSucCallback = sucCallback
                    tywx.UserInfo.shareFailCallback = failCallback
                    shareAction = undefined

                } else if (data.status == 2) {
                    tywx.UserInfo.newShareTime = new Date().getTime()
                    tywx.UserInfo.shareSucCallback = sucCallback
                    tywx.UserInfo.shareFailCallback = failCallback
                    shareAction = undefined
                } else if (data.status == 3) {

                    tywx.UserInfo.newShareTime = -1 //分享时间
                    tywx.UserInfo.shareSucCallback = undefined //成功的回调
                    tywx.UserInfo.shareFailCallback = undefined //失败的回调

                    shareAction = config.sharePointId

                } else if (data.status == 4) {

                    tywx.UserInfo.newShareTime = new Date().getTime()
                    tywx.UserInfo.shareSucCallback = sucCallback
                    tywx.UserInfo.shareFailCallback = failCallback

                    shareAction = undefined
                }

                else if (data.status == 5 || data.status == 6 || data.status == 7) {  //分享两次

                    tywx.UserInfo.newShareTime = new Date().getTime()
                    tywx.UserInfo.shareSucCallback = sucCallback
                    tywx.UserInfo.shareFailCallback = failCallback
                    shareAction = undefined
                }



            }

            // tywx.YuelaiSDK.checkSessionState(function(){

            tywx.ShareInterface.share(config.shareContent, config.sharePicUrl, config.sharePointId, config.shareSchemeId
                , function (result) {
                    // tywx.BiLog.clickStat(miDB.BIEVENT.MSG_RECEIPT, [miDB.BIEVENT.BTN_INCREASE,miDB.CONFIRM.SUCCESS]);
                    // tywx.LOGE("config -->> =",JSON.stringify(config))
                    // tywx.LOGE("ShareInterface -->> =",JSON.stringify(result))
                    // console.log("config -->> =",JSON.stringify(config));
                    // console.log("ShareInterface -->> =",JSON.stringify(result));
                    if (result.shareTickets && result.shareTickets[0]) {
                        wx.getShareInfo(
                            {
                                shareTicket: result.shareTickets[0],
                                success: function (result2) {
                                    if (result2) {
                                        //判断秘钥是否有用
                                        var iv = result2.iv;
                                        var encryptedData = result2.encryptedData;
                                        // tywx.LOGE("强制分享  -- ",JSON.stringify(result2))
                                        // tywx.LOGE("强制分享  -- ",iv)
                                        // tywx.LOGE("强制分享  -- ",encryptedData)
                                        // tywx.LOGE("强制分享  -- ",tywx.UserInfo.openId)
                                        var header = {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        };
                                        var configObj = {
                                            'url': tywx.SystemInfo.loginUrl + "word/getOpengId",
                                            'header': header,
                                            'postData': {
                                                iv: iv,
                                                encryptedData: encryptedData,
                                                openId: tywx.UserInfo.openid
                                            },
                                            'sucCallback': function (res) {


                                                var id = res.data;
                                                miDB.GameData.updateShareInfo()
                                                var existFlag = miDB.GameData.checkSharePointIsExist(id)


                                                if (!existFlag) {
                                                    tywx.NotificationCenter.trigger(miDB.EVENT.CHANGE_SHARE_INFO, [id])
                                                    if (sucCallback) {
                                                        sucCallback(res)
                                                    }
                                                } else {
                                                    if (failCallback) {
                                                        failCallback(res)
                                                    }
                                                }
                                            },
                                            'failCallback': function (res) {
                                                if (errorCallback) {
                                                    errorCallback(res)
                                                }
                                            }
                                        };
                                        tywx.HttpUtil.httpPost(configObj, configObj.sucCallback, configObj.failCallback);
                                    }
                                }
                            }
                        );
                    } else {
                        // tywx.BiLog.clickStat(miDB.BIEVENT.MSG_FORCESHARE, [miDB.BIEVENT.BTN_INCREASE,miDB.FORCESHARE.FAIL]);
                        wx.showToast({ title: "分享到群才有效" });
                    }

                }, function (res) {
                    if (errorCallback) {
                        errorCallback(res)
                    }
                }, config.sharePointName || undefined, config.extraAdd || undefined, shareAction || undefined, config.lifeTime || undefined, config.actionType);

            // })

        }
    },
    //分享佳回调
    //分享佳回调
    onGameForeground: function (result) {
        var oldtime = tywx.UserInfo.newShareTime
        var newtime = new Date().getTime()
        //分享两次分享回调
        if (tywx.UserInfo.doubleShareSucCallback) {
            tywx.UserInfo.doubleShareSucCallback()

            tywx.UserInfo.doubleShareSucCallback = undefined
            tywx.UserInfo.doubleShareFailCallback = undefined
        }
        if (tywx.UserInfo.curShareModel.status == 7|| tywx.UserInfo.curShareModel.status == 6||tywx.UserInfo.curShareModel.status == 5 || tywx.UserInfo.curShareModel.status == 2) {  //  状态 5 （2次）， 状态 2   视屏后两次 
            var count = tywx.UserInfo.shareModelList[tywx.UserInfo.curShareModel.key];
            var isDoubleShare = tywx.UserInfo.curShareModel.isDoubleShare;
            if (isDoubleShare) {
                if (tywx.UserInfo.shareSucCallback) {
                    tywx.UserInfo.shareSucCallback()
                    tywx.UserInfo.shareTimes++;
                    tywx.UserInfo.newShareTime = -1 //分享时间
                    tywx.UserInfo.shareSucCallback = undefined //成功的回调
                    tywx.UserInfo.shareFailCallback = undefined //失败的回调
                }
            }
            else {
                if (tywx.UserInfo.shareFailCallback) {
                    tywx.UserInfo.shareFailCallback()
                }
            }

            return;
        }




        //状态4  分享立刻获得
        if (tywx.UserInfo.curShareModel.status == 4) {

            if (tywx.UserInfo.shareSucCallback) {
                tywx.UserInfo.shareSucCallback()
                tywx.UserInfo.shareTimes++

                tywx.UserInfo.newShareTime = -1 //分享时间
                tywx.UserInfo.shareSucCallback = undefined //成功的回调
                tywx.UserInfo.shareFailCallback = undefined //失败的回调
                tywx.UserInfo.curShareModel = undefined
            }

            return
        }

        if (tywx.UserInfo.curShareModel == undefined) {
            tywx.LOGE(" 当前分享点不存在")
            return
        }


        var point = tywx.UserInfo.curShareModel.key;
        var count = tywx.UserInfo.shareModelList[point];

        if (typeof (point) == "undefined") {
            tywx.LOGE(" 当前分享点不存在")
            return;
        }

        var isDoubleShare = tywx.UserInfo.curShareModel.isDoubleShare;
        if (isDoubleShare) {
            if (tywx.UserInfo.shareSucCallback) {
                tywx.UserInfo.shareSucCallback()
            } else {
                tywx.LOGE(" share SucCallback is Null")
            }

            tywx.UserInfo.newShareTime = -1 //分享时间
            tywx.UserInfo.shareSucCallback = undefined //成功的回调
            tywx.UserInfo.shareFailCallback = undefined //失败的回调
            return
        }
  
        if (count == 0) {
            if (newtime - oldtime > 3 * 1000) {
                if (tywx.UserInfo.shareSucCallback) {
                    tywx.UserInfo.shareSucCallback()
                    tywx.UserInfo.shareTimes++

                    tywx.UserInfo.newShareTime = -1 //分享时间
                    tywx.UserInfo.shareSucCallback = undefined //成功的回调
                    tywx.UserInfo.shareFailCallback = undefined //失败的回调
                }
            } else {
                if (tywx.UserInfo.shareFailCallback) {
                    tywx.UserInfo.shareFailCallback()
                }
            }
        } else {
            if (newtime - oldtime > 5 * 1000) {
                if (tywx.UserInfo.shareSucCallback) {
                    tywx.UserInfo.shareSucCallback()
                    tywx.UserInfo.shareTimes++
                    tywx.UserInfo.newShareTime = -1 //分享时间
                    tywx.UserInfo.shareSucCallback = undefined //成功的回调
                    tywx.UserInfo.shareFailCallback = undefined //失败的回调
                }
            } else {
                if (tywx.UserInfo.shareFailCallback) {
                    tywx.UserInfo.shareFailCallback()
                }
            }
        }
    },
    /**
     * 标记别人从卡片点进来的事件 
     * 
     **/

    maskShareQunInfoCallback: function (config, sucCallback, failCallback) {
        var action = config.action

        if (!(this.shareBackAction && this.shareBackAction == action)) {
            return
        }
        this.shareBackAction = undefined
        var mustQun = config.mustQun || false
        tywx.YuelaiSDK.checkCardAction(action, function (query) {
            var shareTicket = query.shareTicket
            var actionType = query.actionType //分享动作触发对象范围   self 自己点击有效   other 别人点击生效  all 所有人点击都有效哦
            var openId = query.openId
            if (openId && actionType == "self") {
                if (openId != tywx.UserInfo.openid) {
                    return
                }
            } else if (openId && actionType == "other") {
                if (openId == tywx.UserInfo.openid) {
                    return
                }
            } else {

            }

            if (mustQun) {
                if (shareTicket != undefined && shareTicket != "") {
                    var id = shareTicket;
                    miDB.GameData.updateShareInfo()

                    var existFlag = miDB.GameData.checkSharePointIsExist(id)
                    if (!existFlag) {
                        tywx.NotificationCenter.trigger(miDB.EVENT.CHANGE_SHARE_INFO, [id])
                        if (sucCallback) {
                            sucCallback()
                        }
                    } else {
                        if (failCallback) {
                            failCallback()
                        }
                    }
                }
            } else {
                if (sucCallback) {
                    sucCallback()
                }
            }
        }, function () {

        })
    },


    getShareState: function () {
        if (tywx.UserInfo.cityLimited) {

        }
    },
    getFormateData: function () {
        var now = new Date()
        var year = now.getFullYear();
        var month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
        var date = now.getDate() >= 10 ? now.getDate() : "0" + (now.getDate());
        return year + "" + month + "" + date
    },
    // 多点之间动画移动 最少两个点
    culSpeedTime(speed, pos1, pos2) {
        var dist = pos2.sub(pos1).mag();
        return parseFloat(dist / speed);

    },
    runMovePosRetFever(speed, posArray, target) {
        var actionArrayPos = [];

        for (var i = 0; i < posArray.length; i++) {

            if (i == 0) {
                target.setPosition(posArray[i].x, posArray[i].y);
            } else {

                var time = this.culSpeedTime(speed, posArray[i - 1], posArray[i]);
                actionArrayPos.push(cc.moveTo(time, posArray[i].x, posArray[i].y));

            }

        }
        var len = posArray.length;
        var time = this.culSpeedTime(speed, cc.v2(posArray[len - 1].x, posArray[len - 1].y), cc.v2(posArray[0].x, posArray[0].y));
        actionArrayPos.push(cc.moveTo(time, posArray[0].x, posArray[0].y));
        target.runAction(cc.sequence(actionArrayPos).repeatForever());


    },



    //领取奖励
    gainRewardAnim(root, rewardList, nodeArray, callback, sprite) {
        let duration1 = 0;
        let duration2 = 0;
        let duration3 = 0;
        let duration4 = 0;
        let coinSprite = cc.find("Canvas/FirstModel/topMenu/money/coin");
        let pos = coinSprite.convertToWorldSpaceAR(coinSprite.getPosition());
        let mineSprite = cc.find("Canvas/FirstModel/topMenu/orc/coin");
        let pos2 = mineSprite.convertToWorldSpaceAR(mineSprite.getPosition());
        let diamondSprite = cc.find("Canvas/FirstModel/topMenu/diamond/coin");
        let pos3 = diamondSprite.convertToWorldSpaceAR(diamondSprite.getPosition());
        let bookSprite = cc.find("Canvas/GameUE/bottomMenu/handbook");
        let pos4 = bookSprite.convertToWorldSpaceAR(bookSprite.getPosition());
        for (let i = 0; i < rewardList.length; i++) {
            if (!sprite) {
                sprite = nodeArray[i].getChildByName("icon");
            }
            var worldPos = sprite.convertToWorldSpaceAR(sprite.getPosition())
            var resuPos = root.convertToNodeSpaceAR(worldPos);

            if (rewardList[i].type == "corn") {
                let icon1 = cc.instantiate(coinSprite);
                icon1.parent = root;
                // icon1.setPosition(cc.v2(resuPos.x, resuPos.y + sprite.height));
                icon1.setPosition(resuPos);
                duration1 = parseFloat(Math.sqrt((pos.y - worldPos.y) * (pos.y - worldPos.y) + (pos.x - worldPos.x) * (pos.x - worldPos.x)) / 1000) || 0;
                icon1.runAction(cc.sequence(
                    cc.moveBy(duration1, cc.v2(pos.x - worldPos.x, pos.y - worldPos.y)).easing(cc.easeIn(4.0)),
                    cc.fadeOut(),
                    cc.callFunc(function () {
                        tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获金币", type: 1 });
                        icon1.destroy();
                    })
                ));
            } else if (rewardList[i].type == "mine") {
                let icon2 = cc.instantiate(mineSprite);
                icon2.parent = root;
                icon2.setPosition(resuPos);
                duration2 = parseFloat(Math.sqrt((pos2.y - worldPos.y) * (pos2.y - worldPos.y) + (pos2.x - worldPos.x) * (pos2.x - worldPos.x)) / 1300) || 0;
                icon2.runAction(cc.sequence(
                    cc.moveBy(duration2, cc.v2(pos2.x - worldPos.x, pos2.y - worldPos.y)).easing(cc.easeIn(4.0)),
                    cc.fadeOut(),
                    cc.callFunc(function () {
                        tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获彩矿", type: 2 });
                        icon2.destroy();
                        // nodeArray.splice(i, 1);
                    })
                ));
            } else if (rewardList[i].type == "diamond") {
                let icon3 = cc.instantiate(diamondSprite);
                icon3.parent = root;
                icon3.setPosition(resuPos);
                duration3 = parseFloat(Math.sqrt((pos3.y - worldPos.y) * (pos3.y - worldPos.y) + (pos3.x - worldPos.x) * (pos3.x - worldPos.x)) / 1300) || 0;
                icon3.runAction(cc.sequence(
                    cc.moveBy(duration3, cc.v2(pos3.x - worldPos.x, pos3.y - worldPos.y)).easing(cc.easeIn(4.0)),
                    cc.fadeOut(),
                    cc.callFunc(function () {
                        tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获钻石", type: 3 });
                        icon3.destroy();
                        // nodeArray.splice(i, 1);
                    })
                ));
            } else if (rewardList[i].type == "chest") {
                let icon4 = cc.instantiate(sprite);
                miTools.Utils.loadSprite(icon4, "image/tplist/gameUiTwo", "gstj_icon_baoxiang");
                icon4.parent = root;
                icon4.setPosition(resuPos);
                duration4 = parseFloat(Math.sqrt((pos4.y - worldPos.y) * (pos4.y - worldPos.y) + (pos4.x - worldPos.x) * (pos4.x - worldPos.x)) / 1300) || 0;
                icon4.runAction(cc.sequence(
                    cc.moveTo(duration4, cc.v2(226, -515)).easing(cc.easeIn(4.0)),
                    cc.fadeOut(),
                    cc.callFunc(function () {
                        tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获信纸", type: 4 });
                        icon4.destroy();
                        //nodeArray.splice(i, 1);
                    })
                ));
            }
        }

        let duration = Math.max(duration1, duration2, duration3, duration4) * 1000 + 200;
        setTimeout(function () {
            if (callback) {
                callback();
            }
        }.bind(this), duration);
    },


};

