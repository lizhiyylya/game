
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        var action1 = cc.fadeOut(0.5);
        var finish = cc.callFunc(function(){
            this.destroy();
        }, this.node); 

         var seq1 =[action1,finish];
        var seq =  cc.sequence (seq1).clone() ;
        this.node.runAction(seq);
    },

    // update (dt) {},
});
