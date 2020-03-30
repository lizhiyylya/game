miDB.BossData = {
    TAG: "BossData",
    statue: 0,
    timeId: "",
    bossTime: "null",
    init: function () {

        // if (miDB.BossData.statue == 1) {
        //     var ttime = new Date(miDB.localData.systime * 1000);
        //     ttime.setSeconds(ttime.getSeconds() + 250);
        //     miDB.BossData.bossTime = Date.parse(ttime) / 1000;
        // }


        // if (miDB.localData.game.finghtBossNum < 15) {
        //     if (miDB.BossData.timeId == "") {
        //         miDB.BossData.timeId = setInterval(this.updateBoxtime, 1000);
        //     }
        // }

    },

    updateBoxtime() {

        if (miDB.localData.game.finghtBossNum >= 15) {
            clearInterval(miDB.BossData.timeId);
            return;
        }

        if (miDB.localData.game.canFinghtBoss == true || (miDB.MasterData.getBuildListLength() > 4 && miDB.localData.game.reformNum == 0) || miDB.localData.game.reformNum > 0) {
            if (miDB.BossData.statue == 0) {
                var ttime = new Date(miDB.localData.systime * 1000);
                //  ttime.setSeconds(ttime.getSeconds()+parseInt(Math.random()*(300-120)+120,300) );
                ttime.setSeconds(ttime.getSeconds() + 250);
                //   ttime.setSeconds(ttime.getSeconds()+30 );
                miDB.BossData.bossTime = Date.parse(ttime) / 1000;
                miDB.BossData.statue = 1;

            } else if (miDB.BossData.statue == 1 && miDB.localData.systime > miDB.BossData.bossTime) {
                miDB.BossData.statue = 2;
                miDB.localData.game.finghtBossNum += 1;
                miDB.localData.game.finghtBossTime = miDB.localData.systime;
                tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_BOSS_TIME, {});
            }


        }




    },

};