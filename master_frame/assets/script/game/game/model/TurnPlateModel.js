
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "TurnPlateModel",
        turnItem: cc.Prefab,
        upGradeItem: cc.Prefab,

    },

    onLoad() {
        tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_IN, this.fadeIN, this);
        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            this.node.getChildByName("bg").scale = screenW / 720;
        }
        this.coinSprite = cc.find("Canvas/FirstModel/topMenu/money/coin");
        this.pos = this.coinSprite.convertToWorldSpaceAR(this.coinSprite.getPosition());
        this.mineSprite = cc.find("Canvas/FirstModel/topMenu/orc/coin");
        this.pos2 = this.mineSprite.convertToWorldSpaceAR(this.mineSprite.getPosition())
        this.diamondSprite = cc.find("Canvas/FirstModel/topMenu/diamond/coin");
        this.pos3 = this.diamondSprite.convertToWorldSpaceAR(this.diamondSprite.getPosition());
        this.bookSprite = cc.find("Canvas/GameUE/bottomMenu/handbook");
        this.pos4 = this.bookSprite.convertToWorldSpaceAR(this.bookSprite.getPosition());

        this.times = 1;// 消耗转盘体力倍数
        this.speed = 500;
        this.maxRote = 360;
        this.turnList = [];
        this.turnPlate = cc.find("bg/turnTable", this.node);
        this.powerNode = cc.find("bg/powerNode", this.node);
        this.needle = cc.find("bg/turnCent/needleNode/needle", this.node);
  



    }, updateUI() {

        if ( this.times> miDB.TurnTableData.power )
        {
            this.btTimeCallBack();
        }

        var x0 = 0;
        var y0 = 0;
        var r = 195;

        for (var i = 0; i < miDB.TurnTableData.turnData.length; i++) {
            var x1 = x0 + r * Math.cos(this.maxRote / miDB.TurnTableData.turnData.length * (i + 1) * 3.14 / 180);
            var y1 = y0 + r * Math.sin(this.maxRote / miDB.TurnTableData.turnData.length * (i + 1) * 3.14 / 180);
            var item;
            if (!this.turnList[i]) {
                item = cc.instantiate(this.turnItem);
                item.setPosition(x1, y1);
                item.parent = this.turnPlate;
                var result = Math.atan(x1 / y1) / (Math.PI / 180);
                item.rotation = result;
                if (i >= miDB.TurnTableData.turnData.length / 2) {
                    item.rotation = result + 180;
                }
                this.turnList.push(item);
                item.usData = JSON.parse(JSON.stringify(miDB.TurnTableData.turnData[i]));
                item.usData.rotate = this.getVectorRadians(x1, y1, 0, 0);
            } else {
                item = this.turnList[i];
                var rote = item.usData.rotate;
                item.usData = JSON.parse(JSON.stringify(miDB.TurnTableData.turnData[i]));
                item.usData.rotate = rote;
            }




            if (item.usData.type == "corn") {
                if (item.usData.kind == 1) {
                    miTools.Utils.loadSprite(item, "image/tplist/turnTable", "xyzp_icon_jb");
                  //  cc.find("label", item).getComponent(cc.Label).string = "小袋金币";
                } else if (item.usData.kind == 2) {
                    miTools.Utils.loadSprite(item, "image/tplist/turnTable", "xyzp_icon_jb");
                    //cc.find("label", item).getComponent(cc.Label).string = "大袋金币";
                }

                item.usData.num = miTools.Utils.deAdd(miTools.Utils.deMul(miDB.GameData.DB.productEffic, item.usData.num), '100').toString();
                cc.find("label", item).getComponent(cc.Label).string = miTools.Utils.toLabelString(item.usData.num);

            }
            else if (item.usData.type == "fightBoss") {
                miTools.Utils.loadSprite(item, "image/tplist/turnTable", "xyzp_icon_gs");
                cc.find("label", item).getComponent(cc.Label).string = "战斗";
            }
            else if (item.usData.type == "chest") {
                miTools.Utils.loadSprite(item, "image/tplist/turnTable", "xyzp_icon_bx");
                // cc.find("label", item).getComponent(cc.Label).string = miTools.Utils.toLabelString(item.usData.num);
                cc.find("label", item).getComponent(cc.Label).string = "宝箱";
            }
            else if (item.usData.type == "mine") {
                miTools.Utils.loadSprite(item, "image/tplist/turnTable", "xyzp_icon_ck");
                var a = 0.38;
                var b = 0.038;
                var mine = miTools.Utils.deMul(miDB.GameData.DB.productEffic, item.usData.num);
                mine = miTools.Utils.dePower(mine, a);
                mine = miTools.Utils.deMul(mine, b);
                var needResult = miTools.Utils.comparedTo(mine, "0");
                if (needResult <= 0) {
                    mine = 2;
                }
                item.usData.num = mine.toString();
                 cc.find("label", item).getComponent(cc.Label).string = miTools.Utils.toLabelString(item.usData.num);

                // if (item.usData.kind == 1) {
                //     cc.find("label", item).getComponent(cc.Label).string = "小袋彩矿";
                // }
                // else if (item.usData.kind == 2) {
                //     cc.find("label", item).getComponent(cc.Label).string = "大袋彩矿";
                // }

            }
            else if (item.usData.type == "diamond") {
                if (item.usData.kind == 1) {
                    miTools.Utils.loadSprite(item, "image/tplist/turnTable", "xyzp_icon_zs");
                  //  cc.find("label", item).getComponent(cc.Label).string = "小袋钻石";
                } else if (item.usData.kind == 2) {
                    miTools.Utils.loadSprite(item, "image/tplist/turnTable", "xyzp_icon_zs");
                  //  cc.find("label", item).getComponent(cc.Label).string = "大袋钻石";
                }
                 cc.find("label", item).getComponent(cc.Label).string = miTools.Utils.toLabelString(item.usData.num);
            }
            else if (item.usData.type == "upLevel") {
                miTools.Utils.loadSprite(item, "image/tplist/turnTable", "xyzp_icon_sj");
                if (item.usData.kind == 1) {
                   
                } else if (item.usData.kind == 2) {

                }
                cc.find("label", item).getComponent(cc.Label).string = "Lv+" + item.usData.num;
              //  cc.find("label", item).getComponent(cc.Label).string = "随机怪兽LV+" + item.usData.num;
            }


        }

        this.resultData = null;

    },
    fadeIN() {
        this.node.active = true;

        this.isTurn = false;
        this.resultData = null;
        this.updateUI();
    },

    getVectorRadians(x1, y1, x2, y2) {
        let len_y = y2 - y1;
        let len_x = x2 - x1;
        let tan_yx = tan_yx = Math.abs(len_y) / Math.abs(len_x);
        let angle = 0;
        if (len_y > 0 && len_x < 0) {
            angle = Math.atan(tan_yx) * 180 / Math.PI - 90;
        } else if (len_y > 0 && len_x > 0) {
            angle = 90 - Math.atan(tan_yx) * 180 / Math.PI;
        } else if (len_y < 0 && len_x < 0) {
            angle = -Math.atan(tan_yx) * 180 / Math.PI - 90;
        } else if (len_y < 0 && len_x > 0) {
            angle = Math.atan(tan_yx) * 180 / Math.PI + 90;
        }
        return 180 - angle;
    },



    show: function (data) {

        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "allHide" });
        this.turnPlate.stopAllActions();
        this.isTurn = false;
        cc.find("bg/timeLabel", this.node).getComponent(cc.Label).string = "消耗x" + this.times;
        this.updateUI();
        miDB.GuidData.isFistTurnTable = true;
        tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE);
    },

    start() {

    },

    update(dt) {
        cc.find("powerLabel", this.powerNode).getComponent(cc.Label).string = "剩余体力:" + miDB.TurnTableData.power + "/20";
        this.powerNode.getComponent(cc.ProgressBar).progress = parseFloat(miDB.TurnTableData.power / 20);

        if (miDB.TurnTableData.power >= 20) {
            cc.find("timeLabel", this.powerNode).getComponent(cc.Label).string = "体力已满";
        } else {
            let sub2 = miDB.TurnTableData.upDatetime - miDB.localData.systime;
            if (sub2 < 0) {
                sub2 = 0;
            }
            let min = parseInt((sub2) / 60) > 9 ? parseInt((sub2) / 60) : "0" + parseInt((sub2) / 60);
            let second = parseInt((sub2) % 60) > 9 ? parseInt((sub2) % 60) : "0" + parseInt((sub2) % 60);
            cc.find("timeLabel", this.powerNode).getComponent(cc.Label).string = min + ":" + second + "后恢复1点体力";

        }

    },
    //开启转盘
    startTurnPlate() {

        if (miDB.TurnTableData.power <= 0) {
            return;
        }
        if (this.isTurn == true) {
            return;
        }
        // var lantern = cc.find("bg/turnCent/lantern", this.node);
        // miTools.Utils.loadSprite(lantern, "image/tplist/turnTable", "xyzp_bg_deng_2");
        // var anim = lantern.getComponent(cc.Animation);
        // var animState = anim.play('lantern');
        // animState.wrapMode = 2;

        this.isTurn = true;
        var speed = this.speed
        var maxRote = this.maxRote;
        var orginRote = (parseInt(this.turnPlate.rotation / maxRote) + 1) * maxRote - this.turnPlate.rotation;
        var itemRote = maxRote;
        var self = this;
        var seq = [
            cc.callFunc(function () {
                self.turnPlate.runAction(cc.rotateBy(parseFloat(orginRote / (speed - 100)), orginRote).easing(cc.easeSineIn()));
                // self.needle.parent.runAction(cc.rotateTo(parseFloat(orginRote / (speed - 100)), -20).easing(cc.easeSineIn()));
                var anim = self.needle.getComponent(cc.Animation);
                var animState = anim.play('needle');
                animState.wrapMode = 2;
            }),
            cc.delayTime(parseFloat(orginRote / (speed - 100))),
            cc.callFunc(function () {
                self.turnPlate.runAction(cc.rotateBy(parseFloat(itemRote / speed), itemRote).repeatForever());
            })
        ];
        var seq1 = cc.sequence(seq);
        this.turnPlate.runAction(seq1);
        this.timeTurn =2000;
        setTimeout(function () {
            this.timeTurn=2001;
            this.getCardData();
        }.bind(this), this.timeTurn);

        if (tywx.isInWeChatPath) {
            this.postTurn();
        } else {
            miDB.localData.game.isFistTurnTable = false;
            tywx.NotificationCenter.trigger(miDB.EVENT.FINISH_TURN_TABLE);
        }

    },
    postTurn() {
        var data = {
            "times": this.times,
            "isFirstTurn": "" + miDB.localData.game.isFistTurnTable,
        }
        tywx.postMethodTurnCall("monster/getTurnType/" + tywx.UserInfo.openid, data, this.getTurnCardeDataCallBack, this, this.postTurn);
        miDB.localData.game.isFistTurnTable = false;
        tywx.NotificationCenter.trigger(miDB.EVENT.FINISH_TURN_TABLE);
    },

    getTurnCardeDataCallBack(data) {
        if (data.data.code == 0) {
            this.times = data.data.data.times;
            miDB.TurnTableData.power = data.data.data.power;
            this.resultData = { "card": data.data.data.card, "times": data.data.data.times };
            if ( this.timeTurn>2000)
            {
                this.getCardData();
            }
    
        }

   

    },
    getCardData() {
        if (tywx.isInWeChatPath) {
            if (this.resultData != null) {
                var index = null
                for (var i = 0; i < this.turnList.length; i++) {
                    if (this.turnList[i].usData.id == this.resultData.card.id) {
                        index = i;
                        break;
                    }

                }
                if (index != null) {
                    var rotate = this.turnList[index].usData.rotate;
                    this.endTurnPlate(rotate);
                }
            }
        } else {
            var index = miTools.Utils.RandomNumBoth(0, this.turnList.length - 1);
            // index = 2;
            var rotate = this.turnList[index].usData.rotate;
            this.resultData = { "card": JSON.parse(JSON.stringify(this.turnList[index].usData)), "times": this.times };
            this.endTurnPlate(rotate);
            miDB.TurnTableData.power -= this.times;
        }


    },

    endTurnPlate(dataRote) {

        var self = this;
        var speed = this.speed
        var maxRote = this.maxRote;
        var orginRote = (parseInt(this.turnPlate.rotation / maxRote) + 1) * maxRote - this.turnPlate.rotation;
        var itemRote = maxRote + dataRote;
        var seq = [
            cc.rotateBy(parseFloat(orginRote / speed), orginRote),
            cc.callFunc(function () {
                self.turnPlate.runAction(cc.rotateBy(parseFloat(itemRote / (speed - 200)), itemRote).easing(cc.easeSineOut()));
                // self.needle.parent.runAction(cc.rotateTo(parseFloat(itemRote / (speed - 200)), 0).easing(cc.easeSineOut()));
                var anim = self.needle.getComponent(cc.Animation);
                var animState = anim.play('needle');
                animState.repeatCount = parseInt(parseFloat(itemRote / (speed - 200)) / parseFloat(animState.duration / animState.speed));
            }),

            cc.delayTime(parseFloat(itemRote / (speed - 200))),
            cc.delayTime(0.5),
            cc.callFunc(function () {
                self.handleResult();


            }),
        ];
        var seq1 = cc.sequence(seq);
        this.turnPlate.stopAllActions();
        this.turnPlate.runAction(seq1);
    },

    superAward() {

        var self = this;
        mi.UIManager.showUI("ShitAwardModel", {
            ceng: 53,
            gameData: {
                titileSpName: "",
                times: 1,
                itemData: [{ type: this.resultData.card.type, num: miTools.Utils.deMul(this.resultData.card.num, this.resultData.times).toString() }],
                isShare: false,
                sharePoint: miDB.SHAREPOINT.TURN_TABLE,
                okCallBack: function () {
          
                    self.isTurn = false;
                    self.resultData = null;
                    self.updateUI();
                }.bind(this)
            }
        });
        // var lantern = cc.find("bg/turnCent/lantern", this.node);
        // var anim = lantern.getComponent(cc.Animation);
        // var animState = anim.play('lantern');
        // animState.wrapMode = 1;

    },


    handleResult() {

        if (this.resultData.card.type == "corn") {
            if (this.resultData.card.kind == 1) {
                //   this.getGainAction();
                // mi.UIManager.showUIParent("AwardModel", JSON.stringify([{ "num": miTools.Utils.deMul(this.resultData.card.num, this.resultData.times).toString(), "type": this.resultData.card.type }]), this.node);
            } else if (this.resultData.card.kind == 2) {
                // this.superAward();

            }
            this.superAward();

        }

        else if (this.resultData.card.type == "chest") {
            //  this.getGainAction();
            this.superAward();
        }
        else if (this.resultData.card.type == "mine") {
            // if (this.resultData.card.kind == 1) {
            //     this.getGainAction();
            // } else if (this.resultData.card.kind == 2) {
            //     this.superAward();
            // }
            this.superAward();
        }
        else if (this.resultData.card.type == "diamond") {
            // if (this.resultData.card.kind == 1) {
            //     this.getGainAction();
            // } else if (this.resultData.card.kind == 2) {
            //     this.superAward();
            // }
            this.superAward();
        }
        else if (this.resultData.card.type == "upLevel") {

            if (this.resultData.card.kind == 1) {

            } else if (this.resultData.card.kind == 2) {

            }

            if (miDB.MasterData.getBuildListLength() == 0) {
      
                this.isTurn = false;
                this.resultData = null;
                this.updateUI();
                wx.showToast({ title: "怪物开启数量为0" });
                return;
            }



            var index = miTools.Utils.RandomNumBoth(0, miDB.MasterData.getBuildListLength() - 1);
            var data = miDB.MasterData.getMaster(index + 1);
            let item = cc.instantiate(this.upGradeItem);
            item.setPosition(0, 0);
            item.parent = this.node;
            cc.find("upgrade/sprite/level", item).getComponent(cc.Label).string = "LV" + data.level + " -> LV" + (data.level + this.resultData.card.num * this.resultData.times);
            data.changeAddLevel(this.resultData.card.num * this.resultData.times);
            //  cc.find("upgrade/sprite/earning", item).getComponent(cc.Label).string = "收益加成" + (miCfg.HandbookLevelConfig[level - 2].gainCode) + "倍 - " + (miCfg.HandbookLevelConfig[level - 1].gainCode + "倍");
            miTools.Utils.loadSprite(item.getChildByName("upgrade").getChildByName("icon"), "image/tplist/game_master", miCfg.Master[(index + 1) + ""].MasterShapeName);
            item.getChildByName("upgrade").getChildByName("icon_bg").runAction(cc.repeatForever(cc.rotateBy(4, 360)));
            this.buttonBind(item.getComponent(cc.Button));
        }
        else if (this.resultData.card.type == "fightBoss") {

            this.node.active = false;
            tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_BOSS_TIME, { times: this.times });
        }


    },
    hadUpGrade(event) {
        event.target.destroy();
        this.isTurn = false;
        this.resultData = null;
        this.updateUI();


    },
    buttonBind: function (button) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "TurnPlateModel";
        clickEventHandler.handler = "hadUpGrade";
        if (button.clickEvents.length == 0) {
            button.clickEvents.push(clickEventHandler);
        }
    },
    notifyDataChanged() {


        if (this.resultData.card.type == "corn") {
            miDB.GameData.addCronCallback(miTools.Utils.deMul(this.resultData.card.num, this.resultData.times).toString());
        }

        else if (this.resultData.card.type == "chest") {
            miDB.GameData.addChestCallback(miTools.Utils.deMul(this.resultData.card.num, this.resultData.times).toString());
        }
        else if (this.resultData.card.type == "mine") {
            miDB.GameData.addMineCallback(miTools.Utils.deMul(this.resultData.card.num, this.resultData.times).toString());
        }
        else if (this.resultData.card.type == "diamond") {
            miDB.GameData.addDiamCallback(this.resultData.card.num * this.resultData.times);
        }
      
        this.isTurn = false;
        this.resultData = null;
        this.updateUI();
    },

    btTimeCallBack() {

        if (this.isTurn == true) {
            return;
        }

        if (   miDB.TurnTableData.power >=2&&this.times == 1) {
            this.times = 2;
        }
        else if (miDB.TurnTableData.power >=1&&this.times == 2) {
            this.times = 1;
        }
        cc.find("bg/timeLabel", this.node).getComponent(cc.Label).string = "消耗x" + this.times;
    },
    close() {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "showAll" });
        mi.UIManager.hideUI("TurnPlateModel", { ceng: 50 });
        miDB.GuidData.isFistTurnTable = false;
    },

    getGainAction() {

        // var lantern = cc.find("bg/turnCent/lantern", this.node);
        // var anim = lantern.getComponent(cc.Animation);
        // var animState = anim.play('lantern');
        // animState.wrapMode = 1;


        let that = this;
        let duration = 0;


        var worldPos = this.node.convertToWorldSpaceAR(this.node.getPosition())
        var resuPos = this.node.convertToNodeSpaceAR(worldPos);

        let icon4 = cc.instantiate(this.diamondSprite);

        icon4.parent = this.node;
        icon4.setPosition(cc.v2(resuPos.x, 260));
        if (this.resultData.card.type == "corn") {
            miTools.Utils.loadSprite(icon4, "image/tplist/gameUiTwo", "gssd_icon_jb");
            duration = parseFloat(Math.sqrt((that.pos.y - worldPos.y) * (that.pos.y - worldPos.y) + (that.pos.x - worldPos.x) * (that.pos.x - worldPos.x)) / 1000);
            icon4.runAction(cc.sequence(
                cc.moveBy(duration, cc.v2(that.pos.x - worldPos.x, that.pos.y - worldPos.y)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获金币", type: 1 });
                    icon4.destroy();
                })
            ));
        }


        else if (this.resultData.card.type == "mine") {
            miTools.Utils.loadSprite(icon4, "image/tplist/gameUiTwo", "gssd_icon_ck");
            duration = parseFloat(Math.sqrt((that.pos2.y - worldPos.y) * (that.pos2.y - worldPos.y) + (that.pos2.x - worldPos.x) * (that.pos2.x - worldPos.x)) / 1300);
            icon4.runAction(cc.sequence(
                cc.moveBy(duration, cc.v2(that.pos2.x - worldPos.x, that.pos2.y - worldPos.y)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获彩矿", type: 2 });
                    icon4.destroy();
                })
            ));

        }
        else if (this.resultData.card.type == "diamond") {

            miTools.Utils.loadSprite(icon4, "image/tplist/gameUiTwo", "gssd_icon_zs");
            duration = parseFloat(Math.sqrt((that.pos3.y - worldPos.y) * (that.pos3.y - worldPos.y) + (that.pos3.x - worldPos.x) * (that.pos3.x - worldPos.x)) / 1300);
            icon4.runAction(cc.sequence(
                cc.moveBy(duration, cc.v2(that.pos3.x - worldPos.x, that.pos3.y - worldPos.y)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获钻石", type: 3 });
                    icon4.destroy();
                })
            ));

        }
        else if (this.resultData.card.type == "chest") {
            miTools.Utils.loadSprite(icon4, "image/tplist/gameUiTwo", "gstj_icon_baoxiang");
            duration = parseFloat(Math.sqrt((that.pos4.y - worldPos.y) * (that.pos4.y - worldPos.y) + (that.pos4.x - worldPos.x) * (that.pos4.x - worldPos.x)) / 1300) || 0;
            icon4.runAction(cc.sequence(
                cc.moveTo(duration, cc.v2(226, -515)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获箱纸", type: 4 });
                    icon4.destroy();
                })
            ));
        }
        duration = duration * 1000 + 500;
        setTimeout(function () {
            this.notifyDataChanged();
        }.bind(this), duration);

    },

});
