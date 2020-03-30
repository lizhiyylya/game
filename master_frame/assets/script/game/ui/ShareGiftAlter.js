
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "ShareGiftAlter",
        icon: cc.Node,
        count: cc.Node
    },

    onLoad: function () {
        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
           this.node. getChildByName ("bg") .scale = screenW / 720;
             }

        tywx.NotificationCenter.listen(miDB.EVENT.GET_GIFT_CLOSE_UI, this.closeBtnCallback, this);
    },

    onDestroy: function () {

    },
    show: function (params) {
        this.typeId = params.id;
        cc.find("bg/left", this.node).getComponent(cc.Animation).play();
        cc.find("bg/right", this.node).getComponent(cc.Animation).play();

        if (params) {
            if (params.type == "mine") {
                miTools.Utils.loadSprite(this.icon, "image/tplist/gameUiTwo", "hbxx_icon_ck");
            } else if (params.type == "diamond") {
                miTools.Utils.loadSprite(this.icon, "image/tplist/gameUiTwo", "ui_icon_zs");
            } else if (params.type == "corn") {
                miTools.Utils.loadSprite(this.icon, "image/tplist/gameUiTwo", "ui_icon_jb");
            } else if (params.type == "chest") {
                miTools.Utils.loadSprite(this.icon, "image/tplist/gameUiTwo", "ui_icon_bx");
            }
            this.count.getComponent(cc.Label).string = "x" + params.num;
        }
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });
    },

    closeBtnCallback: function () {
        mi.UIManager.hideUI(this.uiName);
    },

    refreshUI: function () {

    },

    shareToQunBtnCallback: function () {
        console.log("shareToQunBtnCallback");

        var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.SHAER_GIFT);
        var config = cofigInfo.config;
        var data = miDB.GameData.getGift();
        tywx.ShareInterface.share(config.shareContent, config.sharePicUrl, config.sharePointId, config.shareSchemeId
            , function (result) {
            }, function (res) {
            }, null, "openGift&messageCartTime=" + data.messageCartTime + "&sendOpenId=" + tywx.UserInfo.openid + "&giftTypeId=" + this.typeId);

    },

    close: function () {
        mi.UIManager.hideUI(this.uiName);
    },

    hide(data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },
});

