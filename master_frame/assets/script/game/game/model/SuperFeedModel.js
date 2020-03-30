
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "SuperFeedModel",
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
           this.node. getChildByName ("bg") .scale = screenW / 720;
        }
    },

    start() {

    },

    update(dt) {
    },

    onDestroy() {

    },

    show(data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });

        cc.find("bg/left", this.node).getComponent(cc.Animation).play();
        cc.find("bg/right", this.node).getComponent(cc.Animation).play();
    },

    watchVideo() {
        let that = this;
        if (miDB.localData.game.superFeedTime == "null") {

        }
        console.log("看小视频");
        if (tywx.isInWeChatPath) {
            //拉起视频
            var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.SUPER_FEED);
            var config = cofigInfo.config;
            // miTools.Utils.autoVideo(config, function () {
            //     tywx.BiLog.clickStat(miDB.BIEVENT.SUPER_FEED, [tywx.UserInfo.isNewPlayer]);
            //     mi.UIManager.hideUI("SuperFeedModel", { ceng: 50 });
            //     tywx.NotificationCenter.trigger(miDB.EVENT.SUPER_FEED_CALL, { result: "success" });
            // }, function () {
            //     miTools.Utils.forceShare(config, function (res) {
            //         tywx.BiLog.clickStat(miDB.BIEVENT.SUPER_FEED, [tywx.UserInfo.isNewPlayer]);
            //         mi.UIManager.hideUI("SuperFeedModel", { ceng: 50 });
            //         tywx.NotificationCenter.trigger(miDB.EVENT.SUPER_FEED_CALL, { result: "success" });
            //     }, function (res) {
            //         wx.showToast({ title: "分享失败" });
            //     });
            // });
            config.shareTwoText =["分享到群才能生效","别总骚扰同一个群，换个群分享吧"];
            miTools.Utils.autoVideoThreeFive(config, function () {
                tywx.BiLog.clickStat(miDB.BIEVENT.SUPER_FEED, [tywx.UserInfo.isNewPlayer]);
                mi.UIManager.hideUI("SuperFeedModel", { ceng: 50 });
                tywx.NotificationCenter.trigger(miDB.EVENT.SUPER_FEED_CALL, { result: "success" });
            })



        } else {
            mi.UIManager.hideUI("SuperFeedModel", { ceng: 50 });
            tywx.NotificationCenter.trigger(miDB.EVENT.SUPER_FEED_CALL, { result: "success" });
            // let count = miDB.MasterData.getTimeProduct(3600);
            // mi.UIManager.showUIParent("AwardModel", JSON.stringify([{ "num": count, "type": "corn" }]), that.node);
            // miDB.MasterData.addTimeProduct(3600);
            // var ttime = new Date(miDB.localData.systime * 1000);
            // ttime.setSeconds(ttime.getSeconds() + 3600);
            // miDB.localData.game.superFeedTime = Date.parse(ttime) / 1000;
        }
    },

    notifyDataChanged: function () {
        miDB.MasterData.addTimeProduct(1800);
        var ttime = new Date(miDB.localData.systime * 1000);
        ttime.setSeconds(ttime.getSeconds() + 3600);
        miDB.localData.game.superFeedTime = Date.parse(ttime) / 1000;
        mi.UIManager.hideUI("SuperFeedModel", { ceng: 50 });
    },

    close() {
        
        mi.UIManager.hideUI("SuperFeedModel", { ceng: 50 });
    },

    hide(data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },
});
