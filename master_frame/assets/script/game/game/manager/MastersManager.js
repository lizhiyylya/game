cc.Class({
    extends: cc.Component,

    properties: {
        heroAtlas: cc.SpriteAtlas,
        spriteAtlas: cc.SpriteAtlas,
    },

    onLoad: function () {
        this.BuildShapeList = [];
        tywx.NotificationCenter.listen(miDB.EVENT.REMOVE_BUILDING_DATA, this._removeBuildingShape, this);   // 移除
        tywx.NotificationCenter.listen(miDB.EVENT.UPDATE_BUILDING_DATA, this._updateBuildingShape, this);  //   升级


        tywx.NotificationCenter.listen(miDB.EVENT.ADD_BUILDING_DATA, this._addBuildingShape, this);    // 添加
        tywx.NotificationCenter.listen(miDB.EVENT.REFRESH_BUILDINGS, this._reFreshBuidingShape, this);


    },

    start: function () {

    },

    onDestroy: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.REMOVE_BUILDING_DATA, this._removeBuildingShape, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.UPDATE_BUILDING_DATA, this._updateBuildingShape, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.ADD_BUILDING_DATA, this._addBuildingShape, this);
        tywx.NotificationCenter.ignore(miDB.EVENT.REFRESH_BUILDINGS, this._reFreshBuidingShape, this);

    },

    addMaster: function (idx, data) {
        // 增加建筑，先创建数据
        miDB.MasterData.addMasterData(idx, data);
    },

    removeBuilding: function (idx, data) {
        tywx.LOGD("移除建筑 idx = ", idx);
        // 移除建筑，先创建数据
        miDB.BuildingData.removeBuildingData(idx);
    },
    updateBuilding: function (idx, data, addLevel) {
        tywx.LOGD("升级建筑 idx = ", idx)
        // 升级建筑，先创建数据
        miDB.BuildingData.updateBuildingData(idx, data, addLevel)
    },
    gainCornByBuildingIdx: function (idx) {
        // 增加建筑，先创建数据
        miDB.BuildingData.gainCornByBuildingIdx(idx);
    },


    _reFreshBuidingShape: function (data) {

        // console.log ("刷新建筑形态");
        var params = data;
        this._updateBuildingShape(params);

    },

    _createOneBuild: function (params) {
        var that = this;
        var cfgInfo = params.getCfgInfo();
        var seatIdx = cfgInfo.seatPos;
        var self = this;
        cc.loader.loadRes("model/gameModel/sceneModel/MasterUiMoudel", function (err, prefab) {
            var node = cc.instantiate(prefab);
            var seatArry = self.node.getComponent("MastersModel").seatIdxArray;
            var buildset = seatArry[seatIdx];
            buildset.active = true;
            buildset.getChildByName("shapeAniNode").active = true
            buildset.getChildByName("layout").active = false;
            var buildsetnext = seatArry[seatIdx + 1];

         
            if (buildsetnext && miDB.localData.master.length == seatIdx + 1) {
                buildsetnext.getChildByName("egg").getComponent(cc.Button).enabled = true;
            }
            buildset.addChild(node);
            node.masterIdx = params.masterIdx;
            self.BuildShapeList.push(node);


        });
    },

    //绘制建筑形状
    _addBuildingShape: function (params) {
        var that = this
        //params 建筑物对象
        var cfgInfo = params.getCfgInfo();

        var seatIdx = cfgInfo.seatPos;
        var uiName = cfgInfo.buildShapeName;
        if (uiName == "R1008" || uiName == "R1009") {
            uiName = "R1007";
        }
        miTools.Utils.loadPrefab("model/gameModel/shapeModel/EggBreakAni", function (model) {
            if (model != undefined) {
                var buildset = "";

                if (seatIdx + 1 >= 10) {
                    buildset = cc.find("MonsterLayout1/monster" + (seatIdx + 1), that.node);
                } else {
                    buildset = cc.find("MonsterLayout/monster" + (seatIdx + 1), that.node);
                }
                buildset.addChild(model)
                var anim = model.getComponent(cc.Animation);
                anim.play();
                anim.on('finished', function () {
                    buildset.removeChild(model);
                }, that);
                model.y = 50;

                buildset.getChildByName("egg").getComponent(cc.Button).enabled = false;
                buildset.getChildByName("egg").getComponent(cc.Animation).stop();


                var seatNode = buildset.getChildByName("egg")
                miTools.Utils.loadSprite(seatNode, "image/tplist/game_master", "");

                if (seatIdx == 3 || seatIdx == 5 || seatIdx == 8) {
                    let flag = buildset.getChildByName("egg").getChildByName("yx_bg_js");
                    if (flag) {
                        flag.active = false;
                    }
                }

                //tywx.Timer.setTimer(cc.director, function(){
                that._createOneBuild(params);
                // }, 1, 0, 0);
            } else {
                tywx.LOGD("加载错误 model = ItemModel")
            }
        })




    },


    buttonUpBind: function (button) {
        // button .buildIndex =customEventData;

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node
        clickEventHandler.component = "MastersManager";
        if (button.node.name == "monsters_level") {
            clickEventHandler.handler = "monstersUp";
        }

        button.clickEvents.push(clickEventHandler);
    },

    monstersUp(event) {
        // console.log("monstersUp");
        // var node = event.target.parent;

        // var corn = miDB.GameData.getItemByName("corn");

        // var isPrice= miTools.Utils.comparedTo (corn ,  miDB.MasterData.getMaster(node.masterIdx) .masterPrice );
        // if( isPrice>=0 ){
        // miDB.MasterData.updateMaster(node.masterIdx,1);
        // }

    },


    //升级建筑形状
    _updateBuildingShape: function (params) {
        var masterIdx = params.masterIdx;

        for (var i = 0; i < this.BuildShapeList.length; i++) {

            if (this.BuildShapeList[i].masterIdx == masterIdx) {

                var seatNode = this.BuildShapeList[i].parent.getChildByName("egg");
                if (seatNode.getComponent(cc.Button).enabled == true) {
                    seatNode.getComponent(cc.Animation).stop();
                    seatNode.getComponent(cc.Button).enabled = false;
                    miTools.Utils.loadSprite(seatNode, "image/tplist/game_master", "");
                }
                let labelStor = cc.find("monsters/storageCorn", this.BuildShapeList[i]);
                labelStor.getComponent(cc.Label).string = "" + miTools.Utils.toLabelString(params.storageCorn);
                let progress = cc.find("monsters/progress", this.BuildShapeList[i]);
                let progressBar = progress.getComponent(cc.ProgressBar);
                let needTime = miCfg.Master.getProductTime(params.masterIdx, params.level);
                let needResult = miTools.Utils.comparedTo(needTime, "0.1");
                let onceProductCorn = miCfg.Master.getOutputGold(masterIdx, params.level);

                if (needResult >= 0 && miDB.autoGetSkill[masterIdx - 1] == false && params.storageCorn != "0") {
                    progress.active = false;

                } else if (needResult >= 0) {
                    progress.active = true;

                }

                let final = cc.find("monsters/final", this.BuildShapeList[i]);
                // let animWalk = final.getComponent(cc.Animation);
                if (needResult < 0) {
                    final.active = true;
                    progress.active = false;
                    let anim = final.getComponent(cc.Animation);
                    let animState = anim.getAnimationState('coinAuto');
                    if (!animState.isPlaying) {
                        anim.play();
                    }
                }

                if (progress.active) {
                    progressBar.progress = parseFloat(params.productTime / needTime);
                } else {
                    progressBar.progress = 0;
                }
                if (params.storageCorn != 0) {
                    labelStor.active = true;
                } else {
                    labelStor.active = false;
                }
                if (cc.find("monsters_level", this.BuildShapeList[i]).active == true) {
                    cc.find("monsters_level/speed", this.BuildShapeList[i]).getComponent(cc.Label).string = miTools.Utils.toLabelString(miTools.Utils.deDividedBy(onceProductCorn, needTime)) + "/s";
                    cc.find("monsters_level/level", this.BuildShapeList[i]).getComponent(cc.Label).string = params.level;
                    miTools.Utils.loadSprite(cc.find("monsters_level/sprite", this.BuildShapeList[i]), "image/tplist/game_master", miCfg.Master[masterIdx].MasterShapeName);
                    cc.find("monsters_level/btn/layout/paid", this.BuildShapeList[i]).getComponent(cc.Label).string = miTools.Utils.toLabelString(params.masterPrice);  // miTools.Utils.toLabelString(miCfg.Master.getUpGradeGold (masterIdx,params.level ));
                    let progressBar = cc.find("monsters_level/level_progress", this.BuildShapeList[i]).getComponent(cc.ProgressBar);

                    let length = miCfg.Master.speedLevelNode.length;
                    if (params.level == miCfg.Master.speedLevelNode[length - 1]) {
                        cc.find("monsters_level/level", this.BuildShapeList[i]).getComponent(cc.Label).string = "最大";
                        cc.find("monsters_level/paid", this.BuildShapeList[i]).getComponent(cc.Label).string = "---";
                    } else {
                        for (let i = 0; i < length - 1; i++) {
                            if (params.level >= miCfg.Master.speedLevelNode[i] && params.level < miCfg.Master.speedLevelNode[i + 1]) {
                                progressBar.progress = (params.level - miCfg.Master.speedLevelNode[i]) / (miCfg.Master.speedLevelNode[i + 1] - miCfg.Master.speedLevelNode[i]);
                                break;
                            }
                        }
                    }

                    var corn = miDB.GameData.getItemByName("corn");
                    var isPrice = miTools.Utils.comparedTo(corn, params.masterPrice);
                    if (isPrice < 0) {
                        this.BuildShapeList[i].parent.zIndex = -1;
                    }
                }
            }


        }


        var seatArry = this.node.getComponent("MastersModel").seatIdxArray;   // 蛋抖动
        var lenelen = miDB.localData.master.length;
        var buildsetnext = seatArry[lenelen];

      
        if (buildsetnext) {
            var corn = miDB.GameData.getItemByName("corn");
            let price = miCfg.Master[lenelen + 1].activPrice;
            var isPrice = miTools.Utils.comparedTo(corn, price);

     
            if (isPrice < 0) {
                if (buildsetnext.getChildByName("egg").isplay == true) {
                    buildsetnext.getChildByName("egg").isplay = undefined;
                    buildsetnext.stopAllActions();
                    buildsetnext.getChildByName("egg").getComponent(cc.Animation).stop("anim_run");
                    miTools.Utils.loadSprite(buildsetnext.getChildByName("egg"), "image/tplist/gameLayer", "dan_hui");
                  
                }

            } else {
                if (typeof (buildsetnext.getChildByName("egg").isplay) == "undefined") {
                    buildsetnext.getChildByName("egg").isplay = true;
                    let animation = buildsetnext.getChildByName("egg").getComponent(cc.Animation);
                    let that = this;
                    buildsetnext.runAction(cc.sequence(
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
                                animation.addClip(clip);
                            }
                            animation.play("anim_run");
                            animation.speed = 1;
                           
                        }),
                        cc.delayTime(2)
                    ).repeatForever());

                    if (lenelen == 3 || lenelen == 5 || lenelen == 8) {
                        buildsetnext.getChildByName("egg").removeAllChildren();
                    }
                }

            }

        }








    },

    //移除建筑形状
    _removeBuildingShape: function (params) {

        // console.log("移除建筑形状");
        var idx = params.idx;
        var masterIdx = params.masterIdx;

        for (var i = 0; i < this.BuildShapeList.length; i++) {
            if (this.BuildShapeList[i].masterIdx == masterIdx) {
                this.BuildShapeList[i].removeFromParent(true);
                this.BuildShapeList.splice(i, 1);
                break
            }
        }

        if (this.BuildShapeList.length <= 0) {
            this.node.getComponent("MastersModel").updateStartBtIndex();
        }

        tywx.NotificationCenter.trigger(miDB.EVENT.RECYCLE_STATUS_UE, { status: true });
    },



});
