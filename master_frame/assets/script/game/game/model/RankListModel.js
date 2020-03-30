
cc.Class({
    extends: cc.Component,

    properties: {
        uiType : 2,
        uiName : "RankListModel",
        itemPrefab:cc.Prefab,
        content:cc.Node,
        rankCanvas: cc.Sprite

    },


    onLoad() {
    
        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
           this.node. getChildByName ("bg") .scale = screenW / 720;
     

        }
        this.rankCanvas.node .active=false;
    },

    start () {
    },

    showFriendRankList : function(){
        if(tywx.isInCreator)
            return;

    tywx.LOGD("yuelai", "*-*-*-*- rank start *-*-*-");
        var openDataContext = tywx.OpenDataUtil.getOpenData();
        if(!openDataContext){
            return;
        }
        //共享画布大小
        this.sharedCanvas = openDataContext.canvas;
        sharedCanvas.width  = 555;
        sharedCanvas.height = 2000;

        if(!this.texture){
            this.texture = new cc.Texture2D();
        }
        if(!this.spriteFrame){
            this.spriteFrame = new cc.SpriteFrame(this.texture);
        }
        tywx.OpenDataUtil.showFriendRank();
        this.updateRankCanvas();
        tywx.Timer.setTimer(this, this.updateRankCanvas, 1/10,1000);

        if(!tywx.isInCreator){
            wx.hideLoading();
        }

        var self =this;
        setTimeout(() => {
            self.rankCanvas.node.active=true; 
        }, 1000);
     


    },

    updateRankCanvas: function(){
        this.texture.initWithElement(this.sharedCanvas);
        this.texture.handleLoadedTexture();
        this.rankCanvas.spriteFrame = this.spriteFrame;
        this.rankCanvas.spriteFrame._refreshTexture(this.texture);
    },

    close()
    {
        tywx.OpenDataUtil.clearShareCanvas2();
        mi.UIManager.hideUI("RankListModel",{ceng : 50});
        tywx.Timer.cancelTimer(this, this.updateRankCanvas);
       tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },
    show(data)
    {
        miTools.Utils.layerOpenAction(cc.find("bg", this.node));
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });
        this.showFriendRankList();

    
    },
    updateLabel(target,data)
    {
        target.getComponent(cc.Label).string=data;
    },
});
