

cc.Class({
    extends: cc.Component,

    properties: {

        uiType: 2,
        uiName: "TaskSystemModel",
        content: cc.Node,
        MallItem: cc.Prefab,
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.MallItemArray = [];
        this.diamondSprite = cc.find("Canvas/FirstModel/topMenu/diamond/coin");
        this.pos3 = this.diamondSprite.convertToWorldSpaceAR(this.diamondSprite.getPosition());
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);


        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            cc.find("game_Layer_LoginBg", this.node).scale = screenW / 720;

        }
    },

    start() {
        this.getData();
    },

    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.close();
        }

    },

    reshTaskButton(event) {
        cc.audioEngine.play(this.audio, false, 1);

        // console.log("reshTaskButton");
        var node = event.target;
        var index = node.parent.usData;
        var data = miDB.GameData.getTask(index);


        if (data.statue == 0 && data.reshNum == 0) {
            miCfg.task.getExchangeTask(data.index);
            console.log(" 任务刷新已完成");
            this.getData();
            miDB.GameData.setLocalDataLock();
            console.log(index)
            console.log(data)
            tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_NOTICE_TIPS, { desc: "任务已刷新", altas: "image/tplist/gameLayer", icon: miCfg.task[index].taskIcon });
        }



    },



    getData() {
        for (var i = 0; i < miDB.localData.task.length; i++) {

            var index = miDB.localData.task[i].index;

            var checkData = miCfg.task[index];
            if (!this.MallItemArray[i]) {
                var node = cc.instantiate(this.MallItem);
                node.parent = this.content;
                this.MallItemArray.push(node);
                this.buttonBind(node.getChildByName("resh").getComponent(cc.Button));
                this.buttonBind(node.getChildByName("content").getChildByName("getReward").getComponent(cc.Button));
            }

            this.MallItemArray[i].usData = index;


            cc.find("title", this.MallItemArray[i]).getComponent(cc.Label).string = checkData.dec;
            cc.find("content/rewardNum", this.MallItemArray[i]).getComponent(cc.Label).string = "x" + checkData.rewardNum;
            let count = Math.min(miDB.localData.task[i].num, checkData.num);
            cc.find("content/progress", this.MallItemArray[i]).getComponent(cc.Label).string = count + "/" + checkData.num;
            cc.find("content/progressBar", this.MallItemArray[i]).getComponent(cc.ProgressBar).progress = parseFloat(miDB.localData.task[i].num / checkData.num);

            miTools.Utils.loadSprite(cc.find("content/icon_bg/icon", this.MallItemArray[i]), "image/tplist/gameUiTwo", checkData.taskIcon);

            if (miDB.localData.task[i].statue == 1) {
                this.MallItemArray[i].getChildByName("resh").active = false;
                miTools.Utils.loadSprite(cc.find("content/getReward", this.MallItemArray[i]), "image/tplist/gameUiTwo", "ui_ty_bt_1_2");
                cc.find("content/getReward/sprite", this.MallItemArray[i]).getComponent(cc.Label).string = "已领取";
            } else {
                if (miDB.localData.task[i].reshNum == 1) {
                    this.MallItemArray[i].getChildByName("resh").active = false;
                } else {
                    this.MallItemArray[i].getChildByName("resh").active = true;
                }
                if (Number(miDB.localData.task[i].num) >= Number(checkData.num)) {
                    // cc.find("content/getReward", this.MallItemArray[i]).active = true;
                    cc.find("content/getReward", this.MallItemArray[i]).getComponent(cc.Button).enabled = true;
                    miTools.Utils.loadSprite(cc.find("content/getReward", this.MallItemArray[i]), "image/tplist/gameUiTwo", "ui_ty_bt_1");
                    cc.find("content/getReward/sprite", this.MallItemArray[i]).getComponent(cc.Label).string = "领取";

                } else {
                    // cc.find("content/getReward", this.MallItemArray[i]).active = false;
                    cc.find("content/getReward", this.MallItemArray[i]).getComponent(cc.Button).enabled = false;
                    miTools.Utils.loadSprite(cc.find("content/getReward", this.MallItemArray[i]), "image/tplist/gameUiTwo", "ui_ty_bt_1_2");
                    cc.find("content/getReward/sprite", this.MallItemArray[i]).getComponent(cc.Label).string = "领取";
                }

            }

            this.MallItemArray[i].active = true;
        }
        for (var j = miDB.localData.task.length; j < this.MallItemArray.length; j++) {

            this.MallItemArray[j].active = false;
        }
    },
    getReward(event) {
        cc.audioEngine.play(this.audio, false, 1);
        var node = event.target;
        var index = node.parent.parent.usData;
        var data = miDB.GameData.getTask(index);
        if (data.statue == 1) {
            //tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "已领取喽不能再领取了!" });
            return;
        }

        let that = this;
        let sprite = node.parent.getChildByName("sprite");
        var worldPos = node.parent.parent.convertToWorldSpaceAR(sprite.getPosition())
        var resuPos = this.node.convertToNodeSpaceAR(worldPos);
        let icon3 = cc.instantiate(this.diamondSprite);
        icon3.parent = this.node;
        icon3.setPosition(resuPos);
        icon3.active = true;
        let duration3 = parseFloat(Math.sqrt((that.pos3.y - worldPos.y) * (that.pos3.y - worldPos.y) + (that.pos3.x - worldPos.x) * (that.pos3.x - worldPos.x)) / 1300);
        icon3.runAction(cc.sequence(
            // cc.moveTo(duration3, that.diamondPos).easing(cc.easeIn(4.0)),
            cc.moveBy(duration3, cc.v2(that.pos3.x - worldPos.x, that.pos3.y - worldPos.y)).easing(cc.easeIn(4.0)),
            cc.fadeOut(),
            cc.callFunc(function () {
                tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获钻石", type: 3 });
                icon3.destroy();
            })
        ));

        if (data.num >= miCfg.task[index].num) {
            miDB.GameData.setTaskStatue(index, 1);
            if (miCfg.task[index].type == "diamond") {
                miDB.GameData.addDiamCallback(miCfg.task[index].rewardNum);
            }
            miTools.Utils.loadSprite(node, "image/tplist/gameUiTwo", "ui_ty_bt_1_2");
            // miTools.Utils.loadSprite(cc.find("sprite", node), "image/tplist/gameUiTwo", "bt_ylq");
            cc.find("sprite", node).getComponent(cc.Label).string = "已领取";
        }
        this.getData();

    },


    buttonBind: function (button) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node
        clickEventHandler.component = "TaskSystemModel";
        if (button.node.name == "getReward") {

            clickEventHandler.handler = "getReward";
        }
        if (button.node.name == "resh") {

            clickEventHandler.handler = "reshTaskButton";
        }


        button.clickEvents.push(clickEventHandler);
    },

    show(data) {
        miTools.Utils.layerOpenAction(cc.find("game_Layer_LoginBg", this.node));

        if (typeof (this.MallItemArray) != "undefined") {
            this.getData();
        }

        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });
    },
    hide(data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },
    close() {
        mi.UIManager.hideUI("TaskSystemModel", { ceng: 50 });
    },

    // update (dt) {},
});
