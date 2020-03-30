cc.Class({
    extends: cc.Component,

    properties: {
        isOpenGuide: false,
        curGuide: undefined,

    },


    guideEngine: function () {
        // if (!this.isOpenGuide) {
        //     return
        // }

        var guideList = miCfg.GuideCfg;
        if (this.curGuide) {
        }
        if (this.curGuide && this.curGuide.NextGuid) {  //

            for (var i = 0; i < guideList.length; i++) {
                if (guideList[i].guideId == this.curGuide.NextGuid) {
                    if (this.curGuide == undefined || this.curGuide.guideId != guideList[i].guideId) {
                        this.curGuide = guideList[i];
                        tywx.NotificationCenter.trigger(miDB.EVENT.OPEN_GUIDE, { params: guideList[i] });
                        tywx.BiLog.clickStat(miDB.BIEVENT.GUIDE_EVENT, [tywx.UserInfo.isNewPlayer, this.curGuide.guideId]);
                        if (guideList[i].event) {
                            tywx.NotificationCenter.trigger(guideList[i].event, guideList[i].EventData);

                        }

                        return
                    }

                }
            }
        }

        for (var i = 0; i < guideList.length; i++) {
            if (miDB.localData.game.reformNum > guideList[i].reform) {
                continue;
            }
            var guidInfo = this._checkCondition(guideList[i]);
            if (guidInfo) {
                if (this.curGuide == undefined || this.curGuide.guideId != guideList[i].guideId) {
                    this.curGuide = guideList[i];
                    tywx.NotificationCenter.trigger(miDB.EVENT.OPEN_GUIDE, { params: guideList[i] });
                    tywx.BiLog.clickStat(miDB.BIEVENT.GUIDE_EVENT, [tywx.UserInfo.isNewPlayer, this.curGuide.guideId]);
                    if (guideList[i].event) {
                        tywx.NotificationCenter.trigger(guideList[i].event, guideList[i].EventData);

                    }

                    return;
                }
            }
        }
        
        tywx.NotificationCenter.listen(miDB.EVENT.CLOSE_GUIDE);
    },

    _checkCondition: function (GuideInfo) {
        var conList = GuideInfo.condition
        var isPass = true


        for (var i = 0; i < conList.length; i++) {
            var action = conList[i].action

            if ("mansterCount" == action) {
                isPass = isPass && this._mansterCountJudge(conList[i])
            }
            if ("oneManster" == action) {
                isPass = isPass && this._oneMansterJudge(conList[i])
            }
            if ("coinCount" == action) {
                isPass = isPass && this._coinCountJudge(conList[i])
            }
            if ("masterModel" == action) {
                isPass = isPass && this._masterModelJudge(conList[i])
            }
            if ("autoSkill" == action) {
                isPass = isPass && this._oneAutoSkillJudge(conList[i])
            }
            if ("UI" == action) {
                isPass = isPass && this._uiIsOpen(conList[i])
            }
            if ("isFistTurnTable" == action) {
                isPass = isPass && this._turnTable(conList[i])
            }
            if ("feed" == action) {
                isPass = isPass && this.feed(conList[i])
            }
            if ("turnOpen" == action) {
                isPass = isPass && this._turnOpen(conList[i])
            }
        }

        if (isPass) {
            return GuideInfo;
        } else {
            return undefined;
        }
    },

    _turnOpen: function (condition) {

        var isOpen =miDB.GuidData.isFistTurnTable;
        if (isOpen == condition.isOpen) {
            return true;
        }
        return false;
    },


    feed: function (condition) {

        var isOpen = miDB.GuidData.isFeedOpen;
        if (isOpen == condition.isFeedOpen) {
            return true;
        }
        return false;
    },
    _turnTable: function (condition) {

        var isOpen = miDB.localData.game.isFistTurnTable;
        if (isOpen == condition.isCan) {
            return true;
        }
        return false;
    },

    _uiIsOpen: function (condition) {
        /**
         * action : "UI" ,
            uiTag : "isShopOpen" ,
            isOpen : true ,
         */
        var isOpen = miDB.GuidData.isShopOpen;
        if (isOpen == condition.isOpen) {
            return true;
        }
        return false;
    },
    _mansterCountJudge: function (condtionInfo) {
        /**
            aciton : "mansterCount" ,
            judge : "=" ,
            count : 0
        */
        var curCount = miDB.MasterData.getBuildListLength();
        if (this._judge(condtionInfo.judge, curCount, condtionInfo.count)) {
            return true;
        }
        return false;
    },

    _judge: function (judge, curNum, baseNum) {

        if (judge == ">") {
            if (Number(curNum) > Number(baseNum)) {
                return true;
            }
        } else if (judge == "<") {
            if (Number(curNum) < Number(baseNum)) {
                return true;
            }
        } else if (judge == "=") {
            if (Number(curNum) == Number(baseNum)) {
                return true;
            }
        }
        return false;
    },


    _oneMansterJudge: function (condtionInfo) {
        /**
         * aciton : "oneManster" ,
            mansterId : "1" ,
            judge : "=" ,
            level : 1
         */

        var level = miDB.MasterData.getMasterIndexLevel(condtionInfo.mansterId)
        if (this._judge(condtionInfo.judge, level, condtionInfo.level)) {
            return true;
        }
        return false;
    },
    _coinCountJudge: function (condtionInfo) {
        /**
         *  aciton : "coinCount" ,
            judge : "<" ,
            count : 10
         */


        var curCount = miDB.GameData.getDataBase().corn
        if (this._judge(condtionInfo.judge, curCount, condtionInfo.count)) {
            return true;
        }
        return false;

    },

    _oneAutoSkillJudge: function (condtionInfo) {
        /**
            action : "autoSkill" ,
            itemId : "0" ,
            isGet  : true ,
         */

        var isGet = miDB.autoGetSkill[Number(condtionInfo.itemId)];
        if (isGet == condtionInfo.isGet) {
            return true;
        }
        return false;
    },
    _masterModelJudge: function (condtionInfo) {
        /**
         *  aciton : "masterModel" ,
            type : "plant"
         */

        var curCount = miDB.GuidData.UEState
        if (curCount == condtionInfo.type) {
            return true
        }
        return false
    },

    _openGuideCallback: function (params) {
        mi.UIManager.showUI("GuideLayer", { ceng: 1000, guideInfo: params });
    },

    _closeGuideCallback: function (params) {
        mi.UIManager.hideUI("GuideLayer");
    },

    _nextGuideCallback: function (params) {

    },

    start: function () {

    },


    onLoad: function () {
        tywx.NotificationCenter.listen(miDB.EVENT.TOUCH_GUIDE_ENGINE, this.guideEngine, this);
        tywx.NotificationCenter.listen(miDB.EVENT.OPEN_GUIDE, this._openGuideCallback, this);
        tywx.NotificationCenter.listen(miDB.EVENT.CLOSE_GUIDE, this._closeGuideCallback, this);
        tywx.NotificationCenter.listen(miDB.EVENT.NEXT_GUIDE, this._nextGuideCallback, this);
    },

    onDestroy: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.TOUCH_GUIDE_ENGINE, this.guideEngine, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.OPEN_GUIDE, this._openGuideCallback, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.CLOSE_GUIDE, this._closeGuideCallback, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.NEXT_GUIDE, this._nextGuideCallback, this);
    },
});