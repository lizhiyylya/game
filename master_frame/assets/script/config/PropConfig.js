
miDB.prop = {}

miDB.autoGetSkill = {   //自动获取技能
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  12: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false,

};
miDB.allBuffTimeSkill = 1;  //  道具的怪物加速生产时间
miDB.allBuffDoubleSkillCron = 1; // 金币收益加速 
miDB.allBuffDoubleSkillMine = 1; // 采矿收益加速 
miDB.allBuffDoubleSkillDiam = 1; // 采矿收益加速 
miDB.mineGainSkill = 0.01;      //每个彩矿系数
miDB.friendsSkill = 1;          //好友助力系数
miDB.prop.interval = 3000;       // 设置道具时间间隔
miDB.prop.bufferProp = 1;  // 设置加速卡 加速状态 

//  设置 加速卡位置
miDB.prop.posProp = [
  cc.v2(-277, 0),
  cc.v2(0, 0),
  cc.v2(277, 0),
];


// 道具 数据模型   type （1：增加 全部建筑的收益时间， 2: 增加金币）

miDB.prop.propConfig = {
  // 收益增倍   所有秒产 时间内 *倍数         道具的收益时间   (gainNum  收获的金币数量)
  "P1001": { type: 1, propIndex: "P1001", name: "加速卡", propSumTime: 10, PropGain: 2, propGainTime: 100, url: 'gameAdorn_cake' },
  "P1002": { type: 2, propIndex: "P1002", name: "金币红包", propSumTime: 10, PropGain: 1, gainNum: 20, url: 'gameAdorn_money' },
  //  "P1003" : { type : 1 , propIndex:"P1003" ,name : "加速卡",  propSumTime : 50 , propGain : 3 },
}



