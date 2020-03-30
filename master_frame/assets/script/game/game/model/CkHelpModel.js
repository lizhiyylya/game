
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "CkHelpModel",
        allAdd: cc.Node,
        oneAdd: cc.Node
    },

    onLoad() {
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);
    },

    start() {

    },

    show(data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });

        miTools.Utils.layerOpenAction(cc.find("help_bg", this.node));

        this.allAdd.getComponent(cc.Label).string = (miTools.Utils.toLabelString(miTools.Utils.deMul(miTools.Utils.deMul(miDB.mineGainSkill, 100), miDB.GameData.DB.mine)) || 0) + "%";
        this.oneAdd.getComponent(cc.Label).string = (miTools.Utils.toLabelString(miTools.Utils.deMul(miDB.mineGainSkill, 100))) + "%";
    },

    update(dt) {

    },
    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.close();
        }

    },

    close: function () {
        mi.UIManager.hideUI("CkHelpModel", { ceng: 51 });
    },

    hide(data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    }
});
