window.mi = {}
mi.UIManager = {

    TAG: "UIManager",
    rootNode: cc.Node,  //当前画布
    UIenum: {                 //画布上UI类型
        canvs: 1,
        layer: 2,
        alter: 3
    },
    MoveAction: {                 //画布上UI类型
        MOVE_UP: 1,
        MOVE_DOWN: 2,

    },
    UIStack: [],               //存储UI队列

    moveTime: 0.5,                //UI移动的时间

    getCurrentCanvas: function () {
        //TODO 多个scene切换的时候需要实现当前画布的切换
        let Canvas = this.rootNode || cc.find("Canvas");
        return Canvas;
    },

    setCurrentCanvas: function (rootNode) {
        //TODO 多个scene切换的时候需要实现当前画布的切换
        this.rootNode = rootNode
    },
    findNodeByName: function (nodeName, targe) {
        //cc.log("Canvas/"+targe.uiName+ "/"+nodeName);
        let UINode = cc.find("Canvas/" + targe.uiName + "/" + nodeName);
        if (UINode) {
            return UINode
        }
        return undefined
    },
    // TODO 每个类型的界面都是单例，一个prefab如果需要同时加载多个的时候需要扩展开发
    showUI: function (uiName, params) {
        var that = this;
        var modelType = "uiModel";
        var modelCeng = 0;
        var moveShow = undefined;
        if (params && params.moveShow) {
            moveShow = params.moveShow;
        }

        if (params && params["modelType"]) {
            modelType = params["modelType"];
        }
        if (params && params["ceng"]) {
            modelCeng = params["ceng"];
        }
        let UILayer = cc.find("Canvas/" + uiName);
        if (UILayer && UILayer != undefined) {
            UILayer.setPosition(cc.v2(0, 0));

            UILayer.active = true;
            this.pushCurrentUI(UILayer);
            
            if (UILayer.getComponent(uiName).beforeShow) {
                UILayer.getComponent(uiName).beforeShow(params);
            }

            //播放动画
            that._showAni(UILayer, uiName, moveShow, params);
        } else {
            miTools.Utils.loadPrefab("model/" + modelType + "/" + uiName, function (UILayer) {
                if (UILayer != undefined) {
                    var tag = UILayer.getComponent(uiName).uiType || 1;
                    //设置层级
                    //UILayer.setLocalZOrder(tag * 1000 + modelCeng);
                    UILayer.zIndex = tag * 1000 + modelCeng;
                    that.getCurrentCanvas().addChild(UILayer);
                    UILayer.active = true;

                    UILayer.setPosition(cc.v2(0, 0));
                    if (UILayer.getComponent(uiName).beforeShow) {
                        UILayer.getComponent(uiName).beforeShow(params);
                    }

                    that.pushCurrentUI(UILayer);
                    //播放动画
                    that._showAni(UILayer, uiName, moveShow, params);
                }
            })
        }
        return UILayer;
    },


    showUIParent: function (uiName, params, parent) {
        if (!parent) {
            console.log("showUIParent不能为空");
            return;
        }
        var that = this
        var modelType = "uiModel"
        var modelCeng = 0;
        var moveShow = undefined;

        if (params && params.moveShow) {
            moveShow = params.moveShow;
        }

        if (params && params["modelType"]) {
            modelType = params["modelType"];
        }
        if (params && params["ceng"]) {
            modelCeng = params["ceng"];
        }
        let UILayer = cc.find(uiName, parent);
        if (UILayer && UILayer != undefined) {
            UILayer.setPosition(cc.v2(0, 0));

            UILayer.active = true;
            // this.pushCurrentUI(UILayer)

            if (UILayer.getComponent(uiName).beforeShow) {
                UILayer.getComponent(uiName).beforeShow(params);
            }

            //播放动画
            that._showAni(UILayer, uiName, moveShow, params);
        } else {


            miTools.Utils.loadPrefab("model/" + modelType + "/" + uiName, function (UILayer) {

                if (UILayer != undefined) {
                    var tag = UILayer.getComponent(uiName).uiType || 1;
                    //设置层级
                    //UILayer.setLocalZOrder(tag * 1000 + modelCeng);
                    UILayer.zIndex = tag * 1000 + modelCeng;
                    parent.addChild(UILayer);
                    UILayer.active = true;
                    UILayer.setPosition(cc.v2(0, 0));
                    if (UILayer.getComponent(uiName).beforeShow) {
                        UILayer.getComponent(uiName).beforeShow(params);
                    }

                   // that.pushCurrentUI(UILayer);
                    //播放动画
                    that._showAni(UILayer, uiName, moveShow, params);
                }
            })
        }
        return UILayer;
    },

    _showAni: function (uiLayer, uiName, moveShow, params) {
        var that = this
        uiLayer.active = false;
        if (uiLayer) {
            var tag = uiLayer.getComponent(uiName).uiType
            if (tag === this.UIenum.canvs) {
                uiLayer.active = true;
                //TODO  界面切换效果没做
            } else if (tag === this.UIenum.layer) {
                //当前UI界面
                var dis = 1 //移动方向
                uiLayer.active = true;

                if (moveShow == undefined) {
                    if (uiLayer.getComponent(uiName).show) {
                        uiLayer.getComponent(uiName).show(params)
                    }
                    return
                }
                //方向
                if (moveShow == 1) {
                    dis = -1
                } else if (moveShow == 2) {
                    dis = 1
                }
                var height = uiLayer.getContentSize().height
                uiLayer.setPosition(cc.v2(0, dis * height));
                var moveTo1 = cc.moveTo(this.moveTime, cc.v2(0, 0))
                // uiLayer.setScale(0.2);
                // var scale2 = cc.scaleTo(0.2,0.6)
                // var scale3 = cc.scaleTo(0.2,1)

                uiLayer.runAction(cc.sequence(
                    moveTo1,
                    cc.callFunc(function () {
                        console.log("调用成功！")
                        if (uiLayer.getComponent(uiName).show) {
                            uiLayer.getComponent(uiName).show(params)
                        }
                    })
                ));


            } else if (tag === this.UIenum.alter) {
                uiLayer.stopAllActions()
                uiLayer.scale = 0.8
                uiLayer.active = true;

                // var scale1 = cc.scaleTo(0.2,0.8)
                var scale2 = cc.scaleTo(0.2, 1.15)
                var scale3 = cc.scaleTo(0.05, 1)

                uiLayer.runAction(cc.sequence(scale2, scale3,
                    cc.callFunc(function () {
                        console.log("调用成功！")
                        if (uiLayer.getComponent(uiName).show) {
                            uiLayer.getComponent(uiName).show(params)
                        }
                    })
                ));
            }
        }
    },
    showLayerUI: function (uiName, params, callBack, targer) {
     
        var that = this
        var modelType = "uiModel"
        var modelCeng = 0
        if (params && params["modelType"]) {
            modelType = params["modelType"]
        }
        if (params && params["ceng"]) {
            modelCeng = params["ceng"]
        }
        let UILayer = cc.find("Canvas/" + uiName);
        if (UILayer && UILayer != undefined) {
            UILayer.setPosition(cc.v2(0, 0));
            if (UILayer.getComponent(uiName).show) {
                UILayer.getComponent(uiName).show(params)
            }

            UILayer.active = true;
            this.pushCurrentUI(UILayer)
            //播放动画
            that._showAni(UILayer, uiName)
            if (callBack) {
                callBack.call(targer);
            }
        } else {


            miTools.Utils.loadPrefab("model/" + modelType + "/" + uiName, function (UILayer) {
                UILayer.setPosition(cc.v2(0, 0));
                if (UILayer.getComponent(uiName).show) {
                    //  UILayer.getComponent(uiName).show(params)
                }
                if (UILayer != undefined) {
                    var tag = UILayer.getComponent(uiName).uiType || 1;
                    //设置层级
                    //UILayer.setLocalZOrder(tag * 1000 + modelCeng);
                    UILayer.zIndex = tag * 1000 + modelCeng;
                    that.getCurrentCanvas().addChild(UILayer);


                    that.pushCurrentUI(UILayer);
                    //播放动画
                    //  that._showAni(UILayer,uiName); 
                    UILayer.active = false;
                    if (callBack) {
                        callBack.call(targer);
                    }
                }
            })
        }
    },

    hideUI: function (uiName, params) {
        var moveShow = undefined
        let UILayer = cc.find("Canvas/" + uiName);
        if (params && params.moveShow) {
            moveShow = params.moveShow
        }
        if (UILayer && UILayer != undefined) {
            this.popCurrentUI();
            UILayer.active = false;
            this._hideAni(UILayer, uiName, moveShow, params)
        } else {
            console.log('UILayer not exist' + uiName)
        }
    },


    _hideAni: function (uiLayer, uiName, moveShow, params) {
        var that = this
        if (uiLayer) {
            var dis = undefined
            uiLayer.active = true;
            var tag = uiLayer.getComponent(uiName).uiType
            if (tag === this.UIenum.canvs) {
                uiLayer.setPosition(cc.v2(1500, 0));
                uiLayer.active = false;

            } else if (tag === this.UIenum.layer) {
                // console.log("this.getStackUICount() = "+this.getStackUICount())
                if (moveShow == undefined) {
                    uiLayer.setPosition(cc.v2(1500, 0));
                    uiLayer.active = false;
                    if (uiLayer.getComponent(uiName).hide) {
                        uiLayer.getComponent(uiName).hide(params)
                    }
                    return
                }

                //方向
                if (moveShow == 1) {
                    dis = 1
                } else if (moveShow == 2) {
                    dis = -1
                }

                var height = uiLayer.getContentSize().height
                var moveTo2 = cc.moveTo(this.moveTime, cc.v2(0, dis * height))

                uiLayer.runAction(cc.sequence(moveTo2,
                    cc.callFunc(function () {
                        uiLayer.active = false
                        if (uiLayer.getComponent(uiName).hide) {
                            uiLayer.getComponent(uiName).hide(params)
                        }
                    })
                ));

            } else if (tag === this.UIenum.alter) {
                uiLayer.stopAllActions()
                uiLayer.scale = 1
                var scale2 = cc.scaleTo(0.05, 1.15)
                var scale3 = cc.scaleTo(0.2, 0.3)

                uiLayer.runAction(cc.sequence(scale2, scale3,
                    cc.callFunc(function () {
                        console.log("关闭调用成功！")
                        uiLayer.setPosition(cc.v2(1500, 0));
                        uiLayer.active = false;
                    })
                ));
            }
        }
    },
    getCurrentUI: function () {
        if (this.UIStack.length > 0) {
            return this.UIStack[this.UIStack.length - 1];
        }
        return undefined;
    },

    getStackUICount: function () {
        return this.UIStack.length
    },


    pushCurrentUI: function (UILayer) {
        if (UILayer) {

            this.UIStack.push(UILayer);
            // tywx.LOGD("----pushCurrentUI--B-->>>>> ")
            // for(var i=0;i<this.UIStack.length;i++){
            //     tywx.LOGD(" name = ",this.UIStack[i].name)
            // }
            // tywx.LOGD("----pushCurrentUI--E-->>>>> ")
        }
    },
    popCurrentUI: function () {
        if (this.UIStack.length > 0) {
            this.UIStack.pop();
            // tywx.LOGD("---popCurrentUI---B-->>>>> ")
            // for(var i=0;i<this.UIStack.length;i++){
            //     tywx.LOGD(" name = ",this.UIStack[i].name)
            // }
            // tywx.LOGD("---popCurrentUI---E-->>>>> ")
        }
    }
};