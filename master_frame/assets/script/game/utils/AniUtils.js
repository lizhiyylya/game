
miTools.Ani = {
    TAG: "Ani",

    /**
     * 播放按钮跳动
     * @param {动画node} node 
     */
    btnJumpAni : function(node){
        node.runAction(cc.sequence(
            cc.delayTime(0.6),
            cc.spawn(
                cc.moveBy(0.2, 0, 20),
                cc.scaleTo(0.2, 1, 1.05)
            ),
            cc.spawn(
                cc.moveBy(0.15, 0, -20),
                cc.scaleTo(0.15, 1.05, 1)
            ),
            cc.scaleTo(0.05, 1, 1),
            cc.delayTime(0.1),
            cc.spawn(
                cc.moveBy(0.2, 0, 30),
                cc.scaleTo(0.2, 1, 1.1)
            ),
            cc.spawn(
                cc.moveBy(0.15, 0, -30),
                cc.scaleTo(0.15, 1.1, 1)
            ),
            cc.scaleTo(0.05, 1, 1),
            cc.delayTime(0.1),
            cc.spawn(
                cc.moveBy(0.2, 0, 40),
                cc.scaleTo(0.2, 1, 1.15)
            ),
            cc.spawn(
                cc.moveBy(0.15, 0, -40),
                cc.scaleTo(0.15, 1.15, 1)
            ),
            cc.scaleTo(0.05, 1, 1)
        ).repeatForever());
    }
};

