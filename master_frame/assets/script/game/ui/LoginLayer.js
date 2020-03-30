
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "LoginLayer"
    },

    onLoad: function () {
        //tywx.NotificationCenter.listen("test", this.onCallback, this);

        console.log("LoginLayer");
        this.wetChatLogin = false;
        this.loadInex = 0;

        mi.UIManager.showLayerUI("MastersModel", { modelType: "gameModel/sceneModel", ceng: 20 }, this.loadPreArray, this);
        mi.UIManager.showLayerUI("WeatherModel", {modelType : "gameModel/sceneModel",ceng : 10}, this.loadPreArray, this);
        mi.UIManager.showLayerUI("FirstModel", { ceng: 60 }, this.loadPreArray, this);
        mi.UIManager.showLayerUI("OffLineModel", { ceng: 42 }, this.loadPreArray, this);
        // mi.UIManager.showLayerUI("InviModel", { ceng: 50 }, this.loadPreArray, this);
        mi.UIManager.showLayerUI("GameUE", { ceng: 40 }, this.loadPreArray, this);
        mi.UIManager.showLayerUI("GuideLayer", { ceng: 1000},this.loadPreArray, this);
        tywx.NotificationCenter.listen(miDB.EVENT.WECHAT_GAME_LOGIN, this.wechatLogin, this);
        //  this.current = cc.audioEngine.play(this.audio, true, 1);
        if (tywx.UserInfo.isWxLoginSuccess == true) {
            this.wechatLogin();
        }
        var action = cc.fadeTo(0.5, 0);
        var action1 = cc.fadeTo(0.5, 255);

        cc.find ("loading",this.node).runAction(  cc.sequence( [action, action1]).repeatForever()); 
    },

    weChatTouch() {

        if (tywx.isInWeChatPath) {
            //  tywx.TuyooSDK.login();
        }


    },


    wechatLogin() {
        console.log("wechatLogin");
        this.wetChatLogin = true;
        if (this.loadInex >= 6) {
            mi.UIManager.hideUI(this.uiName);
            mi.UIManager.showUI("GameLayer");
        }

        // mi.UIManager.showLayerUI("GameLayer");

    },

    start: function () {
  
            if (tywx.TuyooSDK.isLoginSuccess) {
                this.wechatLogin()
            }
        
    },

    loadPreArray() {
        this.loadInex++;
        console.log(" this.loadInex" + this.loadInex);
        if (this.loadInex >= 6) {

            // var data1 = miDB.GameData.getItemByLocalStorage("localData", undefined);
            // if (data1 != undefined) {
            //     data1 = JSON.parse(data1);
            //     miDB.localData = data1;
            //     miDB.localData.systime = Date.parse(new Date()) / 1000;
            //     this.wechatLogin();
            // }
            if (tywx.UserInfo.isWxLoginSuccess == true) {
                this.wechatLogin();
            }
            else if (tywx.isInWeChatPath == false) {
                this.wechatLogin();
            }

        }

    },






    update: function (dt) {
        //console.log("start");
    },

    loginBtnCallBack: function (ret) {
        console.log("登陆")


    },


    onDestory: function () {

        tywx.NotificationCenter.ignore(miDB.EVENT.WECHAT_GAME_LOGIN, this.wechatLogin, this);
    },
});
