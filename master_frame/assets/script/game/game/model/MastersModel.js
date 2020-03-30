cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "BuildingsModel",
        spriteAtlas: cc.SpriteAtlas,
        mastersLayerOut: cc.Node,
        animAtlas: cc.SpriteAtlas,
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        // this.moveAction = [];
        this.positions = [];

        cc.find("MonsterLayout/cover", this.node).active = false;
        cc.find("MonsterLayout1/cover", this.node).active = false;



        tywx.NotificationCenter.listen(miDB.EVENT.GAME_MONSTER_MASK, this.seatArrayZindex, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_IN, this._gameBtnFideInCallback, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_OUT, this._gameBtnFideOutCallback, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_ONE_MONSTER, this.toStartOne, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_SCENE_CHANGE, this.nextScence, this);

        mi.BM = this.node.getComponent("MastersManager");
        this.offset = 0;
        this.seatIdxArray = [];

        for (var i = 1; i <= 18; i++) {
            var mon = "";
            if (i < 10) {
                mon = this.node.getChildByName("MonsterLayout").getChildByName("monster" + i);
            } else {
                mon = this.node.getChildByName("MonsterLayout1").getChildByName("monster" + i);
            }
            if (i != 1) {
                mon.getChildByName("egg").getComponent(cc.Button).enabled = false;
            }
            mon.getChildByName("egg").isplay = undefined;
            cc.find("layout/goldCount", mon).getComponent(cc.Label).string = miTools.Utils.toLabelString(miCfg.Master[i].activPrice);
            mon.index = i;
            this.seatIdxArray.push(mon);
        }

    },


    nextScence(customEventData) {
        if (customEventData == 1) {
            miDB.SceneData.index = 1;
            this.node.getChildByName("MonsterLayout").active = false;
            this.node.getChildByName("MonsterLayout1").active = true;

        } else {
            miDB.SceneData.index = 0;
            this.node.getChildByName("MonsterLayout").active = true;
            this.node.getChildByName("MonsterLayout1").active = false;
        }

        tywx.NotificationCenter.trigger(miDB.EVENT.LAYOUT_GAME_WEATHER);
    },


    toStartOne: function () {

        var mon = this.node.getChildByName("MonsterLayout").getChildByName("monster1");


        mon.getChildByName("egg").getComponent(cc.Button).enabled = true;
        let animation = mon.getChildByName("egg").getComponent(cc.Animation);
        let that = this;
        mon.runAction(cc.sequence(
            cc.callFunc(function () {
                if (animation.getClips().length == 0) {
                    let frames = [];
                    for (let i = 0; i < 7; i++) {
                        let index = "dandou_" + (i + 1);
                        frames.push(that.spriteAtlas.getSpriteFrame(index));
                    }
                    frames.push(that.spriteAtlas.getSpriteFrame("dandou_1"));
                    let clip = cc.AnimationClip.createWithSpriteFrames(frames, 30);
                    clip.name = "anim_run";
                    // clip.wrapMode = cc.WrapMode.Loop;
                    animation.addClip(clip);
                }
                animation.play("anim_run");
                animation.speed = 1;
                mon.getChildByName("egg").isplay = true;
            }),
            cc.delayTime(2)
        ).repeatForever());



    },




    //绘制怪物的动态形象
    _createMasterShapeAni: function (parentNode, masterAniName) {
        var that = this
        miTools.Utils.loadPrefab("characterAni/" + masterAniName, function (model) {
            if (model != undefined) {
                model.setScale(0.8)
                model.name = "aniNode";
                model.getComponent(cc.Animation).play(masterAniName)
                cc.find("shapeAniNode", parentNode).addChild(model)
                cc.find("shapeAniNode", parentNode).active = false
            } else {
                tywx.LOGD("加载错误 model = ItemModel")
            }
        })
    },


    _gameBtnFideInCallback: function (params) {


        if (miDB.SceneData.index == 0) {
            cc.find("MonsterLayout1", this.node).active = false;
            cc.find("MonsterLayout", this.node).active = true;
        }
        else if (miDB.SceneData.index == 1) {
            cc.find("MonsterLayout1", this.node).active = true;
            cc.find("MonsterLayout", this.node).active = false;
        }

        if (miDB.SceneData.currPage == 1) {
            cc.find("desc", this.node).active = true;
            cc.find("back", this.node).active = true;
        }
    },
    _gameBtnFideOutCallback: function (params) {

        cc.find("MonsterLayout1", this.node).active = false;
        cc.find("MonsterLayout", this.node).active = false;

        cc.find("desc", this.node).active = false;
        cc.find("back", this.node).active = false;
    },
    onDestroy: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.GAME_MONSTER_MASK, this.seatArrayZindex, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.GAMEUE_FADE_IN, this._gameBtnFideInCallback, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.GAMEUE_FADE_OUT, this._gameBtnFideOutCallback, this);
    },

    seatArrayZindex(data) {
        if (data.action == "resuse") {
            cc.find("MonsterLayout/cover", this.node).active = false;
            cc.find("MonsterLayout1/cover", this.node).active = false;
            miDB.SceneData.currPage = 0;

            for (var i = 0; i < this.seatIdxArray.length; i++) {
                this.seatIdxArray[i].zIndex = 0;
                if (this.seatIdxArray[i].getChildByName("MasterUiMoudel")) {
                    //this.seatIdxArray[i].getChildByName("MasterUiMoudel").getChildByName("monsters_level").stopAction(this.moveAction[i]);
                    this.seatIdxArray[i].getChildByName("MasterUiMoudel").getChildByName("monsters").active = true;
                    this.seatIdxArray[i].getChildByName("MasterUiMoudel").getChildByName("monsters_level").active = false;
                    this.seatIdxArray[i].getChildByName("shapeAniNode").active = true;
                    this.seatIdxArray[i].getChildByName("egg").active = true;
                    this.seatIdxArray[i].getChildByName("MasterUiMoudel").getChildByName("monsters_level").setPosition(cc.v2(0, 50));
                }
            }
        } else if (data.action == "show") {
            cc.find("MonsterLayout/cover", this.node).active = true;
            cc.find("MonsterLayout1/cover", this.node).active = true;
            miDB.SceneData.currPage = 1;

            for (var i = 0; i < this.seatIdxArray.length; i++) {
                if (this.seatIdxArray[i].getChildByName("MasterUiMoudel")) {
                    this.seatIdxArray[i].zIndex = 1;
                    this.seatIdxArray[i].getChildByName("MasterUiMoudel").getChildByName("monsters").active = false;
                    this.seatIdxArray[i].getChildByName("MasterUiMoudel").getChildByName("monsters_level").active = true;
                    // this.seatIdxArray[i].getChildByName("shapeAniNode").active = false;
                    this.seatIdxArray[i].getChildByName("egg").active = false;
                    // if (!this.moveAction[i]) {
                    //     let moveTo1 = cc.moveBy(0.6, 0, 15);
                    //     let moveTo2 = cc.moveBy(0.6, 0, -15);
                    //     let moveAction = cc.sequence(
                    //         moveTo1,
                    //         moveTo2
                    //     );
                    //     this.moveAction.push(moveAction);
                    // }
                    // this.seatIdxArray[i].getChildByName("MasterUiMoudel").getChildByName("monsters_level").runAction(this.moveAction[i]).repeatForever();
                } else {
                    this.seatIdxArray[i].zIndex = -1;
                }
            }
            cc.find("desc", this.node).active = true;
            cc.find("back", this.node).active = true;
        }




    },



    updateStartBtIndex() {
        for (var i = 0; i < this.seatIdxArray.length; i++) {
            var mon = this.seatIdxArray[i];

            mon.getChildByName("egg").active = true;

            mon.getChildByName("layout").active = true;
            cc.find("layout/goldCount", mon).getComponent(cc.Label).string = miTools.Utils.toLabelString(miCfg.Master[i + 1].activPrice);
            if (i == 0) {
                mon.getChildByName("egg").getComponent(cc.Button).enabled = true;
                let animation = mon.getChildByName("egg").getComponent(cc.Animation);
                let that = this;
                mon.getChildByName("egg").isplay = true;
                mon.runAction(cc.sequence(
                    cc.callFunc(function () {
                        if (animation.getClips().length == 0) {
                            let frames = [];
                            for (let i = 0; i < 7; i++) {
                                let index = "dandou_" + (i + 1);
                                frames.push(that.spriteAtlas.getSpriteFrame(index));
                            }
                            frames.push(that.spriteAtlas.getSpriteFrame("dandou_1"));
                            let clip = cc.AnimationClip.createWithSpriteFrames(frames, 30);
                            clip.name = "anim_run";
                            // clip.wrapMode = cc.WrapMode.Loop;
                            animation.addClip(clip);
                        }
                        animation.play("anim_run");
                        animation.speed = 1;

                    }),
                    cc.delayTime(2)
                ).repeatForever());

            } else {
                mon.stopAllActions();
                mon.getChildByName("egg").getComponent(cc.Animation).stop("anim_run");
                mon.getChildByName("egg").isplay = undefined;
            }
            mon.index = i;
            mon.getChildByName("shapeAniNode").active = false
            mon.getChildByName("layout").active = true;
            miTools.Utils.loadSprite(mon.getChildByName("egg"), "image/tplist/gameLayer", "dan_hui");

        }


    },

    start() {
        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            this.node.scale = screenW / 720;

        }
        this.touchNode = undefined;

        var self = this;
        //this.node.getChildByName("touchPos").active =false;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touch1 = touches[0];
            var mPoint2 = this.parent.convertToNodeSpaceAR(touch1.getLocation());
            if (self.touchNode) {
                self.touchNode.setPosition(mPoint2);
                self.touchNode.active = true;
                // self.touchNode.getComponent(cc.ParticleSystem).resetSystem();
            }


        }, this.node);


        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touch1 = touches[0];

            var mPoint2 = this.parent.convertToNodeSpaceAR(touch1.getLocation());
            if (self.touchNode) {
                self.touchNode.setPosition(mPoint2);

            }
        }, this.node);



        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (self.touchNode) {
                self.touchNode.active = false;
                //self.touchNode.getComponent(cc.ParticleSystem).stopSystem();
            }

        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            if (self.touchNode) {
                self.touchNode.active = false;
                // self.touchNode.getComponent(cc.ParticleSystem).stopSystem();
            }

        }, this.node);

    },
    hideButton(max) {
        for (var i = max; i < this.seatIdxArray.length; i++) {
            if (i != 0) {
                this.seatIdxArray[i].active = false;
                this.seatIdxArray[i].getChildByName("bgPrice").active = false;
            } else {
                cc.find("bgPrice/price", this.seatIdxArray[i]).getComponent(cc.Label).string = miTools.Utils.toLabelString(miCfg.Master["1"].initPrice);
            }
        }
    },



    buttonBind: function (button, customEventData) {
        // button .buildIndex =customEventData;

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node
        clickEventHandler.component = "BuildingsModel";
        clickEventHandler.customEventData = customEventData;
        if (button.node.name == "BuildIngsItem0" || button.node.name == "BuildIngsItem1" || button.node.name == "BuildIngsItem2") {
            clickEventHandler.handler = "buildModelBySeatBtnCallback";
        }

        button.clickEvents.push(clickEventHandler);
    },


    buildModelBySeatBtnCallback: function (event, customEventData) {
        // console.log("buildModelBySeatBtnCallback");
        var seatIdx = customEventData;
        this.seatIdxArray[seatIdx - 1].stopAllActions();
        mi.BM.addMaster(seatIdx, seatIdx - 1);
    },

    update: function (dt) {
        if (this.touchNode == undefined || this.touchNode == null) {
            this.touchNode = cc.find("Canvas/FirstModel/touchPos");

        }
    },

    backMonster: function () {
        cc.audioEngine.play(this.audio, false, 1);
        tywx.NotificationCenter.trigger(miDB.EVENT.GAME_MONSTER_MASK, { action: "resuse" });

        if (miDB.autoGetSkill[0] == false && miDB.localData.game.finshGuid == false) {
            tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show", node: "GAMEUE1" });
        } else {
            tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show", node: "GAMEUE" });
        }
        cc.find("desc", this.node).active = false;
        cc.find("back", this.node).active = false;
        miDB.GuidData.isFeedOpen = false;
        tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE);
    },

    newSeason() {
        console.log("开启新一季...");
        cc.find("resultNode", this.node).active = false;
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },
});
