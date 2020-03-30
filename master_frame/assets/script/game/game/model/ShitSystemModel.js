var count = 2;
var shitData = [
    { index: 0, num: 30, type: "corn", kind: 1, weight: 200, icon: "hhxx_jb" },
    { index: 1, num: 1, type: "diamond", kind: 1, weight: 30, icon: "hhxx_zs" },
    { index: 2, num: 1, type: "chest", kind: 1, weight: 50, icon: "hhxx_zs" },
    { index: 3, num: 5, type: "diamond", kind: 2, weight: 30, icon: "hhxx_zs" },
    { index: 4, num: 3, type: "chest", kind: 2, weight: 30, icon: "hhxx_zs" },
];








var positions = [cc.v2(-190, -300), cc.v2(0, -210), cc.v2(190, -310), cc.v2(-220, -110), cc.v2(10, 0), cc.v2(230, -110), cc.v2(-160, 100), cc.v2(0, 200), cc.v2(180, 100)];

cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "ShitSystemModel",
        shit: cc.Prefab,
        giftbtn: cc.Node,
        desc: cc.Node,
        harmburger: cc.Prefab
    },

    onLoad() {
        this.shitList = [];
        tywx.NotificationCenter.listen(miDB.EVENT.SHIT_DATA_SHOWUI, this.shitComing, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_SUPER_FEED, this.superFeedTime, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_OUT, this.bossComing, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_READ_POINT, this.mallReadPoint, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_IN, this.fadeIN, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_MONSTER_MASK, this.hideUIAction, this);
        tywx.NotificationCenter.listen(miDB.EVENT.SHIT_STATUS_ACTION, this.scenceAboutUI, this);
        tywx.NotificationCenter.listen(miDB.EVENT.SUPER_FEED_CALL, this.falloutHambu, this);
        tywx.NotificationCenter.listen(miDB.EVENT.SUPER_FEED_COUNT, this.ufoBack, this);

        tywx.NotificationCenter.listen(miDB.EVENT.GET_NEW_GIFT, this.newGift, this);



        // tywx.NotificationCenter.listen(miDB.EVENT.SHIT_STATUS_ACTION, this.nextScenceStatus, this);

        this.coinSprite = cc.find("Canvas/FirstModel/topMenu/money/coin");
        this.pos = this.coinSprite.convertToWorldSpaceAR(this.coinSprite.getPosition());
        this.mineSprite = cc.find("Canvas/FirstModel/topMenu/orc/coin");
        this.pos2 = this.mineSprite.convertToWorldSpaceAR(this.mineSprite.getPosition());
        this.diamondSprite = cc.find("Canvas/FirstModel/topMenu/diamond/coin");
        this.pos3 = this.diamondSprite.convertToWorldSpaceAR(this.diamondSprite.getPosition());
        this.bookSprite = cc.find("Canvas/GameUE/bottomMenu/handbook");
        this.pos4 = this.bookSprite.convertToWorldSpaceAR(this.bookSprite.getPosition());
        this.isPickShit = false;
        this.haveNewGift = false;
    },
    newGift() {
        if (this.haveNewGift == false) {
            this.haveNewGift = true;
            this.giftbtn.play = undefined;
        }

    },
    fadeIN() {
        if (this.node.active == false) {
            this.node.active = true;
        }
    },

    nextScenceStatus: function (data) {
        if (miDB.SceneData.index == 1 && miDB.MasterData.getBuildListLength() < 10) {
            this.node.active = false;
        } else if (miDB.SceneData.index == 0) {
            this.node.active = true;
        }
    },

    hideUIAction: function (data) {
        var feedBtn = cc.find("superfeeNode", this.node);
        if (data.action == "resuse") {
            this.isFeedPage = false;
            if (!feedBtn.active) {
                feedBtn.active = true;
                miTools.Ani.btnJumpAni(feedBtn.getChildByName("superFeed"));
            }

            if (miDB.localData.game.finshGuid == true) {
                this.giftbtn.active = true;
                this.node.getChildByName("shitNode").active = true;
            }


        } else if (data.action == "show") {
            this.isFeedPage = true;
            feedBtn.active = false;
            feedBtn.stopAllActions();
            this.node.getChildByName("shitNode").active = false;
            this.giftbtn.active = false;
        }
    },

    scenceAboutUI: function (data) {
        if (miDB.SceneData.index == 1 && miDB.MasterData.getBuildListLength() < 10) {
            this.node.active = false;
        } else if (miDB.SceneData.index == 0) {
            this.node.active = true;
        }
        // if (data.action == "show") {
        //     this.node.active = true;
        // } else if (data.action == "hide") {
        //     this.node.active = false;
        // }
    },



    shareGiftBtnCallback: function () {
        cc.audioEngine.play(this.audioClick, false, 1);
        // if (tywx.isInWeChatPath) {
        //     tywx.postMethodCall("monster/getGiftBagType", "", this.shareGiftData, this);
        // }
        // else {
        //     mi.UIManager.showUI("ShareGiftAlter", { ceng: 42, id: 1, type: "diamond", num: 100 });
        // }

        if (miDB.giftData == "") {
            miDB.GameData.shareGiftBtnCallback();
        } else {
            mi.UIManager.showUI("ShareGiftAlter", { ceng: 42, id: miDB.giftData.id, type: miDB.giftData.type, num: miDB.giftData.number });
        }

    },
    mallReadPoint: function (data) {
        if (this.isFeedPage || this.isFeeding) {
            return;
        }
        if (data.action == "giftReadPoint") {
            if (this.giftbtn.active != data.active) {
                this.giftbtn.active = data.active;
                if (this.giftbtn.active && !this.giftbtn.play) {
                    this.giftbtn.play = true;

                    var self = this;
                    var anim = this.giftbtn.getComponent(cc.Animation);
                    anim.play();
                    anim.on('finished', anim.fin = function () {

                        if (self.haveNewGift == true) {
                            self.haveNewGift = false;
                            self.shareGiftBtnCallback();
                        }
                        miTools.Ani.btnJumpAni(self.giftbtn);
                        anim.off('finished', anim.fin, self);

                    }, this);


                }

            }

        }
    },

    bossComing(data) {
        if (this.node.active == true) {
            this.node.active = false;
        }

    },

    superFeedTime(data) {
        if (this.isFeedPage || this.isFeeding) {
            return;
        }
        var feedBtn = cc.find("superfeeNode", this.node);
        if (data.action == "show") {
            if (!feedBtn.active) {
                feedBtn.active = true;
                // miTools.Ani.btnJumpAni(feedBtn);
                var bezier = [cc.v2(0, 600), cc.v2(-75, 300), cc.v2(-150, 450)];
                var screenW = cc.find("Canvas").width;
                if (screenW < 720) {
                    let scale = screenW / 720;
                    for (var i = 0; i < bezier.length; i++) {
                        bezier[i].y = bezier[i].y * scale;
                        bezier[i].x = bezier[i].x * scale;
                    }

                }
                var bezierTo = cc.bezierTo(1, bezier);
                feedBtn.runAction(cc.sequence([bezierTo, cc.callFunc(function () {
                    feedBtn.getChildByName("superFeed").getComponent(cc.Animation).play("feidie");
                })]));
            }
        } else {
            feedBtn.active = false;
            // feedBtn.stopAllActions();
        }

    },

    falloutHambu(data) {
        this.isFeeding = true;
        let that = this;

        var feedBtn = cc.find("superfeeNode", this.node);
        var light = cc.find("superFeed/send", feedBtn);
        that.giftbtn.active = false;
        for (let i = 0; i < that.shitList.length; i++) {
            that.shitList[i].active = false;
        }
        var centPos = cc.v2(0, 460);
        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            let scale = screenW / 720;
            centPos.x = centPos.x * scale;
            centPos.y = centPos.y * scale;

        }

        cc.find("superfeeNode", this.node).runAction(cc.sequence(cc.moveTo(0.5, centPos), cc.callFunc(function () {
            light.active = true;
            var anim = light.getComponent(cc.Animation);
            anim.play("light");
            var length = 0;
            if (miDB.SceneData.index == 1) {
                length = miDB.MasterData.getBuildListLength() - 9;
            } else if (miDB.SceneData.index == 0) {
                length = miDB.MasterData.getBuildListLength() > 9 ? 9 : miDB.MasterData.getBuildListLength();
            }
            that.desc.active = true;
            let pos = feedBtn.getPosition();
            for (let i = 0; i < length; i++) {
                let harmburger = cc.instantiate(that.harmburger);
                harmburger.parent = that.node;
                harmburger.setPosition(pos);
                harmburger.runAction(cc.jumpTo(1, positions[i], 0, 3));
            }
            tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "allHide" });
        })));


    },

    close() {
        mi.UIManager.hideUI(this.uiName);
    },

    start() {
        this.feedCount = 0;
    },

    show(data) {
        console.log("shit SHow");

        if (this.shitList.length > 0) {
            for (var i = 0; i < this.shitList.length; i++) {
                this.shitList[i].destroy();
            }
        }

        this.shitList = [];
        var screenW = cc.find("Canvas").width;
        for (var j = 0; j < miDB.localData.shitList.length; j++) {
            if (miDB.localData.shitList[j].pos) {
                let shit = cc.instantiate(this.shit);
                shit.parent = this.node.getChildByName("shitNode");
                if (screenW < 720) {
                    let scale = screenW / 720;
                    shit.setPosition(miDB.localData.shitList[j].pos.x * scale, miDB.localData.shitList[j].pos.y * scale);
                } else {
                    shit.setPosition(miDB.localData.shitList[j]["pos"].x, miDB.localData.shitList[j]["pos"].y);
                }
                shit.active = true;
                let anim = shit.getComponent(cc.Animation);
                anim.play("shitComing");
                anim.on('finished', function () {
                    cc.find("particle", shit).active = true;
                }, this);
                shit.pos = { "x": miDB.localData.shitList[j].pos.x, "y": miDB.localData.shitList[j].pos.y }
                this.shitList.push(shit);
                this.buttonBind(shit.getComponent(cc.Button), this.shitList.length - 1);
            }
        }
    },

    update(dt) {

    },

    onDestroy() {
        tywx.NotificationCenter.ignore(miDB.EVENT.GAME_MONSTER_MASK, this.hideUIAction, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.SHIT_STATUS_ACTION, this.scenceAboutUI, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.SUPER_FEED_COUNT, this.ufoBack, this);
    },

    chosePos() {
        var posArray = [cc.v2(-120, -120), cc.v2(120, -120), cc.v2(-130, 55), cc.v2(150, 55)];
        if (miDB.MasterData.getBuildListLength() < 6) {
            posArray = [cc.v2(-120, -120), cc.v2(120, -120)];
        }

        //var posArray = location.splice(0, location.length);
        for (var i = 0; i < posArray.length; i++) {
            for (var j = 0; j < miDB.localData.shitList.length; j++) {
                if (posArray[i].x == miDB.localData.shitList[j].pos.x && posArray[i].y == miDB.localData.shitList[j].pos.y) {
                    posArray.splice(i, 1);
                    break;
                }
            }
        }
        var index = miTools.Utils.RandomNumBoth(0, posArray.length - 1);
        return posArray[index];
    },

    buttonBind: function (button, customEventData) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "ShitSystemModel";
        clickEventHandler.handler = "pickShitUp";
        button.clickEvents.push(clickEventHandler);
    },

    shitComing(data) {
        if (data.action == "new") {
            if (this.shitList.length < count) {
                var screenW = cc.find("Canvas").width;
                for (let i = 0; i < count - this.shitList.length; i++) {
                    let shit = cc.instantiate(this.shit);
                    shit.parent = this.node.getChildByName("shitNode");
                    let pos = this.chosePos();
                    if (screenW < 720) {
                        let scale = screenW / 720;
                        shit.setPosition(pos.x * scale, pos.y * scale);
                    } else {
                        shit.setPosition(pos);
                    }
                    shit.pos = pos;
                    miDB.localData.shitList.push({ "pos": { "x": pos.x, "y": pos.y } });
                    shit.opacity = 255;
                    shit.active = true;
                    let anim = shit.getComponent(cc.Animation);
                    anim.play("shitComing");
                    anim.on('finished', function () {
                        cc.find("particle", shit).active = true;
                    }, this);
                    this.shitList.push(shit);
                    this.buttonBind(shit.getComponent(cc.Button), this.shitList.length - 1);
                }
            }
        }
    },

    superFeed: function () {
        if (this.isFeeding) {
            return;
        }
        cc.audioEngine.play(this.audioClick, false, 1);
        mi.UIManager.showUI("SuperFeedModel", { ceng: 50 });
    },

    ufoBack: function (data) {
        this.feedCount++;
        var length = 0;
        if (miDB.SceneData.index == 1) {
            length = miDB.MasterData.getBuildListLength() - 9;
        } else if (miDB.SceneData.index == 0) {
            length = miDB.MasterData.getBuildListLength() > 9 ? 9 : miDB.MasterData.getBuildListLength();
        }
        if (length == this.feedCount) {
            let that = this;
            that.desc.active = false;
            this.feedCount = 0;
            var bezier = [cc.v2(150, 600), cc.v2(300, 300), cc.v2(490, 450)];
            var bezierTo = cc.bezierTo(1, bezier);
            var feedBtn = cc.find("superfeeNode", this.node);
            feedBtn.runAction(cc.sequence(bezierTo, cc.callFunc(function () {
                that.isFeeding = false;
                that.giftbtn.active = true;
                for (let i = 0; i < that.shitList.length; i++) {
                    that.shitList[i].active = true;
                }
                mi.UIManager.showUI("ShitAwardModel", {
                    ceng: 53,
                    gameData: {
                        titileSpName: "",
                        times: 1,
                        itemData: [{ type: "corn", num: miDB.MasterData.getTimeProduct(1800) }],
                        isShare: false,
                        okCallBack: function () {
                            var ttime = new Date(miDB.localData.systime * 1000);
                            ttime.setSeconds(ttime.getSeconds() + 3600);
                            miDB.localData.game.superFeedTime = Date.parse(ttime) / 1000;
                            miDB.localData.game.superFeedNum += 1;
                        }
                    }
                });
            })));
        }
    },

    //捡大便
    pickShitUp(event, customEventData) {


        if (this.isPickShit == true) {
            return;
        }
        this.isPickShit = true;
        // event.target.getComponent(cc.Button).enabled = false;
        var target = event.target;

        let that = this;
        var pos = event.target.pos;
        var index = miCfg.BoxToDataChoose(shitData);
        let data = JSON.parse(JSON.stringify(shitData[index]));
        if (data.type == "corn") {
            data.num = miTools.Utils.deAdd(miTools.Utils.deMul(miDB.GameData.DB.productEffic, data.num), '100').toString();

        }

        for (var i = 0; i < this.shitList.length; i++) {
            if (pos.x == this.shitList[i]["pos"].x && pos.y == this.shitList[i]["pos"].y) {
                if (data.kind != 1) {
                    let particle = cc.find("particle", target);
                    particle.getComponent(cc.ParticleSystem).stopSystem();
                    if (particle.active) {
                        particle.active = false;
                    }
                    var anim = target.getComponent(cc.Animation);
                    anim.play("shitPicked");
                    anim.finish = false;
                    anim.on('finished', function () {
                        mi.UIManager.showUI("ShitAwardModel", {
                            ceng: 53,
                            gameData: {
                                titileSpName: "",
                                times: 1,
                                itemData: [{ type: data.type, num: data.num }],
                                isShare: true,
                                sharePoint: miDB.SHAREPOINT.CLEAR_SHIT,
                                okCallBack: function () {
                                    miDB.localData.game.shitNum += 1;
                                    that.removeShit(pos);
                                }.bind(target)
                            }
                        });

                    }, this);
                } else {

                    let particle = cc.find("particle", this.shitList[i]);
                    particle.getComponent(cc.ParticleSystem).stopSystem();
                    if (particle.active) {
                        particle.active = false;
                    }
                    var anim = this.shitList[i].getComponent(cc.Animation);
                    anim.play("shitPicked");
                    var anim = this.shitList[i].getComponent(cc.Animation);
                    var label = cc.find("award", this.shitList[i]);
                    label.active = true;
                    label.getComponent(cc.Label).string = "+" + miTools.Utils.toLabelString(data.num);
                    var animLabel = label.getComponent(cc.Animation);
                    animLabel.play();
                    miTools.Utils.gainRewardAnim(that.node, [data], that.shitList, function () {
                        miDB.localData.game.shitNum += 1;
                        if (data.type == "corn") {
                            miDB.GameData.addCronCallback(miTools.Utils.deMul(data.num, 1).toString());
                        } else if (data.type == "diamond") {
                            miDB.GameData.addDiamCallback(miTools.Utils.deMul(data.num, 1).toString());
                        } else if (data.type == "mine") {
                            miDB.GameData.addMineCallback(miTools.Utils.deMul(data.num, 1).toString());
                        } else if (data.type == "chest") {
                            miDB.GameData.addChestCallback(miTools.Utils.deMul(data.num, 1).toString());
                        }
                    }.bind(target), target.getChildByName("icon"));
                    animLabel.on('finished', function () {
                        that.removeShit(pos);
                    }, this);
                }
                break;
            }
        }
    },

    removeShit(pos) {

        for (var k = 0; k < this.shitList.length; k++) {
            if (this.shitList[k]["pos"].x == pos.x && this.shitList[k]["pos"].y == pos.y) {

                this.shitList[k].destroy();
                this.shitList.splice(k, 1);
            }
        }
        for (var j = 0; j < miDB.localData.shitList.length; j++) {
            if (miDB.localData.shitList[j]["pos"].x == pos.x && miDB.localData.shitList[j]["pos"].y == pos.y) {
                miDB.localData.shitList.splice(j, 1);
            }
        }

        this.isPickShit = false;
    },

    rewardAnim(data, sprite) {
        let that = this;
        var worldPos = sprite.convertToWorldSpaceAR(sprite.getPosition())
        var resuPos = this.node.convertToNodeSpaceAR(worldPos);

        if (data.type == "corn") {
            let icon1 = cc.instantiate(this.coinSprite);
            icon1.parent = this.node;
            icon1.setPosition(resuPos);
            duration1 = parseFloat(Math.sqrt((that.pos.y - worldPos.y) * (that.pos.y - worldPos.y) + (that.pos.x - worldPos.x) * (that.pos.x - worldPos.x)) / 1000) || 0;
            icon1.runAction(cc.sequence(
                cc.moveBy(duration1, cc.v2(that.pos.x - worldPos.x, that.pos.y - worldPos.y)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获金币", type: 1 });
                    icon1.destroy();
                })
            ));
        } else if (data.type == "mine") {
            let icon2 = cc.instantiate(this.mineSprite);
            icon2.parent = this.node;
            icon2.setPosition(resuPos);
            duration2 = parseFloat(Math.sqrt((that.pos2.y - worldPos.y) * (that.pos2.y - worldPos.y) + (that.pos2.x - worldPos.x) * (that.pos2.x - worldPos.x)) / 1300) || 0;
            icon2.runAction(cc.sequence(
                cc.moveBy(duration2, cc.v2(that.pos2.x - worldPos.x, that.pos2.y - worldPos.y)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获彩矿", type: 2 });
                    icon2.destroy();
                })
            ));
        } else if (data.type == "diamond") {
            let icon3 = cc.instantiate(this.diamondSprite);
            icon3.parent = this.node;
            icon3.setPosition(resuPos);
            duration3 = parseFloat(Math.sqrt((that.pos3.y - worldPos.y) * (that.pos3.y - worldPos.y) + (that.pos3.x - worldPos.x) * (that.pos3.x - worldPos.x)) / 1300) || 0;
            icon3.runAction(cc.sequence(
                cc.moveBy(duration3, cc.v2(that.pos3.x - worldPos.x, that.pos3.y - worldPos.y)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获钻石", type: 3 });
                    icon3.destroy();
                })
            ));
        } else if (data.type == "chest") {
            let icon4 = cc.instantiate(sprite);
            icon4.parent = this.node;
            icon4.setPosition(resuPos);
            duration4 = parseFloat(Math.sqrt((that.pos4.y - worldPos.y) * (that.pos4.y - worldPos.y) + (that.pos4.x - worldPos.x) * (that.pos4.x - worldPos.x)) / 1300) || 0;
            icon4.runAction(cc.sequence(
                cc.moveTo(duration4, cc.v2(226, -515)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获信纸", type: 4 });
                    icon4.destroy();
                })
            ));
        }
    },
});
