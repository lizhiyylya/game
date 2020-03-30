var isAnaly = false; //网络数据绑定标示
//mi.UIManager.showUI("ShitAwardModel", { ceng: 42 ,gameData :{ titileSpName:"",  times:1 ,itemData:[ {type:"corn" ,num :100} , {type:"mine" ,num :100} ,{type:"diamond" ,num :100} , {type:"chest" ,num :100}  ]  } });
miDB.inviData = [
    //    { createTime:1538102912000,invitee:"bbb",nickName:"",spare:"1",wxImg:""},
];

var isGiftOpen = true;

miDB.giftData = "";
miDB.gatherCron = 0;
var firendHelp = [    // 0:未开始  statue: 1 正在加速  2： 已完成 
    {
        // createTime: 1541351086000,
        // helped: "oewAN5FWEAEDAEbMza_Ju2NdrRsw",
        // nickName: "Mr Zhong",
        // wxImg: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJuTqHbOvdF10QtoWiaed7lbIrexOluEddSeFPAjYPPVxuzZcwRgTJYxrNSzpGLPrmHKEQ42ic1ia4HQ/132"
    },
    // {
    //     createTime: 1541227058000,
    //     helped: "oewAN5FWEAEDAEbMza_Ju2NdrRsw",
    //     nickName: "Mr Zhong",
    //     wxImg: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJuTqHbOvdF10QtoWiaed7lbIrexOluEddSeFPAjYPPVxuzZcwRgTJYxrNSzpGLPrmHKEQ42ic1ia4HQ/132"
    // },
    // {
    //     createTime: 1541226998000,
    //     helped: "oewAN5FWEAEDAEbMza_Ju2NdrRsw",
    //     nickName: "Mr Zhong",
    //     wxImg: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJuTqHbOvdF10QtoWiaed7lbIrexOluEddSeFPAjYPPVxuzZcwRgTJYxrNSzpGLPrmHKEQ42ic1ia4HQ/132"
    // },
];

miDB.customReward = [
    {
        id: 0, name: "生产率奖励",
        condition: [{ action: "productRate", judge: ">", count: "5000" }, { action: "guide", count: true }, { action: "isShow", count: false }],
        titileSp: "", decLabel: "恭喜晋级高级饲养员", getLabel: "邀请朋友获得晋级大礼包!", itemSp: "",
        rewardItem: { type: "diamond", num: 100 }, shareEvent: "PRODUCT_RATE_UP"
    },
];


miDB.localData = {
    game: {
        corn: "0", //金币
        todayGetCron: 0,//今日收获金币
        mine: "0",// 采矿
        diamond: "0", //钻石
        chest: "0",  // 宝箱
        costCorn: "0",// 花费金币
        costMine: "0",// 花费采矿
        reformNum: 0,  // 改造次数
        reformTime: "null", //回收时间
        signNum: 0, //签到次数
        singTime: "null", //签到时间戳
       // finghtBossNum: 0,   // 战斗次数
        finghtBossTime: "null", //boss出现时间
        handbookTime: "null", //图鉴倒计时 
        handbookFreeNum: 0,  // 图鉴免费次数
        canFinghtBoss: false, //可以打boss
        finshGuid: false,     //完成引导
        freeDiamNum: 0,    // 免费钻石次数
        freeDiamTime: "null", //免费钻石时间
        superFeedNum: 0,    // 超级喂食次数
        superFeedTime: "null", //超级喂食时间
        updateDataTime: "null", // 数据版本号
        shitTime: "null",  //大便cd时间
        shitNum: 0,       // 大便次数
        nextScene: false, // 解锁下一场景     
        isFistTurnTable:true, // 第一次转转盘
        

    },
    master: [],
    systime: Date.parse(new Date()) / 1000,


    shopCron: [
        { index: 0, payNum: 0, group: 1 },
        { index: 1, payNum: 0, group: 1 },
        { index: 2, payNum: 0, group: 2 },
        { index: 3, payNum: 0, group: 1 },
        { index: 4, payNum: 0, group: 1 },
        { index: 5, payNum: 0, group: 2 },
        { index: 6, payNum: 0, group: 1 },
        { index: 7, payNum: 0, group: 1 },
        { index: 8, payNum: 0, group: 2 },
        { index: 9, payNum: 0, group: 1 },
        { index: 10, payNum: 0, group: 2 },
        { index: 11, payNum: 0, group: 2 },
        { index: 12, payNum: 0, group: 2 },
        { index: 13, payNum: 0, group: 1 },
        { index: 14, payNum: 0, group: 2 },
        { index: 15, payNum: 0, group: 2 },
        { index: 16, payNum: 0, group: 1 },
        { index: 17, payNum: 0, group: 2 },
        { index: 18, payNum: 0, group: 2 },

        { index: 19, payNum: 0, group: 1 },
        { index: 20, payNum: 0, group: 1 },
        { index: 21, payNum: 0, group: 1 },
        { index: 22, payNum: 0, group: 1 },
        { index: 23, payNum: 0, group: 1 },
        { index: 24, payNum: 0, group: 1 },
        { index: 25, payNum: 0, group: 1 },
        { index: 26, payNum: 0, group: 1 },
        { index: 27, payNum: 0, group: 1 },

        { index: 28, payNum: 0, group: 2 },
        { index: 29, payNum: 0, group: 2 },
        { index: 30, payNum: 0, group: 2 },
        { index: 31, payNum: 0, group: 2 },
        { index: 32, payNum: 0, group: 2 },
        { index: 33, payNum: 0, group: 2 },
        { index: 34, payNum: 0, group: 2 },
        { index: 35, payNum: 0, group: 2 },
        { index: 36, payNum: 0, group: 2 },
        { index: 37, payNum: 0, group: 2 },
        { index: 38, payNum: 0, group: 2 },
        { index: 39, payNum: 0, group: 2 },
        { index: 40, payNum: 0, group: 2 },
        { index: 41, payNum: 0, group: 2 },
    ],
    shopMine: [
        { index: 0, payNum: 0, group: 1 },
        { index: 1, payNum: 0, group: 1 },
        { index: 2, payNum: 0, group: 1 },
        { index: 3, payNum: 0, group: 1 },
        { index: 4, payNum: 0, group: 1 },
        { index: 5, payNum: 0, group: 1 },
        { index: 6, payNum: 0, group: 1 },
        { index: 7, payNum: 0, group: 1 },
        { index: 8, payNum: 0, group: 1 },
        { index: 9, payNum: 0, group: 1 },
        { index: 10, payNum: 0, group: 1 },
        { index: 11, payNum: 0, group: 1 },
        { index: 12, payNum: 0, group: 1 },
        { index: 13, payNum: 0, group: 1 },
        { index: 14, payNum: 0, group: 1 },
        { index: 15, payNum: 0, group: 1 },
        { index: 16, payNum: 0, group: 1 },
        { index: 17, payNum: 0, group: 1 },
        { index: 18, payNum: 0, group: 1 },
        { index: 19, payNum: 0, group: 1 },
        { index: 20, payNum: 0, group: 1 },
        { index: 21, payNum: 0, group: 1 },
        { index: 22, payNum: 0, group: 1 },
        { index: 23, payNum: 0, group: 1 },
        { index: 24, payNum: 0, group: 1 },
        { index: 25, payNum: 0, group: 1 },
        { index: 26, payNum: 0, group: 1 },
        { index: 27, payNum: 0, group: 1 },
        { index: 28, payNum: 0, group: 1 },
        { index: 29, payNum: 0, group: 1 },
    ],

    shopDiam: [
        { index: 0, payNum: 0, group: 1 },
        { index: 1, payNum: 0, group: 2 },
        { index: 2, payNum: 0, group: 3 },
        { index: 3, payNum: 0, group: 4 },
        { index: 4, payNum: 0, group: 5 },
    ],
    handBook: [
        { index: 0, level: 0, num: 0 },
        { index: 1, level: 0, num: 0 },
        { index: 2, level: 0, num: 0 },
        { index: 3, level: 0, num: 0 },
        { index: 4, level: 0, num: 0 },
        { index: 5, level: 0, num: 0 },
        { index: 6, level: 0, num: 0 },
        { index: 7, level: 0, num: 0 },
        { index: 8, level: 0, num: 0 },

        { index: 9, level: 0, num: 0 },   //需要追加长度判断
        { index: 10, level: 0, num: 0 },
        { index: 11, level: 0, num: 0 },
        { index: 12, level: 0, num: 0 },
        { index: 13, level: 0, num: 0 },
        { index: 14, level: 0, num: 0 },
        { index: 15, level: 0, num: 0 },
        { index: 16, level: 0, num: 0 },
        { index: 17, level: 0, num: 0 },
    ],
    task: [],
    nPCstart: "",
    invi1: [0, 0, 0, 0,],
    shitList: [],
    giftList: [],
    customReward: ["0"]

};



