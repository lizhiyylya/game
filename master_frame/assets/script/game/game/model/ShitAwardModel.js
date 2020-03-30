
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "ShitAwardModel",
        reward: cc.Node,
        title: cc.Node,
        titleBg: cc.Node,
        content: cc.Node,
        starLeft: cc.Node,
        starRight: cc.Node,
        awardItem: cc.Prefab,
        audio: {
            default: null,
            type: cc.AudioClip
        },
        particle: cc.Node,
        partAtlas: cc.SpriteAtlas,

    },

    onLoad() {

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            this.node.getChildByName("bg").scale = screenW / 720;


        }

    },

    start() {

    },


    show(params) {
        // console.log(params);
        let that = this;
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });
        this.params = params;
        this.okCallBack = params.gameData.okCallBack;
        let data = params.gameData.itemData;
        this.rewardList = params.gameData.itemData;
        this.times = params.gameData.times;
        this.isShare = params.gameData.isShare;
        this.sharePoint = params.gameData.sharePoint || miDB.SHAREPOINT.NONE;
        this.content.removeAllChildren();
        this.nodeArray = [];
        if (this.isShare == true) {
            miTools.Utils.loadLabel(cc.find("bg/rewrad/btReward/title", this.node), "领取双倍");
            cc.find("bg/rewrad/close", this.node).active = true;
            miTools.Utils.loadSprite(this.title, "image/tplist/gameUiTwo", "jlfb_bg_1");
            miTools.Utils.loadLabel(cc.find("bg/rewrad/decLabel", this.node), "分享好友奖励翻倍");
            //   this.particle.getComponent(cc.ParticleSystem).stopSystem();
            this.particle.active = false;



        } else {
            miTools.Utils.loadLabel(cc.find("bg/rewrad/btReward/title", this.node), "领取奖励");
            cc.find("bg/rewrad/close", this.node).active = false;
            miTools.Utils.loadSprite(this.title, "image/tplist/gameUiTwo", "ui_ty_bg_hdjl");
            miTools.Utils.loadLabel(cc.find("bg/rewrad/decLabel", this.node), "恭喜获得大把奖励");
            //   this.particle.getComponent(cc.ParticleSystem).resetSystem();
            this.particle.active = true;
        }

        // if (params.gameData.title) {

        //  }
        if (params.gameData.subTitle) {
            cc.find("label", this.subTitle).getComponent(cc.Label).string = params.gameData.subTitle;
        }
        this.starLeft.active = true;
        this.starLeft.getComponent(cc.Animation).play();
        this.starRight.active = true;
        this.starRight.getComponent(cc.Animation).play();
        for (let i = 0; i < data.length; i++) {
            if (!that.nodeArray[i]) {
                var node = cc.instantiate(that.awardItem);
                node.parent = that.content;
                that.nodeArray.push(node);
            }
            let item = that.nodeArray[i];
            item.getChildByName("count").getComponent(cc.Label).string = "x" + miTools.Utils.toLabelString(miTools.Utils.deMul(data[i].num, this.times));
            if (data[i].type == "mine") {
                item.getChildByName("name").getComponent(cc.Label).string = "矿石";
                miTools.Utils.loadSprite(item.getChildByName("icon"), "image/tplist/gameUiTwo", "ui_icon_ck");
            } else if (data[i].type == "diamond") {
                item.getChildByName("name").getComponent(cc.Label).string = "钻石";
                miTools.Utils.loadSprite(item.getChildByName("icon"), "image/tplist/gameUiTwo", "ui_icon_zs");
            } else if (data[i].type == "corn") {
                item.getChildByName("name").getComponent(cc.Label).string = "金币";
                miTools.Utils.loadSprite(item.getChildByName("icon"), "image/tplist/gameUiTwo", "ui_icon_jb");
            } else if (data[i].type == "chest") {
                item.getChildByName("name").getComponent(cc.Label).string = "宝箱";
                miTools.Utils.loadSprite(item.getChildByName("icon"), "image/tplist/gameUiTwo", "ui_icon_bx");
            }
            that.nodeArray[i].active = true;
        }

    },

    update(dt) {

        this.particle.getComponent(cc.ParticleSystem).spriteFrame = this.partAtlas.getSpriteFrame("cd_bg_" + miTools.Utils.RandomNumBoth(1, 4));

    },

    onDestroy() {

    },

    getReward() {
        let that = this;
        miTools.Utils.gainRewardAnim(this.node, this.rewardList, this.nodeArray, function () {
          
            mi.UIManager.hideUI("ShitAwardModel", { ceng: 53 });
            for (let i = 0; i < that.rewardList.length; i++) {
                let data = that.rewardList[i];
                if (data.type == "corn") {
                    miDB.GameData.addCronCallback(miTools.Utils.deMul(data.num, that.times).toString());
                } else if (that.rewardList[i].type == "diamond") {
                    miDB.GameData.addDiamCallback(miTools.Utils.deMul(data.num, that.times).toString());
                } else if (that.rewardList[i].type == "mine") {
                    miDB.GameData.addMineCallback(miTools.Utils.deMul(data.num, that.times).toString());
                } else if (that.rewardList[i].type == "chest") {
                    miDB.GameData.addChestCallback(miTools.Utils.deMul(data.num, that.times).toString());
                }
            }
            if (that.okCallBack) {
                that.okCallBack();
            }
        });

    },

    //领取奖励
    gainReward() {
        var self = this;
        if (this.isShare == false) {
            this.getReward();

        } else {

            if (tywx.isInWeChatPath == false) {
                self.shareResult();
            } else {


                if (this.sharePoint == "CLEAR_SHIT") {
                    var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.CLEAR_SHIT);
                    var config = cofigInfo.config;
                    config.shareTwoText = ["分享到群才能生效", "别总骚扰同一个群，换个群分享吧"];
                    miTools.Utils.autoVideoThreeFive(config, function () {
                        self.shareResult();
                    });
                } else if (this.sharePoint == "TURN_TABLE") {
                    var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.TURN_TABLE);
                    var config = cofigInfo.config;
                    config.shareTwoText = ["分享到群才能生效", "别总骚扰同一个群，换个群分享吧"];
                    miTools.Utils.autoVideoThreeFive(config, function () {
                        self.shareResult();
                    });
                }


            }

        }

    },

    shareResult() {
        if (this.sharePoint == "CLEAR_SHIT") {
            tywx.BiLog.clickStat(miDB.BIEVENT.CLEAR_SHIT, [tywx.UserInfo.isNewPlayer]);
            this.params.gameData.times += 1;
            this.params.gameData.isShare = false;
            this.show(this.params);
        }
        else if (this.sharePoint == "TURN_TABLE") {
            tywx.BiLog.clickStat(miDB.BIEVENT.TURN_TABLE, [tywx.UserInfo.isNewPlayer]);
            this.params.gameData.times += 1;
            this.params.gameData.isShare = false;
            this.show(this.params);
        }



    },

    hide(data) {
        if (this.sharePoint != "TURN_TABLE") {
            tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "showAll" });
        }
    },
});
