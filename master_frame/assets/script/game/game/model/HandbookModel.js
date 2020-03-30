
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "HandbookModel",
        handbookItem: cc.Prefab,
        rewardItem: cc.Prefab,
        upgradeItem: cc.Prefab,
        content: cc.Node,
        // rewardContent: cc.Node,
        // closeRewards: cc.Node,
        boxNum: cc.Node,
        spriteAtlas: cc.SpriteAtlas,
        layout: cc.Node,
        cover: cc.Node,
        partAtlas: cc.SpriteAtlas,
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        this.handbookNode = [];
        this.rewardNode = [];

        this.coinSprite = cc.find("Canvas/FirstModel/topMenu/money/coin");
        this.pos = this.coinSprite.convertToWorldSpaceAR(this.coinSprite.getPosition());
        this.mineSprite = cc.find("Canvas/FirstModel/topMenu/orc/coin");
        this.pos2 = this.mineSprite.convertToWorldSpaceAR(this.mineSprite.getPosition())
        this.diamondSprite = cc.find("Canvas/FirstModel/topMenu/diamond/coin");
        this.pos3 = this.diamondSprite.convertToWorldSpaceAR(this.diamondSprite.getPosition());
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {

            cc.find("game_Layer_LoginBg", this.node).scale = screenW / 720;
            // cc.find("rewrad_bg/rewrad", this.node).scale = screenW / 720;

        }

        this.handBookLength = 0;

    },
    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.close();
        }

    },
    start() {
        //this.refreshData();

    },

    show(data) {
        miTools.Utils.layerOpenAction(cc.find("game_Layer_LoginBg", this.node));

        this.boxNum.getComponent(cc.Button).enabled = true;
        cc.find("count", this.boxNum).getComponent(cc.Label).string = "x" + miDB.localData.game.chest;
        // if (typeof (this.handbookData) != "undefined") {
        //     this.refreshData();
        // }
        if (!this.handbookData) {
            this.refreshData();
        }
        for (let i = 0; i < this.handbookNode.length; i++) {
            this.handbookNode[i].opacity = 0;
            this.handbookNode[i].runAction(cc.sequence(
                cc.delayTime(i * 0.1),
                cc.spawn(
                    cc.fadeIn(0.4),
                    cc.scaleTo(0.4, 1.05)
                ),
                cc.scaleTo(0.2, 1)
            ));
        }
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });

        this.updateCountdown();

    },

    refreshData: function () {
        console.log("refreshData...");
        cc.find("count", this.boxNum).getComponent(cc.Label).string = "x" + miDB.localData.game.chest;
        this.handbookData = [];
        this.handbookData = this.handbookData.concat(miDB.localData.handBook);
        var data = this.handbookData;
        for (let i = 0; i < data.length; i++) {
            if (!this.handbookNode[i]) {
                let item = cc.instantiate(this.handbookItem);
                item.parent = this.content;
                this.handbookNode.push(item);
            }
            // console.log(data)
            if (data[i].level == 0 && data[i].num == 0) {
                this.handbookNode[i].getChildByName("content").active = false;
                this.handbookNode[i].getChildByName("empty").active = true;
            } else {
                let content = this.handbookNode[i].getChildByName("content");
                content.active = true;
                this.handbookNode[i].getChildByName("empty").active = false;

                content.getChildByName("level").active = data[i].level != 0;
                content.getChildByName("progressBar").active = data[i].level != 0;
                content.getChildByName("text").active = data[i].level != 0;
                content.getChildByName("progressText").active = data[i].level != 0;

                // if (data[i].level == 10 && data[i].num >= 45) {
                //     content.getChildByName("level").getComponent(cc.Label).string = data[i].level;
                // } else {
                //     content.getChildByName("level").getComponent(cc.Label).string = (data[i].level - 1);
                // }

                miTools.Utils.loadSprite(content.getChildByName("icon"), "image/tplist/game_master", miCfg.Master[i + 1].MasterShapeName);
                content.getChildByName("name").getComponent(cc.Label).string = miCfg.Master[i + 1].name;
                content.getChildByName("text").getComponent(cc.Label).string = "收益X" + miCfg.getHandbookLevelGain(data[i].level, data[i].num);
                content.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = data[i].num / miCfg.HandbookLevelConfig[data[i].level].needNum;
                content.getChildByName("progressText").getComponent(cc.Label).string = data[i].num + "/" + miCfg.HandbookLevelConfig[data[i].level].needNum;
                // console.log("data[i].num == " + data[i].num + "needNum == " + miCfg.HandbookLevelConfig[data[i].level].needNum);

                if (data[i].level >= 21) {
                    cc.find("content/max", this.handbookNode[i]).active = true;
                    cc.find("content/level", this.handbookNode[i]).active = false;
                    content.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = 1;
                    content.getChildByName("progressText").getComponent(cc.Label).active = false;
                } else {
                    cc.find("content/max", this.handbookNode[i]).active = false;
                    cc.find("content/level", this.handbookNode[i]).active = true;
                    content.getChildByName("level").getComponent(cc.Label).string = data[i].level;
                    content.getChildByName("progressText").getComponent(cc.Label).active = true;
                }
            }

        }
    },

    notifyDataChanged: function () {
        miCfg.addHandbook(this.rewardList);
        miDB.GameData.getProductEffic(); //卡片升级刷新
        this.refreshData();

        //升级
        this.buttonArr = [];
        for (let i = 0; i < this.rewardList.length; i++) {
            for (let j = 0; j < miDB.localData.handBook.length; j++) {
                if (this.rewardList[i].type == "card" && this.rewardList[i].actionIndex == miDB.localData.handBook[j].index && miDB.localData.handBook[j].num == 0) {
                    let item = cc.instantiate(this.upgradeItem);
                    let bg = this.node.getChildByName("update_bg");
                    item.parent = bg;
                    let level = miDB.localData.handBook[j].level;
                    cc.find("upgrade/sprite/level", item).getComponent(cc.Label).string = "LV" + (level - 2) + " - LV" + (level - 1);
                    cc.find("upgrade/sprite/earning", item).getComponent(cc.Label).string = "收益加成" + (miCfg.HandbookLevelConfig[level - 2].gainCode) + "倍 - " + (miCfg.HandbookLevelConfig[level - 1].gainCode + "倍");
                    miTools.Utils.loadSprite(item.getChildByName("upgrade").getChildByName("icon"), "image/tplist/game_master", miCfg.Master[(j + 1) + ""].MasterShapeName);
                    item.getChildByName("upgrade").getChildByName("icon_bg").runAction(cc.repeatForever(cc.rotateBy(4, 360)));

                    if (!bg.active) {
                        bg.active = true;
                        //miTools.Utils.layerOpenAction(cc.find("update_bg/upgrade", this.node));
                    }
                    this.buttonBind(item.getComponent(cc.Button));
                }
            }
        }
    },

    openBox: function () {
        cc.audioEngine.play(this.audio, false, 1);
        //拉起视频
        // if (miDB.MasterData.getBuildListLength() == 0) {
        //     //tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "请先开启怪兽!" });
        //     return;
        // }

        var that = this;



        this.handBookLength = 0

        for (var i = 0; i < miDB.localData.handBook.length; i++) {
            if (miDB.localData.handBook[i].level == 0 && miDB.localData.handBook[i].num == 0) {

            } else {
                this.handBookLength += 1;
            }
        }
        if (this.handBookLength == 0) {
            console.log("当前不能打开");
            return;
        }

        if (miDB.localData.game.handbookFreeNum <= 10) {
            if (miDB.localData.game.handbookTime == "null") {
                if (tywx.isInWeChatPath) {
                    that.boxNum.getComponent(cc.Button).enabled = false;
                    var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.HANDBOOK);
                    var config = cofigInfo.config;
                    config.shareTwoText = ["分享到群才能生效", "别总骚扰同一个群，换个群分享吧"];
                    miTools.Utils.autoVideoThreeFive(config, function () {
                        tywx.BiLog.clickStat(miDB.BIEVENT.BOOK_SHARE_OPENBOX, [tywx.UserInfo.isNewPlayer]);
                        miDB.localData.game.handbookTime = miDB.localData.systime;
                        miDB.localData.game.handbookFreeNum += 1;
                        that.rewardList = [];
                        that.rewardNode = [];
                        // that.rewardContent.removeAllChildren();
                        // that.closeRewards.active = false;
                        that.cover.active = true;
                        that.cover.runAction(cc.sequence(
                            cc.fadeIn(0.1),
                            cc.fadeOut(1),
                            cc.callFunc(function () {
                                that.onFinished(that);
                            })
                        ));

                        return;
                    })
                } else {
                    that.boxNum.getComponent(cc.Button).enabled = false;
                    miDB.localData.game.handbookTime = miDB.localData.systime;
                    miDB.localData.game.handbookFreeNum += 1;
                    that.rewardList = [];
                    that.rewardNode = [];
                    // that.rewardContent.removeAllChildren();
                    // that.closeRewards.active = false;
                    that.cover.active = true;
                    that.cover.runAction(cc.sequence(
                        cc.fadeIn(0.1),
                        cc.fadeOut(1),
                        cc.callFunc(function () {
                            that.onFinished(that);
                        })
                    ));
                }
                return;
            } else {
                console.log("倒计时未结束");
            }
        }

        var isPrice = miTools.Utils.comparedTo(miDB.localData.game.chest, 1);
        if (isPrice < 0) {
            console.log("相纸已用完");
            return;
        }
        this.boxNum.getComponent(cc.Button).enabled = false;
        miDB.GameData.costChestCallback(1);
        this.rewardList = [];
        this.rewardNode = [];
        // this.rewardContent.removeAllChildren();
        // this.closeRewards.active = false;
        var that = this;
        this.cover.active = true;
        this.cover.runAction(cc.sequence(
            cc.fadeIn(0.1),
            cc.fadeOut(1),
            cc.callFunc(function () {
                that.onFinished(that);
            })
        ));
    },
    onFinished: function (that) {
        let rewardList = miCfg.BoxToRandomThree(this.handBookLength);
        that.rewardList = JSON.parse(JSON.stringify(rewardList));
        for (var i = 0; i < that.rewardList.length; i++) {
            if (that.rewardList[i].type == "corn") {
                that.rewardList[i].num = miTools.Utils.deAdd(miTools.Utils.deMul(that.rewardList[i].num, miDB.GameData.DB.productEffic), "100").toString();
            }
        }
        mi.UIManager.showUIParent("AwardModel", JSON.stringify(that.rewardList), that.node);

        // that.refreshData();
        cc.find("count", this.boxNum).getComponent(cc.Label).string = "x" + miDB.localData.game.chest;
        that.boxNum.getComponent(cc.Button).enabled = true;
        that.updateCountdown();
    },

    updateCountdown: function () {
        var that = this;
        if (miDB.localData.game.handbookFreeNum <= 10) {
            if (miDB.localData.game.handbookTime == "null" || miDB.localData.systime - miDB.localData.game.handbookTime > 30 * 60) {
                this.layout.getChildByName("countdown").getComponent(cc.Label).string = "免费拍摄";
                miDB.localData.game.handbookTime = "null";
            } else {

                let sub = miDB.localData.systime - miDB.localData.game.handbookTime;
                if (sub > 30 * 60) {
                    this.layout.getChildByName("countdown").getComponent(cc.Label).string = "免费拍摄";
                    miDB.localData.game.handbookTime = "null";
                } else {
                    // 以秒为单位的时间间隔
                    let interval = 1;
                    // 重复次数
                    let repeat = 30 * 60;
                    // 开始延时
                    let delay = 0;
                    this.layout.getChildByName("countdown").getComponent(cc.Label).schedule(function () {
                        let sub2 = miDB.localData.systime - miDB.localData.game.handbookTime;
                        if (sub2 < 30 * 60) {
                            let min = parseInt((30 * 60 - sub2) / 60) > 9 ? parseInt((30 * 60 - sub2) / 60) : "0" + parseInt((30 * 60 - sub2) / 60);
                            let second = parseInt((30 * 60 - sub2) % 60) > 9 ? parseInt((30 * 60 - sub2) % 60) : "0" + parseInt((30 * 60 - sub2) % 60);
                            that.layout.getChildByName("countdown").getComponent(cc.Label).string = min + "分" + second + "秒后免费抽取";
                        } else {
                            that.layout.getChildByName("countdown").getComponent(cc.Label).string = "免费拍摄";
                            miDB.localData.game.handbookTime = "null";
                        }
                    }, interval, repeat, delay);
                }
            }
        }

    },

    close: function () {
        this.content.parent.parent.getComponent(cc.ScrollView).scrollToTop();
        mi.UIManager.hideUI("HandbookModel", 51);
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },

    closeReward: function () {
        let that = this;
        for (let i = 0; i < this.rewardList.length; i++) {
            let sprite = this.rewardNode[i].getChildByName("icon");
            var worldPos = sprite.convertToWorldSpaceAR(sprite.getPosition())
            var resuPos = this.node.convertToNodeSpaceAR(worldPos);

            if (this.rewardList[i].type == "corn") {
                let icon1 = cc.instantiate(this.coinSprite);
                icon1.parent = this.node;
                icon1.setPosition(resuPos);
                let duration1 = parseFloat(Math.sqrt((that.pos.y - worldPos.y) * (that.pos.y - worldPos.y) + (that.pos.x - worldPos.x) * (that.pos.x - worldPos.x)) / 1000);
                icon1.runAction(cc.sequence(
                    cc.moveBy(duration1, cc.v2(that.pos.x - worldPos.x, that.pos.y - worldPos.y)).easing(cc.easeIn(4.0)),
                    cc.fadeOut(),
                    cc.callFunc(function () {
                        tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获金币", type: 1 });
                        icon1.destroy();
                    })
                ));
            } else if (this.rewardList[i].type == "mine") {
                let icon2 = cc.instantiate(this.mineSprite);
                icon2.parent = this.node;
                icon2.setPosition(resuPos);
                let duration2 = parseFloat(Math.sqrt((that.pos2.y - worldPos.y) * (that.pos2.y - worldPos.y) + (that.pos2.x - worldPos.x) * (that.pos2.x - worldPos.x)) / 1300);
                icon2.runAction(cc.sequence(
                    cc.moveBy(duration2, cc.v2(that.pos2.x - worldPos.x, that.pos2.y - worldPos.y)).easing(cc.easeIn(4.0)),
                    cc.fadeOut(),
                    cc.callFunc(function () {
                        tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获彩矿", type: 2 });
                        icon2.destroy();
                    })
                ));
            } else if (this.rewardList[i].type == "diamond") {
                let icon3 = cc.instantiate(this.diamondSprite);
                icon3.parent = this.node;
                icon3.setPosition(resuPos);
                let duration3 = parseFloat(Math.sqrt((that.pos3.y - worldPos.y) * (that.pos3.y - worldPos.y) + (that.pos3.x - worldPos.x) * (that.pos3.x - worldPos.x)) / 1300);
                icon3.runAction(cc.sequence(
                    cc.moveBy(duration3, cc.v2(that.pos3.x - worldPos.x, that.pos3.y - worldPos.y)).easing(cc.easeIn(4.0)),
                    cc.fadeOut(),
                    cc.callFunc(function () {
                        tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获钻石", type: 3 });
                        icon3.destroy();
                    })
                ));
            }
        }

        var reward = cc.find("rewrad_bg", this.node);
        reward.active = false;

    },

    closeUpdate() {
        var reward = cc.find("update_bg", this.node);
        reward.active = false;
    },

    buttonBind: function (button) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "HandbookModel";
        clickEventHandler.handler = "handbookModel";
        if (button.clickEvents.length == 0) {
            button.clickEvents.push(clickEventHandler);
        }
    },

    handbookModel: function (event) {
        event.target.destroy();
    },

    update(dt) {

        //cc.find("particle", this.node).getComponent(cc.ParticleSystem).spriteFrame = this.partAtlas.getSpriteFrame("cd_bg_" + miTools.Utils.RandomNumBoth(1, 4));
    },
});
