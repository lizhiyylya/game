
cc.Class({
    extends: cc.Component,

    properties: {

        uiType: 2,
        uiName: "WeatherModel",
     
    },

    onLoad: function () {

        tywx.NotificationCenter.listen(miDB.EVENT.LAYOUT_GAME_WEATHER,this.wigthLayout,this); 

    },

    start: function () {
    },

    update: function (dt) {

    },
    wigthLayout()
    {
   
        if (miDB.SceneData.index==0)
        {
            this.node.getChildByName ("sceneBg0").active =true;
            this.node.getChildByName ("sceneBg1").active =false;   
        }else if (miDB.SceneData.index==1)
        {
            this.node.getChildByName ("sceneBg0").active =false;
            this.node.getChildByName ("sceneBg1").active =true; 
        }


    },

    cloudFlow: function () {
        // this.cloud.y = 500;
        let moveTo1 = cc.moveTo(18, -500, 500);
        let moveTo2 = cc.moveTo(30, 500, 500);
        this.cloud.runAction(cc.sequence(
            moveTo1,
            moveTo2,
        ).repeatForever());
    },
});