miDB.GameData = {
    TAG: "GameData",
    DB: {
        corn: 0, //金币
        mine: "0",// 采矿
        diamond: "0", //钻石
        productEffic: "0", //生产效率
        shareInfo: {}
    },
    timeIdOne: "",
    timeIdTwo: "",  //计时器
    timeIdThree: "", //备份服务器数据
    timeIdFour: "",
    init: function () {

        var time = new Date().getDate();

        if (this.DB.shareTime != time) {
            //隔天清零
        }
        console.log("init");
        tywx.NotificationCenter.listen(miDB.EVENT.GAIN_CORN_DATA, this._gainCornCallback, this);
        tywx.NotificationCenter.listen(miDB.EVENT.COST_GAME_CORN, this._costCornCallback, this);
        tywx.NotificationCenter.listen(tywx.EventType.GAME_HIDE, this.setLocalDataLock, this);
        tywx.NotificationCenter.listen(miDB.EVENT.WECHAT_GAME_LOGIN, this.wechatLogin, this);
        tywx.NotificationCenter.listen(tywx.EventType.GAME_SHOW, this.gameShow, this);
        tywx.NotificationCenter.listen(miDB.EVENT.CHANGE_SHARE_INFO, this._changeShareInfoDataCallback, this);



        // mi.UIManager.showUI("ShitAwardModel", {
        //     ceng: 42,
        //     gameData: {
        //         titileSpName: "",
        //         times: 1,
        //         itemData: [{ type: "corn", num: 100 }, { type: "mine", num: 100 }, { type: "diamond", num: 100 }, { type: "chest", num: 100 }],
        //         okCallBack: function () {
        //             miDB.localData.game.haveGiftNum += 1;
        //         }
        //     }
        // });


    },
    wechatLogin(data) {
        if (isAnaly == true) {
            console.log(data);
            // this.getStart();

        }
    },

    updateGameSystem(data) {
        if (data.data.code == 0) {
            console.log(data.data.data.systime);
            miDB.localData.systime = data.data.data.systime;
            if (tywx.UserInfo.extraAdd == "friendHelp") {

                var helpD = {
                    beHelped: tywx.UserInfo.invite_id,
                    helped: tywx.UserInfo.openid,
                    spare: ""
                }
                tywx.postMethod("monster/help", helpD, function (params) {
                    if (params.data.code == 0) {
                        console.log(params);
                        tywx.BiLog.clickStat(miDB.BIEVENT.FRIEND_HELP_SHARE_SUCCESS, [tywx.UserInfo.isNewPlayer]);
                    }
                }, function () {

                });

            }
        }
    },
    gameShow(data) {
        // if (tywx.UserInfo.isShare == false && tywx.isFristLogin == true) {
        // if ( tywx.isFristLogin == true) {
        console.log("重新获取时间");
        // tywx.TuyooSDK.tuYouLogin(tywx.UserInfo.openid, tywx.UserInfo);
        if (tywx.isInWeChatPath) {
            tywx.postMethodCall("monster/getSystemTime", "", miDB.GameData.updateGameSystem, miDB.GameData);

            // }
            this.getGiftData();
        }


    },

    getBookLength: function () {
        var leng = 0;
        for (var i = 0; i < miDB.localData.handBook.length; i++) {
            if (miDB.localData.handBook[i].level > 0) {
                leng++;
            }
        }
        return leng;
    },

    shopToSkill() {
        miDB.toSkillBuff();
    },
    getProductEffic() {
        var effic = 0;
        for (var i = 0; i < miDB.MasterData.DB.MasterList.length; i++) {
            var masterData = miDB.MasterData.DB.MasterList[i];
            var Product = miCfg.Master.getOutputGold(masterData.masterIdx, masterData.level);
            var Time = miCfg.Master.getProductTime(masterData.masterIdx, masterData.level);

            // console.log ("怪兽"+(i+1) +"效率"+miTools.Utils.deDividedBy(Product, Time).toString());
            effic = miTools.Utils.deAdd(effic, miTools.Utils.deDividedBy(Product, Time)).toString();

        }

        this.DB.productEffic = effic;
        // console.log("总生产效率" + this.DB.productEffic);
        tywx.NotificationCenter.trigger(miDB.EVENT.CHANGE_GAME_DATA, this.DB);
    },
    getStart() {
        if (tywx.isInWeChatPath) {
            var data = tywx.UserInfo.gameData.MonsterUserJson;
            this.comperWxDataLocalData(data);
        }
        else {
            var data = this.getItemByLocalStorage("localData", undefined);
            if (data != undefined) {

                data = JSON.parse(data);

                this.dealData(data);

            }
            miDB.localData.systime = Date.parse(new Date()) / 1000;
        }

        var shareModelStrategyTime = this.getItemByLocalStorage("shareModelStrategyTime", undefined);
        if (shareModelStrategyTime != undefined) {
            shareModelStrategyTime = JSON.parse(shareModelStrategyTime);
            tywx.UserInfo.shareModelStrategyTime = shareModelStrategyTime;

        }


        if (miDB.localData.game.reformTime == "null") {
            miDB.localData.game.reformTime = miDB.localData.systime;
            //miDB.localData.game.reformTime =  "1532882538";

        }

        // if (!miDB.localData.game.freeDiamNum) {
        //     miDB.localData.game.freeDiamNum = 0;
        // }
        if (miDB.localData.game.freeDiamTime == "null") {
            miDB.localData.game.freeDiamTime = miDB.localData.systime;
        }
        if (miDB.localData.game.superFeedTime == "null") {
            var ttime = new Date(miDB.localData.systime * 1000);
            ttime.setSeconds(ttime.getSeconds() + 3600);
            miDB.localData.game.superFeedTime = Date.parse(ttime) / 1000;

        }

        if (!miDB.localData.game.handbookTime || miDB.localData.game.handbookTime == "null") {
            miDB.localData.game.handbookTime = miDB.localData.systime;
        }
        if (!miDB.localData.game.shitTime || miDB.localData.game.shitTime == "null") {
            miDB.localData.game.shitTime = miDB.localData.systime;
            var time = new Date(miDB.localData.systime * 1000);
            time.setSeconds(time.getSeconds() + 30);
            miDB.localData.game.shitTime = Date.parse(time) / 1000;
            miDB.localData.game.shitNum = 0;
        }


        this.DB.corn = miDB.localData.game.corn;
        this.DB.mine = miDB.localData.game.mine;
        this.DB.diamond = miDB.localData.game.diamond;
        console.log(miDB.localData);
        this.shopToSkill();
        tywx.NotificationCenter.trigger(miDB.EVENT.CHANGE_GAME_DATA, this.DB);
        if (miDB.localData.task.length == 0 || miDB.localData.game.finghtBossTime == "null" || new Date(miDB.localData.game.finghtBossTime * 1000).getDate() != new Date(miDB.localData.systime * 1000).getDate()) {
            miDB.localData.task = [];
            if (miDB.localData.game.finshGuid == false) {
                miDB.localData.task = [
                    { index: 2, num: 0, statue: 0, reshNum: 0, action: miCfg.task[2].action },
                    { index: 5, num: 0, statue: 0, reshNum: 0, action: miCfg.task[5].action },
                    { index: 6, num: 0, statue: 0, reshNum: 0, action: miCfg.task[6].action },

                ];

            } else {
                var taskData = miCfg.task.getTask();
                for (var i = 0; i < taskData.length; i++) {
                    var tem = { index: taskData[i].index, num: 0, statue: 0, reshNum: 0, action: miCfg.task[taskData[i].index].action };   // 状态0 表示 未达成  1已完成
                    miDB.localData.task.push(tem);
                }

            }
            miDB.localData.game.todayGetCron = 0;  // 重制每日获得金币
            miDB.localData.game.handbookFreeNum = 0; //重制每天看图鉴获得免费次数
           // miDB.localData.game.finghtBossNum = 0; // 重置怪物攻打
            miDB.localData.game.finghtBossTime = miDB.localData.systime;
            miDB.localData.game.freeDiamNum = 0;
            miDB.localData.game.superFeedNum = 0;
            miDB.localData.game.shitNum = 0;
            miDB.localData.giftList = [];
            tywx.UserInfo.shareModelStrategyTime = {};

        }
        if (this.timeIdThree == "") {
            this.timeIdThree = setInterval(this.LocalDataLock, 60000);  // 一分钟备份一次
            // this.timeIdThree = setInterval(this.LocalDataLock, 10000); 
        }

        if (this.timeIdTwo == "") {
            this.timeIdTwo = setInterval(this.friendData, 60000);
        }

        if (this.timeIdOne == "") {
            this.timeIdOne = setInterval(this.updateSystime, 1000);
        }
        if (this.timeIdFour == "") {
            this.timeIdFour = setInterval(this.giftSystem, 2500);
        }

        var wxData = { handBook: this.getBookLength(), reformNum: miDB.localData.game.reformNum };
        tywx.OpenDataUtil.upRankData(JSON.stringify(wxData));

        this.DB.shareInfo = this._getShareInfoData() || {}


        // 1分钟刷新一次
        this.friendData();
        this.initInviData()
        //miDB.BossData.init();
        miDB.ShitData.init();
        this.getGiftData();
        if (miDB.giftData == "") {
            this.shareGiftBtnCallback1();
        }
        miDB.TurnTableData.init();
        isAnaly = true;

    },

    dealData(data) {
        for (var p in data) { // 方法 
            if (typeof data[p] === 'object' && !isNaN(data[p].length))  // 数组
            {
                for (var i = 0; i < data[p].length; i++) {
                    miDB.localData[p][i] = data[p][i];

                }


            } else if (typeof data[p] === 'object') {
                for (var a in data[p]) {
                    miDB.localData[p][a] = data[p][a];
                }


            } else {
                miDB.localData[p] = data[p];
            }
        }
    },
    dealDataPart(data, key) //微信数据分步处理
    {
        if (typeof data === 'object' && !isNaN(data.length)) {
            for (var i = 0; i < data.length; i++) {
                miDB.localData[key][i] = data[i];

            }


        } else if (typeof data === 'object') {
            for (var a in data) {
                miDB.localData[key][a] = data[a];
            }


        } else {
            miDB.localData[key] = data;
        }

    },



    comperWxDataLocalData(data) {
        if (!data) {
            console.log("服务器数据未获得");
            return;
        }
        var data1 = this.getItemByLocalStorage("localData", undefined);
        if (data1 != undefined) {
            data1 = JSON.parse(data1);
        }
        var gameVersion = undefined;
        if (data.game != "") {
            var gameData = JSON.parse(data.game);
            gameVersion = gameData.updateDataTime;

        }
        if (data1 && data1.game.updateDataTime && gameVersion && data1.game.updateDataTime > gameVersion) {
            console.log("gameVersion" + gameVersion);
            console.log(data1.game.updateDataTime > gameVersion);
            this.dealData(data1);
            miDB.localData.systime = data.systime;
            return;
        }

        if (data.game != "") {
            this.dealDataPart(JSON.parse(data.game), "game");

        }
        if (data.master != "") {
            this.dealDataPart(JSON.parse(data.master), "master");
            // miDB.localData.master = JSON.parse(data.master);
        }
        if (data.shopCron != "") {
            this.dealDataPart(JSON.parse(data.shopCron), "shopCron");
            // miDB.localData.shopCron = JSON.parse(data.shopCron);
        }
        if (data.shopMine != "") {
            this.dealDataPart(JSON.parse(data.shopMine), "shopMine");
            // miDB.localData.shopMine = JSON.parse(data.shopMine);

        }
        if (data.shopDiam != "") {
            this.dealDataPart(JSON.parse(data.shopDiam), "shopDiam");
            //miDB.localData.shopDiam = JSON.parse(data.shopDiam);
        }

        if (data.handBook != "") {
            this.dealDataPart(JSON.parse(data.handBook), "handBook");
            //  miDB.localData.handBook = JSON.parse(data.handBook);
        }

        if (data.task != "") {
            this.dealDataPart(JSON.parse(data.task), "task");
            //  miDB.localData.task = JSON.parse(data.task);
        }
        if (data.invi1 != "") {
            this.dealDataPart(JSON.parse(data.invi1), "invi1");
            //  miDB.localData.invi1 = JSON.parse(data.invi1);
        }
        if (data.nPCstart != "") {
            miDB.localData.nPCstart = data.nPCstart;

        }

        if (data.giftList != "" && typeof (data.giftList) != "undefined") {
            this.dealDataPart(JSON.parse(data.giftList), "giftList");
            // miDB.localData.giftList = JSON.parse(data.giftList);
        }


        if (data.shitList != "" && typeof (data.shitList) != "undefined") {
            this.dealDataPart(JSON.parse(data.shitList), "shitList");
            //   miDB.localData.shitList = JSON.parse(data.shitList);
        }

        if (data.customReward != "" && typeof (data.customReward) != "undefined") {
            this.dealDataPart(JSON.parse(data.customReward), "customReward");
        }

        miDB.localData.systime = data.systime;
    },

    getGiftData() // 打开红包
    {
        console.log("打开礼盒")
        if (tywx.UserInfo.extraAdd == "openGift" && tywx.UserInfo.shareTicket != "") {

            if (isGiftOpen == false && tywx.UserInfo.openid == tywx.UserInfo.sendOpenId) {
                wx.showToast({ title: "请分享到其他群" });
                isGiftOpen = true;
                return;

            }


            var data = {
                sendOpenId: tywx.UserInfo.sendOpenId,
                messageCartTime: tywx.UserInfo.messageCartTime,
                typeId: tywx.UserInfo.giftTypeId
            }
            console.log(data);
            tywx.postMethod("monster/openMessageCard/" + tywx.UserInfo.openid, data, function (params) {
                console.log(params);
                if (params.data.code == 0) {
                    var count = params.data.data.count;
                    if (count != 0) {
                        for (var i = 0; i < miDB.localData.giftList.length; i++) {
                            if (miDB.localData.giftList[i].sendOpenId == tywx.UserInfo.sendOpenId && miDB.localData.giftList[i].messageCartTime == tywx.UserInfo.messageCartTime) {
                                miDB.gatherCron = 0;
                                miDB.localData.giftList[i].statue = 1;
                            }
                        }

                        tywx.NotificationCenter.trigger(miDB.EVENT.GET_GIFT_CLOSE_UI); // 关闭礼盒界面
                        tywx.BiLog.clickStat(miDB.BIEVENT.FARE_GIFT, [tywx.UserInfo.isNewPlayer, params.data.data.type]);
                        mi.UIManager.showUI("ShitAwardModel", {
                            ceng: 42, gameData: {
                                titileSpName: "", times: 1,
                                isShare: false,
                                itemData: [{ type: params.data.data.type, num: count }],
                                okCallBack: function () {

                                }
                            }
                        });
                    } else {
                        wx.showToast({ title: "不可重复领取" });
                    }

                }
            }, function () {
            });
        } else if (tywx.UserInfo.extraAdd == "openGift" && tywx.UserInfo.shareTicket == "") {
            wx.showToast({ title: "请分享到群" });
        }

        console.log("shareTicket" + tywx.UserInfo.shareTicket);
    },





    LocalDataLock: function () {
        miDB.GameData.setLocalDataLock();
    },
    getMallReadPoint: function (shopIndex) {

        var isRead = false;
        var shopData = [];
        if (shopIndex == 0) {
            var oneIndex = miDB.GameData.findSmartIndex(miDB.localData.shopCron, miDB.shopConfig, 1);
            if (oneIndex != null) {
                shopData.push(oneIndex);
            }
            var twoIndex = miDB.GameData.findSmartIndex(miDB.localData.shopCron, miDB.shopConfig, 2);
            if (twoIndex != null) {
                shopData.push(twoIndex);
            }
        }
        else if (shopIndex == 1) {
            var oneIndex = miDB.GameData.findSmartIndex(miDB.localData.shopMine, miDB.shopMineConfig, 1);
            if (oneIndex != null) {
                shopData.push(oneIndex);
            }
        } else if (shopIndex == 2) {
            for (var i = 1; i <= 5; i++) {
                var oneIndex = miDB.GameData.findSmartIndex(miDB.localData.shopDiam, miDB.shopDiamConfig, i);
                if (oneIndex != null) {
                    shopData.push(oneIndex);
                }
            }


        }

        for (var i = 0; i < shopData.length; i++) {

            if (shopIndex == 0) {
                var isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.corn, shopData[i].price);
                if (isPrice >= 0) {
                    isRead = true;
                    break;
                }
            }
            else if (shopIndex == 1) {
                var isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.mine, shopData[i].price);
                if (isPrice >= 0) {
                    isRead = true;
                    break;
                }
            }

            else if (shopIndex == 2) {
                var isPrice = miTools.Utils.comparedTo(miDB.GameData.DB.diamond, shopData[i].price);
                if (isPrice >= 0) {
                    isRead = true;
                    break;
                }
            }

        }
        return isRead;

    },
    friendCallback: function (data) {
        console.log("friendCallback");
        if (data.data.code == 0) {
            firendHelp = data.data.data;
            var newFirendHelp = JSON.parse(JSON.stringify(firendHelp)); //firendHelp.slice(0);
            var data1 = this.getItemByLocalStorage("firendHelp", undefined);
            if (data1 != undefined) {
                data1 = JSON.parse(data1);
                for (var i = 0; i < newFirendHelp.length; i++) {
                    for (var j = 0; j < data1.length; j++) {
                        if (data1[j].helped == newFirendHelp[i].helped) {
                            newFirendHelp.splice(i, 1);
                            i--;
                            break;
                        }
                    }

                }
                if (newFirendHelp.length > 0) {
                    console.log("好友助力1");
                    tywx.NotificationCenter.trigger(miDB.EVENT.FRIEND_HELP_NEW, newFirendHelp);
                }

            } else {
                if (newFirendHelp.length > 0) {
                    console.log("好友助力2");
                    tywx.NotificationCenter.trigger(miDB.EVENT.FRIEND_HELP_NEW, newFirendHelp);
                }

            }
            var nndata = JSON.stringify(firendHelp);
            this.setItemByLocalStorage("firendHelp", nndata);

        }
    },
    friendData: function () {
        if (tywx.isInWeChatPath) {
            tywx.postMethodCall("monster/getAllHelped/" + tywx.UserInfo.openid, "", miDB.GameData.friendCallback, miDB.GameData);
        }
    },



    friendCallback1: function (data) {
        console.log(data);
        if (data.data.code == 0) {
            tywx.postMethodCall("monster/getAllHelped/" + tywx.UserInfo.openid, "", miDB.GameData.friendCallback, miDB.GameData);
        }

    },
    reshFriendData: function (data) {
        if (tywx.isInWeChatPath) {
            tywx.postMethodCall("monster/completeHelped/" + tywx.UserInfo.openid + "/" + data, "", miDB.GameData.friendCallback1, miDB.GameData);
        }

    },

    initInviData() {
        if (tywx.isInWeChatPath) {
            tywx.postMethodCall("monster/getAllInvitee/" + tywx.UserInfo.openid, "", miDB.GameData.initInviDataCall, miDB.GameData);
        }

    },
    initInviDataCall(data) {
        console.log("openInviDataCall");

        if (data.data.code == 0) {
            miDB.inviData = data.data.data;
        }
    },
    openInviDataCall(data) {
        console.log("openInviDataCall");

        if (data.data.code == 0) {
            miDB.inviData = data.data.data;
        }

        console.log(miDB.inviData);
        mi.UIManager.showUI("InviModel", { ceng: 50 });
    },



    openInviData() {
        if (tywx.isInWeChatPath) {

            tywx.postMethodCall("monster/getAllInvitee/" + tywx.UserInfo.openid, "", miDB.GameData.openInviDataCall, miDB.GameData);
        } else {
            mi.UIManager.showUI("InviModel", { ceng: 50 });

        }


    },

    giftSystem: function () {

        for (var i = 0; i < miDB.localData.customReward.length; i++) {
            if (miDB.localData.customReward[i] == 0) {
                miDB.GameData.mangerCutomReward(i);
                break;
            }

        }

    },




    updateSystime: function () {
        var time = new Date(miDB.localData.systime * 1000);
        time.setSeconds(time.getSeconds() + 1);
        miDB.localData.systime = Date.parse(time) / 1000;
        var size = miDB.MasterData.getBuildListLength();
        if (miDB.localData.game.reformTime && size >= 1) {
            var reformTime = new Date(miDB.localData.game.reformTime * 1000);
            reformTime.setSeconds(reformTime.getSeconds() + 12 * 3600);
            var reformCountDownTime = reformTime - time;

            if (reformCountDownTime) {

                tywx.NotificationCenter.trigger(miDB.EVENT.REFORM_TIME_UPDATE, reformCountDownTime);

            }
        }

        var firendNum = 0;

        var helpData = [];
        var npcData = { type: "npc", statue: 0, time: 0, wxImg: "" };
        if (miDB.localData.nPCstart != "") {
            var startTime = new Date(miDB.localData.nPCstart * 1000);
            var endTime = new Date(miDB.localData.nPCstart * 1000);
            endTime.setSeconds(startTime.getSeconds() + 30 * 60);

            if (miDB.localData.systime < (Date.parse(endTime) / 1000)) {
                npcData.statue = 1;
                npcData.time = Date.parse(endTime) / 1000 - miDB.localData.systime;

            }
            else {
                if (startTime.getDate() == time.getDate()) {
                    var startHous = startTime.getHours();
                    var hous = time.getHours();
                    if (hous >= 0 && hous < 8 && startHous >= 0 && startHous < 8) {
                        npcData.statue = 2;
                    }
                    else if (hous >= 8 && hous < 12 && startHous >= 8 && startHous < 12) {
                        npcData.statue = 2;
                    } else if (hous >= 12 && hous < 20 && startHous >= 12 && startHous < 20) {
                        npcData.statue = 2;
                    }
                    else if (hous >= 20 && hous < 24 && startHous >= 20 && startHous < 24) {
                        npcData.statue = 2;
                    } else {
                        npcData.statue = 0;
                    }
                } else {
                    var hous = time.getHours();
                    var startTimeHouse = startTime.getHours();
                    if (hous >= 0 && hous < 8 && startTimeHouse >= 20 && startTimeHouse < 24 && startTime.getDate() == new Date(time.getTime() - 24 * 60 * 60 * 1000).getDate()) {
                        npcData.statue = 2;
                    } else {
                        npcData.statue = 0;
                    }
                }



            }


        }
        helpData.push(npcData);
        for (var i = 0; i < firendHelp.length; i++) {
            var friData = { type: "friend", statue: 0, time: 0, wxImg: firendHelp[i].wxImg, helped: firendHelp[i].helped };
            var startTime = new Date(firendHelp[i].createTime);
            var endTime = new Date(firendHelp[i].createTime);
            endTime.setSeconds(startTime.getSeconds() + 240 * 60);
            if (miDB.localData.systime < Date.parse(endTime) / 1000) {
                friData.statue = 1;
                friData.time = Date.parse(endTime) / 1000 - miDB.localData.systime;

            } else {
                if (startTime.getDate() != time.getDate()) {
                    friData.statue = 0;

                } else {
                    friData.statue = 2;
                }

            }
            helpData.push(friData);
        }


        miDB.GameData.addTaskNum("friendHelp", firendHelp.length);

        if (helpData.length < 9) {
            for (var i = helpData.length; i < 9; i++) {
                var data = { type: "friend", statue: 0, time: 0, wxImg: "" };
                helpData.push(data);
            }
        }

        for (var i = 0; i < helpData.length; i++) {
            if (helpData[i].statue == 1) {
                firendNum++;
            }
        }
        firendNum = firendNum * 2;
        if (firendNum > 16) {
            firendNum = 16;
        } else if (firendNum < 1) {
            firendNum = 1;
        }

        miDB.friendsSkill = firendNum;
        miDB.GameData.getProductEffic();

        tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_FRIEND_HELP, helpData);

        if (miDB.localData.game.freeDiamNum <= 5) {
            if (miDB.localData.game.freeDiamTime == "null" || miDB.localData.systime > miDB.localData.game.freeDiamTime) {
                tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_FREE_DIMA, { action: "show" });
            } else {
                tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_FREE_DIMA, { action: "hide" });
            }

        } else {
            tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_FREE_DIMA, { action: "hide" });
        }
        //超级喂养
        if (miDB.localData.game.superFeedNum <= 5 && ((miDB.localData.game.reformNum == 0 && miDB.MasterData.getBuildListLength() >= 3) || (miDB.localData.game.reformNum > 0 && miDB.MasterData.getBuildListLength() >= 1))) {
            if (miDB.localData.game.superFeedTime == "null" || miDB.localData.systime > miDB.localData.game.superFeedTime) {
                tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_SUPER_FEED, { action: "show" });
            } else {
                tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_SUPER_FEED, { action: "hide" });
            }

        } else {
            tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_FREE_DIMA, { action: "hide" });
        }

        var shopOne = miDB.GameData.getMallReadPoint(0);  //商店红点
        tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_READ_POINT, { action: "mallReadPoint", active: shopOne });

        var npcPoint = false;
        if (npcData.statue == 0) {
            npcPoint = true;
        }
        // npc 红点
        tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_READ_POINT, { action: "npcReadPoint", active: npcPoint });
        var inviPoint = false;
        for (var i = 0; i < miDB.inviData.length; i++) {
            if (miDB.inviData[i].spare == 1) {
                inviPoint = true;
                break;
            }
        }

        tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_READ_POINT, { action: "inviReadPoint", active: inviPoint });
        var taskPoint = miDB.GameData.getTaskReadPoint();
        tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_READ_POINT, { action: "taskReadPoint", active: taskPoint });
        var handBookPoint = miDB.GameData.getHandBookReadPoint();
        tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_READ_POINT, { action: "handBookReadPoint", active: handBookPoint });

        var rewardPoint = false;
        if (miDB.localData.game.singTime == "null" || new Date(miDB.localData.game.singTime * 1000).getDate() != new Date(miDB.localData.systime * 1000).getDate()) {
            rewardPoint = true;
        }
        tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_READ_POINT, { action: "rewardReadPoint", active: rewardPoint });



        if (miDB.localData.game.finshGuid == true && miDB.GameData.findGift() == true) {

            tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_READ_POINT, { action: "giftReadPoint", active: true });
        }

        else {

            tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_READ_POINT, { action: "giftReadPoint", active: false });
        }



    },
    mangerCutomReward(id) {
        var data = miDB.customReward[id];
        if (data) {

            var isPass = true;
            var conList = data.condition;
            for (var i = 0; i < conList.length; i++) {
                var action = conList[i].action;
                if ("productRate" == action) {
                    isPass = isPass && miDB.GameData.comparedProductRate(conList[i]);
                } else if ("guide" == action) {
                    isPass = isPass && miDB.localData.game.finshGuid == conList[i].count;
                }
                else if ("isShow" == action) {
                    isPass = isPass && conList[i].count == false;
                }
            }
            if (isPass == true) {

                miDB.localData.customReward[id] = "1";
                for (var j = 0; j < conList.length; j++) {
                    if ("isShow" == conList[j].action) {
                        conList[j].count = true;
                    }
                }

                mi.UIManager.showUI("NoobRewardModel", { ceng: 50, customData: data });

            }

        }

    },
    comparedProductRate(con) {
        var product = miDB.GameData.DB.productEffic;
        return miDB.GameData._judge(con.judge, product, con.count);

    },

    _judge: function (judge, curNum, baseNum) {
        var needResult = miTools.Utils.comparedTo(curNum, baseNum);

        if (judge == ">") {
            if (needResult > 0) {
                return true;
            }
        } else if (judge == "<") {
            if (needResult < 0) {
                return true;
            }
        } else if (judge == "=") {
            if (needResult == 0) {
                return true;
            }
        }
        return false;
    },


    findGift() {
        var isfind = false;
        for (var i = 0; i < miDB.localData.giftList.length; i++) {
            if (miDB.localData.giftList[i].statue == 0) {
                isfind = true;
                break;
            }

        }
        if (isfind == false) {
            this.creatorGift();
        }
        return isfind;

    },



    shareGiftData1(data) {

        if (data.data.code == 0) {
            miDB.giftData = data.data.data;
            console.log("shareGiftData1");
            console.log(miDB.giftData);
        }
    },


    shareGiftBtnCallback1: function () {

        if (tywx.isInWeChatPath) {
            tywx.postMethodCall("monster/getGiftBagType", "", miDB.GameData.shareGiftData1, miDB.GameData);
        }

    },

    shareGiftData(data) {

        if (data.data.code == 0) {
            miDB.giftData = data.data.data;
            mi.UIManager.showUI("ShareGiftAlter", { ceng: 42, id: miDB.giftData.id, type: miDB.giftData.type, num: miDB.giftData.number });
        }
    },

    shareGiftBtnCallback: function () {
        if (tywx.isInWeChatPath) {
            tywx.postMethodCall("monster/getGiftBagType", "", miDB.GameData.shareGiftData, miDB.GameData);
        }
        else {
            mi.UIManager.showUI("ShareGiftAlter", { ceng: 42, id: 1, type: "diamond", num: 100 });
        }
    },

    getGift() {
        var data = "";
        for (var i = 0; i < miDB.localData.giftList.length; i++) {
            if (miDB.localData.giftList[i].statue == 0) {
                data = miDB.localData.giftList[i];
                break;
            }

        }

        return data;
    },

    creatorGift() {
        if (miDB.localData.giftList.length < 5 && miDB.gatherCron > 20) {
            var temp = { sendOpenId: tywx.UserInfo.openid, messageCartTime: miDB.localData.systime, statue: 0 };
            tywx.NotificationCenter.trigger(miDB.EVENT.GET_NEW_GIFT);
            miDB.localData.giftList.push(temp);

            if (miDB.localData.giftList.length > 1) {
                isGiftOpen = false;
            }



        }

    },



    getTaskReadPoint() {
        var isRead = false;
        for (var i = 0; i < miDB.localData.task.length; i++) {
            var index = miDB.localData.task[i].index;
            var checkData = miCfg.task[index];
            if (miDB.localData.task[i].statue == 0 && Number(miDB.localData.task[i].num) >= Number(checkData.num)) {
                isRead = true;
                break;
            }
        }
        return isRead;
    },


    getHandBookReadPoint() {
        var isRead = false;
        if (miDB.localData.game.handbookFreeNum <= 10 && (miDB.localData.game.handbookTime == "null" || miDB.localData.systime - miDB.localData.game.handbookTime > 30 * 60)) {
            isRead = true;
        }
        var num = miTools.Utils.comparedTo(miDB.localData.game.chest, 1);
        if (num >= 0) {
            isRead = true;
        }
        return isRead;

    },

    // setFirendStatue(index, statue) {

    //     miDB.localData.firendHelp[index].statue = statue;
    //     miDB.localData.firendHelp[index].startTime = miDB.localData.systime;
    //     console.log(miDB.localData.firendHelp);
    //     tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_FRIEND_HELP, miDB.localData.firendHelp);
    // },


    //获得金币
    _gainCornCallback: function (params) {
        var storageCorn = params.storageCorn || 0;

        this.setItemByName("corn", miTools.Utils.deAdd(this.DB.corn, storageCorn).toString());
        miDB.localData.game.todayGetCron = miTools.Utils.deAdd(miDB.localData.game.todayGetCron, storageCorn).toString();




        // this.setLocalDataLock();
    },

    // 兑换采矿
    gainMineCallback: function (num) {
        console.log("回收采矿前数量" + this.DB.mine.toString());
        this.setItemByName("mine", miTools.Utils.deAdd(this.DB.mine, num).toString());
        console.log("增加采矿数量" + num.toString());
        console.log("回收后采矿前数量" + this.DB.mine.toString());
        miDB.localData.game.costMine = 0;
        this.setItemByName("corn", "0");
        for (var i = 0; i < miDB.localData.shopCron.length; i++) {
            miDB.localData.shopCron[i].payNum = 0;
        }
        for (var i = 0; i < miDB.localData.shopMine.length; i++) {
            miDB.localData.shopMine[i].payNum = 0;
        }

        miDB.localData.game.reformTime = miDB.localData.systime;
        miDB.localData.game.reformNum = miDB.localData.game.reformNum + 1;
        miDB.localData.game.nextScene = false;
        miDB.GameData.getProductEffic();
        this.shopToSkill();


    },

    _costCornCallback: function (params) {
        var cost = params.cost || 0;
        this.setItemByName("corn", miTools.Utils.deSub(this.DB.corn, cost).toString());
    },


    costChestCallback: function (params) {

        var cost = params || 0;
        miDB.localData.game.chest = miTools.Utils.deSub(miDB.localData.game.chest, cost).toString();
    },

    costDiamCallback: function (params) {

        var cost = params || 0;
        // this.setItemByName("diamond", miTools.Utils.deSub(this.DB.diamond, cost).toString());
        this.setItemByName("diamond", parseInt(this.DB.diamond) - parseInt(cost));
    },

    costMineCallback: function (params) {

        var cost = params || 0;
        this.setItemByName("mine", miTools.Utils.deSub(this.DB.mine, cost).toString());
    },
    addMineCallback: function (params) {

        var cost = params || 0;
        this.setItemByName("mine", miTools.Utils.deAdd(this.DB.mine, cost).toString());
        miDB.GameData.getProductEffic();
    },
    addDiamCallback: function (params) {

        var cost = params || 0;
        //this.setItemByName("diamond", miTools.Utils.deAdd(this.DB.diamond, cost).toString());
        this.setItemByName("diamond", parseInt(this.DB.diamond) + parseInt(cost));
    },

    addChestCallback: function (params) {

        var cost = params || 0;
        miDB.localData.game.chest = miTools.Utils.deAdd(miDB.localData.game.chest, cost).toString();
    },
    addCronCallback: function (params) {

        var cost = params || 0;
        this.setItemByName("corn", miTools.Utils.deAdd(this.DB.corn, cost).toString());
        miDB.localData.game.todayGetCron = miTools.Utils.deAdd(miDB.localData.game.todayGetCron, cost).toString();
        miDB.GameData.getProductEffic();
    },
    addShopLevel(data, index, lv) {
        data[index].payNum += lv;
    },
    getDataBase: function () {
        return this.DB;
    },

    getItemByName: function (keyStr) {
        return this.DB[keyStr];

    },

    setItemByName: function (keyStr, valueStr) {
        this.DB[keyStr] = valueStr;
        // 本地化存
        // this.setItemByLocalStorage(keyStr,valueStr)
        tywx.NotificationCenter.trigger(miDB.EVENT.CHANGE_GAME_DATA, this.DB);

    },

    getItemByLocalStorage: function (keyStr, defaultValue) {
        var value = tywx.Util.getItemFromLocalStorage(keyStr, defaultValue);
        if (value && value != undefined && value != "nan") {
            return value;
        }
        return undefined;
    },

    setItemByLocalStorage: function (keyStr, ValueStr) {
        tywx.Util.setItemToLocalStorage(keyStr, ValueStr);
    },


    destory: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.COST_GAME_CORN, this.costCornCallback, this);
    },

    setLocalDataLock() {
        if (isAnaly == false) {
            return;

        }
        miDB.localData.game.corn = this.DB.corn;
        miDB.localData.game.mine = this.DB.mine;
        miDB.localData.game.diamond = this.DB.diamond;
        miDB.localData.game.updateDataTime = miDB.localData.systime;
        miDB.localData.master = miDB.MasterData.getBuildLoclData();
        var nndata = JSON.stringify(miDB.localData);

        var data = {
            openId: tywx.SystemInfo.openid,
            info: miFrame.EncodeDecode.base64Encode(nndata),
            sign: "",

        };
        data.sign = tywx.hex_md5(data.openId + data.info + "asdf*4534__rgf93ka&^&%^dfgdg*sunxzy");
        if (tywx.isInWeChatPath) {
            //   tywx.postMethod("monster/updateUserInfo/", nndata, this.callback, this);
            tywx.postMethod("monster/updateUserInfo/" + tywx.UserInfo.openid, miTools.Utils.jsonToPostData(miDB.localData), this.callback, this);
            this.setItemByLocalStorage("localData", nndata);

            var wxData = { handBook: this.getBookLength(), reformNum: miDB.localData.game.reformNum };
            tywx.OpenDataUtil.upRankData(JSON.stringify(wxData));
            console.log("-------提交数据");
            console.log(miDB.localData);
            console.log("数据已更新");



        } else {
            this.setItemByLocalStorage("localData", nndata);
            console.log("数据已更新");
        }

        this.setItemByLocalStorage("shareModelStrategyTime", JSON.stringify(tywx.UserInfo.shareModelStrategyTime));


    },
    callback(data) {


    },


    addTaskNum(action, num) {
        if (action == "getCron" && miDB.localData.game.finshGuid == true) {
            miDB.gatherCron++;
        }
        for (var i = 0; i < miDB.localData.task.length; i++) {
            var index = miDB.localData.task[i].index;
            if (miCfg.task[index].action == action && miDB.localData.task[i].statue == 0) {
                if (action == "friendHelp") {
                    miDB.localData.task[i].num = num;
                }
                else {
                    miDB.localData.task[i].num += num;
                }

                break;
            }
        }

    },

    setTaskStatue(index, statue) {
        for (var i = 0; i < miDB.localData.task.length; i++) {
            if (miDB.localData.task[i].index == index) {
                miDB.localData.task[i].statue = statue;
                break;
            }
        }

    },

    getTask(index) {
        var data = null;
        for (var i = 0; i < miDB.localData.task.length; i++) {
            if (miDB.localData.task[i].index == index) {
                data = miDB.localData.task[i];
                break;
            }
        }
        return data;
    },

    findSmartIndex(data, origData, group) {
        var returnData = null;
        var plNum = null;
        for (var i = 0; i < data.length; i++) {
            if (data[i].group == group) {
                if (plNum == null || plNum > data[i].payNum) {
                    if (data[i].payNum < origData[i].maxLevel) {
                        returnData = origData[i];
                        plNum = data[i].payNum;
                    } else if (origData[i].maxLevel == 0) {
                        returnData = origData[i];
                        plNum = data[i].payNum;
                    }


                }
            }
        }

        return returnData;


    },
    cleanGameData: function () {

    },

    _getShareInfoData: function () {
        var shareInfoStr = this.getItemByLocalStorage("shareInfo")
        if (shareInfoStr) {
            return this._stringToJson(shareInfoStr)
        }
        return {}
    },
    //转换为json类型的字符串
    _stringToJson: function (str) {
        return JSON.parse(str);
    },

    //转换为字符串的json类型
    _jsonToString: function (jsObject) {
        return JSON.stringify(jsObject);
    },
    /*
    本地存储分享点本地存储
    */
    _setShareInfoData: function () {
        var shareInfoStr = this._jsonToString(this.DB.shareInfo)
        this.setItemByLocalStorage("shareInfo", shareInfoStr)
    },
    /*
    删除超时的分享点
    */
    removeShareInfo: function (sharePointId) {
        var shareInfoKeys = Object.keys(this.DB.shareInfo)
        for (var j = 0; j < shareInfoKeys.length; j++) {
            if (sharePointId == shareInfoKeys[j]) {
                delete this.DB.shareInfo[sharePointId]
                return
            }
        }
    },
    /*
    修改分享点本地存储
    */
    _changeShareInfoDataCallback: function (params) {

        if (params) {
            var keys = params
            var shareInfoKeys = Object.keys(this.DB.shareInfo)
            for (var i = 0; i < keys.length; i++) {

                var exist = false
                for (var j = 0; j < shareInfoKeys.length; j++) {
                    if (keys[i] == shareInfoKeys[j]) {
                        exist = true
                        // break
                    }
                }

                if (!exist) {

                    this.DB.shareInfo[keys[i]] = new Date().getTime();
                }
            }
            this._setShareInfoData()
        }
    },
    /*
 检查分享点是否已经被记录
 */
    checkSharePointIsExist: function (sharePoint) {

        tywx.LOGE("检查分享点是否已经被记录 = ", sharePoint)
        tywx.LOGE("检查分享点是否已经被记录 = ", JSON.stringify(this.DB.shareInfo))
        if (this.DB.shareInfo == "0" || this.DB.shareInfo == null || this.DB.shareInfo == undefined) {
            this.DB.shareInfo = {}
        }
        if (this.DB.shareInfo[sharePoint]) {
            return this.DB.shareInfo[sharePoint]
        }
        return undefined
    },

    /*
    更新分享点信息
    */
    updateShareInfo: function () {
        var nowTime = new Date().getTime();
        var keys = Object.keys(this.DB.shareInfo)
        for (var i = 0; i < keys.length; i++) {
            var oldTime = Number(this.DB.shareInfo[keys[i]])
            var delta = nowTime - oldTime - 3600 * 1000 // 1小时不能重复分享到群
            if (delta > 0) {
                this.removeShareInfo(keys[i])
            }
        }
    },

};

