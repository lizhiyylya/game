
var fightData = [
    { index: 0, num: 18, type: "corn", weight: 100, icon: "hhxx_jb" },
    { index: 1, num: 100, type: "mine", weight: 0, icon: "hhxx_ck" },
    { index: 2, num: 100, type: "mine", weight: 0, icon: "hhxx_ck" },
    { index: 3, num: 2, type: "diamond", weight: 1, icon: "hhxx_zs" },
    { index: 4, num: 1, type: "diamond", weight: 2, icon: "hhxx_zs" },
    { index: 5, num: 1, type: "chest", weight: 1, icon: "hhxx_zs" },
];



cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "FinghtModel",
        content: cc.Node,
        MallItem: cc.Prefab,
        ItemAltas: cc.SpriteAtlas,

        bossNode: cc.Node,
        bossMoveNode: cc.Node,
        coinNode: cc.Node,
        coinPool: [],

        curCoinArray: [],

        prograssNode: cc.Node,
        prograssBar: cc.Node,

        progressMax: 15,
        curProgress: 0,

        cronNodePos: cc.Node,

        rectNode: cc.Node,
        CronPre: cc.Prefab,

        guideNode: cc.Node,

        gainDouble: cc.Node,
        stepOver: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        cc.director.getCollisionManager().enabled = true;

        this.moveSprite = cc.find("moveSprite", this.bossNode.parent);
        // this.curProgress = this.progressMax
        var that = this;
        // for(var i = 0;i<1; i++){
        //     miTools.Utils.loadPrefab("model/gameModel/shapeModel/ItemModel",function(model){
        //         if(model != undefined){
        //             that.boosCronModel= model;
        //             var  node = cc.instantiate( that.boosCronModel)
        //             that.coinNode.addChild(node);
        //             node.x=0;
        //             node.y=0;
        //             node.active = false
        //             that.coinPool.push(node);
        //         }else{
        //             tywx.LOGD("加载错误 model = ItemModel")
        //         }
        //     })
        // }

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            let scale = screenW / 720;
            cc.find("progressNode", this.node).scale = screenW / 720;
            cc.find("result/rewrad", this.node).scale = screenW / 720;
            let pos = this.guideNode.getPosition();
            this.guideNode.setPosition(pos.x * scale, pos.y * scale);

        }





        that.boosCronModel = this.CronPre;
        var node = cc.instantiate(that.boosCronModel)
        that.coinNode.addChild(node);
        node.x = 0;
        node.y = 0;
        node.active = false
        that.coinPool.push(node);



        this.MallItemArray = [];
        tywx.NotificationCenter.listen(miDB.EVENT.UPDATE_BOSS_TIME, this.bossStart, this);
       tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_OUT, this._gameFadeOutCallback, this);
       // tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_IN, this._gameFadeInCallback, this);

    },
    onDestroy: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.UPDATE_BOSS_TIME, this.bossStart, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.GAMEUE_FADE_OUT, this._gameFadeOutCallback, this);
       // tywx.NotificationCenter.ignore(miDB.EVENT.GAMEUE_FADE_IN, this._gameFadeInCallback, this);
    },


    _gameFadeOutCallback: function (params) {
        this.prograssNode.active = true


    },

    _gameFadeInCallback: function (params) {
        this.prograssNode.active = false
    },



    update: function (dt) {
        if (this.prograssNode.active && this.curProgress <= this.progressMax) {
            this.prograssBar.getComponent(cc.ProgressBar).progress = (this.curProgress / this.progressMax)
            this.curProgress -= dt
        }
    },
    initCoinPool: function () {

    },
    start() {
        // tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_FADE_OUT);

    },

    dropCoinAni: function () {



        if (this.coinPool.length < 3 && this.addCron == false) {
            this.addCron = true;

            for (var i = 0; i < 3; i++) {
                var coinNode = cc.instantiate(this.boosCronModel);
                this.coinNode.addChild(coinNode);
                coinNode.x = 0;
                coinNode.y = 0;
                coinNode.active = false;
                this.coinPool.push(coinNode);
            }
            this.addCron = false;

        } else {
            for (var i = 0; i < 3; i++) {
                this.oneCoinDrop();
            }
        }




    },


    oneCoinDrop: function (coinNode) {
        var coinNode = this.coinPool.pop()

        this.curCoinArray.push(coinNode)
        coinNode.active = true
        coinNode.getComponent(cc.Animation).play("ItemModel")

        var size = this.bossNode.getContentSize()
        var pos = this.bossMoveNode.getPosition()
        coinNode.setPosition(pos);



        var posX1 = miTools.Utils.RandomNumBoth(pos.x - size.width / 4 * 3, pos.x + size.width / 4 * 3);
        var posY1 = miTools.Utils.RandomNumBoth(pos.y - size.height / 4 * 3, pos.y + size.height / 4 * 3);
        var startPos = cc.v2(posX1, posY1);


        var deltaX = posX1 - pos.x;
        var deltaY = posY1 - pos.y;
        var posX2 = miTools.Utils.RandomNumBoth(pos.x + deltaX / 4 * 3, pos.x + deltaX * 2);
        var posY2 = miTools.Utils.RandomNumBoth(pos.y + deltaY / 4 * 3, pos.y + deltaY * 2);
        var middlePos = cc.v2(posX2, posY2);
        var offset = miTools.Utils.RandomNumBoth(pos.y - 300, pos.y - 600);
        var posX3 = posX2;
        var posY3 = offset;
        var endPos = cc.v2(posX3, posY3);

        var bezier = [
            startPos,
            middlePos,
            endPos
        ];

        var size = this.node.getContentSize();

        var bezierTo = cc.bezierTo(0.7, bezier);
        coinNode.runAction(cc.sequence(
            cc.callFunc(function () {

            }),
            bezierTo,
            cc.callFunc(function () {

            })
        ));
    },

    playSomeCronAni: function () {
        if (this.curCoinArray.length <= 0) {
            return
        }
        this.coinNode.runAction(cc.sequence(
            cc.delayTime(2),
            cc.callFunc(function () {
                tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_FADE_IN);
            })
        ))

        for (var i = this.curCoinArray.length - 1; i >= 0; i--) {
            this.playOneCronAction(this.curCoinArray[i]);
            this.curCoinArray.splice(i, 1);
        }
    },
    playOneCronAction(coinNode) {
        let that = this;

        var cronPos = this.cronNodePos.getPosition()
        let duration = parseFloat(Math.sqrt((cronPos.y - coinNode.y) * (cronPos.y - coinNode.y) + (coinNode.x - cronPos.x) * (coinNode.x - cronPos.x)) / 1300);
        coinNode.runAction(cc.sequence(
            cc.moveTo(duration, cronPos).easing(cc.easeIn(4.0)),

            cc.callFunc(function () {

                that.coinPool.push(coinNode)
                coinNode.getComponent(cc.Animation).stop()
                coinNode.active = false
            })
        ));
    },


    bossStart( data) {
        this.times =data.times;
        console.log("bossStart");
        this.bossStart = false;
        this.moveSprite.active = false;
        this.guideNode.getComponent(cc.Button).enabled = false;
        //  tywx.NotificationCenter.trigger(miDB.EVENT.GAME_BOSS_START, { action: "bossComing" });
        this.stepInex = "null";

        cc.find("progressNode", this.node).active = false;

        // if (miDB.GuidData.isGuidBoss == false) {
        //     let that = this;
        //     this.guideNode.active = true;
        //     cc.find("playcontext", this.guideNode).active = true;
        //     cc.find("playcontext", this.guideNode).setPosition(cc.v2(34, -76));
        //     cc.find("playcontext/playTitel", this.guideNode).active = false;
        //     cc.find("playcontext/playTitel", this.guideNode).getComponent(cc.Label).string = "大笨兽来袭";
        //     cc.find("playcontext/playrichtext", this.guideNode).getComponent(cc.RichText).string = " <color=#6076a5>大笨兽最喜欢吃小怪兽了，快去击败大笨兽，保护我们可爱的小怪兽！\n大笨兽<color=#ff560c>每隔一段时间</color>就会来动物园捣乱1次，</color><color=#ff560c>击败大笨兽可以获得大量金币。</color>";
        //     cc.find("playcontext/playrichtext", this.guideNode).active = false;
        //     let monster = cc.find("playcontext/playSprite", this.guideNode);
        //     monster.active = true;
        //     monster.setScale(0.4);


        //     monster.runAction(cc.sequence(
        //         cc.scaleTo(0.1, 1),
        //         cc.delayTime(0.1),
        //         cc.callFunc(function () {
        //             that.guideNode.active = true;
        //             let anim = that.guideNode.getChildByName("playcontext").getComponent(cc.Animation);
        //             anim.play("guide");

        //             anim.on('finished', anim.fin = function () {
        //                 cc.find("playcontext/playrichtext", that.guideNode).active = true;
        //                 cc.find("playcontext", that.guideNode).height = cc.find("playcontext/playrichtext", that.guideNode).height + 120;
        //                 that.guideNode.getComponent(cc.Button).enabled = true;
        //                 that.stepInex = 0;
        //                 anim.off('finished', anim.fin, that);
        //             }, that);


        //         }),
        //         cc.delayTime(0.2),
        //         cc.callFunc(function () {
        //             cc.find("playcontext/playTitel", that.guideNode).active = true;
        //         }),
        //     ));
        // } else {
        //     this.nextGuide();
        // }

        this.nextGuide();
    },

    nextGuide: function () {
        this.guideNode.active = true;
          tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_FADE_OUT);
        cc.find("playcontext/playTitel", this.guideNode).getComponent(cc.Label).string = "攻击大笨兽";
        cc.find("playcontext/playrichtext", this.guideNode).getComponent(cc.RichText).string = "<color=#6076a5>大笨兽看到动物园主人回来就害怕了，<color=#ff560c>15秒</color>后它就会逃跑。\n手指划过大笨兽时会掉落金币，抓紧时间吧。\n<color=#ff560c>划过的速度越快，掉落的金币越多！</color></color>";
        cc.find("progressNode", this.node).active = false;
        cc.find("playcontext", this.guideNode).setPosition(cc.v2(34, -76));
        this.bossNode.active = true;
        this.bossMoveNode.setPosition(cc.v2(0, 200));

        this.moveSprite.active = true;
        this.moveSprite.stopAllActions();
        miTools.Utils.runMovePosRetFever(200, [cc.v2(-100, 0), cc.v2(100, 0)], this.moveSprite);

        let that = this;
        this.guideNode.active = true;
        cc.find("playcontext", this.guideNode).active = true;
        cc.find("playcontext/playTitel", this.guideNode).active = false;
        cc.find("playcontext/playrichtext", this.guideNode).active = false;
        let monster = cc.find("playcontext/playSprite", this.guideNode);
        monster.setScale(0.4);
        monster.runAction(cc.sequence(
            cc.scaleTo(0.1, 1),
            cc.delayTime(0.1),
            cc.callFunc(function () {
                that.guideNode.active = true;
                let anim = that.guideNode.getChildByName("playcontext").getComponent(cc.Animation);
                anim.play("guide");

                anim.on('finished', anim.fin = function () {
                    cc.find("playcontext/playrichtext", that.guideNode).active = true;
                    cc.find("playcontext", that.guideNode).height = cc.find("playcontext/playrichtext", that.guideNode).height + 120;
                    that.stepInex = 1;
                    that.guideNode.getComponent(cc.Button).enabled = true;
                    anim.off('finished', anim.fin, that);

                }, that);
            }),
            cc.delayTime(0.2),
            cc.callFunc(function () {
                cc.find("playcontext/playTitel", that.guideNode).active = true;
            }),
            // cc.delayTime(0.5),
            // cc.callFunc(function () {
            //     cc.find("playcontext/playrichtext", that.guideNode).active = true;
            //     cc.find("playcontext", that.guideNode).height = cc.find("playcontext/playrichtext", that.guideNode).height + 120;
            //     that.stepInex = 1;
            //     that.guideNode.getComponent(cc.Button).enabled = true;
            // })
        ));

    },

    guideFinish: function () {
        this.guideNode.getComponent(cc.Button).enabled = false;
        this.playGoBack();

        console.log("guideFinish");

    },

    playGoBack() {
        // console.log(this.stepInex)
        if (this.stepInex == "null") {
            return;
        }

        let that = this;
        let monster = cc.find("playcontext/playSprite", this.guideNode);
        let isloaded = false;
        let anim = that.guideNode.getChildByName("playcontext").getComponent(cc.Animation);
        anim.play("guideBack");
        cc.find("playcontext/playTitel", this.guideNode).active = false;
        cc.find("playcontext/playrichtext", this.guideNode).active = false;
        monster.runAction(cc.sequence(cc.delayTime(0.15), cc.scaleTo(0.03, 0.4)));
        anim.on('finished', function () {
            if (!isloaded) {
                isloaded = true;
                that.guideNode.active = false;
                if (that.stepInex == 0) {
                    that.nextGuide();

                }
                else if (that.stepInex == 1) {
                    that.initBoss();

                }
                else if (that.stepInex == 2) {
                    that.bossNode.active = false;
                    that.showResult(function () {
                           tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_FADE_IN);
                    });
                }
            }
        }, this);

    },

    setBossColor(color) {
        var childArray = cc.find("boss/bossshape", this.bossMoveNode).children;
        for (var i = 0; i < childArray.length; i++) {
            childArray[i].color = color;
        }

    },

    initBoss: function () {
        console.log("initBoss");
        miDB.GuidData.isGuidBoss = false;

        for (var i = this.coinPool.length; i < 100; i++) {
            var coinNode = cc.instantiate(this.boosCronModel);
            this.coinNode.addChild(coinNode);
            coinNode.x = 0;
            coinNode.y = 0;
            coinNode.active = false;
            this.coinPool.push(coinNode);
        }

        var that = this;

        this.curProgress = this.progressMax;

        this.corn = 0;
        this.mine = 0;
        this.diamond = 0;
        this.chest = 0;
        cc.find("progressNode", this.node).active = true;
        this.bossMoveAni();
        this.scheduleOnce(function () {

            that.bossMoveNode.stopAllActions();
            this.moveSprite.active = false;
            this.finalGuide();
      
        }, this.progressMax);
        this.bossStart = true;
    },



    finalGuide: function () {

        cc.find("playcontext/playTitel", this.guideNode).getComponent(cc.Label).string = "守护成功";
        cc.find("playcontext/playrichtext", this.guideNode).getComponent(cc.RichText).string = "<color=#6076a5>恭喜主人保护了小怪兽，小怪兽又可以安心的生产金币咯。</color>";
        cc.find("playcontext", this.guideNode).setPosition(cc.v2(34, -76));
        cc.find("progressNode", this.node).active = false;
        let that = this;

        this.bossNode.runAction(cc.sequence([cc.fadeOut(0.5), cc.fadeIn(0), cc.callFunc(function () {

            that.bossNode.active = false;
        })]));
        this.guideNode.active = true;
        cc.find("playcontext", this.guideNode).active = true;
        cc.find("playcontext/playTitel", this.guideNode).active = false;
        cc.find("playcontext/playrichtext", this.guideNode).active = false;
        let monster = cc.find("playcontext/playSprite", this.guideNode);
        monster.setScale(0.4);
        monster.runAction(cc.sequence(
            cc.scaleTo(0.1, 1),
            cc.delayTime(0.1),
            cc.callFunc(function () {
                that.guideNode.active = true;
                let anim = that.guideNode.getChildByName("playcontext").getComponent(cc.Animation);
                anim.play("guide");
                anim.on('finished', anim.fin = function () {
                    cc.find("playcontext/playrichtext", that.guideNode).active = true;
                    cc.find("playcontext", that.guideNode).height = cc.find("playcontext/playrichtext", that.guideNode).height + 120;
                    that.stepInex = 2;
                    that.guideNode.getComponent(cc.Button).enabled = true;
                    anim.off('finished', anim.fin, that);
                }, that);


            }),
            cc.delayTime(0.2),
            cc.callFunc(function () {
                cc.find("playcontext/playTitel", that.guideNode).active = true;
            }),
            // cc.delayTime(0.5),
            // cc.callFunc(function () {
            //     cc.find("playcontext/playrichtext", that.guideNode).active = true;
            //     cc.find("playcontext", that.guideNode).height = cc.find("playcontext/playrichtext", that.guideNode).height + 120;
            //     that.stepInex = 2;
            //     that.guideNode.getComponent(cc.Button).enabled = true;
            // })
        ));

    },




    bossMoveAni: function () {
        var that = this
        var bossPos = this.bossMoveNode.getPosition()
        var rectPos = this.rectNode.getPosition()
        var rectSize = this.rectNode.getContentSize()

        var posX = miTools.Utils.RandomNumBoth(rectPos.x - rectSize.width / 2, rectPos.x + rectSize.width / 2)
        var posY = miTools.Utils.RandomNumBoth(rectPos.y - rectSize.height / 2, rectPos.y + rectSize.height / 2)
        var pos = cc.v2(posX, posY)

        var length = cc.v2(pos.x - bossPos.x, pos.y - bossPos.y).mag();
        var moveTo = cc.moveTo(length / 100, pos);
        this.bossMoveNode.runAction(cc.sequence(
            cc.callFunc(function () {

            }),
            moveTo,
            cc.callFunc(function () {
                that.bossMoveAni()
            })
        ))
    },

    showResult(callback) {
        let that = this;
        this.stepInex == "null"
        var data = [];
        if (this.corn != 0) {
            var rand = parseFloat(Math.random() * (6 - 0.1) + 0.1, 6);
            this.corn = miTools.Utils.deMul(this.corn, miDB.GameData.DB.productEffic);
            this.corn = miTools.Utils.deMul(this.corn, rand);
            this.corn = miTools.Utils.deMul(this.corn, this.times); //  倍数
            this.corn = miTools.Utils.deAdd(this.corn, "100").toString();
            // this.corn = "1000"
            data.push({ type: "corn", num: this.corn });
        }
        if (this.mine != 0) {
            this.mine  = miTools.Utils.deMul(this.mine , this.times).toString();
            data.push({ type: "mine", num: this.mine });
        }
        if (this.diamond != 0) {
            this.diamond =this.diamond* this.times;
            data.push({ type: "diamond", num: this.diamond });
        } if (this.chest != 0) {
            this.chest =this.chest* this.times;
            data.push({ type: "chest", num: this.chest });
        }

        // this.MallItemArray = [];
        // that.content.removeAllChildren();
        for (let i = 0; i < data.length; i++) {
            if (!this.MallItemArray[i]) {
                var node = cc.instantiate(this.MallItem);
                node.parent = this.content;
                this.MallItemArray.push(node);
            }
            if (data[i].type == "corn") {
                cc.find("name", this.MallItemArray[i]).getComponent(cc.Label).string = "金币";
                cc.find("itemIcon", this.MallItemArray[i]).getComponent(cc.Sprite).spriteFrame = this.ItemAltas.getSpriteFrame("dljl_icon_jb");
            }
            else if (data[i].type == "mine") {
                cc.find("name", this.MallItemArray[i]).getComponent(cc.Label).string = "彩矿";
                cc.find("itemIcon", this.MallItemArray[i]).getComponent(cc.Sprite).spriteFrame = this.ItemAltas.getSpriteFrame("gssd_icon_ck");
            }
            else if (data[i].type == "diamond") {
                cc.find("name", this.MallItemArray[i]).getComponent(cc.Label).string = "钻石";
                cc.find("itemIcon", this.MallItemArray[i]).getComponent(cc.Sprite).spriteFrame = this.ItemAltas.getSpriteFrame("dljl_icon_zs");
            }
            else if (data[i].type == "chest") {
                cc.find("name", this.MallItemArray[i]).getComponent(cc.Label).string = "宝箱";
                cc.find("itemIcon", this.MallItemArray[i]).getComponent(cc.Sprite).spriteFrame = this.ItemAltas.getSpriteFrame("dljl_icon_bx");
            }
            cc.find("num", this.MallItemArray[i]).getComponent(cc.Label).string = miTools.Utils.toLabelString(data[i].num);
            this.MallItemArray[i].active = true;

            that.MallItemArray[i].scale = 0.7;
            that.MallItemArray[i].runAction(cc.sequence(
                cc.delayTime((1 + i) * 0.3),
                cc.scaleTo(0.2, 1),
                // cc.callFunc(function () {
                //     node.parent = that.content;
                // })
            ));
        }

        for (var j = data.length; j < this.MallItemArray.length; j++) {
            this.MallItemArray[j].active = false;
        }

        this.data = data;

        if (this.data.length == 0) {
            this.node.getChildByName("result").active = false;
            miDB.BossData.statue = 0;
           // tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_FADE_IN);


        }
        else {
            this.node.getChildByName("result").active = true;
            miTools.Utils.layerOpenAction(cc.find("result/rewrad", this.node));
            miDB.GameData.addTaskNum("fight", 1);
        }


    },
    killBoss() {

        if (this.bossStart == false) {
            return;
        }

        if (this.stepInex && this.stepInex == 1) {

        } else {
            return;
        }



        this.moveSprite.stopAllActions();
        this.moveSprite.active = false;

        var index = miCfg.BoxToDataChoose(fightData);

        if (fightData[index].type == "corn") {

            this.corn = miTools.Utils.deAdd(this.corn, fightData[index].num).toString();

        }
        else if (fightData[index].type == "mine") {
            this.mine = miTools.Utils.deAdd(this.mine, fightData[index].num).toString();
        }
        else if (fightData[index].type == "diamond") {
            this.diamond = miTools.Utils.deAdd(this.diamond, fightData[index].num).toString();
        }
        else if (fightData[index].type == "chest") {
            this.chest = miTools.Utils.deAdd(this.chest, fightData[index].num).toString();
        }
        this.dropCoinAni()
    },
    close() {
        this.playSomeCronAni()
        this.toGetReward(1);
        miDB.BossData.statue = 0;
        this.node.getChildByName("result").active = false;
    },
    toGetReward(num1) {

        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].type == "corn") {
                miDB.GameData.addCronCallback(miTools.Utils.deMul(this.data[i].num, num1).toString());
            }
            else if (this.data[i].type == "mine") {
                miDB.GameData.addMineCallback(miTools.Utils.deMul(this.data[i].num, num1).toString());
            }
            else if (this.data[i].type == "diamond") {
                miDB.GameData.addDiamCallback(miTools.Utils.deMul(this.data[i].num, num1).toString());
            }
            else if (this.data[i].type == "chest") {
                miDB.GameData.addChestCallback(miTools.Utils.deMul(this.data[i].num, num1).toString());
            }
        }

        this.data = [];

    },
    double() {

        var self = this
        //拉起视频
        var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.FINGHT_BOSS);
        var config = cofigInfo.config;
        // miTools.Utils.autoVideo(config, function () {
        //     self.doubleHandler()
        //     tywx.LOGD("拉起视频成功")
        //     tywx.BiLog.clickStat(miDB.BIEVENT.MONSTER_REWARD, [tywx.UserInfo.isNewPlayer]);
        // }, function () {
        //     //强制分享
        //     miTools.Utils.forceShare(config, function (res) {
        //         wx.showToast({ title: "分享成功" });
        //         tywx.BiLog.clickStat(miDB.BIEVENT.MONSTER_REWARD, [tywx.UserInfo.isNewPlayer]);
        //         self.doubleHandler();
        //     }, function (res) {
        //         wx.showToast({ title: "分享失败" });
        //     });


        // })
        config.shareTwoText = ["分享到群才能生效", "别总骚扰同一个群，换个群分享吧"];
        miTools.Utils.autoVideoThreeFive(config, function () {
            self.doubleHandler()
            tywx.LOGD("拉起视频成功")
            tywx.BiLog.clickStat(miDB.BIEVENT.MONSTER_REWARD, [tywx.UserInfo.isNewPlayer]);


        })






    },


    doubleHandler: function () {
        this.playSomeCronAni()
        // console.log("double");
        this.toGetReward(2);
        miDB.BossData.statue = 0;
        this.node.getChildByName("result").active = false;
    },

    show(data) {

        this.addCron = false;

    },





    hide(data) {
        // console.log("hide");
        // console.log(data);
    },

    // this.unschedule(this.partrcleCallBack);
    // this.scheduleOnce(this.partrcleCallBack, 1);

    // update (dt) {},
});