miDB.shopConfig = [
  { index: 0, name: "自动生产", effect: '购买后，花园宝宝自动生产金币', price: "400", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 0, icon: "icon_zdwy" },
  { index: 1, name: "自动生产", effect: '购买后，糖果果自动生产金币', price: "10000", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 1, icon: "icon_zdwy" },
  { index: 2, name: "生产时间-50%", effect: '所有怪物生产时间减少50%', price: "40000", typeIndex: "allBuffTime", addTime: 0.5, maxLevel: 1, group: 2, icon: "icon_jsq" },
  { index: 3, name: "自动生产", effect: '购买后，海绵企鹅自动生产金币', price: "65000", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 2, icon: "icon_zdwy" },
  { index: 4, name: "自动生产", effect: '购买后，美心嘟嘟自动生产金币', price: "500000", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 3, icon: "icon_zdwy" },
  { index: 5, name: "生产时间-50%", effect: '所有怪物生产时间减少50%', price: "44000000", typeIndex: "allBuffTime", addTime: 0.5, maxLevel: 1, group: 2, icon: "icon_jsq" },
  { index: 6, name: "自动生产", effect: '购买后，达浪兔自动生产金币', price: "180000000", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 4, icon: "icon_zdwy" },
  { index: 7, name: "自动生产", effect: '购买后，虾甜妹自动生产金币', price: "27000000000", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 5, icon: "icon_zdwy" },
  { index: 8, name: "所有收益X2", effect: '所有怪兽收益X2', price: "44000000000", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 9, name: "自动生产", effect: '购买后，柠萌兜兜自动生产金币', price: "18000000000000", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 6, icon: "icon_zdwy" },
  { index: 10, name: "生产时间-50%", effect: '所有怪物生产时间减少50%', price: "44000000000000", typeIndex: "allBuffTime", addTime: 0.5, maxLevel: 1, group: 2, icon: "icon_jsq" },
  { index: 11, name: "所有收益X2", effect: '所有怪兽收益X2', price: "44000000000000000", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 12, name: "每个彩矿收益+1%", effect: '每个彩矿收益+1%', price: "44000000000000000000", typeIndex: "GetMine", addNum: 0.01, maxLevel: 1, group: 2, icon: "icon_ys" },
  { index: 13, name: "自动生产", effect: '购买后，泡沫大白自动生产金币', price: "600000000000000000", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 7, icon: "icon_zdwy" },
  { index: 14, name: "每个彩矿收益+1%", effect: '每个彩矿收益+1%', price: "44000000000000000000", typeIndex: "GetMine", addNum: 0.01, maxLevel: 1, group: 2, icon: "icon_ys" },
  { index: 15, name: "所有收益X2", effect: '所有怪兽收益X2', price: "44000000000000000000000", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 16, name: "自动生产", effect: '购买后，火精灵自动生产金币', price: "8000000000000000000000", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 8, icon: "icon_zdwy" },
  { index: 17, name: "所有收益X2", effect: '所有怪兽收益X2', price: "44000000000000000000000", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 18, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "44000000000000000000000000", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 2, icon: "icon_ys" },
  //新版本添加
  { index: 19, name: "自动生产", effect: '购买后，鲁卡斯自动生产金币', price: "1.78e+23", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 9, icon: "icon_zdwy" },
  { index: 20, name: "自动生产", effect: '购买后，米果自动生产金币', price: "1.33e+26", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 10, icon: "icon_zdwy" },
  { index: 21, name: "自动生产", effect: '购买后，花环少女自动生产金币', price: "2.2e+28", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 11, icon: "icon_zdwy" },
  { index: 22, name: "自动生产", effect: '购买后，彩虹甜心自动生产金币', price: "2.5e+32", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 12, icon: "icon_zdwy" },
  { index: 23, name: "自动生产", effect: '购买后，蜂小鸣自动生产金币', price: "9.5e+35", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 13, icon: "icon_zdwy" },
  { index: 24, name: "自动生产", effect: '购买后，小阿呆自动生产金币', price: "3.2e+38", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 14, icon: "icon_zdwy" },
  { index: 25, name: "自动生产", effect: '购买后，火鸡哥自动生产金币', price: "2e+41", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 15, icon: "icon_zdwy" },
  { index: 26, name: "自动生产", effect: '购买后，咘啾自动生产金币', price: "1.5e+44", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 16, icon: "icon_zdwy" },
  { index: 27, name: "自动生产", effect: '购买后，萝莉教主自动生产金币', price: "8.8e+47", typeIndex: "autoGet", maxLevel: 1, group: 1, actionIndex: 17, icon: "icon_zdwy" },
 
  { index: 28, name: "所有收益X2", effect: '所有怪兽收益X2', price: "4.4e+25", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 29, name: "所有收益X3", effect: '所有怪兽收益X2', price: "4.4e+28", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 30, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "4.4e+31", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 2, icon: "icon_ys" },
  { index: 31, name: "所有收益X2", effect: '所有怪兽收益X2', price: "4.4e+34", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 32, name: "所有收益X3", effect: '所有怪兽收益X2', price: "4.4e+37", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 33, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "4.4e+40", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 2, icon: "icon_ys" },
  { index: 34, name: "生产时间-50%", effect: '所有怪物生产时间减少50%', price: "4.4e+43", typeIndex: "allBuffTime", addTime: 0.5, maxLevel: 1, group: 2, icon: "icon_jsq" },
  { index: 35, name: "所有收益X2", effect: '所有怪兽收益X2', price: "4.4e+46", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 36, name: "所有收益X3", effect: '所有怪兽收益X2', price: "4.4e+49", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 37, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "4.4e+52", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 2, icon: "icon_ys" },
  { index: 38, name: "所有收益X2", effect: '所有怪兽收益X2', price: "4.4e+55", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 39, name: "所有收益X3", effect: '所有怪兽收益X2', price: "4.4e+58", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 2, icon: "icon_yyj" },
  { index: 40, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "4.4e+61", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 2, icon: "icon_ys" },
  { index: 41, name: "生产时间-50%", effect: '所有怪物生产时间减少50%', price: "4.4e+64", typeIndex: "allBuffTime", addTime: 0.5, maxLevel: 1, group: 2, icon: "icon_jsq" },
];
miDB.shopMineConfig = [
  { index: 0, name: "所有收益X3", effect: '所有收益X3', price: "10", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 1, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "100", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 1, icon: "icon_ys" },
  { index: 2, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "1000", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 1, icon: "icon_ys" },
  { index: 3, name: "所有收益X3", effect: '所有收益X3', price: "10000", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 4, name: "所有收益X2", effect: '所有收益X2', price: "100000", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 5, name: "所有收益X3", effect: '所有收益X3', price: "1000000", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 6, name: "所有收益X4", effect: '所有收益X4', price: "10000000", typeIndex: "allBuffDouble", addNum: 4, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 7, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "100000000", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 1, icon: "icon_ys" },
  { index: 8, name: "所有收益X2", effect: '所有收益X2', price: "1000000000", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 9, name: "所有收益X3", effect: '所有收益X3', price: "10000000000", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 10, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "100000000000", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 1, icon: "icon_ys" },
  { index: 11, name: "所有收益X3", effect: '所有收益X3', price: "1e+12", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 12, name: "所有收益X2", effect: '所有收益X2', price: "1e+13", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 13, name: "所有收益X3", effect: '所有收益X3', price: "1e+14", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 14, name: "所有收益X4", effect: '所有收益X4', price: "1e+15", typeIndex: "allBuffDouble", addNum: 4, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 15, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "1e+16", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 1, icon: "icon_ys" },
  { index: 16, name: "所有收益X2", effect: '所有收益X2', price: "1e+17", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 17, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "1e+18", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 1, icon: "icon_ys" },
  { index: 18, name: "所有收益X3", effect: '所有收益X3', price: "1e+19", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 19, name: "所有收益X2", effect: '所有收益X2', price: "1e+20", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 20, name: "所有收益X3", effect: '所有收益X3', price: "1e+21", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 21, name: "所有收益X4", effect: '所有收益X4', price: "1e+22", typeIndex: "allBuffDouble", addNum: 4, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 22, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "1e+23", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 1, icon: "icon_ys" },
  { index: 23, name: "所有收益X2", effect: '所有收益X2', price: "1e+24", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 24, name: "所有收益X3", effect: '所有收益X3', price: "1e+25", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 25, name: "所有收益X4", effect: '所有收益X4', price: "1e+26", typeIndex: "allBuffDouble", addNum: 4, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 26, name: "每个彩矿收益+2%", effect: '每个彩矿收益+2%', price: "1e+27", typeIndex: "GetMine", addNum: 0.02, maxLevel: 1, group: 1, icon: "icon_ys" },
  { index: 27, name: "所有收益X2", effect: '所有收益X2', price: "1e+28", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 28, name: "所有收益X3", effect: '所有收益X3', price: "1e+29", typeIndex: "allBuffDouble", addNum: 3, maxLevel: 1, group: 1, icon: "icon_yyj" },
  { index: 29, name: "所有收益X4", effect: '所有收益X4', price: "1e+30", typeIndex: "allBuffDouble", addNum: 4, maxLevel: 1, group: 1, icon: "icon_yyj" },

];

