
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "GameLayer",

    },

    onLoad: function () {

        console.log("GameLayer");
        tywx.NotificationCenter.listen(miDB.EVENT.SHOW_COMMENT_TIPS, this._showCommentTips, this);
        this.loadArray = [

            { ui: "MastersModel", path: { modelType: "gameModel/sceneModel", ceng: 20 } },
            { ui:"WeatherModel",path:{modelType : "gameModel/sceneModel",ceng : 10}},
            { ui: "FirstModel", path: { ceng: 60 } },
            { ui: "GameUE", path: { ceng: 40 } },

        ];

        mi.UIManager.showUI("FinghtModel", { ceng: 42 });
        this.index = -1;
        this.loadPreArray();

    },

    start: function () {
        //     mi.UIManager.showUI("WeatherModel",{modelType : "gameModel/sceneModel",ceng : 10});
        //     mi.UIManager.showUI("BuildingsModel",{modelType : "gameModel/sceneModel",ceng : 20});
        //    mi.UIManager.showUI("HumanModel",{modelType : "gameModel/sceneModel",ceng : 50});
        //    mi.UIManager.showUI("guideMoudel",{ceng : 49});
        //    mi.UIManager.showUI("GameUE",{ceng : 40});




        //mi.UIManager.showUI("OffLineModel",{ceng : 50});
        //   mi.UIManager.showUI("PropModel",{ceng : 50});
        //   mi.UIManager.showUI("TouchButtonModel",{ceng : 1});


        mi.UIManager.showUI("WeatherModel",{modelType : "gameModel/sceneModel",ceng : 10});


    },

    loadPreArray() {
        this.index++;
        if (this.index < this.loadArray.length) {
            mi.UIManager.showLayerUI(this.loadArray[this.index].ui, this.loadArray[this.index].path, this.loadPreArray, this);

        } else {
            mi.UIManager.hideUI(this.uiName);
            miDB.GameData.init();
            miDB.MasterData.init();
            miDB.GameData.getStart();
            miDB.MasterData.getBuilidByLocalStorage();

        }





    },

    update: function (dt) {
        //console.log("start");
    },
    onDestroy: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.SHOW_COMMENT_TIPS, this._showCommentTips, this);
    },


    _showCommentTips: function (params) {
        var obj = {
            titleName: params.title || "提示",
            contentText: params.content || "无内容",
            okCallback: function () {
                // console.log("确定购买")
                if (params.okCallback)
                {
                    params.okCallback();
                }
            },
            cancelCallback: function () {
                // console.log("取消购买")
            },
            closeCallback: function () {
                // console.log("关闭")
            }
        }
        mi.UIManager.showUI("TipsAlter", obj);
    },
});
