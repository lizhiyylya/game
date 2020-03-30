
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "CoinHelpModel",
        content: cc.Node,
        itemPrefab: cc.Prefab,
        rewardNum: cc.Node
    },

    onLoad() {
        for (let i = 0; i < miCfg.Master.unit.length; i++) {
            let item = cc.instantiate(this.itemPrefab);
            item.getChildByName("word").getComponent(cc.Label).string = miCfg.Master.unit[i];
            item.getChildByName("count").getComponent(cc.Label).string = (i + 1) * 3 + "个零";
            this.content.addChild(item);
        }
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);
    },
    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.close();
        }

    },


    start() {

    },

    update(dt) {

    },

    close: function () {
        this.content.parent.parent.getComponent(cc.ScrollView).scrollToTop();
        mi.UIManager.hideUI("CoinHelpModel", { ceng: 51 });
    },

    show: function (data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });

        miTools.Utils.layerOpenAction(cc.find("help_bg", this.node));

        this.rewardNum.getComponent(cc.Label).string = miTools.Utils.toLabelString(miDB.localData.game.todayGetCron);
    },

    hide(data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    }
});