miDB.shopDiamConfig = [
  { index: 0, name: "所有收益X2", effect: '所有收益X2', price: "200", typeIndex: "allBuffDouble", addNum: 2, maxLevel: 50, group: 1, icon: "icon_yyj2" },
  { index: 1, name: "快速收获", effect: '立即获得2小时产量', price: "40", typeIndex: "GetProduct", addTime: 7200, maxLevel: 0, group: 2, icon: "icon_kssh" },
  { index: 2, name: "快速收获", effect: '立即获得4小时产量', price: "60", typeIndex: "GetProduct", addTime: 14400, maxLevel: 0, group: 3, icon: "icon_kssh2" },
  { index: 3, name: "快速收获", effect: '立即获得24小时产量', price: "150", typeIndex: "GetProduct", addTime: 86400, maxLevel: 0, group: 4, icon: "icon_kssh3" },
  { index: 4, name: "快速收获", effect: '立即获得7天产量', price: "400", typeIndex: "GetProduct", addTime: 604800, maxLevel: 0, group: 5, icon: "icon_kssh4" },

];
miDB.toSkillBuff = function () {
  miDB.allBuffTimeSkill = 1;
  var allBuffDoubleSkillDiam = 0;
  miDB.mineGainSkill = 0.01;
  miDB.allBuffDoubleSkillCron = 1; // 金币收益加速 
  miDB.allBuffDoubleSkillMine = 1; // 采矿收益加速 
  miDB.allBuffDoubleSkillDiam = 1  //钻石收益加速


  for (var i = 0; i < miDB.localData.shopCron.length; i++) {
    if (miDB.localData.shopCron[i].payNum > 0) {
      if (miDB.shopConfig[i].typeIndex == "autoGet") {
        var index = miDB.shopConfig[i].actionIndex;
        miDB.autoGetSkill[index] = true;

      } else if (miDB.shopConfig[i].typeIndex == "allBuffTime") {
        miDB.allBuffTimeSkill = miTools.Utils.deMul(miDB.allBuffTimeSkill, miTools.Utils.deMul(miDB.shopConfig[i].addTime, miDB.localData.shopCron[i].payNum)).toString();
      }
      else if (miDB.shopConfig[i].typeIndex == "allBuffDouble") {
        miDB.allBuffDoubleSkillCron = miTools.Utils.deMul(miDB.allBuffDoubleSkillCron, miTools.Utils.deMul(miDB.shopConfig[i].addNum, miDB.localData.shopCron[i].payNum)).toString();
      }
      else if (miDB.shopConfig[i].typeIndex == "GetMine") {
        miDB.mineGainSkill = miTools.Utils.deAdd(miDB.mineGainSkill, miTools.Utils.deMul(miDB.shopConfig[i].addNum, miDB.localData.shopCron[i].payNum)).toString();
      }
    } else if (miDB.shopConfig[i].typeIndex == "autoGet") {
      miDB.autoGetSkill[i] = false;
    }

  }

  for (var i = 0; i < miDB.localData.shopMine.length; i++) {
    if (miDB.localData.shopMine[i].payNum > 0) {


      if (miDB.shopMineConfig[i].typeIndex == "autoGet") {
        var index = miDB.shopMineConfig[i].actionIndex;
        miDB.autoGetSkill[index] = true;

      } else if (miDB.shopMineConfig[i].typeIndex == "allBuffTime") {
        miDB.allBuffTimeSkill = miTools.Utils.deMul(miDB.allBuffTimeSkill, miTools.Utils.deMul(miDB.shopMineConfig[i].addTime, miDB.localData.shopMine[i].payNum)).toString();
      }
      else if (miDB.shopMineConfig[i].typeIndex == "allBuffDouble") {
        miDB.allBuffDoubleSkillMine = miTools.Utils.deMul(miDB.allBuffDoubleSkillMine, miTools.Utils.deMul(miDB.shopMineConfig[i].addNum, miDB.localData.shopMine[i].payNum)).toString();
      }


      else if (miDB.shopMineConfig[i].typeIndex == "GetMine") {
        miDB.mineGainSkill = miTools.Utils.deAdd(miDB.mineGainSkill, miTools.Utils.deMul(miDB.shopMineConfig[i].addNum, miDB.localData.shopMine[i].payNum)).toString();
      }
    }
    else if (miDB.shopMineConfig[i].typeIndex == "autoGet") {

      miDB.autoGetSkill[i] = false;
    }

  }



  for (var i = 0; i < miDB.localData.shopDiam.length; i++) {
    if (miDB.localData.shopDiam[i].payNum > 0) {


      if (miDB.shopDiamConfig[i].typeIndex == "autoGet") {
        var index = miDB.shopDiamConfig[i].actionIndex;
        miDB.autoGetSkill[index] = true;

      } else if (miDB.shopDiamConfig[i].typeIndex == "allBuffTime") {
        miDB.allBuffTimeSkill = miTools.Utils.deMul(miDB.allBuffTimeSkill, miTools.Utils.deMul(miDB.shopDiamConfig[i].addTime, miDB.localData.shopDiam[i].payNum)).toString();
      }
      else if (miDB.shopDiamConfig[i].typeIndex == "allBuffDouble") {
        allBuffDoubleSkillDiam = miTools.Utils.deAdd(allBuffDoubleSkillDiam, miTools.Utils.deMul(miDB.shopDiamConfig[i].addNum, miDB.localData.shopDiam[i].payNum)).toString();
      }

      else if (miDB.shopDiamConfig[i].typeIndex == "GetMine") {
        miDB.mineGainSkill = miTools.Utils.deAdd(miDB.mineGainSkill, miTools.Utils.deMul(miDB.shopDiamConfig[i].addNum, miDB.localData.shopDiam[i].payNum)).toString();
      }
    }
    else if (miDB.shopDiamConfig[i].typeIndex == "autoGet") {

      miDB.autoGetSkill[i] = false;
    }



  }

  if (allBuffDoubleSkillDiam != 0) {
    miDB.allBuffDoubleSkillDiam = allBuffDoubleSkillDiam;

  }


  miDB.GameData.getProductEffic();

  // console.log("生产时间缩减" + miDB.allBuffTimeSkill);
  // console.log("每个采矿收益" + miDB.mineGainSkill);
};















