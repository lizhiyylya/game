

cc.Class({
    extends: cc.Component,

    properties: {
    
        uiType : 2,
        uiName : "OutPutModel",
        outPutItem : cc.Prefab,
    },


     onLoad : function() {

        tywx.NotificationCenter.listen(miDB.EVENT.REFRESH_BUILDINGS_OUTPUT,this.updateBuildArritude,this);  
        let parentNode =this.node.getChildByName("nodeBg").getChildByName("list");

        this.modelItemList =[];

        for(var i=0; i<3; i++)
        {
            var node = cc.instantiate(this.outPutItem);
            node.parent =parentNode;
            node.usData =i;
            this.buttonBind(node.getComponent(cc.Button) );
            this.modelItemList.push (node);
            cc.find("sp_upup",node).runAction(
                cc.sequence(
                    cc.moveBy(0.4, 0, 10),
                    cc.moveBy(0.4, 0, -10)
                ).repeatForever());
            node.active= false;
        }
        
     },
     

    start :　function() {

      
       
        

        var screenW= cc.find("Canvas").width;
        if(screenW<720)
        {
            this.node.getChildByName("nodeBg").scale =screenW/720;
           
        }


        
    },
    
    hideItem :function ()
    {
        for (var i =0 ;i<  this.modelItemList.length ;i++ )
        {
            this.modelItemList[i].active =false;

        }

    },
    updateModelItem : function ( data,index)
    {
        if (this.modelItemList [index])
        {
            this.modelItemList [index].active =true;
            var info = data.getCfgInfo();
            this.modelItemList [index].info =info;
            this.updateLabel ( this.modelItemList [index].getChildByName("itemLevel"),"LV"+data.level);
            this.updateLabel ( this.modelItemList [index].getChildByName("itemName"),info.name);
            var monentProduct = miCfg.Building.getOutputGold ( info.seatPos, data.level);
            var upGold = miCfg.Building.getUpGradeGold ( info.seatPos, data.level);
           var dat= miTools.Utils.deMul (miTools.Utils.deMul(monentProduct,data.getBuff()), miDB.prop.bufferProp).toString() ;
            this.updateLabel ( this.modelItemList [index].getChildByName("itemOutput"),"产出:"+miTools.Utils.toLabelString(  dat  )+"/秒");
            this.updateLabel ( this.modelItemList [index].getChildByName("itemUpGrade"),"升级:"+ miTools.Utils.toLabelString( upGold));
            var buildUI = miCfg.Building.UIconfig [data.buildingIdx];
            miTools.Utils.loadSprite ( cc.find("itemSp",this.modelItemList [index]) , miCfg.Building.UIconfigPath.buildIconPath ,buildUI.iconName);

            var isPrice= miTools.Utils.comparedTo (miDB.GameData.DB.corn , upGold);
            if( isPrice<0 ){

                cc.find("sp_upup",this.modelItemList [index]).active=false ;
            }
            else 
            {
                cc.find("sp_upup",this.modelItemList [index]).active=true ;
            }



        }

    },
    updateLabel(target ,data)
    {
        target.getComponent(cc.Label).string =data ;

    },


    updateBuildArritude ( data)
    {

        this .hideItem ();
        var page =data.page;
        for (var i=0; i< data.currentPage.length ;i++)
        {
            var  info =data.currentPage[i].getCfgInfo();
            var seatPos= info.seatPos-(page-1)*3;
            this.updateModelItem(data.currentPage[i],seatPos);
    
        }

        if ( miDB.BuildingData.page==1   )
        {
            if (miDB.BuildingData.getBuildListLength()>=3 )
            {
                miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"arrowSouth");                
                miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR/cityName", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"nancheng");
                  
                if (miDB.BuildingData.getBuildListLength()>=6)
                {
                    miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeL", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"arrowEast");  
                 
                    miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeL/cityName", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"dongcheng");
                    cc.find( "gameUI_zhu/bt_TestChangeL", this.node.parent).active=true;
                }else 
                {
                    cc.find( "gameUI_zhu/bt_TestChangeL", this.node.parent).active=false;
                }
         
            }else
            {
                
                    cc.find( "gameUI_zhu/bt_TestChangeL", this.node.parent).active=false;  //  左边隐藏 
                miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"undevelop");   //右边未开发
                miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR/cityName", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,null);
            }
         }else  if ( miDB.BuildingData.page==2 )
         {
            cc.find( "gameUI_zhu/bt_TestChangeL", this.node.parent).active =true;
            miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeL", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"arrowNorth1");  
            miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeL/cityName", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"beicheng");

            cc.find( "gameUI_zhu/bt_TestChangeR", this.node.parent).active=true;
            if (miDB.BuildingData.getBuildListLength()>=6)
                {
                    miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"arrowEast1");  
                    miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR/cityName", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"dongcheng");
                    cc.find( "gameUI_zhu/bt_TestChangeR", this.node.parent).active=true;
                }else 
                {
                    miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"undevelop");   //右边未开发
                    miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR/cityName", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,null);
                }
         


         }
         else  if ( miDB.BuildingData.page==3 )
         {
            cc.find( "gameUI_zhu/bt_TestChangeR", this.node.parent).active=true;
            miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"arrowNorth");  
            miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeR/cityName", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"beicheng");
            cc.find( "gameUI_zhu/bt_TestChangeL", this.node.parent).active =true;

            miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeL", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"arrowSouth1");  
            miTools.Utils.loadSprite (cc.find( "gameUI_zhu/bt_TestChangeL/cityName", this.node.parent), miCfg.Building.UIconfigPath.buildIconPath ,"nancheng");

         }



    },



    show : function(data)
    {
   

    },
    itemSpBtnCallback : function(event , data)
    {
        var node = event.target;
       var  seatPos =node.info.seatPos;
        mi.BM.updateBuilding(node.info.idx,{},1);
        // tywx.NotificationCenter.trigger(miDB.EVENT.UPDATE_BUILDING_ACTION,  {index:seatPos});
        
    // cc.find("Canvas/BuildingsModel").getComponent("BuildingsManager").BuildShapeList[seatPos].getComponent("buildingUiMoudel").buildAction();
        if (node.getChildByName("FadeAction") ==null)
        {
            miTools.Utils.loadPrefab("model/uiModel/FadeAction", function (model) {
        
            if (node.getChildByName("FadeAction") ==null)
            {    var mode11 =cc.instantiate(model);
                node.addChild(mode11);
            }
            // var mode12 =cc.instantiate(model);
            //cc.find("Canvas/BuildingsModel").getComponent("BuildingsModel").seatIdxArray[seatPos].addChild(mode12);
            });
        }
    


    },
    buttonBind : function( button)
    {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler . target = this.node
        clickEventHandler.component = "OutPutModel";
        if ( button.node.name == "OutPutItem" ){
           
            clickEventHandler.handler = "itemSpBtnCallback";
        }
      
        button.clickEvents.push(clickEventHandler);
    },
    hide : function(data)
    {
        console.log ("hide");
        console.log (data);
        let parentNode =this.node.getChildByName("list");
        parentNode.removeAllChildren();
    },

    
    upBuildBtnCallback : function()
    {
        console.log ("升级建筑");

    },
    reformBuildCallback : function()
    {
        console.log ("改造建筑");
        if ( miDB.GuidData .isFourPage==true)
        {
            miDB.GuidData .isFourPage=false;
            miDB.GuidData .isFivePage=true;
            if ( miDB.localData.game.reformNum==0)
            {
            tywx.NotificationCenter.trigger(miDB.EVENT.WECHAT_GAME_GUIDE, {action:"show" ,node:cc.find("Canvas/GameUE/OutPutModel/nodeBg/bt_shop") });
            tywx.NotificationCenter.trigger(miDB.EVENT.WECHAT_GAME_GUIDE_HER0,{action:"show", index:6 }); 
            }
            return;
        }

        miDB.BuildingData.reForm();
    },

   close : function()
    {
       mi.UIManager.hideUI("OutPutModel",{ceng : 50});
    },

    shopLayer()
    {
        if ( miDB.GuidData .isFivePage== true)
        {
            miDB.GuidData .isFivePage=false;
            tywx.NotificationCenter.trigger(miDB.EVENT.WECHAT_GAME_GUIDE, {action:"remove" ,node:null });
           tywx.NotificationCenter.trigger(miDB.EVENT.WECHAT_GAME_GUIDE_HER0,{action:"show", index:7 }); 
      

            return;
        }


        console.log (miDB.localData.game.reformNum);
        if (miDB.localData.game.reformNum<1)
        {
            tywx.NotificationCenter.trigger(miDB.EVENT.SHOW_COMMENT_TIPS,{title : "提示",content : "改造后可开启商城功能。"});
            return;
        }
        console.log ("shopLayer");
        mi.UIManager.showUI("MallModel",{ceng : 51});
    },





    // update (dt) {},
});
