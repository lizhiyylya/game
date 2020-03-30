
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        tywx.NotificationCenter.listen(miDB.EVENT.MONSTER_REFORM_START, this.animStart, this);
    },

    start() {

    },

    update(dt) {

    },

    animStart: function (params) {
        // console.log("-----ReformAnimStart-----");
        let alien = this.node.parent.getChildByName("alien");
        alien.active = true;
        let anim = alien.getComponent(cc.Animation);
        var animState = anim.play();
        // 设置循环模式为 Normal
        animState.wrapMode = cc.WrapMode.Normal;
        animState.repeatCount = 1;
    },

    lightAnimStart: function () {
        // console.log("-----lightAnimStart-----");
        let light = this.node.parent.getChildByName("send");
        light.active = true;
        let anim = light.getComponent(cc.Animation);
        var animState = anim.play();
        animState.wrapMode = cc.WrapMode.Normal;
        animState.repeatCount = 1;
    },

    lightAnimHalf: function () {
        // console.log("-----half of lightAnim-----");
        for (let i = 1; i <= miDB.MasterData.getBuildListLength(); i++) {

            if(i>=10)
            {
                let anim = this.node.parent.getChildByName("MonsterLayout1").getChildByName("monster" + i).getChildByName("anim").getComponent(cc.Animation);
                if (this.node.parent.getChildByName("MonsterLayout1").active ==true)
                {
                    anim.play();
                }

            }else 
            {
                let anim = this.node.parent.getChildByName("MonsterLayout").getChildByName("monster" + i).getChildByName("anim").getComponent(cc.Animation);
                if (this.node.parent.getChildByName("MonsterLayout").active ==true)
                {
                    anim.play();
                }
              
            }
     
        }
    },

    lightAnimFinish: function (params) {
        // console.log("-----ReformAnimFinish-----");
        this.node.parent.getChildByName("alien").active = false;
        this.node.parent.getChildByName("send").active = false;
        tywx.NotificationCenter.trigger(miDB.EVENT.MONSTER_REFORM_FINISH, { action: "show" });
    },

    onDestroy: function () {
        tywx.NotificationCenter.ignore(miDB.EVENT.MONSTER_REFORM_START, this.animStart, this);
    },
});
