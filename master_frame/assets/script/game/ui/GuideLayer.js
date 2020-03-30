
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "GuideLayer",

        typeNode1: cc.Node,
        typeLabel1: cc.RichText,
        layoutNode: cc.Node,
        typeTitleLabel1: cc.Label,
        typeNode2: cc.Node,
        typeLabel2: cc.RichText,
        typeTitleLabel2: cc.Label,
        maskNode: cc.Node,
        upgrade: cc.Node
    },

    onLoad: function () {

        this.moveSpeed = 150;
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_MONSTER_MASK, this.hidePointAction, this);
        tywx.NotificationCenter.listen(miDB.EVENT.FINISH_TURN_TABLE, this.close, this);
        
        // tywx.NotificationCenter.listen(miDB.EVENT.WECHAT_GAME_GUIDE,this.updateGuinceNodePos,this); 
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBg, this);
        this.touchNode = cc.find("touchNode", this.node);
        this.playNode = cc.find("playNode", this.node);
        this.moveSprite = cc.find("moveSprite", this.node);

        this.isShowing = false;

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            let scale = screenW / 720;
            let pos = this.typeNode1.getPosition();
            this.typeNode1.setPosition(pos.x * scale, pos.y * scale);
        }
    },


    updateGuinceNodePos(data) {

        this.configData = data;

        // var screenW = cc.find("Canvas").width;
        // if (screenW < 720 && !data.isMove) {
        //     let node = cc.find(this.configData.nodeName, this.node);
        //     let scale = screenW / 720;
        //     if (!node.isChanged) {
        //         let pos = node.getPosition();
        //         node.setPosition(pos.x * scale, pos.y * scale);
        //         node.setScale(scale);
        //         node.isChanged = true;
        //     }
        //     if (data.nodeNameArray) {
        //         for (let i = 0; i < data.nodeNameArray.length; i++) {
        //             var currNode = cc.find(data.nodeNameArray[i], this.node);
        //             if (!currNode.isChanged) {
        //                 let pos = currNode.getPosition();
        //                 currNode.setPosition(pos.x * scale, pos.y * scale);
        //                 currNode.setScale(scale);
        //                 currNode.isChanged = true;
        //             }
        //         }
        //     }
        // }

        // var screenW = cc.find("Canvas").width;
        // if (screenW < 720) {
        //     let scale = screenW / 720;
        //     let pos = this.configData.showNodePos;
        //     this.playNode.setPosition(pos.x * scale, pos.y * scale);
        // } else {
        //     this.playNode.setPosition(this.configData.showNodePos);
        // }

        // this.upgrade.stopAllActions();
        // this.upgrade.getChildByName("figherSprite").active = false;
        // this.upgrade.active = false;

        if (this.configData.isForce == true && this.configData.etype == 1 && this.configData.nodeName) {

            var currNode = cc.find(this.configData.nodeName, this.node);
            if (currNode) {
                this.touchNode.active = true;
                cc.find("figherSprite", this.touchNode).active = true;
                this.moveSprite.active = false;
                this.touchNode.setPosition(currNode.x, currNode.y);
                this.touchNode.width = currNode.width;
                this.touchNode.height = currNode.height;

            }

        } else if (this.configData.etype == 2) {

            this.touchNode.active = true;
            cc.find("figherSprite", this.touchNode).active = false;
            var currNode = cc.find(this.configData.nodeName, this.node);
            if (currNode) {
                this.touchNode.active = true;
                this.moveSprite.active = false;
                this.touchNode.setPosition(currNode.x, currNode.y);
                this.touchNode.width = currNode.width;
                this.touchNode.height = currNode.height;

            }


            this.moveSprite.active = true;
            var posArray = [];

            this.moveSprite.stopAllActions();

            this.configData.nodeNameArray[i]

            for (var i = 0; i < this.configData.nodeNameArray.length; i++) {
                var currNode = cc.find(this.configData.nodeNameArray[i], this.node);
                if (currNode) {
                    if (i == 0) {
                        this.moveSprite.setPosition(currNode.x, currNode.y);
                    } else {
                        if (posArray.length == 0) {
                            var time = this.culSpeedTime(cc.v2(this.moveSprite.x, this.moveSprite.y), cc.v2(currNode.x, currNode.y));
                            posArray.push(cc.moveTo(time, currNode.x, currNode.y));
                        }

                    }

                }
            }
            var currNode1 = cc.find(this.configData.nodeNameArray[0], this.node);
            var len = this.configData.nodeNameArray.length;
            var finalNode = cc.find(this.configData.nodeNameArray[len - 1], this.node);
            var time = this.culSpeedTime(cc.v2(finalNode), cc.v2(currNode1.x, currNode1.y));
            posArray.push(cc.moveTo(time, currNode1.x, currNode1.y));
            this.moveSprite.runAction(cc.sequence(posArray).repeatForever());
        }
        else if (this.configData.etype == 4) {
            var currNode = cc.find(this.configData.nodeName, this.node);
            if (currNode) {
                this.touchNode.active = false;
                this.moveSprite.active = false;






                // console.log(data);
                currNode.active = true;
                // cc.find ("figherSprite",this.touchNode).active=false;
                // this.moveSprite.active=false;
                // this.touchNode.setPosition (  currNode.x ,currNode.y );
                // this.touchNode.width= currNode.width ;
                // this.touchNode.height=  currNode.height ;

            }

        }

        else if (this.configData.etype == 5) {

            var currNode = cc.find(this.configData.nodeName, this.node);
            if (currNode) {

                this.touchNode.active = true;
                cc.find("figherSprite", this.touchNode).active = true;
                this.moveSprite.active = false;
                this.touchNode.setPosition(currNode.x, currNode.y);
                this.touchNode.width = currNode.width;
                this.touchNode.height = currNode.height;
                currNode.active = true;
            }



        }



        // this.guinceNode =data.node;

        // if ( data.action== "show"&& this.guinceNode)
        // {

        //     this.guidanceMask .width= this.guinceNode.width;
        //    this.guidanceMask .height= this.guinceNode.height;
        //    this.guidanceMask.scale =this.guinceNode.scale;
        //    this.guidanceMask.setAnchorPoint(this.guinceNode.getAnchorPoint());
        //    this.guidanceMask.setPosition (this.node.convertToNodeSpaceAR( this.guinceNode.convertToWorldSpaceAR(cc.v2(0,0))));
        //    this.node.active =true;


        // }
        // else if ( data.action== "hide")
        // {
        //     this.guinceNode =this.testNode;
        //     this.guidanceMask .width= 0;
        //    this.guidanceMask .height= 0;
        //    this.guidanceMask.scale =this.guinceNode.scale;
        //    this.guidanceMask.setAnchorPoint(this.guinceNode.getAnchorPoint());
        //    this.guidanceMask.setPosition (this.node.convertToNodeSpaceAR( this.guinceNode.convertToWorldSpaceAR(cc.v2(0,0))));
        //    this.node.active =true; 

        // }
        // else 
        // {
        //     this.node.active =false;
        // }


    },

    close: function (event) {

        if (event && event.target.name == "node14") {
            tywx.NotificationCenter.trigger("UPDATE_LEFTRIGHT_TIME", { action: "showAll" });


           
            var data = {
                id: 10000, 
                name: "引导奖励",
                titileSp: "", decLabel: "恭喜通过新手引导", getLabel: "邀请朋友获得新手大礼包!", itemSp: "",
                rewardItem: { type: "diamond", num: 100 },
                shareEvent: "NEWUSER_GIFT"
            };
            mi.UIManager.showUI("NoobRewardModel", { ceng: 50, customData:data });
        }

        cc.find("node14", this.node).active = false;
        cc.find("node15", this.node).active = false;
        cc.find("node17", this.node).active = false;
        mi.UIManager.hideUI(this.uiName);
    },

    culSpeedTime(pos1, pos2) {

        var dist = pos2.sub(pos1).mag()
        // var dist = cc.pDistance(pos1, pos2);

        return parseFloat(dist / this.moveSpeed);

    },






    beforeShow: function (params) {

        tywx.LOGD("--->>> Guide Layer !")
        // var guideInfo = params.guideInfo.params
        // this.typeNode1.active = (guideInfo.etype == '1' || guideInfo.etype == '2' || guideInfo.etype == '4' || guideInfo.etype == '5')
        // this.typeNode2.active = (guideInfo.etype == '3')

        // this.typeLabel1.string = guideInfo.richContent;
        // this.typeLabel2.string = guideInfo.richContent;

        // this.typeTitleLabel1.string = guideInfo.guideName;
        // this.typeTitleLabel2.string = guideInfo.guideName;

        // this.maskNode.active = (guideInfo.isForce == true);

        // if (this.typeLabel1.node.height > 85) {
        //     this.layoutNode.height = this.typeLabel1.node.height + 100;
        // }
    },

    onTouchBg(event) {

        if (this.configData.isForce == true) {

            let point = event.getLocation();
            let retWord = this.touchNode.getBoundingBoxToWorld();
            //let space = 40;
            //retWord.width -= space;
            retWord.width = retWord.width <= 0 ? 0 : retWord.width;
            //retWord.height -= space;
            retWord.height = retWord.height <= 0 ? 0 : retWord.height;

            if (retWord.contains(point)) {
                this.node._touchListener.setSwallowTouches(false);

                if (this.configData.etype == 2) {
                    this.moveSprite.active = false;
                    this.moveSprite.stopAllActions();
                    if (this.configData.guideId == 9) {
                        let speed = miDB.GameData.DB.productEffic || 0;
                        if (!this.isPassed && !this.levelPage && speed < 40) {
                            this.isPassed = true;
                            this.upgrade.active = true;
                            this.upgrade.runAction(cc.sequence(
                                cc.delayTime(5),
                                cc.callFunc(function () {
                                    this.upgrade.getChildByName("figherSprite").active = true;
                                }, this),
                                cc.delayTime(3),
                                cc.callFunc(function () {
                                    this.upgrade.getChildByName("figherSprite").active = false;
                                }, this)
                            ).repeatForever());
                        }
                    }
                }

            } else {
                this.node._touchListener.setSwallowTouches(true);
            }
        } else {
            this.node._touchListener.setSwallowTouches(false);
        }
    },

    bossComing() {
        console.log("bossComing");
        miDB.localData.game.canFinghtBoss = true;
        miDB.GuidData.isGuidBoss = true;
        var ttime = new Date(miDB.localData.systime * 1000);
        miDB.BossData.bossTime = Date.parse(ttime) / 1000;
        miDB.BossData.statue = 1;
        this.close();
    },


    show: function (data) {

        // console.log(data);
        if (typeof (data) == "undefined" || !data.guideInfo) {
            return;
        }

        // console.log(data.guideInfo)

        this.moveSprite.active = false;
        this.touchNode.active = false;
        let that = this;
        that.layoutNode.getChildByName("playTitel").active = false;
        that.layoutNode.getChildByName("playrichtext").active = false;
        let monster = cc.find("playSprite", this.layoutNode);

        // this.updateGuinceNodePos(data.guideInfo.params);
        var guideInfo = data.guideInfo.params;



        var screenW = cc.find("Canvas").width;
        if (screenW < 720 && !guideInfo.isMove) {
            let node = cc.find(guideInfo.nodeName, this.node);
            let scale = screenW / 720;
            if (!node.isChanged) {
                let pos = node.getPosition();
                node.setPosition(pos.x * scale, pos.y * scale);
                node.setScale(scale);
                node.isChanged = true;
            }
            if (guideInfo.nodeNameArray) {
                for (let i = 0; i < guideInfo.nodeNameArray.length; i++) {
                    var currNode = cc.find(guideInfo.nodeNameArray[i], this.node);
                    if (!currNode.isChanged) {
                        let pos = currNode.getPosition();
                        currNode.setPosition(pos.x * scale, pos.y * scale);
                        currNode.setScale(scale);
                        currNode.isChanged = true;
                    }
                }
            }
        }

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            let scale = screenW / 720;
            let pos = guideInfo.showNodePos;
            this.playNode.setPosition(pos.x * scale, pos.y * scale);
        } else {
            this.playNode.setPosition(guideInfo.showNodePos);
        }

        this.upgrade.stopAllActions();
        this.upgrade.getChildByName("figherSprite").active = false;
        this.upgrade.active = false;


        this.typeNode1.active = (guideInfo.etype == '1' || guideInfo.etype == '2' || guideInfo.etype == '4' || guideInfo.etype == '5')
        this.typeNode2.active = (guideInfo.etype == '3')

        this.typeLabel1.string = guideInfo.richContent;
        this.typeLabel2.string = guideInfo.richContent;

        this.typeTitleLabel1.string = guideInfo.guideName;
        this.typeTitleLabel2.string = guideInfo.guideName;

        this.maskNode.active = (guideInfo.isForce == true);

        // this.playNode.active = false;
        // this.moveSprite.active = false;
        cc.find("mask", this.node).active = true;

        if (guideInfo.isShowMall == true) {
            that.layoutNode.active = false;
            that.isShowing = false;
            that.updateGuinceNodePos(guideInfo);
            cc.find("mask", that.node).active = false;
            return;
        }
        let isloaded = false;
        console.log("this.isShowing" + this.isShowing);
        if (this.isShowing) {
            let anim = that.layoutNode.getComponent(cc.Animation);
            anim.play("guideBack");
            monster.runAction(cc.sequence(cc.delayTime(0.15), cc.scaleTo(0.03, 0.4)));

            anim.on('finished', function () {
                if (!isloaded) {
                    isloaded = true;
                    monster.runAction(cc.sequence(
                        cc.scaleTo(0.1, 1),
                        // cc.delayTime(0.1),
                        cc.callFunc(function () {
                            that.layoutNode.active = true;
                            let anim = that.layoutNode.getComponent(cc.Animation);
                            anim.play("guide");
                            anim.on('finished', anim.fin = function () {
                                that.layoutNode.getChildByName("playrichtext").active = true;
                                that.layoutNode.height = that.typeLabel1.node.height + 120;
                                that.updateGuinceNodePos(guideInfo);
                                cc.find("mask", that.node).active = false;
                                anim.off('finished', anim.fin, that);

                            }, that);

                        }),
                        cc.delayTime(0.4),
                        cc.callFunc(function () {
                            that.layoutNode.getChildByName("playTitel").active = true;
                        }),
                        // cc.delayTime(0.45),
                        // cc.callFunc(function () {
                        //     that.layoutNode.getChildByName("playrichtext").active = true;
                        //     that.isShowing = true;
                        //     that.layoutNode.height = that.typeLabel1.node.height + 120;
                        //     that.updateGuinceNodePos(guideInfo);
                        //     cc.find("mask", that.node).active = false;
                        // })
                    ));
                }
            }, this);
        } else {
            this.isShowing = true;
            monster.setScale(0.4);
            monster.runAction(cc.sequence(
                cc.scaleTo(0.1, 1),
                // cc.delayTime(0.1),
                cc.callFunc(function () {
                    that.layoutNode.active = true;
                    let anim = that.layoutNode.getComponent(cc.Animation);
                    anim.play("guide");
                    anim.on('finished', anim.fin = function () {
                        that.layoutNode.getChildByName("playrichtext").active = true;
                        that.layoutNode.height = that.typeLabel1.node.height + 120;
                        that.updateGuinceNodePos(guideInfo);
                        cc.find("mask", that.node).active = false;
                        anim.off('finished', anim.fin, that);

                    }, that);

                }),
                cc.delayTime(0.3),
                cc.callFunc(function () {
                    that.layoutNode.getChildByName("playTitel").active = true;
                }),
                // cc.delayTime(0.45),
                // cc.callFunc(function () {
                //     that.layoutNode.getChildByName("playrichtext").active = true;
                //     that.layoutNode.height = that.typeLabel1.node.height + 120;
                //     that.updateGuinceNodePos(guideInfo);
                //     cc.find("mask", that.node).active = false;
                // })
            ));
        }
    },

    nowAction(event, guideInfo) {

        var that = this;



    },

    hide: function (data) {
        this.isShowing = false;
    },

    start: function () {

    },

    hidePointAction: function (data) {
        let speed = miDB.GameData.DB.productEffic || 0;
        if (speed >= 40) {
            this.upgrade.active = false;
            return;
        }
        if (this.configData && this.configData.guideId == 9) {
            if (data.action == "show") {
                this.isPassed = false;
                this.levelPage = true;
                this.upgrade.stopAllActions();
                this.upgrade.getChildByName("figherSprite").active = false;
                this.upgrade.active = true;
            } else if (data.action == "resuse") {
                if (this.configData.guideId == 9) {
                    if (!this.isPassed) {
                        this.isPassed = true;
                        this.upgrade.runAction(cc.sequence(
                            cc.delayTime(5),
                            cc.callFunc(function () {
                                this.upgrade.getChildByName("figherSprite").active = true;
                            }, this),
                            cc.delayTime(3),
                            cc.callFunc(function () {
                                this.upgrade.getChildByName("figherSprite").active = false;
                            }, this)
                        ).repeatForever());
                    }
                }
            }
        }
    },


    update: function (dt) {

    },

    onDestory: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.GAME_MONSTER_MASK, this.hidePointAction, this);
    },
});