miDB.shopConfigReformAll = {
  0: { index: 0, level: 1, effect: '全部产量*2', price: "50", typeIndex: "all", name: "全部建筑" },
  1: { index: 1, level: 2, effect: '全部产量*2', price: "400", typeIndex: "all", name: "全部建筑" },
  2: { index: 2, level: 3, effect: '全部产量*2', price: "2600", typeIndex: "all", name: "全部建筑" },
  3: { index: 3, level: 4, effect: '全部产量*2', price: "13000", typeIndex: "all", name: "全部建筑" },
  4: { index: 4, level: 5, effect: '全部产量*2', price: "20000", typeIndex: "all", name: "全部建筑" },
  5: { index: 5, level: 6, effect: '全部产量*2', price: "29000", typeIndex: "all", name: "全部建筑" },
  6: { index: 6, level: 7, effect: '全部产量*2', price: "54000", typeIndex: "all", name: "全部建筑" },

};
miDB.shopConfigReformOneBuild = {

  0: { index: 0, level: 1, effect: '三倍', price: "600", typeIndex: "", },
  1: { index: 1, level: 2, effect: '三倍', price: "700", typeIndex: "" },
  2: { index: 2, level: 3, effect: '三倍', price: "700", typeIndex: "" },
  3: { index: 3, level: 4, effect: '三倍', price: "1800", typeIndex: "" },
  4: { index: 4, level: 5, effect: '三倍', price: "2700", typeIndex: "" },
  5: { index: 5, level: 6, effect: '三倍', price: "3900", typeIndex: "" },
  6: { index: 6, level: 7, effect: '三倍', price: "5400", typeIndex: "" },

};

