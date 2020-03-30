
cc.Class({
    extends: cc.Component,

    properties: {

        uiType : 0,
        uiName : "StartGame",
        isDebug : false
    },

    onLoad: function () {
       
       var  Decimal =require("decimal.min");
       miTools.Utils.init(Decimal);
        cc.game.setFrameRate(60);
        //tywx.AudioHelper.init();
        //cc.director.setDisplayStats(true);
        //初始化总体游戏物数据缓存
        // miDB.GameData.cleanGameData();
        // miDB.GameData.init();
        //初始化建筑物数据缓存
       // miDB.BuildingData.cleanGameData();
        // miDB.MasterData.init();

 

        // tywx.GameShare.init()
        mi.UIManager.setCurrentCanvas(this.node);
     //   mi.isDebug = this.isDebug;


        //
       // miTime.Schedule.startUpdate();
        // miGM.BM.init()
  
        // var x = '11324345347345634534734563432434534734563432112321'
        // var y = '100000000000000000000000'
        // var z = miTools.Utils.deAdd(x,y)
        // var m = miTools.Utils.deMul(x,y)
        // var n = miTools.Utils.deDividedBy(x,y)
        // var i = miTools.Utils.deDividedBy(n,y)
        // var f = miTools.Utils.deCeil(i) //平方
        // var q = miTools.Utils.deSquare(i)
        // miTools.Utils.deLog(z)
        // miTools.Utils.deLog(m)
        // miTools.Utils.deLog(i)
        // miTools.Utils.deLog(f)
        // miTools.Utils.deLog(q)
        //miTools.Utils.deLog(q)

     


    },

    start : function () {
    
        //miTools.Utils.setExpPos(3);
  /*
        var self =this;

        wx.getSetting({
            success: function (res) {
              var authSetting = res.authSetting;
              if (authSetting['scope.userInfo'] === true) {
                  console.log ("用户已授权");
                  self.getUserInfo();
                // 用户已授权，可以直接调用相关 API
              } else if (authSetting['scope.userInfo'] === false){
                // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                console.log ("用户已拒绝授权");
              } else {
                // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                wx.login({
                    success: function () {
                    //   wx.getUserInfo({
                    //     fail: function (res) {
                    //       // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                    //       if (res.errMsg.indexOf('auth deny') > -1 || 	res.errMsg.indexOf('auth denied') > -1 ) {
                    //         // 处理用户拒绝授权的情况
                    //       }
                    //     }
                    //   });
                    self.getUserInfo();
                    }
                  });

              }
            }
          });
  */
//  tywx.NotificationCenter.listen( tywx.EventType.WEIXIN_LOGIN_SUCCESS,this.wxloginCallBack,this);
//         tywx.TuyooSDK.login();

        // mi.UIManager.showUI("LoginLayer");
        mi.UIManager.showUI("UpdateLayer");
    },
    wxloginCallBack( data)
    {

        console.log (data);
    },
    getUserInfo : function()
    {
        wx.getUserInfo({
            success: function(res) {
                cc.userInfo = res.userInfo;
                // var nickName = cc.userInfo .nickName;
                // var avatarUrl = cc.userInfo .avatarUrl;
                // var gender = cc.userInfo .gender; //性别 0：未知、1：男、2：女
                // var province = cc.userInfo .province;
                // var city = cc.userInfo .city;
                // var country = cc.userInfo .country;
                console.log (cc.userInfo );
            }
        });

    },

    



    update: function (dt) {
        //console.log("start");
        // miDB.BuildingData.update(dt);
    },

    onDestroy : function(){
        miTime.Schedule.stopUpdate();
    }
});
