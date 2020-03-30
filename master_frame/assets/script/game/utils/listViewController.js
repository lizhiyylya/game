

cc.Class({
    extends: cc.Component,

    properties: {


        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        itemH: 0,
        disPlayCount: 0,
        spacing: 0,
        disPlayItem: cc.Prefab,
        bufferZone: 0,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isUpdate = false;
        this.content = this.scrollView.content;
        this.undateFunction = null;
        this.InviModel = this.node.getComponent("InviModel");
        this.items = [];
    },

    start() {


        //  this.isUpdate =false;
    },
    initList(data, call) {
        this.isUpdate = false;
        this.undateFunction = call;
        // this.content.removeAllChildren();
        // this.items = [];
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0;
        this.data = data;
        this.totalCount = data.length;
        this.scrollView.scrollToTop(0.1);

        this.content.height = this.totalCount * (this.itemH + this.spacing) + this.spacing;
        let lenlen = (this.totalCount > this.disPlayCount) ? this.disPlayCount : this.totalCount;
        if (this.items.length == 0) {
            for (let i = 0; i < lenlen; i++) {

                var newNode = cc.instantiate(this.disPlayItem);
                this.content.addChild(newNode);
                newNode.setPosition(0, -newNode.height * (0.5 + i) - this.spacing * (i + 1));
                this.undateFunction(newNode, this.data[i]);
                this.items.push(newNode);
                this.InviModel.buttonBind(newNode.getChildByName("btReward").getComponent(cc.Button));
                newNode.itemID = i;
            }
        } else {
            for (let i = 0; i < lenlen; i++) {
                this.items[i].setPosition(0, -this.items[i].height * (0.5 + i) - this.spacing * (i + 1));
                this.undateFunction(this.items[i], this.data[i]);
                this.items[i].itemID = i;
            }

        }

        this.isUpdate = true;

    },
    addListLenth(data) {
        console.log(this.data);
        console.log(data);

        this.isUpdate = false;
        this.data = data;
        this.totalCount = data.length;
        //let lenlen =  this.totalCount>this.disPlayCount? this.disPlayCount:this.totalCount;
        //this.content.height = this.totalCount * (this.itemH + this.spacing) + this.spacing;

        //this.initList(data, this.updateMarketView);
        this.content.height = this.totalCount * (this.itemH + this.spacing) + this.spacing;
        this.isUpdate = true;
    },
    updateRankList(item, data) {
        item.usData = data;


        if (tywx.isInWeChatPath && data.wxImg != "") {
            miTools.Utils.loadSpriteUrl(item.getChildByName("head"), data.wxImg);
        } else {
            miTools.Utils.loadSprite(item.getChildByName("head"), "image/tplist/gameLayer", "tx_wu");
        }

        if (data.spare == 1) {
            // item.getChildByName("btReward").getComponent(cc.Button).enabled = true;
            // miTools.Utils.loadSprite(item.getChildByName("btReward").getChildByName("bt_lq"), "image/tplist/gameLayer", "bt_lq");
            cc.find("btn_wyq", item).active = false;
            cc.find("btn_ylq", item).active = false;
            cc.find("btReward", item).active = true;
        } else if (data.spare == 2) {
            // item.getChildByName("btReward").getComponent(cc.Button).enabled = false;
            // miTools.Utils.loadSprite(item.getChildByName("btReward").getChildByName("bt_lq"), "image/tplist/gameLayer", "bt_ylq");
            cc.find("btn_wyq", item).active = false;
            cc.find("btn_ylq", item).active = true;
            cc.find("btReward", item).active = false;
        } else {
            // item.getChildByName("btReward").getComponent(cc.Button).enabled = false;
            // miTools.Utils.loadSprite(item.getChildByName("btReward").getChildByName("bt_lq"), "image/tplist/gameLayer", "yq_bg_2");
            cc.find("btn_wyq", item).active = true;
            cc.find("btn_ylq", item).active = false;
            cc.find("btReward", item).active = false;

        }
        cc.find("num", item).getComponent(cc.Label).string = (data.index + 1);
        var data = this.InviModel.getDiamChest(data.index + 1);
        cc.find("rewardDiamNum", item).getComponent(cc.Label).string = "X" + data.diamNum;
        cc.find("rewardChestNum", item).getComponent(cc.Label).string = "X" + data.chestNum;



    },


    getPositionInView: function (item) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },
    update: function (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return;
        }

        if (this.isUpdate == false) {
            return;
        }


        // if (this.isUpdate == false)
        // {
        //     console.log (this.isUpdate);
        //     return ;
        // }
        // we don't need to do the math every frame
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemH + this.spacing) * items.length;

        for (let i = 0; i < items.length; ++i) {

            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {

                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = (items[i].y + offset);
                    let itemId = items[i].itemID - items.length;
                    items[i].itemID = itemId;
                    if (this.undateFunction != null) {
                        this.undateFunction(items[i], this.data[itemId]);
                    }


                }
            } else {

                // if away from buffer zone and not reaching bottom of content

                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {

                    items[i].y = (items[i].y - offset);
                    let itemId = items[i].itemID + items.length;
                    items[i].itemID = itemId;
                    if (this.undateFunction != null) {
                        this.undateFunction(items[i], this.data[itemId]);
                    }


                }
            }
        }
        this.lastContentPosY = this.scrollView.content.y;

    },


});