miDB.shopConfigAddBuildLevel = [
  { index: 8, level: 0, effect: '等级+50', price: "400", typeIndex: "addLevel" },
  { index: 8, level: 1, effect: '等级+50', price: "1000", typeIndex: "addLevel" },
  { index: 9, level: 0, effect: '等级+50', price: "500", typeIndex: "addLevel" },
  { index: 9, level: 1, effect: '等级+50', price: "2000", typeIndex: "addLevel" },
  { index: 10, level: 0, effect: '等级+50', price: "800", typeIndex: "addLevel" },
  { index: 10, level: 1, effect: '等级+50', price: "2000", typeIndex: "addLevel" },
  { index: 11, level: 0, effect: '等级+50', price: "1200", typeIndex: "addLevel" },
  { index: 11, level: 1, effect: '等级+50', price: "3000", typeIndex: "addLevel" },
  { index: 12, level: 0, effect: '等级+50', price: "1800", typeIndex: "addLevel" },
  { index: 12, level: 1, effect: '等级+50', price: "5000", typeIndex: "addLevel" },
  { index: 13, level: 0, effect: '等级+50', price: "2600", typeIndex: "addLevel" },
  { index: 13, level: 1, effect: '等级+50', price: "7000", typeIndex: "addLevel" },
  { index: 14, level: 0, effect: '等级+50', price: "3600", typeIndex: "addLevel" },
  { index: 14, level: 1, effect: '等级+50', price: "9000", typeIndex: "addLevel" },
];





