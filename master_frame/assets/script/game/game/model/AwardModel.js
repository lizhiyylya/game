
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "AwardModel",
        rewardContent: cc.Node,
        rewardItem: cc.Prefab,
        closeRewards: cc.Node,
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        this.coinSprite = cc.find("Canvas/FirstModel/topMenu/money/coin");
        this.pos = this.coinSprite.convertToWorldSpaceAR(this.coinSprite.getPosition());
        this.mineSprite = cc.find("Canvas/FirstModel/topMenu/orc/coin");
        this.pos2 = this.mineSprite.convertToWorldSpaceAR(this.mineSprite.getPosition())
        this.diamondSprite = cc.find("Canvas/FirstModel/topMenu/diamond/coin");
        this.pos3 = this.diamondSprite.convertToWorldSpaceAR(this.diamondSprite.getPosition());
        this.bookSprite = cc.find("Canvas/GameUE/bottomMenu/handbook");
        this.pos4 = this.bookSprite.convertToWorldSpaceAR(this.bookSprite.getPosition());
    },

    start() {

    },

    show(data) {
        let that = this;
        that.closeRewards.active = false;
        this.rewardContent.removeAllChildren();

        this.rewardNode = [];
        this.rewardList = [];
        miTools.Utils.layerOpenAction(cc.find("rewrad", this.node));
        let rewardList = JSON.parse(data);
        that.rewardList = that.rewardList.concat(rewardList);
        for (let i = 0; i < rewardList.length; i++) {
            let item = cc.instantiate(that.rewardItem);
            that.rewardNode.push(item);

            if (rewardList[i].type == "card") {
                // item.getChildByName("name").getComponent(cc.Label).string = "怪物卡片";
                item.getChildByName("name").getComponent(cc.Label).string = rewardList[i].monsterName;
                item.getChildByName("count").getComponent(cc.Label).string = "x" + rewardList[i].num;
                miTools.Utils.loadSprite(item.getChildByName("icon"), "image/tplist/game_master", rewardList[i].bookIconName);
            } else if (rewardList[i].type == "mine") {
                item.getChildByName("name").getComponent(cc.Label).string = "矿石";
                item.getChildByName("count").getComponent(cc.Label).string = "x" + rewardList[i].num;
                miTools.Utils.loadSprite(item.getChildByName("icon"), "image/tplist/gameUiTwo", "ui_icon_ck");
            } else if (rewardList[i].type == "diamond") {
                item.getChildByName("name").getComponent(cc.Label).string = "钻石";
                item.getChildByName("count").getComponent(cc.Label).string = "x" + rewardList[i].num;
                miTools.Utils.loadSprite(item.getChildByName("icon"), "image/tplist/gameUiTwo", "ui_icon_zs");
            } else if (rewardList[i].type == "corn") {
                item.getChildByName("name").getComponent(cc.Label).string = "金币";
                item.getChildByName("count").getComponent(cc.Label).string = "x" + miTools.Utils.toLabelString(rewardList[i].num);
                miTools.Utils.loadSprite(item.getChildByName("icon"), "image/tplist/gameUiTwo", "ui_icon_jb");
            }

            else if (rewardList[i].type == "chest") {
                item.getChildByName("name").getComponent(cc.Label).string = "宝箱";
                item.getChildByName("count").getComponent(cc.Label).string = "x" + miTools.Utils.toLabelString(rewardList[i].num);
                miTools.Utils.loadSprite(item.getChildByName("icon"), "image/tplist/gameUiTwo", "gstj_icon_baoxiang");
            }


            that.rewardNode[i].runAction(cc.sequence(
                cc.delayTime(i * 0.2),
                cc.scaleTo(0.1, 0.7),
                cc.scaleTo(0.1, 1),
                cc.callFunc(function () {
                    item.parent = that.rewardContent;
                    if ((i + 1) == rewardList.length) {
                        that.closeRewards.active = true;
                    }

                })
            ));
        }
    },

    update(dt) {

    },

    onDestroy() {

    },

    closeReward: function () {
        cc.audioEngine.play(this.audio, false, 1);

        let that = this;
        let duration1 = 0;
        let duration2 = 0;
        let duration3 = 0;
        let duration4 = 0;
        // console.log(this.rewardList)
        for (let i = 0; i < this.rewardList.length; i++) {
            let sprite = this.rewardNode[i].getChildByName("icon");
            var worldPos = sprite.convertToWorldSpaceAR(sprite.getPosition())
            var resuPos = this.node.convertToNodeSpaceAR(worldPos);

            if (this.rewardList[i].type == "corn") {
                let icon1 = cc.instantiate(this.coinSprite);
                icon1.parent = this.node;
                icon1.setPosition(cc.v2(resuPos.x, resuPos.y + sprite.height));
                duration1 = parseFloat(Math.sqrt((that.pos.y - worldPos.y) * (that.pos.y - worldPos.y) + (that.pos.x - worldPos.x) * (that.pos.x - worldPos.x)) / 1000);
                icon1.runAction(cc.sequence(
                    // cc.moveTo(duration1, that.coinPos).easing(cc.easeIn(4.0)),
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
                icon2.setPosition(cc.v2(resuPos.x, resuPos.y + sprite.height));
                duration2 = parseFloat(Math.sqrt((that.pos2.y - worldPos.y) * (that.pos2.y - worldPos.y) + (that.pos2.x - worldPos.x) * (that.pos2.x - worldPos.x)) / 1300);
                icon2.runAction(cc.sequence(
                    // cc.moveTo(duration2, that.minePos).easing(cc.easeIn(4.0)),
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
                icon3.setPosition(cc.v2(resuPos.x, resuPos.y + sprite.height));
                duration3 = parseFloat(Math.sqrt((that.pos3.y - worldPos.y) * (that.pos3.y - worldPos.y) + (that.pos3.x - worldPos.x) * (that.pos3.x - worldPos.x)) / 1300);
                icon3.runAction(cc.sequence(
                    // cc.moveTo(duration3, that.diamondPos).easing(cc.easeIn(4.0)),
                    cc.moveBy(duration3, cc.v2(that.pos3.x - worldPos.x, that.pos3.y - worldPos.y)).easing(cc.easeIn(4.0)),
                    cc.fadeOut(),
                    cc.callFunc(function () {
                        tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获钻石", type: 3 });
                        icon3.destroy();
                    })
                ));
            }

            else if (this.rewardList[i].type == "chest") {
                let icon4 = cc.instantiate(this.diamondSprite);
                miTools.Utils.loadSprite(icon4, "image/tplist/gameUiTwo", "gstj_icon_baoxiang");
                icon4.parent = this.node;
                icon4.setPosition(cc.v2(resuPos.x, resuPos.y + sprite.height));
                duration4 = parseFloat(Math.sqrt((that.pos4.y - worldPos.y) * (that.pos4.y - worldPos.y) + (that.pos4.x - worldPos.x) * (that.pos4.x - worldPos.x)) / 1300) || 0;
                icon4.runAction(cc.sequence(
                    cc.moveTo(duration4, cc.v2(226, -515)).easing(cc.easeIn(4.0)),
                    cc.fadeOut(),
                    cc.callFunc(function () {
                        tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获箱纸", type: 4 });
                        icon4.destroy();
                    })
                ));



            }



        }

        let duration = Math.max(duration1, duration2, duration3, duration4) * 1000 + 200;
        setTimeout(function () {
            if (this.node.parent.getComponent(this.node.parent.name).notifyDataChanged) {
                this.node.parent.getComponent(this.node.parent.name).notifyDataChanged();
            }
            this.node.destroy();
        }.bind(this), duration);
    },
});
