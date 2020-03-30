miDB.ShitData = {
    TAG: "ShitData",

    timeId: "",
    bossTime: "null",
    init: function () {


        if (miDB.localData.game.shitNum < 50) {
            if (miDB.ShitData.timeId == "") {
                miDB.ShitData.timeId = setInterval(this.updateBoxtime, 30000);
          
               this.shitCommit();
            }
        
        }

    },

    updateBoxtime() {
        if (miDB.localData.game.shitNum >= 50) {
            clearInterval(miDB.ShitData.timeId);
            return;
        }
        if (miDB.localData.game.finshGuid == true && miDB.MasterData.getBuildListLength() > 0 && miDB.localData.game.shitNum < 50 && miDB.localData.shitList.length < 2) {

            tywx.NotificationCenter.trigger(miDB.EVENT.SHIT_DATA_SHOWUI, { action: "new" });
        }


    },

    shitCommit() {
        // tywx.NotificationCenter.trigger(miDB.EVENT.SHIT_DATA_SHOWUI, {action:"show"}); 
        mi.UIManager.showUI("ShitSystemModel", { ceng: 39 });
    },
};