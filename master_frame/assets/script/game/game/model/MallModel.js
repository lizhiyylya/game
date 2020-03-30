
cc.Class({
    extends: cc.Component,

    properties: {


        uiType: 2,
        uiName: "MallModel",
        MallItem: cc.Prefab,
        content: cc.Node,
        audio: {
            default: null,
            type: cc.AudioClip
        }

    },

    onLoad() {
        tywx.NotificationCenter.listen(miDB.EVENT.GAME_BOSS_START, this.bossComing, this);

        var screenW = cc.find("Canvas").width;
        if (screenW < 720) {
            cc.find("mallContent", this.node).scale = screenW / 720;
            cc.find("tips/bg", this.node).scale = screenW / 720;

        }

    },
    bossComing(data) {
        if (data.action == "bossComing" && this.node.active == true) {
            this.close();
        }

    },




    start() {


        this.pathUrl = miCfg.Master.UIconfigPath.gameUI; //图集路径
        this.shopIndex = 0;

        this.buttonArray = [
            cc.find("mallContent/tabMenu/tabCoin", this.node),
            cc.find("mallContent/tabMenu/tabOrc", this.node),
            cc.find("mallContent/tabMenu/tabDiamond", this.node),
        ];
        this.MallItemArray = [];
        this.shopIndex = 0;
        this.getData();
    },


    changeShop(event, customEventData) {
        cc.audioEngine.play(this.audio, false, 1);
        this.shopIndex = customEventData;
        this.getData();

    },

    MallItemTwo: function (event) {
        cc.audioEngine.play(this.audio, false, 1);
        // console.log("MallItemTwo");
        var node = event.target;
        var data = node.parent.parent.usData;
        this.node.getChildByName("tips").active = false;
        if (this.shopIndex == 1) //彩矿商店
        {
            miDB.localData.game.costMine = miTools.Utils.deAdd(miDB.localData.game.costMine, data.price).toString(); //记录花费彩矿
            miDB.GameData.costMineCallback(data.price);
            miDB.GameData.addShopLevel(miDB.localData.shopMine, data.index, 1);

        }
        else if (this.shopIndex == 2) //钻石商店
        {
            var isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.diamond, data.price);
            if (isPrice < 0) {
                //tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "钻石不足!" });
                return;
            }
            // this.node.getChildByName("tips").active = true;
            // this.node.getChildByName("tips").usData = data;

            //  node.getComponent(cc.Button).enabled = false;
            miDB.GameData.costDiamCallback(data.price);
            miDB.GameData.addShopLevel(miDB.localData.shopDiam, data.index, 1);
        }
        if (data.typeIndex == "exchage") {
            miDB.GameData.addMineCallback(data.addNum);
        }
        if (data.typeIndex == "GetProduct") {
            // console.log("GetProduct");
            console.log(data.addTime);
            miDB.MasterData.addTimeProduct(data.addTime);
        }
        else {
            miDB.GameData.shopToSkill();
        }
        tywx.BiLog.clickStat(miDB.BIEVENT.MALL_DIAMOND, [tywx.UserInfo.isNewPlayer, data.index]);
        this.node.getChildByName("tips").active = false;
        miDB.GameData.addTaskNum("payShop", 1);
        this.getData();

        tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_NOTICE_TIPS, { desc: "购买成功", altas: "image/tplist/gameLayer", icon: data.icon });
    },

    MallPageItem(event)    // 购买道具 
    {
        cc.audioEngine.play(this.audio, false, 1);
        var node = event.target;
        var data = node.parent.usData;

        if (this.shopIndex == 0) //金币商店
        {
            var isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.corn, data.price);
            if (isPrice < 0) {
                //tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "金币不足!" });
                return;
            }
            node.getComponent(cc.Button).enabled = false;
            miDB.GameData._costCornCallback({ cost: data.price });
            miDB.localData.game.costCorn = miTools.Utils.deAdd(miDB.localData.game.costCorn, data.price).toString();
            miDB.GameData.addShopLevel(miDB.localData.shopCron, data.index, 1);


            // console.log(data);
        }
        else if (this.shopIndex == 1) //彩矿商店
        {
            var isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.mine, data.price);
            if (isPrice < 0) {
                //tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "彩矿不足!" });
                return;
            }

            var isNeed = miTools.Utils.comparedTo(data.price, miTools.Utils.dividedToIntegerBy(miDB.GameData.DB.mine, 2));
            if (isNeed >= 0) {
                this.node.getChildByName("tips").active = true;
                this.node.getChildByName("tips").usData = data;
                miTools.Utils.layerOpenAction(cc.find("tips/bg", this.node));
                this.updateTips(data);
                return;
            }


            node.getComponent(cc.Button).enabled = false;
            miDB.localData.game.costMine = miTools.Utils.deAdd(miDB.localData.game.costMine, data.price).toString(); //记录花费彩矿
            miDB.GameData.costMineCallback(data.price);
            miDB.GameData.addShopLevel(miDB.localData.shopMine, data.index, 1);

        }
        else if (this.shopIndex == 2) //钻石商店
        {
            var isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.diamond, data.price);
            if (isPrice < 0) {
                //tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "钻石不足!" });
                return;
            }
            this.node.getChildByName("tips").active = true;
            this.node.getChildByName("tips").usData = data;
            miTools.Utils.layerOpenAction(cc.find("tips/bg", this.node));

            this.updateTips(data);

            return;
            //  node.getComponent(cc.Button).enabled = false;
            // miDB.GameData.costDiamCallback(data.price);
            // miDB.GameData.addShopLevel(miDB.localData.shopDiam, data.index, 1);
        }

        if (data.typeIndex == "exchage") {
            miDB.GameData.addMineCallback(data.addNum);
        }
        if (data.typeIndex == "GetProduct") {
            // console.log("GetProduct");
            miDB.MasterData.addTimeProduct(data.addTime);
        }
        else {
            miDB.GameData.shopToSkill();
            miDB.localData.game.finshGuid = true;
            tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE)
        }
        miDB.GameData.addTaskNum("payShop", 1);
        this.getData();

        // console.log(data)
        if (data.typeIndex == "autoGet") {
            tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_NOTICE_TIPS, { desc: "开启自动生产", altas: "image/tplist/game_master", icon: miCfg.Master[data.actionIndex + 1].MasterShapeName });
        } else {
            tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_NOTICE_TIPS, { desc: "购买成功", altas: "image/tplist/gameLayer", icon: data.icon });
        }
    },

    buttonBind: function (button) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node
        clickEventHandler.component = "MallModel";
        if (button.node.name == "price") {

            clickEventHandler.handler = "MallPageItem";
        }

        button.clickEvents.push(clickEventHandler);
    },

    getData() {

        let self = this;
        for (var i = 0; i < this.buttonArray.length; i++) {
            let btn = this.buttonArray[i];
            if (i == this.shopIndex) {
                //btn.scale = 1.1;
                // cc.loader.loadRes("image/gameLayer/sd_bt_1", cc.SpriteFrame, function (err, spriteFrame) {
                //     btn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // });
                miTools.Utils.loadSprite(btn, "image/tplist/gameUiTwo", "gssd_bt_1");
            } else {
                //btn.scale = 1;
                // cc.loader.loadRes("image/gameLayer/sd_bt_2", cc.SpriteFrame, function (err, spriteFrame) {
                //     btn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // });
                miTools.Utils.loadSprite(btn, "image/tplist/gameUiTwo", "gssd_bt_2");
            }
        }




        this.shopData = [];
        if (this.shopIndex == 0) {
            var oneIndex = miDB.GameData.findSmartIndex(miDB.localData.shopCron, miDB.shopConfig, 1);
            if (oneIndex != null) {
                this.shopData.push(oneIndex);
            }
            var twoIndex = miDB.GameData.findSmartIndex(miDB.localData.shopCron, miDB.shopConfig, 2);
            if (twoIndex != null) {
                this.shopData.push(twoIndex);
            }
        }
        else if (this.shopIndex == 1) {
            var oneIndex = miDB.GameData.findSmartIndex(miDB.localData.shopMine, miDB.shopMineConfig, 1);
            if (oneIndex != null) {
                this.shopData.push(oneIndex);
            }





        } else if (this.shopIndex == 2) {
            for (var i = 1; i <= 5; i++) {
                var oneIndex = miDB.GameData.findSmartIndex(miDB.localData.shopDiam, miDB.shopDiamConfig, i);
                if (oneIndex != null) {
                    this.shopData.push(oneIndex);
                }
            }


        }
        this.updateReshUI(this.shopData);
    },

    updateTips(data) {
        miTools.Utils.loadSprite(cc.find("tips/bg/itemSp", this.node), "image/tplist/gameLayer", data.icon);
        cc.find("tips/bg/nameLabel", this.node).getComponent(cc.Label).string = data.name;
        cc.find("tips/bg/efficLabel", this.node).getComponent(cc.Label).string = data.effect;

        if (this.shopIndex == 1) {
            cc.find("tips/bg/tipsLabel", this.node).active = false;
            cc.find("tips/bg/mineLabel", this.node).active = true;
        } else {
            cc.find("tips/bg/tipsLabel", this.node).active = true;
            cc.find("tips/bg/mineLabel", this.node).active = false;
            var PriteName = this.shopIndex == 2 ? '钻石' : '彩矿';
            cc.find("tips/bg/tipsLabel", this.node).getComponent(cc.Label).string = "确定要是使用" + miTools.Utils.toLabelString(data.price) + PriteName + "获得" + data.name + "吗？";
        }
    },


    pageData(page) {
        var data = []
        for (var i = 0; i < this.shopData.length; i++) {
            if (i >= (page) * 6 && i < (page + 1) * 6) {
                data.push(this.shopData[i]);
            }

        }
        return data;


    },
    updateReshUI(data) {
        for (var i = 0; i < data.length; i++) {
            if (!this.MallItemArray[i]) {
                var node = cc.instantiate(this.MallItem);
                node.parent = this.content;
                this.MallItemArray.push(node);
                this.buttonBind(node.getChildByName("price").getComponent(cc.Button));

            }

            cc.find("center/nameLayout/forever", this.MallItemArray[i]).active = false;
            cc.find("center/name", this.MallItemArray[i]).active = true;
            cc.find("center/nameZs", this.MallItemArray[i]).active = false;
            //cc.find("center/bg_up", this.MallItemArray[i]).active = false;
            //miTools.Utils.loadSprite(this.MallItemArray[i], "image/tplist/gameLayer", "sd_bg_2");

            this.MallItemArray[i].usData = data[i];
            cc.find("layout/coin", this.MallItemArray[i]).getComponent(cc.Label).string = miTools.Utils.toLabelString(data[i].price);
            cc.find("center/name", this.MallItemArray[i]).getComponent(cc.RichText).string = "<color=#D0B5A6>" + data[i].effect + "</color>";
            cc.find("center/nameLayout/title", this.MallItemArray[i]).getComponent(cc.Label).string = data[i].name;

            let spriteFrame = this.MallItemArray[i].getChildByName("price");
            let isPrice = -1;
            let icon = this.MallItemArray[i].getChildByName("layout").getChildByName("sprite");
            let type = cc.find("icon_bg/icon", this.MallItemArray[i]);
            if (this.shopIndex == 0) {
                isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.corn, data[i].price);
                miTools.Utils.loadSprite(icon, "image/tplist/gameUiTwo", "gssd_icon_jb");

                miTools.Utils.loadSprite(type, "image/tplist/gameLayer", data[i].icon);

            } else if (this.shopIndex == 1) {
                isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.mine, data[i].price);
                miTools.Utils.loadSprite(icon, "image/tplist/gameUiTwo", "gssd_icon_ck");

                miTools.Utils.loadSprite(type, "image/tplist/gameLayer", data[i].icon);

            } else if (this.shopIndex == 2) {
                if (data[i].typeIndex == "allBuffDouble") {
                    //miTools.Utils.loadSprite(this.MallItemArray[i], "image/tplist/gameIcon", "sd_bg_2_2");
                    cc.find("center/nameLayout/forever", this.MallItemArray[i]).active = true;
                    // cc.find("center/name", this.MallItemArray[i]).active = false;
                    cc.find("center/nameZs", this.MallItemArray[i]).active = true;
                    //cc.find("center/bg_up", this.MallItemArray[i]).active = true;
                    //cc.find("center/bg_up", this.MallItemArray[i]).getChildByName("desc").getComponent(cc.Label).string = "当前收益X" + miDB.allBuffDoubleSkillDiam;
                }

                isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.diamond, data[i].price);
                miTools.Utils.loadSprite(icon, "image/tplist/gameUiTwo", "gssd_icon_zs");

                miTools.Utils.loadSprite(type, "image/tplist/gameLayer", data[i].icon);

            }
            if (isPrice < 0) {
                miTools.Utils.loadSprite(spriteFrame, "image/tplist/gameUiTwo", "ui_ty_bt_1_2");
            } else {
                miTools.Utils.loadSprite(spriteFrame, "image/tplist/gameUiTwo", "ui_ty_bt_1");
            }

            this.MallItemArray[i].getChildByName("price").getComponent(cc.Button).enabled = true;
            this.MallItemArray[i].active = true;
        }
        for (var j = data.length; j < this.MallItemArray.length; j++) {
            this.MallItemArray[j].active = false;
        }




        // var data = this.pageData (page);
        // for (var i=0; i<this.MallItemArray.length;i++  )
        // {
        //     if (i <data.length)
        //     {
        //         this.MallItemArray[i].usData = data[i];
        //         cc.find("price",this.MallItemArray[i]).getComponent(cc.Label).string =data[i].price;
        //         cc.find("name",this.MallItemArray[i]).getComponent(cc.Label).string =data[i].name;
        //         cc.find("effer",this.MallItemArray[i]).getComponent(cc.Label).string =data[i].effect;
        //         miTools.Utils.loadSprite (  cc.find("icon",this.MallItemArray[i]),this.pathUrl, data[i].urlName );



        //        var  isPrice = miTools.Utils.comparedTo (miDB.GameData.DB.shares  , data[i].price );
        //         if (  isPrice<0 )
        //         {
        //             cc.find("effer",this.MallItemArray[i]).color = cc.color( 195,197,197,255);
        //             cc.find("name",this.MallItemArray[i]).color = cc.color( 195,197,197,255);
        //             this.MallItemArray[i].getComponent(cc.Button).enabled=false;  
        //             this. updateSprite( this.MallItemArray[i], this.isNotCanShop);   
        //         }
        //         else
        //         {
        //            cc.find("effer",this.MallItemArray[i]).color = cc.color( 255,131,15,255);
        //            cc.find("name",this.MallItemArray[i]).color = cc.color( 255,131,15,255);
        //            this.MallItemArray[i].getComponent(cc.Button).enabled=true;  
        //            this. updateSprite( this.MallItemArray[i], this.isCanShop);   
        //         }


        //         this.MallItemArray[i].active=true;
        //     }else 
        //     {
        //         this.MallItemArray[i].active=false;
        //     }

        // }

        // var isPrice= miTools.Utils.comparedTo (miDB.GameData.DB.shares  , data.price );
        // if( isPrice<0 ){
        //     miTools.Utils.loadSprite (target, miCfg.Building.UIconfigPath.game_Layer ,"game_Layer_shopitemBt0");
        //target.getComponent(cc.Button).enabled= false;
        // }
    },
    cancle() {
        cc.audioEngine.play(this.audio, false, 1);
        this.node.getChildByName("tips").active = false;
    },



    show(data) {
        miTools.Utils.layerOpenAction(cc.find("mallContent", this.node));

        this.node.getChildByName("tips").active = false;
        if (typeof (this.shopData) != "undefined") {
            this.shopIndex = 0;
            this.getData();
        }
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "hide" });

    },
    close() {
        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_LEFTRIGHT_TIME, { action: "show" });
        mi.UIManager.hideUI("MallModel", { ceng: 50 });
        miDB.GuidData.isShopOpen = false
        tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE)
    },

    hide(data) {
        // console.log("hide");
        // console.log(data);
    },


});

