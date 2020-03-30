
miCfg.task = [
    { index: 0, action: "fight", num: 2, weight: 100, type: "diamond", rewardNum: 3, dec: "进行2次战斗", taskIcon: "mrrw_icon_1" },
    { index: 1, action: "getCron", num: 30, weight: 100, type: "diamond", rewardNum: 3, dec: "收集30次金币", taskIcon: "mrrw_icon_4" },
    { index: 2, action: "feed", num: 50, weight: 100, type: "diamond", rewardNum: 3, dec: "喂食怪兽50次", taskIcon: "mrrw_icon_3" },
    { index: 3, action: "refrom", num: 1, weight: 100, type: "diamond", rewardNum: 3, dec: "进行1次回收", taskIcon: "mrrw_icon_5" },
    { index: 4, action: "friendHelp", num: 3, weight: 100, type: "diamond", rewardNum: 3, dec: "邀请3个好友助力", taskIcon: "mrrw_icon_2" },
    { index: 5, action: "payShop", num: 2, weight: 100, type: "diamond", rewardNum: 3, dec: "在商店进行2次购物", taskIcon: "mrrw_icon_6" },
    { index: 6, action: "getCron", num: 50, weight: 50, type: "diamond", rewardNum: 5, dec: "收集50次金币", taskIcon: "mrrw_icon_4" },
];


miCfg.task.getTask = function () {

    var data =  JSON.parse(JSON.stringify(miCfg.task));//.slice(0);
    var checkData = [];
    for (var i = 0; i < 3; i++) {
        var index = miCfg.BoxToDataChoose(data);
        checkData.push(data[index]);
        data.splice(index, 1);
    }
    return checkData;
};


miCfg.task.getExchangeTask = function (orindex) {
    var data =JSON.parse(JSON.stringify(miCfg.task)); // miCfg.task.slice(0);
    for (var i = 0; i < miDB.localData.task.length; i++) {

        for (var j = 0; j < data.length; j++) {
            if (miDB.localData.task[i].index == data[j].index) {
                data.splice(j, 1);
                j--;
            }
        }
    }

    var index1 = miCfg.BoxToDataChoose(data);
    for (var i = 0; i < miDB.localData.task.length; i++) {
        if (miDB.localData.task[i].index == orindex) {
            miDB.localData.task[i].index = data[index1].index;
            miDB.localData.task[i].num = 0;
            miDB.localData.task[i].action = miCfg.task[data[index1].index].action;
            miDB.localData.task[i].reshNum += 1;
        }

    }

    // console.log(miDB.localData.task);



};