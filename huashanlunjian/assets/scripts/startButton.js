// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "startButton";//这个是代码文件名
        clickEventHandler.handler = "changeBackGround";  //回调函数 
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },
    changeBackGround : function(event , data)
    {
        var rootNode = cc.find("Canvas").getChildByName("rootNode");
        var bcNode = rootNode.getChildByName("background");
        bcNode.active = false;
        event.target.active = false;
        cc.loader.loadRes('model/bcBattle', function (err, bcBattle) {
            var preFabNode = cc.instantiate(bcBattle);
            rootNode.addChild(preFabNode);
        });

    },
    start () {

    }

    // update (dt) {},
});
