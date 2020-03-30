

cc.Class({
    extends: cc.Component,

    properties: {

        uiType: 2,
        uiName: "ReFormModel",
        partAtlas: cc.SpriteAtlas,
        countdown: cc.Label,
        diamondBtn: cc.Node,
        particle: cc.Node
    },



    onLoad: function () {
        tywx.NotificationCenter.listen(miDB.EVENT.REFORM_TIME_UPDATE, this._reformTimeUpdateCallback, this);
        tywx.NotificationCenter.listen(miDB.EVENT.MONSTER_REFORM_FINISH, this.reformAnimFinish, this);

        this.sprite = cc.find("Canvas/FirstModel/topMenu/orc/light");
        var pos = this.sprite.convertToWorldSpaceAR(this.sprite.getPosition())
        this.pos2 = cc.find("Canvas/FirstModel").convertToNodeSpaceAR(pos);

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            cc.find("soldLayout", this.node).scale = screenW / 720;
            cc.find("cllNode", this.node).scale = screenW / 720;
            cc.find("resultNode/resultLayout", this.node).scale = screenW / 720;
        }
    },
    ondDestory: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.REFORM_TIME_UPDATE, this._reformTimeUpdateCallback, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.MONSTER_REFORM_FINISH, this.reformAnimFinish, this);
    },

    start() {

        this.reshUI();
    },

    //刷新 倒计时
    _reformTimeUpdateCallback: function (countDownTime) {

        if (countDownTime <= 0) {
            this.countdown.node.parent.active = false;
        } else {
            this.countdown.node.parent.active = true;

            var time = Number(countDownTime) / 1000;
            var hour = Math.floor(time / 3600);
            var min = Math.floor(Math.floor(time % 3600) / 60);
            var second = Math.floor((time % 3600) % 60);
            this.countdown.string = this.formatNum(hour) + "h" + this.formatNum(min) + "m" + this.formatNum(second) + "s后到达";
        }
    },

    formatNum: function (num) {
        return parseInt(num) < 10 ? "0" + num : num;
    },

    quickCall() {
        console.log("quickCall");
        if (this.countdown.node.parent.active == true) {
            cc.find("cllNode", this.node).active = true;
            miTools.Utils.layerOpenAction(cc.find("cllNode/cllLayout", this.node));
            //this.admShowResult();
        } else {
            this.ShowResult();
        }


        // cc.find("soldLayout",this.node).active =false;

    },
    reshUI() {


        this.reFromNum = miCfg.Master.getReFromGold();
        cc.find("soldLayout", this.node).active = true;
        cc.find("soldLayout/img/upnum", this.node).getComponent(cc.Label).string = "+" + (miTools.Utils.toLabelString(this.reFromNum) || 0);
        // console.log(this.reFromNum);

        cc.find("cllNode", this.node).active = false;
        cc.find("resultNode", this.node).active = false;
    },
    show(data) {

        if (typeof (this.reFromNum) != "undefined") {
            this.reshUI();
        }

        if (cc.find("soldLayout", this.node).active) {
            miTools.Utils.layerOpenAction(cc.find("soldLayout", this.node));
        }
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });

        var diamond = miDB.GameData.getItemByName("diamond");
        var isPrice = miTools.Utils.comparedTo(diamond, 50);
        if (isPrice < 0) {
            // tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "钻石不足，无法回收！ " });
            miTools.Utils.loadSprite(this.diamondBtn, "image/tplist/gameUiTwo", "ui_ty_bt_1_2");
            return;
        }
    },


    ShowResult() // 
    {
        cc.find("cllNode", this.node).active = false;
        cc.find("soldLayout", this.node).active = false;
        this.node.active = false;
        tywx.NotificationCenter.trigger(miDB.EVENT.MONSTER_REFORM_START, { action: "start" });

    },

    admShowResult() {
        var self = this
        var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.RECOVERY);
        var config = cofigInfo.config;

        // miTools.Utils.autoVideo(config, function () {

        //     self.admShowHandler()

        // }, function () {

        //     miTools.Utils.forceShare(config, function (res) {
        //         self.admShowHandler()
        //     }, function (res) {
        //         wx.showToast({ title: "请分享给不同的群友哦！" });
        //     });


        // });


        config.shareTwoText = ["分享到群才能生效", "别总骚扰同一个群，换个群分享吧"];
        miTools.Utils.autoVideoThreeFive(config, function () {
            self.admShowHandler();
        })





    },

    admShowHandler: function () {

        tywx.BiLog.clickStat(miDB.BIEVENT.REFORM_SUCCESS, [tywx.UserInfo.isNewPlayer]);
        cc.find("cllNode", this.node).active = false;
        cc.find("soldLayout", this.node).active = false;
        this.node.active = false;
        tywx.NotificationCenter.trigger(miDB.EVENT.MONSTER_REFORM_START, { action: "start" });
    },

    showResult() {
        var diamond = miDB.GameData.getItemByName("diamond");
        var isPrice = miTools.Utils.comparedTo(diamond, 50);
        if (isPrice < 0) {
            // tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "钻石不足，无法回收！ " });
            miTools.Utils.loadSprite(this.diamondBtn, "image/tplist/gameUiTwo", "ui_ty_bt_1_2");
            return;
        } else {
            miTools.Utils.loadSprite(this.diamondBtn, "image/tplist/gameUiTwo", "ui_ty_bt_1");
        }
        tywx.BiLog.clickStat(miDB.BIEVENT.REFORM_COIN_SUCCESS, [tywx.UserInfo.isNewPlayer]);
        miDB.GameData.costDiamCallback(50);
        cc.find("cllNode", this.node).active = false;
        cc.find("soldLayout", this.node).active = false;
        this.node.active = false;
        tywx.NotificationCenter.trigger(miDB.EVENT.MONSTER_REFORM_START, { action: "start" });
    },

    reformAnimFinish: function (params) {
        this.node.active = true;
        // mi.UIManager.showUI("ReFormModel", { ceng: 50 });
        miDB.MasterData.reForm();
        miDB.GameData.addTaskNum("refrom", 1); // 增加任务数量
        cc.find("cllNode", this.node).active = false;
        cc.find("soldLayout", this.node).active = false;
        cc.find("resultNode", this.node).active = true;
        miTools.Utils.layerOpenAction(cc.find("resultNode", this.node));

        cc.find("resultNode/resultLayout/title_bg/title", this.node).getComponent(cc.Label).string = "第" + miDB.localData.game.reformNum + "次收益";
        cc.find("resultNode/resultLayout/num", this.node).getComponent(cc.Label).string = (miTools.Utils.toLabelString(miTools.Utils.deMul(miTools.Utils.deMul(miDB.mineGainSkill, 100), miDB.GameData.DB.mine)) || 0) + "%";

        this.particle.getComponent(cc.ParticleSystem).resetSystem();
    },

    closeCall() {
        cc.find("cllNode", this.node).active = false;
        // cc.find("soldLayout",this.node).active =true;
    },
    close() {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
        mi.UIManager.hideUI("ReFormModel", { ceng: 50 });
    },

    newSeason() {
        let that = this;
        let num = cc.find("resultNode/resultLayout/num", this.node);
        let num2 = cc.instantiate(num);
        num2.parent = num.parent;
        this.particle.getComponent(cc.ParticleSystem).stopSystem();
        num2.runAction(cc.sequence(
            cc.spawn(
                cc.scaleTo(0.4, 1.3),
                cc.moveBy(0.4, 0, -30).easing(cc.easeOut(2))
            ),
            cc.spawn(
                cc.sequence(
                    cc.scaleTo(0.2, 1.4),
                    cc.scaleTo(0.4, 0.7),
                ),
                cc.moveTo(0.6, that.pos2).easing(cc.easeIn(3))
            ),
            cc.fadeOut(0.01),
            cc.callFunc(function () {
                mi.UIManager.hideUI("ReFormModel", { ceng: 50 });
                tywx.NotificationCenter.trigger(miDB.EVENT.MINE_ADD_ANIM, { action: "play" });
                tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
            })
        ));
    },

    hide(data) {
        // console.log("hide");
    },

    update(dt) {
        cc.find("particle", this.node).getComponent(cc.ParticleSystem).spriteFrame = this.partAtlas.getSpriteFrame("cd_bg_" + miTools.Utils.RandomNumBoth(1, 4));
    },
});
