

var rewardData = [
    { index: 0, numCode: "18000", url: "image/gameLayer/icon_jb", name: 'dljl_icon_jb', title: "dl_bg_d1", desc: "DAY1", type: "cron" },
    { index: 1, num: "3", url: "image/gameLayer/icon_jb", name: 'dljl_icon_bx', title: "dl_bg_d2", desc: "DAY2", type: "chest" },
    { index: 2, num: "30", url: "image/gameLayer/icon_zs", name: 'dljl_icon_zs', title: "dl_bg_d3", desc: "DAY3", type: "diam" },
    { index: 3, numCode: "36000", url: "image/gameLayer/icon_jb", name: 'dljl_icon_jb', title: "dl_bg_d4", desc: "DAY4", type: "cron" },
    { index: 4, num: "5", url: "image/gameLayer/icon_jb", name: 'dljl_icon_bx', title: "dl_bg_d5", desc: "DAY5", type: "chest" },
    { index: 5, numCode: "54000", url: "image/gameLayer/icon_jb", name: 'dljl_icon_jb', title: "dl_bg_d6", desc: "DAY6", type: "cron" },
    { index: 6, num: "100", url: "image/gameLayer/icon_zs", name: 'mrdl', title: "dl_bg_d7", desc: "DAY7", type: "diam" },
];

var firstReward = [
    { index: 0, num: "2000", url: "image/gameLayer/icon_jb", name: 'dljl_icon_jb', title: "dl_bg_d1", desc: "DAY1", type: "cron" },
    { index: 1, num: "3", url: "image/gameLayer/icon_jb", name: 'dljl_icon_bx', title: "dl_bg_d2", desc: "DAY2", type: "chest" },
    { index: 2, num: "30", url: "image/gameLayer/icon_zs", name: 'dljl_icon_zs', title: "dl_bg_d3", desc: "DAY3", type: "diam" },
    { index: 3, num: "500000", url: "image/gameLayer/icon_jb", name: 'dljl_icon_jb', title: "dl_bg_d4", desc: "DAY4", type: "cron" },
    { index: 4, num: "5", url: "image/gameLayer/icon_jb", name: 'dljl_icon_bx', title: "dl_bg_d5", desc: "DAY5", type: "chest" },
    { index: 5, num: "8000000", url: "image/gameLayer/icon_jb", name: 'dljl_icon_jb', title: "dl_bg_d6", desc: "DAY6", type: "cron" },
    { index: 6, num: "100", url: "image/gameLayer/icon_zs", name: 'mrdl', title: "dl_bg_d7", desc: "DAY7", type: "diam" },
];



cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "RewardModel",
        rewardItem: cc.Prefab,
        isHave: cc.SpriteFrame,
        isLock: cc.SpriteFrame,
        isCurr: cc.SpriteFrame,
        clickBtn: cc.Button,
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },
    initData() {

        if (miDB.localData.game.singTime == "null") {
            var nndata = JSON.stringify(firstReward);
            tywx.Util.setItemToLocalStorage("reward", nndata);
            this.chooseData = firstReward;


        } else {
            if (new Date(miDB.localData.game.singTime * 1000).getDate() == new Date(miDB.localData.systime * 1000).getDate()) {
                var value = tywx.Util.getItemFromLocalStorage("reward", "null");
                if (value != "null") {
                    var nndata = JSON.parse(value);
                    this.chooseData = nndata;

                } else {
                    for (var i = 0; i < rewardData.length; i++) {
                        if (rewardData[i].type == "cron") {

                            rewardData[i].num = miTools.Utils.deAdd(miTools.Utils.deMul(rewardData[i].numCode, miDB.GameData.DB.productEffic), "100").toString();

                        }
                    }
                    var nndata = JSON.stringify(rewardData);
                    tywx.Util.setItemToLocalStorage("reward", nndata);
                    this.chooseData = rewardData;

                }

            } else {

                for (var i = 0; i < rewardData.length; i++) {
                    if (rewardData[i].type == "cron") {
                        rewardData[i].num = miTools.Utils.deAdd(miTools.Utils.deMul(rewardData[i].numCode, miDB.GameData.DB.productEffic), "100").toString();
                    }
                }
                var nndata = JSON.stringify(rewardData);
                tywx.Util.setItemToLocalStorage("reward", nndata);
                this.chooseData = rewardData;


            }


        }



    },

    onLoad() {
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            cc.find("game_Layer_LoginBg", this.node).scale = screenW / 720;

        }
    },


    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.close();
        }

    },

    start() {
        this.buttonArray = [];
        this.initData();

        for (var i = 0; i < 7; i++) {
            var btDay = cc.find("game_Layer_LoginBg/rewardNode/bt_day" + (i + 1), this.node);
            var rew = cc.instantiate(this.rewardItem);
            this.updateItem(rew, this.chooseData, i);
            btDay.addChild(rew, 0);

            this.buttonArray.push(btDay);
            if (i == 6) {
                rew.active = false;
            }
        }
        this.updateUI();
    },

    updateItem(target, datas, index) {

        let data = datas[index];

        if (index != 6) {
            if (data.type == "cron") {
                //var corn = miTools.Utils.deMul(data.num, miDB.GameData.DB.productEffic).toString();

                cc.find("reward/num", target).getComponent(cc.Label).string = "x " + miTools.Utils.toLabelString(data.num);
            } else {
                cc.find("reward/num", target).getComponent(cc.Label).string = "x " + miTools.Utils.toLabelString(data.num);
            }
        }
        // else {
        //     cc.find("bg", target).active = false;
        // }
        // miTools.Utils.loadSprite(cc.find("LALLA", target), "image/tplist/gameLayer", data.title);
        cc.find("LALLA", target).getComponent(cc.Label).string = "DAY" + (index + 1);


    },

    updateSprite(target, data) {
        target.getComponent(cc.Sprite).spriteFrame = data;
    },

    gainReward(data) {

        if (new Date(miDB.localData.game.singTime * 1000).getDate() == new Date(miDB.localData.systime * 1000).getDate()) {
            return;

        }

        this.coinSprite = cc.find("Canvas/FirstModel/topMenu/money/coin");
        this.pos = this.coinSprite.convertToWorldSpaceAR(this.coinSprite.getPosition());
        this.mineSprite = cc.find("Canvas/GameUE/bottomMenu/handbook");
        this.pos2 = this.mineSprite.convertToWorldSpaceAR(this.mineSprite.getPosition())
        this.diamondSprite = cc.find("Canvas/FirstModel/topMenu/diamond/coin");
        this.pos3 = this.diamondSprite.convertToWorldSpaceAR(this.diamondSprite.getPosition());

        cc.audioEngine.play(this.audio, false, 1);
        miDB.localData.game.signNum = this.signNum;
        miDB.localData.game.singTime = miDB.localData.systime;
        // miDB.localData.game.singTime = "1538064034";

        let that = this;
        let sprite = cc.find("RewardModelItem/reward/sp", this.buttonArray[this.signNum]);
        var worldPos = sprite.convertToWorldSpaceAR(sprite.getPosition())
        var resuPos = this.node.convertToNodeSpaceAR(worldPos);

        if (this.chooseData[this.signNum].type == "cron") {

            // var corn = miTools.Utils.deMul(rewardData[this.signNum].num, miDB.GameData.DB.productEffic).toString();
            miDB.GameData.addCronCallback(this.chooseData[this.signNum].num);

            let icon1 = cc.instantiate(this.coinSprite);
            icon1.parent = this.node;
            icon1.setPosition(resuPos.x, resuPos.y + sprite.height);
            let duration1 = parseFloat(Math.sqrt((that.pos.y - worldPos.y) * (that.pos.y - worldPos.y) + (that.pos.x - worldPos.x) * (that.pos.x - worldPos.x)) / 1000);
            icon1.runAction(cc.sequence(
                // cc.moveTo(duration1, that.coinPos).easing(cc.easeIn(4.0)),
                cc.moveBy(duration1, cc.v2(that.pos.x - worldPos.x, that.pos.y - worldPos.y)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获金币", type: 1 });
                    icon1.destroy();
                })
            ));
        }
        else if (this.chooseData[this.signNum].type == "diam") {
            //console.log(this.chooseData[this.signNum].num);
            miDB.GameData.addDiamCallback(this.chooseData[this.signNum].num);

            let icon3 = cc.instantiate(this.diamondSprite);
            icon3.parent = this.node;
            icon3.setPosition(resuPos.x, resuPos.y + sprite.height);
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
        }
        else if (this.chooseData[this.signNum].type == "chest") {
            miDB.GameData.addChestCallback(this.chooseData[this.signNum].num);

            // var worldPos = this.node.convertToWorldSpaceAR(sprite.getPosition())
            // var resuPos = this.node.convertToNodeSpaceAR(worldPos);
            let icon2 = cc.instantiate(sprite);
            icon2.parent = this.node;
            icon2.setPosition(resuPos.x, resuPos.y + sprite.height);
            let duration2 = parseFloat(Math.sqrt((that.pos2.y - worldPos.y) * (that.pos2.y - worldPos.y) + (that.pos2.x - worldPos.x) * (that.pos2.x - worldPos.x)) / 1300);
            icon2.runAction(cc.sequence(
                cc.moveTo(duration2, cc.v2(226, -515)).easing(cc.easeIn(4.0)),
                // cc.moveBy(duration2, cc.v2(that.pos2.x - worldPos.x, that.pos2.y - worldPos.y)).easing(cc.easeIn(4.0)),
                cc.fadeOut(),
                cc.callFunc(function () {
                    tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "收获信纸", type: 4 });
                    icon2.destroy();
                })
            ));
        }

        // else if (rewardData[index].name == "stock") {
        //     miDB.GameData.setItemByName("shares", miTools.Utils.deAdd(miDB.GameData.DB.shares, rewardData[index].num).toString());
        // }

        miDB.GameData.setLocalDataLock();

        this.updateUI();
    },

    updateUI() {

        for (var i = 0; i < 7; i++) {
            var btDay = cc.find("game_Layer_LoginBg/rewardNode/bt_day" + (i + 1), this.node);
            var rew = btDay.getChildByName("RewardModelItem");
            this.updateItem(rew, this.chooseData, i);
        }

        this.signNum = 0;
        var isTrue = false;

        if (miDB.localData.game.singTime == "null") {
            this.signNum = 0;
        } else if (miDB.localData.game.signNum == 7 && new Date(miDB.localData.game.singTime * 1000).getDate() != new Date(miDB.localData.systime * 1000).getDate()) {
            this.signNum = 0;
        } else if (new Date(miDB.localData.game.singTime * 1000).getDate() != new Date(miDB.localData.systime * 1000).getDate()) {
            this.signNum = miDB.localData.game.signNum + 1;
            if (this.signNum == 7) {
                this.signNum = 0;
            }

        } else {
            this.signNum = miDB.localData.game.signNum;
        }

        this.clickBtn.enabled = false;
        // miTools.Utils.loadSprite(this.clickBtn, "image/tplist/gameUiTwo", "ui_ty_bt_1_2");
        cc.find("game_Layer_LoginBg/finish", this.node).active = false;

        if (miDB.localData.game.signNum + 1 > 6) {
            this.updateSprite(cc.find("statue", this.buttonArray[6]), this.isHave);
        } else {
            this.updateSprite(cc.find("statue", this.buttonArray[6]), null);
        }

        for (let i = 0; i < this.buttonArray.length; i++) {
            let btn = cc.find("RewardModelItem/reward/sp", this.buttonArray[i]);
            miTools.Utils.loadSprite(btn, "image/tplist/gameUiTwo", this.chooseData[i].name);
            // miTools.Utils.loadSprite(cc.find("RewardModelItem/sp", this.buttonArray[i]), rewardData[i].url, rewardData[i].name);

            if (i < this.signNum) {
                cc.find("RewardModelItem/reward", this.buttonArray[i]).active = false;
                // cc.find("RewardModelItem/statue", this.buttonArray[i]).active = true;
                this.updateSprite(cc.find("RewardModelItem/statue", this.buttonArray[i]), this.isHave);
            } else if (i == this.signNum) {
                if (miDB.localData.game.singTime != "null" && new Date(miDB.localData.game.singTime * 1000).getDate() == new Date(miDB.localData.systime * 1000).getDate()) //已经签了
                {
                    cc.find("RewardModelItem/reward", this.buttonArray[i]).active = false;
                    // cc.find("RewardModelItem/statue", this.buttonArray[i]).active = true;
                    this.updateSprite(cc.find("RewardModelItem/statue", this.buttonArray[i]), this.isHave);
                    this.clickBtn.enabled = false;
                    miTools.Utils.loadSprite(this.clickBtn.node, "image/tplist/gameUiTwo", null);
                    cc.find("game_Layer_LoginBg/finish", this.node).active = true;
                } else {
                    isTrue = true;  //还没签到
                    this.clickBtn.enabled = true;
                    miTools.Utils.loadSprite(this.clickBtn.node, "image/tplist/gameUiTwo", "ui_ty_bt_2_1");
                    this.updateSprite(cc.find("RewardModelItem/statue", this.buttonArray[i]), null);
                    cc.find("RewardModelItem/reward", this.buttonArray[i]).active = true;
                    // cc.find("RewardModelItem/statue", this.buttonArray[i]).active = false;
                }

            } else {
                this.updateSprite(cc.find("RewardModelItem/statue", this.buttonArray[i]), this.isLock);

            }

        }
    },

    show(data) {
        miTools.Utils.layerOpenAction(cc.find("game_Layer_LoginBg", this.node));

        if (typeof (this.buttonArray) != "undefined") {
            this.initData();
            this.updateUI();
        }
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });
    },
    close() {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
        mi.UIManager.hideUI("RewardModel", { ceng: 50 });
    },

    hide(data) {
        // console.log("hide");
        // console.log(data);
    },

    reward(target, data) {
        var index = data - 1;
        miDB.localData.game.signNum = index;
        miDB.localData.game.singTime = miDB.localData.systime;

        // miDB.localData.game.singTime ="1538064034";
        if (this.chooseData[index].name == "coin") {
            miDB.GameData.setItemByName("corn", miTools.Utils.deAdd(miDB.GameData.DB.corn, this.chooseData[index].num).toString());

        }
        else if (this.chooseData[index].name == "stock") {
            miDB.GameData.setItemByName("shares", miTools.Utils.deAdd(miDB.GameData.DB.shares, this.chooseData[index].num).toString());
        }


        miDB.GameData.setLocalDataLock();
        this.updateUI();

    },



    // update (dt) {},
});
