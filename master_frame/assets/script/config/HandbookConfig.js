

miCfg.HandbookLevelConfig = {
    0: { index: 0, needNum: 0, gain: "收益X1", gainCode: 1, },
    1: { index: 0, needNum: 0, gain: "收益X1", gainCode: 1, },
    2: { index: 1, needNum: 3, gain: "收益X3", gainCode: 3, },
    3: { index: 2, needNum: 5, gain: "收益X5", gainCode: 5, },
    4: { index: 3, needNum: 10, gain: "收益X7", gainCode: 7, },
    5: { index: 4, needNum: 15, gain: "收益X9", gainCode: 9, },
    6: { index: 5, needNum: 20, gain: "收益X11", gainCode: 11, },
    7: { index: 6, needNum: 25, gain: "收益X13", gainCode: 13, },
    8: { index: 7, needNum: 30, gain: "收益X15", gainCode: 15, },
    9: { index: 8, needNum: 35, gain: "收益X17", gainCode: 17, },
    10: { index: 9, needNum: 40, gain: "收益X19", gainCode: 19, },
    11: { index: 10, needNum: 45, gain: "收益X21", gainCode: 21, },
    12: { index: 11, needNum: 50, gain: "收益X23", gainCode: 23, },
    13: { index: 12, needNum: 55, gain: "收益X25", gainCode: 25, },
    14: { index: 13, needNum: 60, gain: "收益X27", gainCode: 27, },
    15: { index: 14, needNum: 65, gain: "收益X29", gainCode: 29, },
    16: { index: 15, needNum: 70, gain: "收益X31", gainCode: 31, },
    17: { index: 16, needNum: 75, gain: "收益X33", gainCode: 33, },
    18: { index: 17, needNum: 80, gain: "收益X35", gainCode: 35, },
    19: { index: 18, needNum: 85, gain: "收益X37", gainCode: 37, },
    20: { index: 19, needNum: 90, gain: "收益X39", gainCode: 39, },
    21: { index: 20, needNum: 95, gain: "收益X41", gainCode: 41, },

};

miCfg.Box = [
    { index: 0, num: 1, type: "card", weight: 100, actionIndex: 0, bookIconName: "tj_bg_m_1", monsterName: "花园宝宝" },
    { index: 1, num: 1, type: "card", weight: 100, actionIndex: 1, bookIconName: "tj_bg_m_7", monsterName: "糖果果" },
    { index: 2, num: 1, type: "card", weight: 80, actionIndex: 2, bookIconName: "tj_bg_m_6", monsterName: "美心嘟嘟" },
    { index: 3, num: 1, type: "card", weight: 70, actionIndex: 3, bookIconName: "tj_bg_m_9", monsterName: "海绵企鹅" },
    { index: 4, num: 1, type: "card", weight: 50, actionIndex: 4, bookIconName: "tj_bg_m_8", monsterName: "达浪兔" },
    { index: 5, num: 1, type: "card", weight: 20, actionIndex: 5, bookIconName: "tj_bg_m_5", monsterName: "虾甜妹" },
    { index: 6, num: 1, type: "card", weight: 15, actionIndex: 6, bookIconName: "tj_bg_m_2", monsterName: "柠萌兜兜" },
    { index: 7, num: 1, type: "card", weight: 10, actionIndex: 7, bookIconName: "tj_bg_m_3", monsterName: "泡沫大白" },
    { index: 8, num: 1, type: "card", weight: 8, actionIndex: 8, bookIconName: "tj_bg_m_4", monsterName: "火精灵" },
    { index: 9, num: 120, type: "corn", weight: 350 },
    { index: 10, num: 360, type: "corn", weight: 100 },
    { index: 11, num: 1, type: "diamond", weight: 100 },
    { index: 12, num: 2, type: "diamond", weight: 5 },

    { index: 13, num: 1, type: "card", weight: 200, actionIndex: 9, bookIconName: "tj_bg_m2_1", monsterName: "鲁卡斯" },
    { index: 14, num: 1, type: "card", weight: 200, actionIndex: 10, bookIconName: "tj_bg_m2_3", monsterName: "米果" },
    { index: 15, num: 1, type: "card", weight: 160, actionIndex: 11, bookIconName: "tj_bg_m2_2", monsterName: "花环少女" },
    { index: 16, num: 1, type: "card", weight: 140, actionIndex: 12, bookIconName: "tj_bg_m2_5", monsterName: "彩虹甜心" },
    { index: 17, num: 1, type: "card", weight: 100, actionIndex: 13, bookIconName: "tj_bg_m2_6", monsterName: "蜂小鸣" },
    { index: 18, num: 1, type: "card", weight: 40, actionIndex: 14, bookIconName: "tj_bg_m2_4", monsterName: "小阿呆" },
    { index: 19, num: 1, type: "card", weight: 30, actionIndex: 15, bookIconName: "tj_bg_m2_8", monsterName: "火鸡哥" },
    { index: 20, num: 1, type: "card", weight: 20, actionIndex: 16, bookIconName: "tj_bg_m2_9", monsterName: "咘啾" },
    { index: 21, num: 1, type: "card", weight: 16, actionIndex: 17, bookIconName: "tj_bg_m2_7", monsterName: "萝莉教主" },

];
miCfg.getHandbookLevelGain = function (level, num) {

    if (level >= 10 && num > miCfg.HandbookLevelConfig[level].needNum) {
        return miCfg.HandbookLevelConfig[level].gainCode;
    } else if (level > 0) {
        return miCfg.HandbookLevelConfig[level - 1].gainCode;
    } else {
        return miCfg.HandbookLevelConfig[level].gainCode;
    }

};

