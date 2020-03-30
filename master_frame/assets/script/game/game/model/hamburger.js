
cc.Class({
    extends: cc.Component,

    properties: {
        icon: cc.Node
    },

    onCollisionEnter: function (other, self) {

    },

    onCollisionStay: function (other) {

    },

    onCollisionExit: function (other, self) {
        let anim = this.icon.getComponent(cc.Animation);
        if (!anim.isPlay) {
            anim.isPlay = true;
            anim.play("hamburger");
            var that = this;
            anim.on('finished', function () {
                if (!anim.isFeed) {
                    anim.isFeed = true;
                    tywx.NotificationCenter.trigger(miDB.EVENT.SUPER_FEED_COUNT, { desc: "超级喂养+1" });
                }
                that.node.destroy();
            }, this);
        }
    },

    onLoad() {

    },

    start() {

    },

    update(dt) {

    },

    onDestroy() {

    }
});
