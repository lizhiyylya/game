
cc.Class({
    extends: cc.Component,

    properties: {
        buildSprite: cc.Node,
        audio: {
            default: null,
            type: cc.AudioClip
        },
        animAtlas: cc.SpriteAtlas,
        coinTop: cc.Node
    },

    onLoad() {
        this.flag = false;
        cc.director.getCollisionManager().enabled = true;

        this.MasterList = this.node.parent.parent.parent.getComponent("MastersModel").seatIdxArray;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
        this.isUpdate = false;
        this.isUpState = false;
        this.isRunActionCron = false;
        this.isFirst = false;
        this.checkTime = 0;
        this.firstTime = 0.2;
        this.subTime = 0.05;
        this.minTime = 0.05;
        this.upNode = cc.find("monsters_level/btn", this.node)

        this.storage = 0;
        this.sprite = cc.find("Canvas/FirstModel/topMenu/money/coin");
        var pos = this.sprite.convertToWorldSpaceAR(this.sprite.getPosition())
        this.pos2 = cc.find("Canvas/FirstModel").convertToNodeSpaceAR(pos);
        var self = this;

        this.frame = [];
        for (let i = 0; i < 11; i++) {
            let index = "shouhuo_" + (i + 1);
            this.frame.push(this.animAtlas.getSpriteFrame(index));
        }

        this.upNode.on('touchstart', function () {

            this.unscheduleAllCallbacks();
            // this.appearAction();
            // 出现
            console.log("touchstart");
            self.isUpState = true;
            self.isFirst = true;
            self.checkTime = self.firstTime;

            self.takeUp();
        }, this);

        this.upNode.on('touchend', function () {
            console.log("touchend");
            self.isUpState = false;

            self.buildSprite.parent.parent.getChildByName("heart").active = false;


            if (self.isFirst == true) {
                self.isFirst = false;

                self.updateAnima();

            }
        }, this);


        this.upNode.on('touchcancel', function () {

            console.log("touchcancel");
            self.isUpState = false;


        }, this);


        // this.scheduleOnce(function() {
        //     this.takeUpAction();
        // }, this.takeUpTime);





        this.upNode._touchListener.setSwallowTouches(true);
    },

    checkIsEnough: function () {
        for (let i = 0; i < miDB.MasterData.DB.MasterList.length; i++) {
            var corn = miDB.GameData.getItemByName("corn");
            let masterData = miDB.MasterData.DB.MasterList[i];
            let isPrice = miTools.Utils.comparedTo(corn, masterData.masterPrice);
            let btn = cc.find("MasterUiMoudel/monsters_level/btn", this.MasterList[i]);
            if (isPrice >= 0) {
                miTools.Utils.loadSprite(btn, "image/tplist/gameUiTwo", "wy_bt_1");
                cc.find("layout/paid", btn).color = new cc.Color(255, 255, 255);
            } else {
                miTools.Utils.loadSprite(btn, "image/tplist/gameUiTwo", "wy_bt_2");
                cc.find("layout/paid", btn).color = new cc.Color(80, 72, 73);
            }
        }
    },

    takeUp() {




        this.scheduleOnce(function () {


            if (this.checkTime - this.subTime > this.minTime) {

                this.checkTime -= this.subTime;
            }

            if (this.isUpState == true) {
                this.updateAnima();
                this.takeUp();
            } else {
                this.unscheduleAllCallbacks();
            }
            this.checkIsEnough();
        }, this.checkTime);
    },

    updateAnima() {

        var node = this.node;
        var corn = miDB.GameData.getItemByName("corn");
        var isPrice = miTools.Utils.comparedTo(corn, miDB.MasterData.getMaster(node.masterIdx).masterPrice);
        if (isPrice >= 0) {
            miDB.MasterData.updateMaster(node.masterIdx, 1);
            miDB.GameData.addTaskNum("feed", 1); // 增加任务数量
            if (node.masterIdx == 1 && miDB.MasterData.getMaster(node.masterIdx).level == 4) {
                tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE);
            }

            if (!this.isUpdate) {
                this.isUpdate = true;
                let heart = cc.instantiate(this.buildSprite.parent.parent.getChildByName("heart"));
                heart.parent = this.buildSprite.parent.parent;
                heart.active = true;

                let x0 = heart.x; //'初始点
                let y0 = heart.y;
                let r = 70; //'移动半径
                let Xlen = 18; //'横截距
                let posX = -Xlen + Math.random() * 2 * Xlen + x0;
                let posY = Math.sqrt(r * r - (posX - x0) * (posX - x0)) + y0;
                var actionTo = cc.moveTo(0.3, cc.v2(posX, posY));

                var anim = heart.getComponent(cc.Animation);
                var clip = cc.AnimationClip.createWithSpriteFrames(this.frame, 17);
                clip.name = "animal_level";
                anim.speed = 0.02;
                anim.addClip(clip);
                anim.play('animal_level');
                anim.on('play', function () {
                    heart.runAction(actionTo);
                }, this);
                anim.on('finished', function () {
                    heart.destroy();
                }, this);


                setTimeout(function () {
                    this.isUpdate = false;
                }.bind(this), 300);

            }
        }

    },

    start() {

        this.isRunAction = true;
        // this.
        var self = this;
        var actionArray = [

            cc.scaleTo(0.01, 0.4, 0.4),
            //cc.scaleTo(0.01, 0.5, 0.5),
            cc.spawn(
                cc.scaleTo(0.3, 1, 1),
                cc.moveBy(0.3, 0, 12)
            ),
            cc.spawn(
                cc.scaleTo(0.2, 1.2, 1),
                cc.moveBy(0.2, 0, -6)
            ),
            cc.spawn(
                cc.scaleTo(0.05, 1, 1),
                cc.moveBy(0.05, 0, -6)
            ),
            cc.delayTime(1),

            cc.callFunc(function () {
                self.isRunAction = false;

            })
        ];

        this.jumpAction = cc.sequence(actionArray).speed(2);
        this.buildSprite.runAction(this.jumpAction);
        this.coinShake();
    },


    onCollisionEnter: function (other, self) {
        // cc.find("actionNode/jinbiParicle", this.node).active = true;
    },

    onCollisionStay: function (other) {
        this.buildAction();
        // cc.find("actionNode/jinbiParicle", this.node).active = true;
        // this.node.getChildByName("background").getChildByName("build_bgCoin").active =false;
    },
    onCollisionExit: function (other, self) {

        // this.unschedule(this.partrcleCallBack);
        // this.scheduleOnce(this.partrcleCallBack, 1);

    },
    partrcleCallBack() {
        this.node.getChildByName("background").getChildByName("build_bgCoin").active = true;
        cc.find("actionNode/jinbiParicle", this.node).active = false;
    },



    playCronAction() {
        let that = this;
        //cc.audioEngine.play(this.audio, false, 1);
        miDB.MasterData.gainCornByMasterIdx(this.node.masterIdx);
        miDB.GameData.addTaskNum("getCron", 1); // 增加任务数量
        tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE)
        this.checkIsEnough();
        var coin = cc.instantiate(this.coinTop);
        coin.parent = cc.find("Canvas/GameUE");
        var worldPos = this.coinTop.convertToWorldSpaceAR(this.coinTop.getPosition())
        var resuPos = cc.find("Canvas/GameUE").convertToNodeSpaceAR(worldPos);
        coin.setPosition(resuPos);
        let duration = parseFloat(Math.sqrt((this.pos2.y - coin.y) * (this.pos2.y - coin.y) + (coin.x - this.pos2.x) * (coin.x - this.pos2.x)) / 1300);
        coin.runAction(cc.sequence(

            cc.moveTo(duration, this.pos2).easing(cc.easeIn(4.0)),
            cc.fadeOut(),
            cc.callFunc(function () {
                coin.destroy();
                tywx.NotificationCenter.trigger(miDB.EVENT.RESULT_SCALE_REWARD, { desc: "缩放", type: [1] });
            })

        ));
    },


    update(dt) {
    },
    buildActionOnce() {


        if (this.isRunAction == false) {

            this.isRunAction = true;

            this.buildSprite.runAction(this.jumpAction);

        }
    },


    buildAction() {
        if (!this.isRunActionCron) {
            this.isRunActionCron = true;
            this.storage1 = miDB.MasterData.getMasterStorageCorn(this.node.masterIdx);
            if (this.storage1 != "0") {
                cc.audioEngine.play(this.audio, false, 1);
                this.playCronAction();

                let heart = cc.instantiate(this.buildSprite.parent.parent.getChildByName("heart"));
                heart.parent = this.buildSprite.parent.parent;
                heart.active = true;

                let x0 = heart.x; //'初始点
                let y0 = heart.y;
                let r = 50; //'移动半径
                let Xlen = 18; //'横截距
                let posX = -Xlen + Math.random() * 2 * Xlen + x0;
                let posY = Math.sqrt(r * r - (posX - x0) * (posX - x0)) + y0;
                var actionTo = cc.moveTo(0.3, cc.v2(posX, posY));

                var anim = heart.getComponent(cc.Animation);
                var clip = cc.AnimationClip.createWithSpriteFrames(this.frame, 17);
                clip.name = "animal_coin";
                anim.speed = 0.02;
                anim.addClip(clip);
                anim.play('animal_coin');
                anim.on('play', function () {
                    heart.runAction(actionTo);
                }, this);
                anim.on('finished', function () {
                    heart.destroy();
                }, this);

                // let heart = cc.instantiate(this.buildSprite.parent.parent.getChildByName("heart"));
                // heart.parent = this.buildSprite.parent.parent;
                // heart.active = true;

                // let x0 = heart.x; //'初始点
                // let y0 = heart.y;
                // let r = 50; //'移动半径
                // let Xlen = 15; //'横截距
                // let posX = -Xlen + Math.random() * 2 * Xlen + x0;
                // let posY = Math.sqrt(r * r - (posX - x0) * (posX - x0)) + y0;

                // let actionTo = cc.moveTo(0.3, cc.v2(posX, posY));

                // heart.runAction(cc.sequence(
                //     actionTo,
                //     // cc.spawn(
                //     // cc.scaleTo(0.5, 0.6),
                //     // ),
                //     cc.fadeOut(0.5),
                //     cc.callFunc(function () {
                //         heart.active = false;
                //         heart.destroy();
                //     })
                // ));

                if (this.isRunAction == false) {
                    this.isRunAction = true;
                    this.buildSprite.parent.parent.getChildByName("shapeAniNode").runAction(this.jumpAction);
                }
            }
            setTimeout(function () {
                this.isRunActionCron = false;
            }.bind(this), 300);
            setTimeout(function () {
                this.isRunAction = false;
            }.bind(this), 1000);
        }

        // if (this.isRunAction == false) {
        //     this.storage = miDB.MasterData.getMasterStorageCorn(this.node.masterIdx);
        //     if (this.storage != "0") {
        //         //cc.audioEngine.play(this.audio, false, 1);
        //         this.isRunAction = true;
        //         // this.playCronAction();
        //         this.buildSprite.parent.parent.getChildByName("shapeAniNode").runAction(this.jumpAction);
        //         // let pos = Math.random() * 150;
        //         // var actionTo = cc.jumpTo(0.3, cc.v2(this.flag ? pos : (-pos), 100), 50, 1);
        //         // this.flag = !this.flag;
        //     }
        // }
    },

    buildAddGoldAction() {

        if (this.isRunAction == false) {

            this.isRunAction = true;

            this.buildSprite.runAction(this.jumpAction);
            //this.coinDropdown();
            this.playCronAction();
            cc.find("actionNode/jinbiParicle", this.node).active = true;
            this.unschedule(this.partrcleCallBack);
            this.scheduleOnce(this.partrcleCallBack, 1);
        }
    },




    coinDropdown() {
        var coin = cc.instantiate(this.coinSprite);
        coin.parent = this.coinSprite.parent;
        // var moveTo1 = cc.moveTo(0.5, -71, 100);
        // var moveTo2 = cc.moveTo(1, -71, -100);
        var posX = (Math.random() - 0.5) * 2 * 100 - 71;
        var actionTo = cc.jumpTo(1.5, cc.v2(posX, -250), 150, 2);
        coin.runAction(cc.sequence(
            cc.callFunc(function () {

            }),
            // moveTo1,
            // moveTo2,
            actionTo,
            cc.fadeOut(0.2),
            cc.callFunc(function () {
                coin.destroy();
            })
        ));
    },

    coinShake() {
        this.coinTop.runAction(
            cc.sequence(
                cc.moveBy(0.2, 0, 22),
                cc.moveBy(0.2, 0, -22),
                cc.moveBy(0.05, 0, 4),
                cc.moveBy(0.05, 0, -4),
                cc.delayTime(0.4),
            ).repeatForever()
        )
    }
});
