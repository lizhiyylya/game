
miDB.MasterData = {

    timeIdd: "",

    TAG: "MasterData",
    isRemove: false,
    offLineCron: [],  // 计算怪物离线收益
    page: 1,  //  1-3 页面； // 这个页面需要 三个 数据 
    DB: {
        MasterList: [],


    },

    // 秒产 增益   
    //建筑对象数据模型
    createMasterModel: function () {
        var model = new Object();
        model.masterIdx = undefined;//怪我索引
        model.onceProductCorn = 0;// 秒产金额
        model.masterPrice = 0; // 当前升级建筑
        model.storageCorn = "0";// 存储金额
        model.level = 1;  //建筑等级
        model.productTime = 0;


        // 获取静态数据
        model.getCfgInfo = function () {
            return miDB.MasterData.getCfgInfo(this.masterIdx);
        }
        //获得属性值
        model.getPropertyByKey = function (keyName) {
            if (this[keyName]) {
                return this[keyName];
            }
            return undefined;
        },
            //修改属性值
            model.setPropertyByKey = function (keyName, value) {
                if (this[keyName]) {
                    this[keyName] = value;
                } else {
                    tywx.LOGD("修改属性值不存在  keyName= ", keyName);
                }
            },
            model.changeLevel = function (level) {
                this.level = level;
                this.masterPrice = miCfg.Master.getUpGradeGold(this.masterIdx, this.level);
                this.onceProductCorn = miCfg.Master.getOutputGold(this.masterIdx, this.level);

            },

            model.changeAddLevel = function (level) {
                this.level = this.level + level;
                this.masterPrice = miCfg.Master.getUpGradeGold(this.masterIdx, this.level);
                this.onceProductCorn = miCfg.Master.getOutputGold(this.masterIdx, this.level);
                //miDB.MasterData .setBuilidByLocalStorage();
            }

        model.changeOffStorge = function (time) {
            var onceProductCorn = miCfg.Master.getOutputGold(this.masterIdx, this.level);
            return miTools.Utils.deMul(time, miTools.Utils.deMul(onceProductCorn, this.getBuff())).toString();

        },


            model.changeStorge = function (time) {
                var onceProductCorn = miCfg.Master.getOutputGold(this.masterIdx, this.level);
                this.storageCorn = miTools.Utils.deAdd(this.storageCorn, miTools.Utils.deMul(time, onceProductCorn));

            },
            model.changeStorgeOffLine = function (num) {

                this.storageCorn = miTools.Utils.deAdd(this.storageCorn, num);
            },


            model.gainCorn = function () {
                tywx.NotificationCenter.trigger(miDB.EVENT.GAIN_CORN_DATA, { storageCorn: this.storageCorn });
                this.storageCorn = 0;
                //刷新界面
                var isExist = undefined
                for (var i = 0; i < miDB.MasterData.DB.MasterList.length; i++) {
                    var MasterData = miDB.MasterData.DB.MasterList[i];
                    if (MasterData && (MasterData.masterIdx === this.masterIdx)) {
                        isExist = i;
                    }
                }
                if (isExist != undefined) {
                    //tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_BUILDING_DATA,miDB.MasterData.DB.buildingList[isExist]);
                    //tywx.NotificationCenter.trigger(miDB.EVENT.TAKE_GAME_CORN, {index:isExist,type:true});
                }

                //console.log(miDB.MasterData.DB.MasterList);
            }
        model.getBuff = function () {
            var ind = model.getCfgInfo().seatPos;
            var buff = 1;
            // 商品0 全部加速卡              1 单个建筑 增幅 下标 1-7
            //var buff1= miDB.GameData.getShopLevel(0)*2+miDB.GameData.getShopLevel(ind+1) *3 ;
            // if (buff1<1)
            // {
            //     return buff;
            // }else 
            // {
            //     return buff;
            // }
            return buff;
        }
        return model;
    },


    getTimeProduct(time) {
        var count = 0;
        for (var i = 0; i < this.DB.MasterList.length; i++) {
            var masterData = this.DB.MasterList[i];
            var needTime = miCfg.Master.getProductTime(masterData.masterIdx, masterData.level);
            var num = miTools.Utils.dividedToIntegerBy(time, needTime);
            count = miTools.Utils.deAdd(count,
                miTools.Utils.deMul(miCfg.Master.getOutputGold(masterData.masterIdx, masterData.level), num)).toString();

        }
        return count;
    },


    addTimeProduct(time) {

        for (var i = 0; i < this.DB.MasterList.length; i++) {

            var masterData = this.DB.MasterList[i];
            // if ( miDB.autoGetSkill [i] ==true)
            // {
            //     masterData.storageCorn =miTools.Utils.deAdd(masterData.storageCorn , 
            //     miCfg.Master.getOutputGold (masterData.masterIdx,masterData.level )).toString();


            // }else if (masterData.storageCorn==0){
            var needTime = miCfg.Master.getProductTime(masterData.masterIdx, masterData.level);
            var num = miTools.Utils.dividedToIntegerBy(time, needTime);
            masterData.storageCorn = miTools.Utils.deAdd(masterData.storageCorn,
                miTools.Utils.deMul(miCfg.Master.getOutputGold(masterData.masterIdx, masterData.level), num)).toString();
            //}
        }

    },

    getBuildListLength() {
        return this.DB.MasterList.length;

    },



    getBuilidByLocalStorage() {

        var data = miDB.localData.master;
        this.offLineCron = [];
        var isoffLine = true;
        if (data.length == 0) {
            isoffLine = false;
        }
        for (var i = 0; i < data.length; i++) {
            if (miDB.localData.systime - data[i].buildTime < 60) {
                isoffLine = false;
            }
            this.initLocalMode(data[i]);

        }
        // mi.UIManager.showUI("OffLineModel",{ceng : 50});

        var sum = 0;
        for (var i = 0; i < this.offLineCron.length; i++) {
            sum = miTools.Utils.deAdd(sum, this.offLineCron[i]).toString();
        }
        if (isoffLine && miDB.localData.game.finshGuid == true && sum != 0) {
            mi.UIManager.showUI("OffLineModel", { ceng: 42 });
        } else {

            this.getOffStorge(1);
        }


        if (data.length == 0) {
            //this.addMasterData("1");

            tywx.NotificationCenter.trigger(miDB.EVENT.GAME_ONE_MONSTER);

        }
        miDB.GameData.getProductEffic(); //更新效率
        tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE);

    },

    setBuilidByLocalStorage()  // 备份游戏数据
    {

        miDB.GameData.setLocalDataLock();

    },

    getOffStorge(num)  //获取离线收益
    {
        for (var i = 0; i < this.offLineCron.length; i++) {
            if (this.DB.MasterList[i]) {

                this.DB.MasterList[i].changeStorgeOffLine(miTools.Utils.deMul(num, this.offLineCron[i]));
            }


        }
        this.offLineCron = [];

    },



    initLocalMode(data) {
        if (data.masterIdx) {
            var isExist = false
            for (var i = 0; i < this.DB.MasterList.length; i++) {
                var masterData = this.DB.MasterList[i];
                if (masterData && (masterData.masterIdx === data.masterIdx)) {  // 已经存在时刷新；
                    isExist = true;
                    masterData.changeLevel(data.level);
                    masterData.getCfgInfo().seatPos = data.index;
                    masterData.storageCorn = data.storageCorn;
                    if (data.productTime) {
                        masterData.productTime = data.productTime;
                    }


                    var str = "0";
                    var needTime = miCfg.Master.getProductTime(masterData.masterIdx, masterData.level);
                    var num = miTools.Utils.dividedToIntegerBy((miDB.localData.systime - data.masterTime), needTime);

                    if (miDB.autoGetSkill[i] == true) {
                        str = masterData.changeOffStorge(num);
                    } else {
                        var needResult = miTools.Utils.comparedTo(num, needTime);
                        if (masterData.storageCorn == 0 && needResult >= 0) {
                            str = masterData.changeOffStorge(1);

                        }
                    }
                    this.offLineCron.push(str);



                }
            }
            if (!isExist) {

                var oneMaster = new this.createMasterModel();
                //默认为1级
                oneMaster.masterIdx = data.masterIdx; //建筑索引
                oneMaster.changeLevel(data.level);
                oneMaster.getCfgInfo().seatPos = data.index;
                oneMaster.storageCorn = data.storageCorn;
                if (data.productTime) {
                    oneMaster.productTime = data.productTime;
                }

                var str = "0";
                var needTime = miCfg.Master.getProductTime(oneMaster.masterIdx, oneMaster.level);
                var num = miTools.Utils.dividedToIntegerBy((miDB.localData.systime - data.masterTime), needTime);
                if (miDB.autoGetSkill[i] == true) {

                    str = oneMaster.changeOffStorge(num);
                } else {
                    var needResult = miTools.Utils.comparedTo(num, needTime);
                    if (oneMaster.storageCorn == 0 && needResult >= 0) {
                        str = oneMaster.changeOffStorge(1);

                    }
                }
                this.offLineCron.push(str);
                this.DB.MasterList.push(oneMaster);
                //刷新主界面
                tywx.NotificationCenter.trigger(miDB.EVENT.ADD_BUILDING_DATA, oneMaster);
            } else {
                tywx.LOGE("怪物已存在！");
            }
        }

        // console.log("===================\n");
        // console.log(miDB.MasterData.DB.MasterList); 
    },
    getMasterIndexLevel(Index1) {
        var leve = 0;
        for (var i = 0; i < this.DB.MasterList.length; i++) {
            var seatpos = this.DB.MasterList[i].getCfgInfo().seatPos;
            if (Index1 == seatpos) {
                leve = this.DB.MasterList[i].level;
                break;
            }

        }

        return leve;

    },

    getCfgInfo: function (masterIdx) {
        if (masterIdx != undefined && miCfg.Master[masterIdx] != undefined) {
            return miCfg.Master[masterIdx];
        }
        return undefined;
    },

    addGain(data) {


        // var seatPos=data.getCfgInfo().seatPos;
        // if (seatPos ==3|| seatPos ==4 || seatPos ==5)
        // {
        //     var buildIndex1="R100"+(seatPos-2);
        //     for (var i=0;i<this.DB.buildingList.length;i++){
        //         if (this.DB.buildingList[i].buildingIdx ==buildIndex1)
        //         {
        //            // this.DB.buildingList[i].gain +=30;
        //             break;
        //         }
        //     }

        // }


    },

    init: function () {
        // tywx.Timer.setTimer (this, function(dt){
        //     console.log (dt);
        // } ,3,1,1 );
        // tywx.Timer.setUpdateTimer(this);

        tywx.NotificationCenter.listen(miDB.EVENT.GAIN_ALL_CORN_DATA, this.gainAllCornCallback, this);

        if (this.timeIdd == "") {
            this.timeIdd = setInterval(this.update, 100);
        }


    },


    // 改变当前页面
    chagePage: function (page) {


        this.page = page;
        var currentPage = [];
        var index = 3 * page;
        for (var i = 0; i < this.DB.MasterList.length; i++) {

            var seatpos = this.DB.MasterList[i].getCfgInfo().seatPos + 1;


            if (seatpos >= (index - 2) && seatpos <= index) {
                currentPage.push(this.DB.MasterList[i]);
            }

        }

        // 刷新 改造页面  
        tywx.NotificationCenter.trigger(miDB.EVENT.REFRESH_BUILDINGS_OUTPUT, { currentPage: currentPage, page: this.page });


    },



    //改造方法
    reForm: function () {
        // if (miDB.MasterData.DB.MasterList.length<6)
        // {
        //     tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS,{title : "提示",content : "第6个怪兽开放后，开启。"});
        //     return;
        // }
        miDB.MasterData.DB.isRemove = true;
        // miDB.MasterData.DB.MasterList=[];



        for (var i = 0; i < this.DB.MasterList.length; i++) {

            //清理数组对象
            var idx = this.DB.MasterList[i].getCfgInfo().seatPos;
            var masterIdx = this.DB.MasterList[i].masterIdx;
            this.DB.MasterList[i] = undefined;
            this.DB.MasterList.splice(i, 1);
            tywx.NotificationCenter.trigger(miDB.EVENT.REMOVE_BUILDING_DATA, { masterIdx: masterIdx, idx: idx });
            i--;

        }



        var mine = miCfg.Master.getReFromGold();
        miDB.localData.game.costCorn = 0;
        // tywx.NotificationCenter.trigger(miDB.EVENT.GAIN_CORN_DATA,{storageCorn : gold});
        //this.addMasterData("1");
        miDB.MasterData.DB.isRemove = false;
        //兑换成彩矿
        miDB.GameData.gainMineCallback(mine);
        this.setBuilidByLocalStorage();

    },







    //秒产
    update: function (dt) {

        if (miDB.MasterData.DB.isRemove == true) {
            return;
        }
        for (var i = 0; i < miDB.MasterData.DB.MasterList.length; i++) {
            if (miDB.MasterData.DB.isRemove == true) {
                return;
            }
            var masterData = miDB.MasterData.DB.MasterList[i];

            if (miDB.autoGetSkill[i] == false && masterData.storageCorn != 0) {
                masterData.productTime = 0;
            } else {
                masterData.productTime += 0.1;
            }

            tywx.NotificationCenter.trigger(miDB.EVENT.REFRESH_BUILDINGS, miDB.MasterData.DB.MasterList[i]);
            var needTime = miCfg.Master.getProductTime(masterData.masterIdx, masterData.level);
            var timeResult = miTools.Utils.comparedTo(masterData.productTime, needTime);
            var needResult = miTools.Utils.comparedTo(needTime, "0.1");


            if (needResult > 0 && timeResult > 0) {
                masterData.productTime = 0;
                if (miDB.autoGetSkill[i] == true) {
                    masterData.storageCorn = miTools.Utils.deAdd(masterData.storageCorn,
                        miCfg.Master.getOutputGold(masterData.masterIdx, masterData.level)).toString();


                }
                else if (masterData.storageCorn == 0) {
                    masterData.storageCorn = miTools.Utils.deAdd(masterData.storageCorn,
                        miCfg.Master.getOutputGold(masterData.masterIdx, masterData.level)).toString();
                }

            } else if (needResult < 0) {
                if (miDB.autoGetSkill[i] == true) {
                    masterData.productTime = 0;
                    masterData.storageCorn = miTools.Utils.deAdd(masterData.storageCorn, miTools.Utils.deMul(miCfg.Master.getOutputGold(masterData.masterIdx, masterData.level), miTools.Utils.deDividedBy("0.1", needTime))).toString();
                }

                else if (masterData.storageCorn == 0) {
                    masterData.storageCorn = miTools.Utils.deAdd(masterData.storageCorn, miTools.Utils.deMul(miCfg.Master.getOutputGold(masterData.masterIdx, masterData.level), miTools.Utils.deDividedBy("0.1", needTime))).toString();
                }

            }
            //  console.log("storageCorn "+masterData.storageCorn);
            //  if ( miDB.autoGetSkill[i] == false&&masterData.storageCorn>0){
            //      if(masterData.storageCorn>0){
            //          tywx.NotificationCenter.trigger(miDB.EVENT.TAKE_GAME_CORN,{index:i,type:false});     
            //      }
            // }

        }

    },





    gainCornByMasterIdx: function (masterIdx) {
        for (var i = 0; i < this.DB.MasterList.length; i++) {
            var masterData = this.DB.MasterList[i]
            if (masterData && (masterData.masterIdx === masterIdx)) {
                masterData.gainCorn()
            }
        }
    },
    // 增加一个
    addMasterData: function (masterIdx, buildata) {
        if (masterIdx) {
            var isExist = false
            for (var i = 0; i < this.DB.MasterList.length; i++) {
                var masterData = this.DB.MasterList[i];
                if (masterData && (masterData.masterIdx == masterIdx)) {
                    isExist = true;
                }
            }
            if (!isExist) {
                if (tywx.isInWeChatPath && tywx.UserInfo.avatarUrl == "") {
                    tywx.TuyooSDK.loginTuyooAuthorize();
                }
                var corn = miDB.GameData.getItemByName("corn");
                var cfg = this.getCfgInfo(masterIdx);
                var isPrice = miTools.Utils.comparedTo(corn, cfg.activPrice);
                if (isPrice < 0) {
                    //tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS,{title : "提示",content : "金币不足!"});
                    return
                }
                miDB.localData.game.costCorn = miTools.Utils.deAdd(miDB.localData.game.costCorn, cfg.activPrice).toString(); //记录花费金币
                var oneMaster = new this.createMasterModel();
                //默认为1级
                oneMaster.masterIdx = masterIdx; //建筑索引
                oneMaster.changeLevel(1);

                if (miDB.localData.handBook[masterIdx - 1].level == 0) {
                    miDB.localData.handBook[masterIdx - 1].level = 2;
                }



                this.DB.MasterList.push(oneMaster);
                //修改GameDate数据
                tywx.NotificationCenter.trigger(miDB.EVENT.COST_GAME_CORN, { cost: cfg.activPrice });
                //刷新主界面

                this.setBuilidByLocalStorage();
                tywx.NotificationCenter.trigger(miDB.EVENT.ADD_BUILDING_DATA, oneMaster);
                tywx.NotificationCenter.trigger(miDB.EVENT.RECYCLE_STATUS_UE, { status: true });

                //计算效率
                miDB.GameData.getProductEffic();
                tywx.NotificationCenter.trigger(miDB.EVENT.TOUCH_GUIDE_ENGINE);
                var length = miDB.GameData.getBookLength();
                tywx.BiLog.clickStat(miDB.BIEVENT.ADD_MASTER_NUM, [tywx.UserInfo.isNewPlayer, length]);
            } else {
                tywx.LOGE("增加的建筑物已存在！");
            }
        }
    },



    getMaster(masterIdx) {
        var data = null;
        for (var i = 0; i < this.DB.MasterList.length; i++) {
            var masterData = this.DB.MasterList[i]
            if (masterData && (masterData.masterIdx == masterIdx)) {

                data = masterData;
                break;
            }
        }
        return data;
    },


    //更新数据
    updateMaster: function (masterIdx, addLevel) {
        if (masterIdx != undefined) {
            var isExist = undefined;
            for (var i = 0; i < this.DB.MasterList.length; i++) {
                var masterData = this.DB.MasterList[i]
                if (masterData && (masterData.masterIdx == masterIdx)) {
                    isExist = i;
                }
            }
            if (isExist != undefined) {
                var masterData = this.DB.MasterList[isExist];
                var corn = miDB.GameData.getItemByName("corn");
                var isPrice = miTools.Utils.comparedTo(corn, masterData.masterPrice);
                if (isPrice < 0) {
                    tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS, { title: "提示", content: "金币不足，无法升级建筑！ " });
                    return
                }

                let resu = miCfg.Master.speedLevelNode.indexOf(masterData.level + addLevel);
                if (resu != -1) {
                    tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_NOTICE_TIPS, { desc: "生产时间-50%", altas: "image/tplist/game_master", icon: miCfg.Master[masterIdx].MasterShapeName });
                }
                // for (let i = 0; i < miCfg.Master.speedLevelNode.length; i++) {
                //     if (miCfg.Master.speedLevelNode[i] == masterData.level + addLevel) {
                //         console.log(masterData)
                //         tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_NOTICE_TIPS, { desc: "生产时间-50%", altas: "image/tplist/game_master", icon: miCfg.Master[masterIdx].MasterShapeName });
                //         break;
                //     }
                // }
            }

            miDB.localData.game.costCorn = miTools.Utils.deAdd(miDB.localData.game.costCorn, masterData.masterPrice).toString(); //记录花费金币
            //修改GameDate数据
            tywx.NotificationCenter.trigger(miDB.EVENT.COST_GAME_CORN, { cost: this.DB.MasterList[isExist].masterPrice });
            var curlevel = this.DB.MasterList[isExist].level + addLevel;
            this.DB.MasterList[isExist].changeLevel(curlevel);
            //  this.setBuilidByLocalStorage();
            miDB.GameData.getProductEffic(); //更新效率

        } else {
            tywx.LOGE("更新的建筑物不存在！")
        }
    },





    getBuildLoclData() {
        var data = [];
        for (var i = 0; i < this.DB.MasterList.length; i++) {


            let temp = {};
            temp.index = this.DB.MasterList[i].getCfgInfo().seatPos;
            temp.masterIdx = this.DB.MasterList[i].masterIdx;
            temp.storageCorn = this.DB.MasterList[i].storageCorn;
            temp.level = this.DB.MasterList[i].level;
            temp.masterTime = miDB.localData.systime;
            temp.productTime = this.DB.MasterList[i].productTime;
            //  temp.gain=this.DB.MasterList[i].gain;
            data.push(temp);
        }

        return data;

    },


    getMasterStorageCorn(masterIdx) {
        var str = "0";
        for (var i = 0; i < this.DB.MasterList.length; i++) {
            if (this.DB.MasterList[i].masterIdx == masterIdx) {
                str = this.DB.MasterList[i].storageCorn;
                break;
            }


        }
        return str;

    },


    setBuilidByLocalStorage() {
        miDB.GameData.setLocalDataLock();
    },

    getDataBase: function () {
        return this.DB
    },

    getItemByName: function (keyStr) {
        return this.DB[keyStr];
    },





};
