
var humanAction = {index:0,}; 



cc.Class({
    extends: cc.Component,

    properties: {

        uiType : 2,
        uiName : "guideMoudel",
        guinceNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.guidanceMask = this.node.getChildByName("guidanceMask");
      tywx.NotificationCenter.listen(miDB.EVENT.WECHAT_GAME_GUIDE,this.updateGuinceNodePos,this); 
      this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBg, this);
      this.node.active=false;

      this. testNode = new cc.Node();

     this. testNode.setPosition(900,900);
     this.node.addChild( this. testNode);
     },

   
    updateGuinceNodePos (data)
    {
      
        this.guinceNode =data.node;
 
        if ( data.action== "show"&& this.guinceNode)
        {
            miDB.GuidData.isTouch= false;
            this.guidanceMask .width= this.guinceNode.width;
           this.guidanceMask .height= this.guinceNode.height;
           this.guidanceMask.scale =this.guinceNode.scale;
           this.guidanceMask.setAnchorPoint(this.guinceNode.getAnchorPoint());
           this.guidanceMask.setPosition (this.node.convertToNodeSpaceAR( this.guinceNode.convertToWorldSpaceAR(cc.v2(0,0))));
           this.node.active =true;
           
         
        }
        else if ( data.action== "hide")
        {
            this.guinceNode =this.testNode;
            miDB.GuidData.isTouch= false;
            this.guidanceMask .width= 0;
           this.guidanceMask .height= 0;
           this.guidanceMask.scale =this.guinceNode.scale;
           this.guidanceMask.setAnchorPoint(this.guinceNode.getAnchorPoint());
           this.guidanceMask.setPosition (this.node.convertToNodeSpaceAR( this.guinceNode.convertToWorldSpaceAR(cc.v2(0,0))));
           this.node.active =true; 

        }
        else 
        {
            this.node.active =false;
        }



    },
    onTouchBg(event) {

       
     

        let point = event.getLocation();
        let retWord = this.guinceNode.getBoundingBoxToWorld();
        //let space = 40;
        //retWord.width -= space;
        retWord.width = retWord.width <= 0 ? 0 : retWord.width;
        //retWord.height -= space;
        retWord.height = retWord.height <= 0 ? 0 : retWord.height;
 
        if (retWord.contains(point) &&  miDB.GuidData.isTouch== true) {
            this.node._touchListener.setSwallowTouches(false);

        } else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    // update (dt) {},
});
