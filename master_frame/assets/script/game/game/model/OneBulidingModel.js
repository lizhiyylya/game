
cc.Class({
    extends: cc.Component,

    properties: {
        index : -1,
        menuModel : cc.Node,
        
    },
    
    onLoad: function () {
        var that = this;
        // this.index = -1
        // this.menuModel = undefined

       
        if(mi.isDebug){
            var uiName = "BuildMenuModel";
            miTools.Utils.loadPrefab("model/gameModel/shapeModel/"+uiName,function(model){
                if(model != undefined){
                    // model.getComponent("BulidMenuModel").setOwner(that.node)
                    //设置层级
                    model.scale=0.5;
                    model.zIndex=10;
                    that.node.addChild(model);
                    model.active = true;
                    that.menuModel = model;
                }else{
                    tywx.LOGD("加载错误 model = ",uiName)
                }
            })
        }


    },
    setIndx : function(idx){
        this.index = idx
    },

    start : function () {
    },

    update: function (dt) {
    },

    reFreshUI : function(buildData){
        // tywx.LOGD("reFreshUI = ",this.menuModel)
        if(this.menuModel != undefined){
            this.menuModel.getComponent("BulidMenuModel").reFreshUI(buildData)
        }
        //cc.find("namelabel",this.node).getComponent(cc.Label).string = buildData.getCfgInfo().name;

        var self =this;
        if (typeof (this.BuildSp) == 'undefined'|| this.BuildSp == null )
        {
            cc.loader.loadRes("model/gameModel/sceneModel/buildingUiMoudel", function (err, prefab) {
                self.BuildSp = cc.instantiate(prefab);
                self.BuildSp.x=0;
                self.BuildSp.y=0;
                self.node.addChild(self.BuildSp );
                var buildUI = miCfg.Building.UIconfig [buildData.buildingIdx];
                miTools.Utils.loadSprite ( self.BuildSp, miCfg.Building.UIconfigPath.buildAltasPath ,buildUI.name);

                if(mi.isDebug){
                miTools.Utils.loadSprite ( self.BuildSp.getChildByName("gameAdorn_itemBg").getChildByName("gameAdorn_item"), miCfg.Building.UIconfigPath.gameAdorn ,buildUI.featIcon);
                }else 
                {
                    self.BuildSp.getChildByName("gameAdorn_itemBg").active =false;
                }
            
           
            })


           

        }else 
        {
           cc.find("store",this.BuildSp).getComponent(cc.Label).string ="库存:"+miTools.Utils.toLabelString(  buildData.storageCorn);
           cc.find("level",this.BuildSp).getComponent(cc.Label).string ="等级:"+ buildData.level;
           cc.find("name",this.BuildSp).getComponent(cc.Label).string = buildData.getCfgInfo().name;
           
        }


    },

    removeBuildBtnCallback :function(){
        // tywx.LOGD("removeBuildBtnCallback =   =  "+ this.index)
        mi.BM.removeBuilding(this.index)
    },
    updateBuildingBtnCallback : function(data,addLevel){
        // tywx.LOGD("updateBuildingBtnCallback =   =  "+ idx)
        console.log (data);
        mi.BM.updateBuilding(this.index,data,addLevel)
    },

    gainCornByBuildingIdx : function(){
        mi.BM.gainCornByBuildingIdx(this.index)
    },
    updateSprite(target ,data)
    {
        console.log ("updateSprite");

    }
    
});