miCfg.BoxToDataChoose = function (data) {
    var sumWight = 0;
    for (var i = 0; i < data.length; i++) {
        sumWight += data[i].weight;
    }
    var posindex = parseInt((Math.random() * sumWight));
    return miCfg.BoxToRandomThreeChoose(data, posindex);
};


miCfg.BoxToRandomThreeChoose = function (data, posIndex1) {
    var index = null;
    var checkindex = 0;
    for (var i = 0; i < data.length; i++) {
        checkindex += data[i].weight;
        if (posIndex1 <= checkindex) {
            index = i;
            break;
        }


    }
    return index;
};


miCfg.addHandbook = function (data) {

    for (var i = 0; i < data.length; i++) {
        if (data[i].type == "card") {
            var index = data[i].actionIndex;
            var leve = miDB.localData.handBook[index].level;
            miDB.localData.handBook[index].num += data[i].num;
            if (leve >= 21) {
            } else {
                var NeedNum = miCfg.HandbookLevelConfig[leve].needNum;
                if (miDB.localData.handBook[index].num >= NeedNum) {
                    miDB.localData.handBook[index].num = miDB.localData.handBook[index].num - NeedNum;
                    miDB.localData.handBook[index].level = leve + 1;
                }
            }
        }
        else if (data[i].type == "diamond") {
            miDB.GameData.addDiamCallback(data[i].num);
        }
        else if (data[i].type == "mine") {
            miDB.GameData.addMineCallback(data[i].num);
        }
        else if (data[i].type == "corn") {
            miDB.GameData.addCronCallback(data[i].num);
        }
    }
    miDB.GameData.setLocalDataLock();

};

miCfg.BoxToRandomThree = function (index) {
    var checkData = [];
    var chooseArray = [];
    var sumWight = 0;
    for (var i = 0; i < miCfg.Box.length; i++) {
        if (miCfg.Box[i].index < index && miCfg.Box[i].type == "card") {

            sumWight += miCfg.Box[i].weight;
            checkData.push(miCfg.Box[i]);
        } else if (miCfg.Box[i].type != "card") {
            sumWight += miCfg.Box[i].weight;
            checkData.push(miCfg.Box[i]);
        }

    }




    for (var i = 0; i < 3; i++) {
        var posindex = parseInt((Math.random() * sumWight));
        var chooseIndex = miCfg.BoxToRandomThreeChoose(checkData, posindex);
        // console.log("choose " + chooseIndex);
        var typpe = checkData[chooseIndex].type;
        chooseArray.push(checkData[chooseIndex]);
        sumWight -= checkData[chooseIndex].weight;
        checkData.splice(chooseIndex, 1);
        if (typpe != "card") {

            for (var j = 0; j < checkData.length; j++) {
                if (checkData[j].type == typpe) {
                    sumWight -= checkData[j].weight;
                    checkData.splice(j, 1);
                    j--;

                }

            }

        }

    }

    return chooseArray;

};





