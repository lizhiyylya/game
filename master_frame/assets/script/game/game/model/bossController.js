

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.finghtModel = this.node.parent.parent.getComponent("FinghtModel");



        this.isRunAction = false;
        this.isGetCron = false
        // this.
        var self = this;
        // var actionArray = [

        //     cc.scaleTo(0.01, 0.2, 0.2),
        //     cc.scaleTo(0.01, 0.5, 0.5),
        //     cc.spawn(
        //         cc.scaleTo(0.2, 1, 1),
        //         cc.moveBy(0.2, 0, 50),


        //     ),

        //     cc.spawn(
        //         cc.scaleTo(0.1, 1.4, 1),
        //         cc.moveBy(0.1, 0, -25)
        //     ),
        //     cc.spawn(
        //         cc.scaleTo(0.05, 1, 1),
        //         cc.moveBy(0.05, 0, -25)
        //     ),


        //     cc.callFunc(function () {
        //         self.isRunAction = false;

        //     })
        // ];

        var actionArray = [

            cc.scaleTo(0.01, 0.4, 0.4),
            //cc.scaleTo(0.01, 0.5, 0.5),
            cc.spawn(
                cc.scaleTo(0.3, 1, 1),
                cc.moveBy(0.3, 0, 12)
            ),
            cc.spawn(
                cc.scaleTo(0.2, 1.2, 1),
                cc.moveBy(0.2, 0, -6)
            ),
            cc.spawn(
                cc.scaleTo(0.05, 1, 1),
                cc.moveBy(0.05, 0, -6)
            ),
            cc.delayTime(1),

            cc.callFunc(function () {
                self.isRunAction = false;

            })
        ];

        this.jumpAction = cc.sequence(actionArray).speed(2);;

    },

    start() {

        // 

        // var self =this; 

        // this.bossshape = cc.find("bossshape", this.node);

        // this.bossshape.on('touchstart', function () {

        //     self.isUpState = true;
        // }, this);

        // this.bossshape.on('touchmove', function () {

        //     if ( self.isUpState ==true)
        //     {
        //         self.isUpState =false;
        //         self.playAction();
        //     }
        // }, this);
        // this.bossshape.on('touchend', function () {
        //     console.log("touchend");
        //     self.isUpState = false;
        // }, this);
        // this.bossshape.on('touchcancel', function () {
        //     self.isUpState = false;
        // }, this);




    },

    onCollisionEnter: function (other, self) {

        this.isUpState = true;

        if (this.isUpState == true) {
            this.isUpState = false;
            this.playAction();
        }

    },

    onCollisionStay: function (other) {



    },
    onCollisionExit: function (other, self) {
        this.isUpState = false;
    },

    playAction() {

        if (this.isRunAction == false) {
            this.isRunAction = true;
            this.node.runAction(this.jumpAction);
        }
        if (this.isGetCron == false) {
            this.isGetCron = true;
            this.finghtModel.killBoss();
            this.finghtModel.setBossColor(cc.color(255, 0, 0, 255));
            setTimeout(function () {
                this.finghtModel.setBossColor(cc.color(255, 255, 255, 255));
            }.bind(this), 100);

            setTimeout(function () {
                this.isGetCron = false;
            }.bind(this), 200);
        }
    },


    onCollisionExit: function (other, self) {
    },

    toKill() {
        killBOss()

    },

    // update (dt) {},
});
