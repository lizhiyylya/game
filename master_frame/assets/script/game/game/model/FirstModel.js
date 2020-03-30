
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "FirstModel",
        coinSprite: cc.Node,
        mineSprite: cc.Node,
        diamondSprite: cc.Node,
        noticNode: cc.Node,
        lightSprite: cc.Node,
        particle: cc.Node,
        nextScence: cc.Node,
        backScence: cc.Node,
        senceAnimNode: cc.Node,
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.reshUI = false;

        this.count = 0;
        tywx.NotificationCenter.listen(miDB.EVENT.CHANGE_GAME_DATA, this.changeUICallback, this);
        tywx.NotificationCenter.listen(miDB.EVENT.RESULT_SCALE_REWARD, this.spriteScale, this);
        tywx.NotificationCenter.listen(miDB.EVENT.SHOW_NOTICE_TIPS, this.showNotice, this);
        tywx.NotificationCenter.listen(miDB.EVENT.MINE_ADD_ANIM, this.playMineAnim, this);
     //   tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_OUT, this.bossComing, this);
    //    tywx.NotificationCenter.listen(miDB.EVENT.GAMEUE_FADE_IN, this.fadeIN, this);
        tywx.NotificationCenter.listen(miDB.EVENT.FRIEND_HELP_NEW, this.friendHelpNotice, this);
        tywx.NotificationCenter.listen(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, this.nextScenceStatus, this);
    },

    fitWindow() {
        this.reshUI = true;
        if (cc.sys.WECHAT_GAME == cc.sys.platform) {
            //获取系统信息
            let data = wx.getSystemInfoSync()
            // console.log("data", data);
            let config = {
                ISIPHONEX: false, //iphone x
                ISIPHONEXSMAX: false,
                ISIPHONEXS: false,
                ISBANG: false, // 安卓刘海屏
            };
            data = data && (data["model"] || null)
            config.ISIPHONEX = data && data.search("iPhone X") > -1;
            config.ISIPHONEXSMAX = data && data.search("iPhone11") > -1;
            config.ISIPHONEXS = data && data.search("iPhone11") > -1;
            //安卓适配机型
            //opp r15 paam00 padm00 PACM00、PACT00、PAAT00和PAAM00
            let oppr = ["pacm00", "pact00", "paat00", "paam00", "padm00",
                "vivo x21a", "vivo x21ud a", "vivo x21i a", "vivo y85a", "vivo y83a",
                "clt-al00", "clt-al01", "eml-al00", "ane-al00",
                "onrplus a6000"
            ];
            if (data) {
                for (let i = 0; i < oppr.length; i++) {
                    if (oppr[i] == data.toLowerCase()) {
                        config.ISBANG = true
                    }
                }
            }
            // console.log("config", config);
            let headWidget = this.node.getChildByName("topMenu").getComponent(cc.Widget);
            // let coinWidget = this.menuNode.getChildByName("btn_coin").getComponent(cc.Widget);
            // let diamondWidget = this.menuNode.getChildByName("btn_diamond").getComponent(cc.Widget);
            if (config.ISIPHONEX || config.ISIPHONEXSMAX || config.ISIPHONEXS) {
                //iphone x
                headWidget.top = 40;
                // coinWidget.top = 80;
                // diamondWidget.top = 145;

            } else if (config.ISBANG) {
                // 安卓
                headWidget.top = 40;
                // coinWidget.top = 80;
                // diamondWidget.top = 145;
            } //else {
            //     // UIWindow.getInstance().init(this, new egret.Rectangle(0, 0, this.stage.stageWidth,
            //     //     this.stage.stageHeight));
            // }
        }
    },

    start() {

    },
    //刷新UI界面
    changeUICallback: function (params) {

        if (this.reshUI == false) {
            this.fitWindow();
        }
        cc.find("topMenu/money/amount", this.node).getComponent(cc.Label).string = (miTools.Utils.toLabelString(params.corn) || 0);
        cc.find("topMenu/money/hbxx/layout/speed", this.node).getComponent(cc.Label).string = (miTools.Utils.toLabelString(params.productEffic) || 0) + "/s";

        cc.find("topMenu/orc/amount", this.node).getComponent(cc.Label).string = (miTools.Utils.toLabelString(params.mine) || 0);

        cc.find("topMenu/orc/hbxx/layout/speed", this.node).getComponent(cc.Label).string = (miTools.Utils.toLabelString(miTools.Utils.deMul(miTools.Utils.deMul(miDB.mineGainSkill, 100), miDB.GameData.DB.mine)) || 0) + "%";

        cc.find("topMenu/diamond/amount", this.node).getComponent(cc.Label).string = params.diamond || 0;

        // cc.find("topMenu/speed_bg/speed", this.node).getComponent(cc.Label).string = (miTools.Utils.toLabelString(params.productEffic) || 0) + "/s";
    },

    // update (dt) {},

    coinHelp: function () {
        cc.audioEngine.play(this.audio, false, 1);
        mi.UIManager.showUI("CoinHelpModel", { ceng: 51 });
    },

    ckHelp: function () {
        cc.audioEngine.play(this.audio, false, 1);
        mi.UIManager.showUI("CkHelpModel", { ceng: 51 });
    },

    spriteScale: function (data) {
        // console.log(data);
        if (data.type == 1) {
            this.coinSprite.runAction(
                cc.sequence(
                    cc.scaleTo(0.2, 1.4),
                    cc.scaleTo(0.2, 1)
                )
            );
        } else if (data.type == 2) {
            this.mineSprite.runAction(
                cc.sequence(
                    cc.scaleTo(0.2, 1.4),
                    cc.scaleTo(0.2, 1)
                )
            );
        } else if (data.type == 3) {
            this.diamondSprite.runAction(
                cc.sequence(
                    cc.scaleTo(0.2, 1.4),
                    cc.scaleTo(0.2, 1)
                )
            );
        }
    },

    showNotice(params) {
        if (!params) {
            console.log("params must't be null!");
            return;
        }
        let that = this;
        let content = this.noticNode.getChildByName("content");
        miTools.Utils.loadSprite(cc.find("desc_bg/icon", content), params.altas, params.icon);
        cc.find("desc_bg/desc", content).getComponent(cc.Label).string = params.desc;
        if (that.isRuning) {
            return;
        }
        this.noticNode.active = true;
        this.noticNode.setScale(0.3, 0);
        cc.find("desc_bg/desc", content).setScale(0, 0);
        this.noticNode.runAction(cc.sequence(
            cc.callFunc(function () {
                that.isRuning = true;
            }),
            cc.spawn(
                cc.fadeIn(0.15),
                cc.sequence(
                    cc.scaleTo(0.15, 0.3, 0.05),
                    cc.scaleTo(0.15, 0.6, 0.03),
                    cc.scaleTo(0.15, 1, 0.01),
                )
            ),
            cc.scaleTo(0.1, 1, 1),
            cc.callFunc(function () {
                cc.find("desc_bg/desc", content).runAction(
                    cc.sequence(
                        cc.spawn(
                            cc.fadeIn(0.2),
                            cc.scaleTo(0.2, 1, 1),
                        ),
                        cc.callFunc(function () {
                            cc.find("particle", content).active = true;
                            cc.find("desc_bg/icon", content).active = true;
                        })
                    )
                )
            }),
            cc.delayTime(0.8),
            cc.callFunc(function () {
                cc.find("desc_bg/desc", content).runAction(
                    cc.sequence(
                        cc.spawn(
                            cc.fadeOut(0.2),
                            cc.scaleTo(0.2, 0, 0),
                        ),
                        cc.callFunc(function () {
                            cc.find("particle", content).active = false;
                            cc.find("desc_bg/icon", content).active = false;
                        })
                    )
                )
            }),
            cc.delayTime(0.2),
            cc.spawn(
                cc.fadeIn(0.45),
                cc.sequence(
                    cc.scaleTo(0.15, 1, 0.01),
                    cc.scaleTo(0.15, 0.6, 0.03),
                    cc.scaleTo(0.15, 0.3, 0.05),
                    cc.scaleTo(0.1, 0, 0),
                )
            ),
            cc.callFunc(function () {
                that.noticNode.active = false;
                that.isRuning = false;
            })
        ));
    },

    friendHelpNotice: function (params) {
        if (!params) {
            console.log("params must't be null!");
            return;
        }
        let that = this;
        let content = this.noticNode.getChildByName("content");
        for (let i = 0; i < params.length; i++) {
            setTimeout(function () {
                if (tywx.isInWeChatPath) {
                    if (params[i].wxImg != "") {
                        miTools.Utils.loadSpriteUrl(cc.find("desc_bg/icon", content), params[i].wxImg);
                    } else {
                        miTools.Utils.loadSprite(cc.find("desc_bg/icon", content), "image/tplist/gameLayer", "tx_wu");
                    }
                }
                // miTools.Utils.loadSprite(cc.find("desc_bg/icon", content), params.altas, params.icon);
                cc.find("desc_bg/desc", content).getComponent(cc.Label).string = "来帮忙了，收益x2";
                that.noticNode.setScale(0.3, 0);
                cc.find("desc_bg/desc", content).setScale(0, 0);
                that.noticNode.active = true;
                that.noticNode.runAction(cc.sequence(
                    cc.spawn(
                        cc.fadeIn(0.15),
                        cc.sequence(
                            cc.scaleTo(0.15, 0.3, 0.05),
                            cc.scaleTo(0.15, 0.6, 0.03),
                            cc.scaleTo(0.15, 1, 0.01),
                        )
                    ),
                    cc.scaleTo(0.1, 1, 1),
                    cc.callFunc(function () {
                        cc.find("desc_bg/desc", content).runAction(
                            cc.sequence(
                                cc.spawn(
                                    cc.fadeIn(0.2),
                                    cc.scaleTo(0.2, 1, 1),
                                ),
                                cc.callFunc(function () {
                                    cc.find("particle", content).active = true;
                                    cc.find("desc_bg/icon", content).active = true;
                                })
                            )
                        )
                    }),
                    cc.delayTime(0.8),
                    cc.callFunc(function () {
                        cc.find("desc_bg/desc", content).runAction(
                            cc.sequence(
                                cc.spawn(
                                    cc.fadeOut(0.2),
                                    cc.scaleTo(0.2, 0, 0),
                                ),
                                cc.callFunc(function () {
                                    cc.find("particle", content).active = false;
                                    cc.find("desc_bg/icon", content).active = false;
                                })
                            )
                        )
                    }),
                    cc.delayTime(0.2),
                    cc.spawn(
                        cc.fadeIn(0.45),
                        cc.sequence(
                            cc.scaleTo(0.15, 1, 0.01),
                            cc.scaleTo(0.15, 0.6, 0.03),
                            cc.scaleTo(0.15, 0.3, 0.05),
                            cc.scaleTo(0.1, 0, 0),
                        )
                    ),
                    cc.callFunc(function () {
                        that.noticNode.active = false;
                    })
                ));

            }, 3000 * (i + 1))
        }
    },

    fadeIN() {
        if (miDB.SceneData.currPage == 1) {
            return;
        }

        if (miDB.SceneData.index == 1) {
            cc.find("nextScence1", this.node).active = false;
            cc.find("nextScence0", this.node).active = true;

        } else if (miDB.SceneData.index == 0) {
            cc.find("nextScence1", this.node).active = true;
            cc.find("nextScence0", this.node).active = false;

        }

    },

    unlockScene() {
        console.log("unlockScene");

        var self = this;
        if (miDB.MasterData.getBuildListLength() == 9) {
            var costCron = "4.4e+22";
            var isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.corn, costCron);
            if (isPrice >= 0) {
                // tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, {
                //     title: "提示", content: "解锁需要" + costCron + "金币!", okCallback: function () {
                //         miDB.GameData._costCornCallback({ cost: costCron });
                //         miDB.localData.game.costCorn = miTools.Utils.deAdd(miDB.localData.game.costCorn, costCron).toString();
                //         miDB.localData.game.nextScene = true;
                //         if (miDB.localData.game.nextScene == true) {
                //             self.chageScence(null, 1);
                //         }
                //     }
                // });
                miDB.GameData._costCornCallback({ cost: costCron });
                miDB.localData.game.costCorn = miTools.Utils.deAdd(miDB.localData.game.costCorn, costCron).toString();
                miDB.localData.game.nextScene = true;
                if (miDB.localData.game.nextScene == true) {
                    self.chageScence(null, 1);
                }
            }

        }

    },

    chageScence(event, customEventData) {
        let that = this;
        this.senceAnimNode.active = true;
        let anim = this.senceAnimNode.getComponent(cc.Animation);
        anim.play();
        anim.on('finished', function () {
            that.senceAnimNode.getChildByName("y11").setScale(1);
            that.senceAnimNode.getChildByName("y12").setScale(1);
            that.senceAnimNode.getChildByName("y13").setScale(1);
            that.senceAnimNode.getChildByName("y14").setScale(1);
            that.senceAnimNode.getChildByName("y21").setScale(1);
            that.senceAnimNode.getChildByName("y22").setScale(1);
            that.senceAnimNode.getChildByName("y23").setScale(1);
            that.senceAnimNode.getChildByName("y24").setScale(1);
            that.senceAnimNode.active = false;
        }, this);

        setTimeout(function () {
            tywx.NotificationCenter.trigger(miDB.EVENT.GAME_SCENE_CHANGE, customEventData);
            if (miDB.localData.game.nextScene == false && customEventData == 1) {
                this.node.getChildByName("mask").active = true;
                tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "allHide" });

                var costCron = "4.4e+22";
                var isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.corn, costCron);
                if (isPrice >= 0 && miDB.MasterData.getBuildListLength() == 9) {
                    miTools.Utils.loadSprite(cc.find("mask/bg/unlockScene", this.node), "image/tplist/gameUiTwo", "ui_ty_bt_2_1");
                    cc.find("mask/bg/unlockScene/label", this.node).getComponent(cc.Label).string = miTools.Utils.toLabelString(costCron);
                    // cc.find("mask/bg", this.node).height=  439;
                    // cc.find("mask/bg/unlockScene", this.node).active=true;

                } else {
                    miTools.Utils.loadSprite(cc.find("mask/bg/unlockScene", this.node), "image/tplist/gameUiTwo", "ui_ty_bt_3_1");
                    cc.find("mask/bg/unlockScene/label", this.node).getComponent(cc.Label).string = miTools.Utils.toLabelString(costCron);
                    // cc.find("mask/bg", this.node).height=  396;
                    // cc.find("mask/bg/unlockScene", this.node).active=false;
                }

                tywx.NotificationCenter.trigger(miDB.EVENT.SHIT_STATUS_ACTION, { action: "hide" });
            } else {
                this.node.getChildByName("mask").active = false;
                tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "showAll" });
                tywx.NotificationCenter.trigger(miDB.EVENT.SHIT_STATUS_ACTION, { action: "show" });
            }
            if (miDB.SceneData.index == 1) {
                cc.find("nextScence1", this.node).active = false;
                cc.find("nextScence0", this.node).active = true;

            } else if (miDB.SceneData.index == 0) {
                cc.find("nextScence1", this.node).active = true;
                cc.find("nextScence0", this.node).active = false;

            }
        }.bind(this), 500);

    },

    bossComing() {
        if (miDB.localData.game.nextScene == false && miDB.SceneData.index == 1) {
            this.chageScence(null, 0);

        }
        cc.find("nextScence1", this.node).active = false;
        cc.find("nextScence0", this.node).active = false;

    },


    playMineAnim: function () {
        let that = this;
        this.lightSprite.active = true;
        this.particle.active = true;
        this.particle.getComponent(cc.ParticleSystem).resetSystem();
        this.lightSprite.runAction(cc.sequence(
            cc.scaleTo(0.6, 1.2, 1.2),
            cc.fadeOut(0.2),
            cc.callFunc(function () {
                that.lightSprite.active = false;
            })
        ))
        setTimeout(function () {
            this.particle.getComponent(cc.ParticleSystem).stopSystem();
        }.bind(this), 1000)
    },

    //切换场景按钮显示隐藏
    nextScenceStatus(data) {
        // console.log(data)
        if (data.action == "showAll") {
            this.fadeIN();
        } else if (data.action == "show") {
            this.fadeIN();
        } else if (data.action == "hide") {
            this.nextScence.active = false;
            this.backScence.active = false;
        } else if (data.action == "allHide") {
            this.nextScence.active = false;
            this.backScence.active = false;
        } else if (data.action == "allHideFeed") {
            this.nextScence.active = false;
            this.backScence.active = false;
        } else if (data.action == "allHideShop") {
            this.nextScence.active = false;
            this.backScence.active = false;
        }
    }
});
