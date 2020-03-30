

cc.Class({
    extends: cc.Component,

    properties: {


        uiType : 2,
        uiName : "PropModel",
        propModelItem:cc.Prefab,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function() {

        this.propList = [];
        this.posList=[];
        tywx.NotificationCenter.listen(miDB.EVENT.UPDATE_PROP_DATA ,this.upDataPropData,this);
        this.posList = miDB.prop. posProp .slice(0);

    },

    start :function () {

    },
    add : function( data )
    {
        var node = cc. instantiate (this.propModelItem);




       var posIndex =  parseInt( (Math.random()* this.posList.length));
        var  pos =this.posList[posIndex ];
        node.x  =pos.x;
        node.pos = pos;
        node.y = this.node.height/2;
        this.posList.splice(posIndex,1);
        this.node.addChild(node);
        node.getChildByName ("nameLabel").getComponent(cc.Label).string =data.getcfg().name;
        miTools.Utils.loadSprite ( node, miCfg.Building.UIconfigPath.gameAdorn ,data.getcfg().url);
        node.propIdx = data.propIdx;
        this.buttonBind(node.getComponent(cc.Button) );
        this.propList .push (node);
        this.mvAction (node);
        if (data.statue ==1)
        {
            node.active=false;
        }

    },

    mvAction (node)
    {

        node.runAction (cc.moveTo (1, node. pos.x ,  node.pos.y ));

    },
    PropModelItemBtnCallback(event , data)
    {
        var node = event.target;
        tywx.NotificationCenter.trigger( miDB.EVENT.REMOVE_HAND_PROP_DATA,node.propIdx );
    },

    
    buttonBind : function( button)
    {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler . target = this.node
        clickEventHandler.component = "PropModel";
        if ( button.node.name == "PropModelItem" ){
           
            clickEventHandler.handler = "PropModelItemBtnCallback";
        }
        button.clickEvents.push(clickEventHandler);
    },

    removeHandPropData : function ( data) 
    {
        for (var i = 0 ; i <data.DBlist.length ; i++ )
        {
         
            for (var j =0 ; j< this.propList .length ;j++ )
            {
                if (  data.DBlist[i].statue==1 && this.propList [j].propIdx  == data.DBlist[i].propIdx )
                {
                    this.propList [j].active =false;
                    break;
                }
            }     

        }

    },

    remove : function (data)
    {

        for (var j =0 ; j< this.propList .length ;j++ )
        {
            var isfind =false;
            for (var i = 0 ; i <data.DBlist.length ; i++ )
            {
                if ( this.propList [j].propIdx  == data.DBlist[i].propIdx )
                {
                    isfind =true ;
                    break;
                }

            }
            if (!isfind)
            {

                this.posList.push (this.propList[j].pos );
                this.propList[j].destroy();
                this.propList[j] = undefined;
                this.propList.splice(j,1);
                j--;
      
            }
        }


    },




    upDataPropData : function(data)
    {
     

        if (data.action =="add" )   // 添加
        {
            for (var i = 0 ; i <data.DBlist.length ; i++ )
            {
                var indexIsFind =-1;
                for (var j =0 ; j< this.propList .length ;j++ )
                {
                    if (this.propList [j].propIdx  == data.DBlist[i].propIdx   )
                    {
                        indexIsFind =j;
                        break;
                    }
                }
                if (indexIsFind == -1)
                {
                
                    console.log ("增加道具");
                    this.add ( data.DBlist[i]);
                
                }

            }
        } 
        else if (data.action =="removeHandPropData" )  // 领取
        {

            this.removeHandPropData (data);
        
        }

        else if (data.action =="remove" )  // 删除
        {

            this.remove(data);
        
        }

        
      
    


    },

  
    // update (dt) {},
});
