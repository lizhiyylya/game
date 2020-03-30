
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "FreeDiamond",
        audio: {
            default: null,
            type: cc.AudioClip
        },
        count: cc.Node,
        share: cc.Button,
        result: cc.Node,
        diamond: cc.Node
    },

    onLoad() {

        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            cc.find("help_bg", this.node).scale = screenW / 720;

        }
    },

    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.close();
        }

    },

    start() {
        this.diamondSprite = cc.find("Canvas/FirstModel/topMenu/diamond/coin");
        this.pos3 = this.diamondSprite.convertToWorldSpaceAR(this.diamondSprite.getPosition());
    },

    update(dt) {

    },

    show(data) {
        miTools.Utils.layerOpenAction(cc.find("help_bg", this.node));

        this.count.getComponent(cc.Label).string = "今日已领取：" + miDB.localData.game.freeDiamNum + "/5";
        if (miDB.localData.game.freeDiamNum > 5) {
            this.share.getComponent(cc.Button).enable = false;
        } else {
            this.share.getComponent(cc.Button).enable = true;
        }
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });
    },

    shareToOthers: function () {
        cc.audioEngine.play(this.audio, false, 1);
        // console.log("分享领取");
        let that = this;
        // that.result.active = true;
        if (tywx.isInWeChatPath) {


            var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.FREE_DIAM);
            var config = cofigInfo.config;
            // miTools.Utils.autoVideo(config, function () {
            //     mi.UIManager.showUIParent("AwardModel", JSON.stringify([{ "num": 10, "type": "diamond" }]), that.node);
            //     tywx.BiLog.clickStat(miDB.BIEVENT.FREE_DIAMOND, [tywx.UserInfo.isNewPlayer]);
            // }, function () {

            //     miTools.Utils.forceShare(config, function (res) {
            //         mi.UIManager.showUIParent("AwardModel", JSON.stringify([{ "num": 10, "type": "diamond" }]), that.node);
            //         tywx.BiLog.clickStat(miDB.BIEVENT.FREE_DIAMOND, [tywx.UserInfo.isNewPlayer]);
            //         wx.showToast({ title: "分享成功" });
            //     }, function (res) {
            //         wx.showToast({ title: "分享失败" });
            //     });
                
            // });

            config.shareTwoText =["分享到群才能生效","别总骚扰同一个群，换个群分享吧"];
            miTools.Utils.autoVideoThreeFive(config, function () {
                mi.UIManager.showUIParent("AwardModel", JSON.stringify([{ "num": 10, "type": "diamond" }]), that.node);
                tywx.BiLog.clickStat(miDB.BIEVENT.FREE_DIAMOND, [tywx.UserInfo.isNewPlayer]);
            })



        } else {
            mi.UIManager.showUIParent("AwardModel", JSON.stringify([{ "num": 10, "type": "diamond" }]), that.node);
            // that.result.active = true;
            // miTools.Utils.layerOpenAction(that.result.getChildByName("rewrad"));
            // var ttime = new Date(miDB.localData.systime * 1000);
            // ttime.setSeconds(ttime.getSeconds() + 1800);
            // miDB.GameData.addDiamCallback(10);
            // miDB.localData.game.freeDiamTime = Date.parse(ttime) / 1000;
            // miDB.localData.game.freeDiamNum = miDB.localData.game.freeDiamNum + 1;
            // miDB.GameData.setLocalDataLock();
            // mi.UIManager.hideUI("FreeDiamond", { ceng: 50 });
        }
    },

    gainReward: function () {
        let that = this;
        let sprite = this.diamond;
        var worldPos = sprite.convertToWorldSpaceAR(sprite.getPosition())
        var resuPos = this.node.convertToNodeSpaceAR(worldPos);
        let icon3 = cc.instantiate(this.diamondSprite);
        icon3.parent = this.node;
        icon3.setPosition(resuPos);
        let duration3 = parseFloat(Math.sqrt((that.pos3.y - worldPos.y) * (that.pos3.y - worldPos.y) + (that.pos3.x - worldPos.x) * (that.pos3.x - worldPos.x)) / 1300);
        icon3.runAction(cc.sequence(
            cc.callFunc(function () {
                that.diamond.active = false;
            }),
            // cc.moveTo(duration3, that.diamondPos).easing(cc.easeIn(4.0)),
            cc.moveBy(duration3, cc.v2(that.pos3.x - worldPos.x, that.pos3.y - worldPos.y)).easing(cc.easeIn(4.0)),
            cc.fadeOut(),
            cc.callFunc(function () {
                tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获钻石", type: 3 });
                icon3.destroy();
                that.result.active = false;
                var ttime = new Date(miDB.localData.systime * 1000);
                ttime.setSeconds(ttime.getSeconds() + 1800);
                miDB.GameData.addDiamCallback(10);
                miDB.localData.game.freeDiamTime = Date.parse(ttime) / 1000;
                miDB.localData.game.freeDiamNum = miDB.localData.game.freeDiamNum + 1;
                miDB.GameData.setLocalDataLock();
                mi.UIManager.hideUI("FreeDiamond", { ceng: 50 });
                tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
            })
        ));
    },

    notifyDataChanged: function () {
        var ttime = new Date(miDB.localData.systime * 1000);
        ttime.setSeconds(ttime.getSeconds() + 1800);
        miDB.GameData.addDiamCallback(10);
        miDB.localData.game.freeDiamTime = Date.parse(ttime) / 1000;
        miDB.localData.game.freeDiamNum = miDB.localData.game.freeDiamNum + 1;
        miDB.GameData.setLocalDataLock();
        mi.UIManager.hideUI("FreeDiamond", { ceng: 50 });
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },

    close: function () {
        mi.UIManager.hideUI("FreeDiamond", { ceng: 50 });
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    }
});
