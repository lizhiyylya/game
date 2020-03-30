miDB.TurnTableData = {
    TAG: "TurnTableData",

    timeId: "",
    turnData: [
        { id: 0, num: 60, type: "corn", kind: 1, weight: 100, },  // kind :1小袋  2 大袋
        { id: 1, num: 60, type: "corn", kind: 2, weight: 100, },
        { id: 2, num: 1, type: "fightBoss", kind: 2, weight: 100, },
        { id: 3, num: 1, type: "chest", kind: 1, weight: 100, },
        { id: 4, num: 60, type: "mine", kind: 1, weight: 100, },
        { id: 5, num: 300, type: "mine", kind: 2, weight: 100, },
        { id: 6, num: 1, type: "diamond", kind: 1, weight: 100, },
        { id: 7, num: 3, type: "diamond", kind: 2, weight: 100, },
        { id: 8, num: 10, type: "upLevel", kind: 1, weight: 100, },
        { id: 9, num: 30, type: "upLevel", kind: 1, weight: 100, },
    ],
    power: 20,
    upDatetime:"",
    cardBag: [                      // 1 未领取 ， 2，获得
        {id:0  ,statue: 1 },   {id:1  ,statue: 1 },   {id:2  ,statue: 1 },    {id:3  ,statue: 1 },   {id:4  ,statue: 1 } 
    ],
    init: function () {
        if (miDB.TurnTableData.timeId == "") {
            miDB.TurnTableData.timeId = setInterval(this.updateTurnTabletime, 3000);
            //miDB.TurnTableData.turnTableData();
        }

        // if (turnData.length ==0)
        // {
           this.getTurnTableData ()
           
        // }

    },
    getTurnTableDataCallBack(data)
    {
        if (data.data.code == 0) {
            miDB.TurnTableData.turnData = data.data.data.turuData;
            miDB.TurnTableData.power = data.data.data.power;
            miDB.TurnTableData.upDatetime = data.data.data.time;
        }

    },

    getTurnTableData() {

        if (tywx.isInWeChatPath) {
            tywx.postMethodCall("monster/getAllTurnType/" + tywx.UserInfo.openid, "", miDB.TurnTableData.getTurnTableDataCallBack, miDB.TurnTableData);
        }
      

        /**
         * 返回
         */
        // 体力
        //转盘数据
        //增加体力时间

           // game 存储 卡包今日领取
    },

    getFriendCard() {

        /**
         * 返回
         */
        //卡包 列表 状态
        // {
        //     id :0
        //     statue:1
        // }
    },
    addFriendPower() {
        
        // id 
        /**
         * 返回   
         */

        //power
        // 卡包数据

    },




    updateTurnTabletime() {
        if (tywx.isInWeChatPath) {

            if (miDB.TurnTableData.upDatetime=="" ||  miDB.localData.systime >miDB.TurnTableData.upDatetime )
            {
                miDB.TurnTableData.getTurnTableData();
            }
 
        }

        var isread =false;
        if (miDB.TurnTableData.power>0)
        {
           isread =true;
        }
       tywx.NotificationCenter.trigger(miDB.EVENT.GAMEUE_READ_POINT, { action: "turnReadPoint", active: isread });

    },


};