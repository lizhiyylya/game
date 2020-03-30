
var invi1Data = [
    { index: 0, needNum: 5, rewardNum: 100, dec: "邀请5人" },
    { index: 1, needNum: 20, rewardNum: 500, dec: "邀请20人" },
    { index: 2, needNum: 50, rewardNum: 1000, dec: "邀请50人" },
    { index: 3, needNum: 100, rewardNum: 3000, dec: "邀请100人" },
    // { index: 4, needNum: 200, rewardNum: 50, dec: "邀请200人" },
];


cc.Class({
    extends: cc.Component,

    properties: {


        uiType: 2,
        uiName: "InviModel",
        InviModelPre: cc.Prefab,
        content: cc.Node,
        progress: cc.Node,
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.titleButton = [
            // cc.find("game_Layer_inviItemBg/inviLayout/invi0", this.node),
            cc.find("game_Layer_inviItemBg/inviLayout/invi1", this.node),
            cc.find("game_Layer_inviItemBg/inviLayout/invi2", this.node),
            cc.find("game_Layer_inviItemBg/inviLayout/invi3", this.node),
            cc.find("game_Layer_inviItemBg/inviLayout/invi4", this.node),
        ];
        this.listController = this.node.getComponent("listViewController");
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);
        this.MallItemArray = [];
        // for (var i = 0; i < 100; i++) {
        //     if (!this.MallItemArray[i]) {
        //         var node = cc.instantiate(this.InviModelPre);
        //         node.parent = this.content;
        //         this.MallItemArray.push(node);
        //         this.buttonBind(node.getChildByName("btReward").getComponent(cc.Button));
        //     }
        // }


        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            cc.find("game_Layer_inviItemBg", this.node).scale = screenW / 720;

        }

        this.isLoad = false;
    },


    start() {
        this.diamondSprite = cc.find("Canvas/FirstModel/topMenu/diamond/coin");
        this.pos2 = this.diamondSprite.convertToWorldSpaceAR(this.diamondSprite.getPosition());
        this.mineSprite = cc.find("Canvas/GameUE/bottomMenu/handbook");
        this.pos3 = this.mineSprite.convertToWorldSpaceAR(this.mineSprite.getPosition())

        this.isLoad = true;
        this.getData();
    },

    show(data) {
        miTools.Utils.layerOpenAction(cc.find("game_Layer_inviItemBg", this.node));

        if (this.isLoad == true) {
            this.getData();
        }

        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });
    },
    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.close();
        }

    },
    close() {
        this.content.parent.parent.getComponent(cc.ScrollView).scrollToTop();
        mi.UIManager.hideUI("InviModel", { ceng: 50 });
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },

    hide(data) {
        // console.log("hide");
        // console.log(data);

    },
    inviReward(target, data) {
        // console.log("获取邀请" + data + "人奖励");


    },
    getDiamChest(index) {
        var data = {};
        if (index <= 5) {
            data = { chestNum: 2, diamNum: 20 };
        }
        else if (index <= 10) {
            data = { chestNum: 3, diamNum: 30 };
        }
        else if (index <= 20) {
            data = { chestNum: 4, diamNum: 40 };
        }
        else if (index <= 30) {
            data = { chestNum: 5, diamNum: 50 };
        }
        else if (index <= 60) {
            data = { chestNum: 6, diamNum: 60 };
        }
        else if (index <= 80) {
            data = { chestNum: 8, diamNum: 80 };
        }
        else if (index <= 100) {
            data = { chestNum: 20, diamNum: 200 };
        }

        return data;

    },
    getData() {
        this.inviNum = miDB.inviData.length;
        var data = [];
        for (var i = 0; i < 100; i++) {
            var temp = {};
            temp.index = i;
            temp.createTime = "";
            temp.invitee = "";
            temp.nickName = "";
            temp.spare = "";
            temp.wxImg = "";
            if (i < miDB.inviData.length) {
                temp.createTime = miDB.inviData[i].createTime;
                temp.invitee = miDB.inviData[i].invitee;
                temp.nickName = miDB.inviData[i].nickName;
                temp.spare = miDB.inviData[i].spare;
                temp.wxImg = miDB.inviData[i].wxImg;
            }

            data.push(temp);
        }


        this.listController.initList(data, this.listController.updateRankList);
        // this.buttonArray =this.node.getChildByName("list").getChildByName("view").getChildByName("content").getComponentsInChildren(cc.Button);
        // for (var i =0 ; i< this.buttonArray.length;i++)
        // {
        //     this.buttonBind(this.buttonArray[i]);
        // }



        // for (var i = 0; i < 100; i++) {
        //     if (!this.MallItemArray[i]) {
        //         var node = cc.instantiate(this.InviModelPre);
        //         node.parent = this.content;
        //         this.MallItemArray.push(node);
        //         this.buttonBind(node.getChildByName("btReward").getComponent(cc.Button));
        //     }
        //     if (i < miDB.inviData.length) {
        //         this.MallItemArray[i].usData = miDB.inviData[i];

        //         if (miDB.inviData[i].wxImg != "") {
        //             miTools.Utils.loadSpriteUrl(this.MallItemArray[i].getChildByName("head"), miDB.inviData[i].wxImg);
        //         }

        //         if (miDB.inviData[i].spare == 1 && this.inviNum >= (i + 1)) {
        //             this.MallItemArray[i].getChildByName("btReward").getComponent(cc.Button).enabled = true;
        //             miTools.Utils.loadSprite(this.MallItemArray[i].getChildByName("btReward").getChildByName("bt_lq"), "image/tplist/gameLayer", "bt_lq");
        //         } else {

        //             this.MallItemArray[i].getChildByName("btReward").getComponent(cc.Button).enabled = false;
        //             miTools.Utils.loadSprite(this.MallItemArray[i].getChildByName("btReward").getChildByName("bt_lq"), "image/tplist/gameLayer", "bt_ylq");
        //         }
        //     } else {
        //         this.MallItemArray[i].getChildByName("btReward").getComponent(cc.Button).enabled = false;
        //         miTools.Utils.loadSprite(this.MallItemArray[i].getChildByName("btReward").getChildByName("bt_lq"), "image/tplist/gameLayer", "yq_bg_2");


        //     }


        //     this.MallItemArray[i].index = (i + 1);
        //     cc.find("num", this.MallItemArray[i]).getComponent(cc.Label).string = (i + 1);
        //     var data = this.getDiamChest(i + 1);
        //     cc.find("rewardDiamNum", this.MallItemArray[i]).getComponent(cc.Label).string = "X" + data.diamNum;
        //     cc.find("rewardChestNum", this.MallItemArray[i]).getComponent(cc.Label).string = "X" + data.chestNum;
        // }

        let length = 0;
        for (var j = 0; j < invi1Data.length; j++) {
            this.titleButton[j].usData = invi1Data[j];
            if (miDB.localData.invi1[j] == 1) {
                // cc.find("right", this.titleButton[j]).active = true;
                // this.titleButton[j].getComponent(cc.Button).enabled = false;
                this.titleButton[j].active = false;
                length = 75 + j * 130;
            } else {
                // cc.find("right", this.titleButton[j]).active = false;
                this.titleButton[j].active = true;

                if (this.inviNum >= invi1Data[j].needNum) {
                    this.titleButton[j].getComponent(cc.Button).enabled = true;   //还未领取
                    miTools.Utils.loadSprite(this.titleButton[j].getChildByName("yqhl_icon_baoxiang_1"), "image/tplist/gameUiTwo", "yqhl_icon_baoxiang_2");
                    length = 75 + j * 130;
                } else {
                    this.titleButton[j].getComponent(cc.Button).enabled = false;
                }

            }
            cc.find("yqhl_bg_3/num", this.titleButton[j]).getComponent(cc.Label).string = invi1Data[j].rewardNum;
            cc.find("dec", this.titleButton[j]).getComponent(cc.Label).string = invi1Data[j].dec;
        }

        this.progress.width = length;
        // cc.find("game_Layer_inviItemBg/ProgressBar", this.node).getComponent(cc.ProgressBar).progress = parseFloat(this.inviNum / 100);


    },

    btReward(event) {

        cc.audioEngine.play(this.audio, false, 1);
        var node = event.target;
        node.getComponent(cc.Button).enabled = false;
        var index = parseInt(node.parent.usData.index) + 1;
        this.BossRewardData = this.getDiamChest(index);
        var data = node.parent.usData.invitee;
        var currNode = node.parent;
        if (tywx.isInWeChatPath) {
            tywx.postMethodCall("monster/awardSingleInvitee/" + tywx.UserInfo.openid + "/" + data, "", this.getBoxData, this);

        }

        // miDB.GameData.addChestCallback(checkData.chestNum);
        // miDB.GameData.addDiamCallback(checkData.diamNum);
        // 

        let that = this;

        let sprite2 = currNode.getChildByName("icon_zs");
        var worldPos2 = currNode.convertToWorldSpaceAR(sprite2.getPosition());
        var resuPos2 = this.node.convertToNodeSpaceAR(worldPos2);

        let sprite3 = currNode.getChildByName("icon_js");
        var worldPos3 = currNode.convertToWorldSpaceAR(sprite3.getPosition());
        var resuPos3 = this.node.convertToNodeSpaceAR(worldPos3);

        let icon2 = cc.instantiate(this.diamondSprite);
        icon2.parent = this.node;
        icon2.setPosition(resuPos2);
        let duration2 = parseFloat(Math.sqrt((that.pos2.y - worldPos2.y) * (that.pos2.y - worldPos2.y) + (that.pos2.x - worldPos2.x) * (that.pos2.x - worldPos2.x)) / 1300);
        icon2.runAction(cc.sequence(
            // cc.moveTo(duration2, that.minePos).easing(cc.easeIn(4.0)),
            cc.moveBy(duration2, cc.v2(that.pos2.x - worldPos2.x, that.pos2.y - worldPos2.y)).easing(cc.easeIn(4.0)),
            cc.fadeOut(),
            cc.callFunc(function () {
                tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获钻石", type: 3 });
                icon2.destroy();
            })
        ));

        let icon3 = cc.instantiate(sprite3);
        icon3.parent = this.node;
        icon3.setPosition(resuPos3);
        let duration3 = parseFloat(Math.sqrt((that.pos3.y - worldPos3.y) * (that.pos3.y - worldPos3.y) + (that.pos3.x - worldPos3.x) * (that.pos3.x - worldPos3.x)) / 1300);
        icon3.runAction(cc.sequence(
            cc.moveTo(duration2, cc.v2(226, -515)).easing(cc.easeIn(4.0)),
            // cc.moveBy(duration3, cc.v2(that.pos3.x - worldPos3.x, that.pos3.y - worldPos3.y)).easing(cc.easeIn(4.0)),
            cc.fadeOut(),
            cc.callFunc(function () {
                tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获信纸", type: 4 });
                icon3.destroy();
            })
        ));

    },
    openInviDataCall(data) {
        // console.log("openInviDataCall");

        if (data.data.code == 0) {
            miDB.inviData = data.data.data;
        }
        this.getData();
    },

    getBoxData(data) {

        // console.log(data);
        if (data.data.code == 0) {
            miDB.GameData.addChestCallback(this.BossRewardData.chestNum);
            miDB.GameData.addDiamCallback(this.BossRewardData.diamNum);
            miDB.GameData.setLocalDataLock();
            this.BossRewardData = null;
            tywx.postMethodCall("monster/getAllInvitee/" + tywx.UserInfo.openid, "", this.openInviDataCall, this);
        }



    },

    titleReward(event) {
        cc.audioEngine.play(this.audio, false, 1);
        var node = event.target;
        node.getComponent(cc.Button).enabled = false;
        var data = node.usData;
        var index = data.index;
        miDB.localData.invi1[index] = 1;
        miDB.GameData.addDiamCallback(data.rewardNum);
        miDB.GameData.setLocalDataLock();
        this.getData();

        let that = this;
        let sprite = this.titleButton[index].getChildByName("gssd_icon_zs");
        var worldPos = sprite.convertToWorldSpaceAR(sprite.getPosition());
        var resuPos = this.node.convertToNodeSpaceAR(worldPos);

        let icon2 = cc.instantiate(this.diamondSprite);
        icon2.parent = this.node;
        icon2.setPosition(resuPos);
        let duration2 = parseFloat(Math.sqrt((that.pos2.y - worldPos.y) * (that.pos2.y - worldPos.y) + (that.pos2.x - worldPos.x) * (that.pos2.x - worldPos.x)) / 1300);
        icon2.runAction(cc.sequence(
            // cc.moveTo(duration3, that.diamondPos).easing(cc.easeIn(4.0)),
            cc.moveBy(duration2, cc.v2(that.pos2.x - worldPos.x, that.pos2.y - worldPos.y)).easing(cc.easeIn(4.0)),
            cc.fadeOut(),
            cc.callFunc(function () {
                tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获钻石", type: 3 });
                icon2.destroy();
            })
        ));
    },


    buttonBind: function (button) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node
        clickEventHandler.component = "InviModel";
        if (button.node.name == "btReward") {

            clickEventHandler.handler = "btReward";
        }

        button.clickEvents.push(clickEventHandler);
    },


    invi() {
        cc.audioEngine.play(this.audio, false, 1);
        console.log("邀请好友");
        var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.INVI_FEIEND)
        var config = cofigInfo.config;
        tywx.LOGE(JSON.stringify(config));
        tywx.BiLog.clickStat(miDB.BIEVENT.INV_FRIEND_SUCCESS, [tywx.UserInfo.isNewPlayer]);
        tywx.ShareInterface.share(config.shareContent, config.sharePicUrl, config.sharePointId, config.shareSchemeId
            , function (result) {
                tywx.BiLog.clickStat(miDB.BIEVENT.FRIEND_HELP_SHARE_SUCCESS, []);
                wx.showToast({ title: "分享成功" });
            }, function (res) {
                wx.showToast({ title: "分享失败" });
            }, null, "");

    },

    // update (dt) {},
});
