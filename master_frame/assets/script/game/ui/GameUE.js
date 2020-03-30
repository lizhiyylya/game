
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "GameUE",

        rightNode: cc.Node,
        leftNode: cc.Node,
        bottomNode: cc.Node,

        reformNode: cc.Node,

        effect: cc.Node,
        audioBg: {
            default: null,
            type: cc.AudioClip
        },
        audioClick: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function () {
        this.effectNum = 0;
        this.current = cc.audioEngine.play(this.audioBg, true, 1);

        // cc.find("rightMenu",this.node).active = false
        // cc.find("bottomMenu",this.node).active = false
        // cc.find("leftMenu",this.node).active = false

        this.upModel = false;
        miDB.GuidData.UEState = (this.upModel == true) ? "levelUp" : "plant"

        tywx.NotificationCenter.listen(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, this.leftRightActive, this);
        tywx.NotificationCenter.listen(miDB.EVENT.RECYCLE_STATUS_UE, this.recycleActive, this);

     //   tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_OUT, this._gameFadeOutCallback, this);
       // tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_IN, this._gameFadeInCallback, this);

        tywx.NotificationCenter.listen(miDB.EVENT.REFORM_TIME_OVER, this._reformCountOver, this);

        tywx.NotificationCenter.listen(miDB.EVENT.UPDATE_FRIEND_HELP, this.notifyEffect, this);

        tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FREE_DIMA, this.showFreeDiam, this);

        tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_READ_POINT, this.mallReadPoint, this);

    },
    mallReadPoint: function (data) {
        if (data.action == "mallReadPoint") {
            cc.find("shop/readPoint", this.bottomNode).active = data.active;
        }
        else if (data.action == "npcReadPoint") {
            cc.find("friendHelp/readPoint", this.leftNode).active = data.active;
        }
        else if (data.action == "inviReadPoint") {
            cc.find("inviReward/readPoint", this.leftNode).active = data.active;
        }
        else if (data.action == "taskReadPoint") {
            cc.find("dailyTask/readPoint", this.rightNode).active = data.active;
        }
        else if (data.action == "handBookReadPoint") {
            cc.find("handbook/readPoint", this.bottomNode).active = data.active;
        }
        else if (data.action == "rewardReadPoint") {
            cc.find("loginReward/readPoint", this.rightNode).active = data.active;
        }
        else if (data.action == "turnReadPoint") {
            cc.find("turnPlate/readPoint", this.leftNode).active = data.active;
        }

        


    },

    showFreeDiam(data) {

        if (data.action == "show") {
            cc.find("freeDiam", this.rightNode).active = true;
        } else {
            cc.find("freeDiam", this.rightNode).active = false;
        }

    },



    _reformCountOver: function (params) {
        this.reformNode.runAction(cc.sequence(
            cc.moveBy(0.2, 0, 10),
            cc.moveBy(0.1, 0, -10),
            cc.delayTime(2)
        ).repeatForever())
        tywx.NotificationCenter.ignore(miDB.EVENT.REFORM_TIME_OVER, this._reformCountOver, this);
    },

    _gameFadeOutCallback: function (params) {
        if (miDB.SceneData.currPage == 1) {
            return;
        }

        var size = this.node.getContentSize()

        var moveToRight = cc.moveTo(0.2, cc.v2(150 + size.width / 2, 0))
        this.rightNode.runAction(cc.sequence(
            cc.callFunc(function () {

            }),
            moveToRight,
            cc.callFunc(function () {

            })
        ));

        var moveToLeft = cc.moveTo(0.2, cc.v2(-150 - size.width / 2, 0))
        this.leftNode.runAction(cc.sequence(
            cc.callFunc(function () {

            }),
            moveToLeft,
            cc.callFunc(function () {

            })
        ));

        var moveTobottom = cc.moveTo(0.2, cc.v2(0, -200 - size.height / 2))
        this.bottomNode.runAction(cc.sequence(
            cc.callFunc(function () {

            }),
            moveTobottom,
            cc.callFunc(function () {

            })
        ));
    },
    _gameFadeInCallback: function (params) {
        if (miDB.SceneData.currPage == 1) {
            return;
        }
        var size = this.node.getContentSize();
        this.rightNode.active = true;
        this.leftNode.active = true;
        this.bottomNode.active = true;
        var moveToRight = cc.moveTo(0.2, cc.v2(size.width / 2 - 30, 0));
        this.rightNode.runAction(cc.sequence(
            cc.callFunc(function () {

            }),
            moveToRight,
            cc.callFunc(function () {

            })
        ));

        var moveToLeft = cc.moveTo(0.2, cc.v2(- size.width / 2 + 30, 0))
        this.leftNode.runAction(cc.sequence(
            cc.callFunc(function () {

            }),
            moveToLeft,
            cc.callFunc(function () {

            })
        ));

        var moveTobottom = cc.moveTo(0.2, cc.v2(0, - size.height / 2 + 46))
        this.bottomNode.runAction(cc.sequence(
            cc.callFunc(function () {

            }),
            moveTobottom,
            cc.callFunc(function () {

            })
        ));
    },

    leftRightActive(data) {
        // console.log(data);

        if (data.action == "showAll") {
            cc.find("rightMenu", this.node).active = true;
            cc.find("leftMenu", this.node).active = true;
            cc.find("bottomMenu", this.node).active = true;
            cc.find("bottomMenu/handbook", this.node).active = true;
            cc.find("bottomMenu/feed", this.node).active = true;
            cc.find("bottomMenu/shop", this.node).active = true;
            if (miDB.localData.game.isFistTurnTable ==true)
            {
                cc.find("leftMenu/turnPlate", this.node).active = false;
            }
            else
            {
                cc.find("leftMenu/turnPlate", this.node).active = true;
            }

        } else if (data.action == "show") {
            if (miDB.localData.game.isFistTurnTable ==true)
            {
                cc.find("leftMenu/turnPlate", this.node).active = false;
            }
            else
            {
                cc.find("leftMenu/turnPlate", this.node).active = true;
            }
            cc.find("rightMenu", this.node).active = true;
            cc.find("leftMenu", this.node).active = true;
            if (data.node && data.node == "GAMEUE") {
                this.upModel = !this.upModel;
                miDB.GuidData.UEState = (this.upModel == true) ? "levelUp" : "plant"

                cc.find("bottomMenu/handbook", this.node).active = true;
                cc.find("bottomMenu/feed", this.node).active = true;
                cc.find("bottomMenu/shop", this.node).active = true;
            } else if (data.node && data.node == "GAMEUE1") {    // 引导 喂养 返回
                this.upModel = !this.upModel;
                miDB.GuidData.UEState = (this.upModel == true) ? "levelUp" : "plant";
                cc.find("rightMenu", this.node).active = false;
                cc.find("leftMenu", this.node).active = false;
                cc.find("bottomMenu", this.node).active = true;
                cc.find("bottomMenu/handbook", this.node).active = false;
                cc.find("bottomMenu/feed", this.node).active = true;
                cc.find("bottomMenu/shop", this.node).active = false;
            } else {
                // cc.find("bottomMenu", this.node).active = true;
            }

        } else if (data.action == "hide") {

            cc.find("rightMenu", this.node).active = false;
            cc.find("leftMenu", this.node).active = false;
            if (data.node && data.node == "GAMEUE") {
                cc.find("bottomMenu/handbook", this.node).active = false;
                cc.find("bottomMenu/feed", this.node).active = false;
                cc.find("bottomMenu/shop", this.node).active = false;
            } else {
                //   cc.find ("bottomMenu" ,this.node ).active =false;
            }
        } else if (data.action == "allHide") {
            cc.find("rightMenu", this.node).active = false;
            cc.find("leftMenu", this.node).active = false;
            cc.find("bottomMenu", this.node).active = false;
        } else if (data.action == "allHideFeed") {

            // this.upModel = !this.upModel;
            // miDB.GuidData.UEState = (this.upModel == true) ? "levelUp" : "plant"
            cc.find("rightMenu", this.node).active = false;
            cc.find("leftMenu", this.node).active = false;
            cc.find("bottomMenu", this.node).active = true;
            cc.find("bottomMenu/handbook", this.node).active = false;
            cc.find("bottomMenu/feed", this.node).active = true;
            cc.find("bottomMenu/shop", this.node).active = false;

        } else if (data.action == "allHideShop") {
            cc.find("rightMenu", this.node).active = false;
            cc.find("leftMenu", this.node).active = false;
            cc.find("bottomMenu", this.node).active = true;
            cc.find("bottomMenu/handbook", this.node).active = false;
            cc.find("bottomMenu/feed", this.node).active = false;
            cc.find("bottomMenu/shop", this.node).active = true;

        }
        if (data.action == "showAllTurn") {
            cc.find("rightMenu", this.node).active = true;
            cc.find("leftMenu", this.node).active = true;
            cc.find("bottomMenu", this.node).active = true;
            cc.find("bottomMenu/handbook", this.node).active = true;
            cc.find("bottomMenu/feed", this.node).active = true;
            cc.find("bottomMenu/shop", this.node).active = true;
            cc.find("leftMenu/turnPlate", this.node).active = true;
    

        } 


    },



    upGradeLayerShow() {
        cc.audioEngine.play(this.audioClick, false, 1);
        console.log("upGradeLayerShow");
        this.upModel = !this.upModel;
        if (this.upModel == true) {
            tywx.NotificationCenter.trigger(miDB.EVENT.GAME_MONSTER_MASK, { action: "show" });
            tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide", node: "GAMEUE" });

        } else {
            tywx.NotificationCenter.trigger(miDB.EVENT.GAME_MONSTER_MASK, { action: "resuse" });
            tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show", node: "GAMEUE" });
        }
        miDB.GuidData.UEState = (this.upModel == true) ? "levelUp" : "plant";
        miDB.GuidData.isFeedOpen = true;
        tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE);
    },

    wigthLayout(data) {
        this.node.getChildByName("gameUI_zhu").y = data.node.y + data.node.height / 2 + this.node.getChildByName("gameUI_zhu").height / 2 + 60;
    },



    start: function () {
        if (miDB.MasterData.getBuildListLength() < 6) {
            cc.find("rightMenu/reForm", this.node).active = false;
        } else {
            cc.find("rightMenu/reForm", this.node).active = true;
        }
        //tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE);

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            this.leftNode.scale = screenW / 720;
            this.rightNode.scale = screenW / 720;
        }



    },

    addTestTime(event, time) {

        miDB.MasterData.addTimeProduct(time);
    },

    update: function (dt) {
        //console.log("start");
    },
    rankBtnCallback: function () {
        tywx.NotificationCenter.trigger(miDB.EVENT.ACCULARATE_ALL_CORN_DATA, { time: 1 * 60 });
    },
    rewardBtnCallback: function () {
        tywx.NotificationCenter.trigger(miDB.EVENT.ACCULARATE_ALL_CORN_DATA, { time: 60 * 60 });
    },
    invaitBtnCallback: function () {
        tywx.NotificationCenter.trigger(miDB.EVENT.ACCULARATE_ALL_CORN_DATA, { time: 60 * 24 * 60 });
    },
    getCornBtnCallback: function () {
        // tywx.NotificationCenter.trigger(miDB.EVENT.GAIN_ALL_CORN_DATA);
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_BUILDING_ACTION, { index: "all" });
    },
    fristBtnCallback: function () {

        // 加速
        // tywx.NotificationCenter.trigger(miDB.EVENT.ACCULARATE_ALL_CORN_DATA,{time : 0}) 


    },
    //分享到群大家抢礼物 --wq


    buildingaBtnCallback: function () {

    },

    getFriendHelp() {
        cc.audioEngine.play(this.audioClick, false, 1);
        console.log("getFriendHelp");
        miDB.GameData.friendData();
        mi.UIManager.showUI("FriendHelp", { ceng: 50 });
    },

    getTaskSystem() {
        cc.audioEngine.play(this.audioClick, false, 1);
        console.log("getTaskSystem");
        mi.UIManager.showUI("TaskSystemModel", { ceng: 50 });
    },

    getFreeDiamond() {
        cc.audioEngine.play(this.audioClick, false, 1);
        console.log("getFreeDiamond");
        mi.UIManager.showUI("FreeDiamond", { ceng: 50 });
    },

    getRankList: function () {
        cc.audioEngine.play(this.audioClick, false, 1);
        console.log("获取排行榜");
        mi.UIManager.showUI("RankListModel", { ceng: 50 });
    },
    getReward: function () {
        cc.audioEngine.play(this.audioClick, false, 1);
        console.log("奖励");
        mi.UIManager.showUI("RewardModel", { ceng: 50 });
    },
    getInvi: function () {
        cc.audioEngine.play(this.audioClick, false, 1);
        console.log("邀请");
        //mi.UIManager.showUI("InviModel", { ceng: 50 });
        miDB.GameData.openInviData();
    },
    turnPlate: function () {
        cc.audioEngine.play(this.audioClick, false, 1);
        console.log("转盘");
        mi.UIManager.showUI("TurnPlateModel", { ceng: 50 });
    },
    getBuild: function () {
        cc.audioEngine.play(this.audioClick, false, 1);
        mi.UIManager.showUI("OutPutModel", { ceng: 50 });

    },
    getReForm() {
        cc.audioEngine.play(this.audioClick, false, 1);
        console.log("getReForm");

        if (miDB.MasterData.getBuildListLength() < 6) {
            tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "怪物数量小于6 无法回收！ " });
            return;
        }

        mi.UIManager.showUI("ReFormModel", { ceng: 50 });

    },

    getShop() {
        cc.audioEngine.play(this.audioClick, false, 1);
        mi.UIManager.showUI("MallModel", { ceng: 51 });
        miDB.GuidData.isShopOpen = true
        tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE)
    },

    getHandbook() {
        cc.audioEngine.play(this.audioClick, false, 1);
        mi.UIManager.showUI("HandbookModel", { ceng: 51 });
    },

    getSpeed: function () {
        cc.audioEngine.play(this.audioClick, false, 1);
        mi.UIManager.showUI("SpeedModel", { ceng: 50 });
    },

    getTest(target, data) {
        cc.audioEngine.play(this.audioClick, false, 1);
        if (data == "R") {
            cc.find("BuildingsModel", this.node.parent).getComponent("BuildingsModel").right();
        }
        else if (data == "L") {
            cc.find("BuildingsModel", this.node.parent).getComponent("BuildingsModel").left();
        }


    },

    recycleActive: function (params) {
        if (params.status) {

            if (miDB.MasterData.getBuildListLength() < 6) {

                cc.find("rightMenu/reForm", this.node).active = false;
            } else {
                cc.find("rightMenu/reForm", this.node).active = true;

            }
        }
    },

    notifyEffect: function (params) {
        this.effect.parent.active = miDB.friendsSkill > 1;
        if (this.effectNum != miDB.friendsSkill) {
            this.effectNum = miDB.friendsSkill;
            this.effect.getComponent(cc.Label).string = "收益X" + miDB.friendsSkill;
        }
    },

    onDestroy: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.CHANGE_GAME_UI, this.changeUICallback, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.RECYCLE_STATUS_UE, this.recycleActive, this);

      //  tywx.NotificationCenter.ignore(miDB.EVENT.GAMEUE_FADE_OUT, this._gameFadeOutCallback, this);
      //  tywx.NotificationCenter.ignore(miDB.EVENT.GAMEUE_FADE_IN, this._gameFadeInCallback, this);

        tywx.NotificationCenter.ignore(miDB.EVENT.REFORM_TIME_OVER, this._reformCountOver, this);

        tywx.NotificationCenter.ignore(miDB.EVENT.UPDATE_FRIEND_HELP, this.notifyEffect, this);


        cc.audioEngine.stop(this.current);
    }




});
