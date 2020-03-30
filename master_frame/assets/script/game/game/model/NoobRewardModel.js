
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "NoobRewardModel",
        audio: {
            default: null,
            type: cc.AudioClip
        },
        partAtlas: cc.SpriteAtlas,
        particle: cc.ParticleSystem
    },

    onLoad() {
        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
           this.node. getChildByName ("bg") .scale = screenW / 720;
        }


    },

    start() {

    },

    show(data) {
        this.customData = data.customData;
        miTools.Utils.layerOpenAction(cc.find("bg/NoobContent", this.node));
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });

        cc.find("bg/left", this.node).getComponent(cc.Animation).play();
        cc.find("bg/right", this.node).getComponent(cc.Animation).play();
        miTools.Utils.loadLabel(cc.find("bg/NoobContent/Layout/decLabel", this.node), this.customData.decLabel);
        miTools.Utils.loadLabel(cc.find("bg/NoobContent/getLabel", this.node), this.customData.getLabel);

        if (this.customData.rewardItem.type == "diamond") {
            miTools.Utils.loadLabel(cc.find("bg/NoobContent/num", this.node), "钻石 x" + this.customData.rewardItem.num);
        }

    },

    update(dt) {
        this.particle.getComponent(cc.ParticleSystem).spriteFrame = this.partAtlas.getSpriteFrame("xslb_x" + miTools.Utils.RandomNumBoth(1, 2));
    },

    onDestroy() {

    },

    sendToOthers() {
        let that = this;
        cc.audioEngine.play(this.audio, false, 1);
        if (tywx.isInWeChatPath) {
            var cofigInfo = miTools.Utils.getShareConfigInfo(true, this.customData.shareEvent);
            var config = cofigInfo.config;
            config.shareTwoText = "分享到群才能生效，换个群试试吧";
            if (this.customData.shareEvent == "NEWUSER_GIFT") {
                config.shareTwoText = ["分享到群才能生效，换个群试试吧"];
            } else (this.customData.shareEvent == "PRODUCT_RATE_UP")
            {
                config.shareTwoText =[ "别总骚扰同一个群，换个群分享吧"];
            }

            // miTools.Utils.autoDoubleVideo(config, function () {
            //     that.NoobRewhandle();
            // }, function () {
            //     miTools.Utils.forceShare(config, function (res) {
            //         that.NoobRewhandle();
            //     }, function (res) {
        
            //     });
            // })
            miTools.Utils.autoVideoThreeFive(config, function () {
                that.NoobRewhandle();
            })




        } else {
            this.NoobRewhandle();
        }
    },
    NoobRewhandle: function () {
        var that = this;

        if (this.customData.shareEvent == "NEWUSER_GIFT") {
            tywx.BiLog.clickStat(miDB.BIEVENT.NEW_USER_GET_GIFT, [tywx.UserInfo.isNewPlayer]);
        } else (this.customData.shareEvent == "PRODUCT_RATE_UP")
        {
            tywx.BiLog.clickStat(miDB.BIEVENT.PRODUCT_RATE_UP, [tywx.UserInfo.isNewPlayer]);
        }


        // cc.find("rewrad_bg", that.node).active = true;
        // miTools.Utils.layerOpenAction(cc.find("rewrad_bg/rewrad", that.node));
        mi.UIManager.hideUI("NoobRewardModel", { ceng: 50 });
        mi.UIManager.showUI("ShitAwardModel", {
            ceng: 53,
            gameData: {
                titileSpName: "",
                times: 1,
                isShare: false,
                itemData: [{ type: this.customData.rewardItem.type, num: this.customData.rewardItem.num }],
                okCallBack: function () {
                }
            }
        });





    },

    close: function () {

        

        mi.UIManager.hideUI("NoobRewardModel", { ceng: 50 });
    },



    hide(data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "showAll" });
    },
});
