// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        backGround: {
            default: null,
            type: cc.Prefab
        },
        startButton: {
            default: null,
            type: cc.Prefab
        },
        bcBattle: {
            default: null,
            type: cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad: function () {
        this.spawnNewStar();
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var backGround = cc.instantiate(this.backGround);
        // 将新增的节点添加到 Canvas 节点下面
        //this.node.addChild(backGround);
        var startButton = cc.instantiate(this.startButton);
        // 将新增的节点添加到 Canvas 节点下面
        //this.node.addChild(startButton);
    },

    start () {

    },

    // update (dt) {},
});
