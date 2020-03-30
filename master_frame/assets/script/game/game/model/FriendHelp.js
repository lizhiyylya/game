
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "FriendHelp",
        friendItem: cc.Prefab,
        content: cc.Node,
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        this.buttonList = [];
        tywx.NotificationCenter.listen(miDB.EVENT.UPDATE_FRIEND_HELP, this.notifyHelpList, this);
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            cc.find("help_bg", this.node).scale = screenW / 720;

        }
    },
    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.close();
        }

    },

    start() {

    },

    buttonBind: function (button, pos) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.customEventData = pos + "";
        clickEventHandler.component = "FriendHelp";
        if (button.node.name == "employment") {
            clickEventHandler.handler = "friendHelpItem";
        }
        if (button.clickEvents.length == 0) {
            button.clickEvents.push(clickEventHandler);
        }
    },

    friendHelpItem: function (event, data) {
        cc.audioEngine.play(this.audio, false, 1);
        var node = event.target.parent;
        if (node.usData.statue == 0) {
            if (node.usData.type == "npc") {
                //miDB.GameData.setFirendStatue(data, 1);
                miDB.localData.nPCstart = miDB.localData.systime;
                miDB.GameData.setLocalDataLock();
                tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_NOTICE_TIPS, { desc: "收益X2", altas: "image/tplist/gameLayer", icon: "icon_rw_sjjb" });
            } else {
                var cofigInfo = miTools.Utils.getShareConfigInfo(true, miDB.SHAREPOINT.FRIEND_HELP);
                var config = cofigInfo.config;
                tywx.BiLog.clickStat(miDB.BIEVENT.FRIEND_HELP_SHARE, [tywx.UserInfo.isNewPlayer]);
                tywx.ShareInterface.share(config.shareContent, config.sharePicUrl, config.sharePointId, config.shareSchemeId
                    , function (result) {
                        wx.showToast({ title: "分享成功" });
                    }, function (res) {
                        wx.showToast({ title: "分享失败" });
                    }, null, "friendHelp");
                // },null ,"friendHelp&inviteType=1");

            }
        }

        if (node.usData.statue == 2 && node.usData.type != "npc") {

            console.log(node.usData.helped);
            miDB.GameData.reshFriendData(node.usData.helped);



        }


    },

    notifyHelpList: function (data) {
        for (let i = 0; i < data.length; i++) {
            let item = null;
            if (this.buttonList[i]) {
                item = this.buttonList[i];
            } else {
                item = cc.instantiate(this.friendItem);
            }
            cc.find("message", item).active = false;
            cc.find("working", item).active = false;
            cc.find("empty", item).active = false;
            cc.find("head", item).active = false;
            cc.find("employment", item).active = false;
            cc.find("hyzl_bg_2", item).active = false;
            if (data[i].statue == 0) {
                cc.find("employment", item).active = true;
                if (data[i].type == "npc") {
                    cc.find("employment/sprite", item).getComponent(cc.Label).string = "开始";
                    miTools.Utils.loadSprite(cc.find("employment", item), "image/tplist/gameUiTwo", "ui_ty_bt_1");
                    cc.find("head", item).active = true;
                    cc.find("message", item).active = true;
                } else {
                    cc.find("working", item).active = false;
                    cc.find("empty", item).active = true;
                    cc.find("employment/sprite", item).getComponent(cc.Label).string = "招工";
                    miTools.Utils.loadSprite(cc.find("employment", item), "image/tplist/gameUiTwo", "ui_ty_bt_1");
                }
            } else if (data[i].statue == 1) {
                cc.find("working/timer", item).active = true;
                cc.find("head", item).active = true;
                cc.find("hyzl_bg_2", item).active = true;
                cc.find("hyzl_bg_2/playing", item).active = true;
                cc.find("hyzl_bg_2/finished", item).active = false;
                if (!cc.find("head", item).url || cc.find("head", item).url != data[i].wxImg) {
                    cc.find("head", item).url = data[i].wxImg;
                    if (data[i].type == "npc") {
                        miTools.Utils.loadSprite(cc.find("head", item), "image/tplist/gameLayer", "tx_npc");
                    }
                    else {
                        if (data[i].wxImg != "") {
                            miTools.Utils.loadSpriteUrl(cc.find("head", item), data[i].wxImg);
                        } else {

                            miTools.Utils.loadSprite(cc.find("head", item), "image/tplist/gameLayer", "tx_wu");
                        }

                    }

                }
                cc.find("empty", item).active = false;
                cc.find("working", item).active = true;
                cc.find("working/progressBar", item).active = true;
                if (data[i].type == "npc") {
                    cc.find("working/progressBar", item).getComponent(cc.ProgressBar).progress = (1800 - data[i].time) / 1800;
                } else {
                    cc.find("working/progressBar", item).getComponent(cc.ProgressBar).progress = (14400 - data[i].time) / 14400;
                }
                let hour = data[i].time / 60 / 60;
                let minute = data[i].time / 60 % 60;
                let second = data[i].time % 60;
                cc.find("working/timer", item).getComponent(cc.Label).string = "剩余 " + this.formatTime(parseInt(hour)) + "h " + this.formatTime(parseInt(minute)) + "m " + this.formatTime(parseInt(second)) + "s";
            } else if (data[i].statue == 2) {
       
                //hyzl_bt_1
                if (data[i].type == "npc") {
                    miTools.Utils.loadSprite(cc.find("employment", item), "image/tplist/gameUiTwo", "ui_ty_bt_1_2");
                    cc.find("employment/sprite", item).getComponent(cc.Label).string = "已完成";
                } else {
                    miTools.Utils.loadSprite(cc.find("employment", item), "image/tplist/gameUiTwo", "hyzl_bt_1");
                    cc.find("employment/sprite", item).getComponent(cc.Label).string = "走好";
                }

                cc.find("head", item).active = true;
                cc.find("hyzl_bg_2", item).active = true;
                cc.find("hyzl_bg_2/playing", item).active = false;
                cc.find("hyzl_bg_2/finished", item).active = true;
                cc.find("employment", item).active = true;
                if (!cc.find("head", item).url || cc.find("head", item).url != data[i].wxImg) {
                    cc.find("head", item).url = data[i].wxImg;
                    if (data[i].type == "npc") {
                        miTools.Utils.loadSprite(cc.find("head", item), "image/tplist/gameLayer", "tx_npc");
                    } else {
                        if (data[i].wxImg != "") {
                            miTools.Utils.loadSpriteUrl(cc.find("head", item), data[i].wxImg);
                        } else {

                            miTools.Utils.loadSprite(cc.find("head", item), "image/tplist/gameLayer", "tx_wu");
                        }

                    }

                }

                cc.find("empty", item).active = false;
                cc.find("working", item).active = false;
                cc.find("working/progressBar", item).active = true;
                cc.find("working/progressBar", item).getComponent(cc.ProgressBar).progress = 1;
                cc.find("working/timer", item).getComponent(cc.Label).string = "好友已完成工作";
            }
            item.usData = data[i];
            if (!this.buttonList[i]) {
                this.content.addChild(item);
                this.buttonBind(cc.find("employment", item).getComponent(cc.Button), i);
                this.buttonList.push(item);
            }
        }
    },

    formatTime: function (num) {
        return num < 10 ? "0" + num : num;
    },

    show(data) {
        miTools.Utils.layerOpenAction(cc.find("help_bg", this.node));
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });
    },

    hide(data) {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
    },

    close() {
        this.content.parent.parent.getComponent(cc.ScrollView).scrollToTop();
        mi.UIManager.hideUI("FriendHelp", { ceng: 50 });
    },

    update(dt) {

    },
});
