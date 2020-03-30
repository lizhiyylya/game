
cc.Class({
    extends: cc.Component,

    properties: {

        uiType: 2,
        uiName: "OffLineModel",
        doubleButton: cc.Node,
        gainButton: cc.Node,
        doubleSprite: cc.Node
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // tywx.NotificationCenter.listen(miDB.EVENT.UPDATE_BOSS_TIME, this.closeBtnCallback, this);

        tywx.NotificationCenter.listen(miDB.EVENT.OPEN_GUIDE, this.closeBtnCallback, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            cc.find("offLineBg", this.node).scale = screenW / 720;

        }

    },
    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.closeBtnCallback();
        }

    },


    start() {


    },

    closeBtnCallback: function () {
        miDB.MasterData.getOffStorge(1);
        mi.UIManager.hideUI("OffLineModel", { ceng: 50 });
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });

   


    },

    lookScreenBtnCallback: function () {
        console.log("观看视屏");

    },
    offShareTwoSucc(data) {
        console.log(data);
        if (data.errMsg == "shareAppMessage:ok") {
            miDB.MasterData.getOffStorge(2);
            mi.UIManager.hideUI("OffLineModel", { ceng: 50 });
        }

    },
    offShareTwoFail(data) {
        console.log(data);
    },
    shareBtnCallback: function () {
        let that = this;
        console.log(" 分享");
        if (tywx.isInWeChatPath == false) {
            // miDB.MasterData.getOffStorge(2);
            // tywx.NotificationCenter.trigger(tywx.EventType.GAME_HIDE);
            // mi.UIManager.hideUI("OffLineModel", { ceng: 50 });
            this.doubleSprite.active = true;
            this.doubleButton.active = false;
            this.gainButton.active = true;
            cc.find("offLineBg/bt_close", that.node).active = false;
        } else {

            //拉起视频

            var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.OFF_LINE);
            var config = cofigInfo.config;
            config.shareTwoText = ["分享到群才能生效", "别总骚扰同一个群，换个群分享吧"];
            miTools.Utils.autoVideoThreeFive(config, function () {
                tywx.BiLog.clickStat(miDB.BIEVENT.OFFLINE_SHARE_DEBOULE, [tywx.UserInfo.isNewPlayer]);
                that.doubleSprite.active = true;
                that.doubleButton.active = false;
                that.gainButton.active = true;
                cc.find("offLineBg/bt_close", that.node).active = false;
            });



        }

    },

    gainDoubleReward: function () {
        miDB.MasterData.getOffStorge(2);
        mi.UIManager.hideUI("OffLineModel", { ceng: 50 });
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },

    show: function (data) {


        miTools.Utils.layerOpenAction(cc.find("offLineBg", this.node));

        var str = "0";
        for (var i = 0; i < miDB.MasterData.offLineCron.length; i++) {
            str = miTools.Utils.deAdd(miDB.MasterData.offLineCron[i], str).toString();
        }
        cc.find("offLineBg/layout/coinCount", this.node).getComponent(cc.Label).string = miTools.Utils.toLabelString(str);

        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });

        miTools.Ani.btnJumpAni(this.doubleButton)
        // this.doubleButton.runAction(cc.sequence(
        //     cc.delayTime(0.6),
        //     cc.spawn(
        //         cc.moveBy(0.2, 0, 20),
        //         cc.scaleTo(0.2, 1, 1.05),
        //     ),
        //     cc.spawn(
        //         cc.moveBy(0.15, 0, -20),
        //         cc.scaleTo(0.15, 1.05, 1),
        //     ),
        //     cc.scaleTo(0.05, 1, 1),
        //     cc.delayTime(0.1),
        //     cc.spawn(
        //         cc.moveBy(0.2, 0, 30),
        //         cc.scaleTo(0.2, 1, 1.1),
        //     ),
        //     cc.spawn(
        //         cc.moveBy(0.15, 0, -30),
        //         cc.scaleTo(0.15, 1.1, 1),
        //     ),
        //     cc.scaleTo(0.05, 1, 1),
        //     cc.delayTime(0.1),
        //     cc.spawn(
        //         cc.moveBy(0.2, 0, 40),
        //         cc.scaleTo(0.2, 1, 1.15),
        //     ),
        //     cc.spawn(
        //         cc.moveBy(0.15, 0, -40),
        //         cc.scaleTo(0.15, 1.15, 1),
        //     ),
        //     cc.scaleTo(0.05, 1, 1)
        // ).repeatForever());
    },
    itemSpBtnCallback(event, data) {
        var node = event.target;
        console.log(node.parent.usData);
    },
    hide: function (data) {
        console.log("hide");
        console.log(data);
    },



    // update (dt) {},
});
