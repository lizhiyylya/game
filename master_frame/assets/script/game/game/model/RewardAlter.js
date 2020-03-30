
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 3,
        uiName: "RewardAlter",
    },

    onLoad : function(){

    },

    onDestroy : function(){

    },
    show :function(params){

    },
    refreshUI : function(){
        var data = [];
        if (this.corn != 0) {
            var rand =parseFloat(Math.random() * (6 - 0.1 ) + 0.1, 6);
            this.corn= miTools.Utils.deMul(this.corn, miDB.GameData.DB.productEffic);
            this.corn = miTools.Utils.deMul(  this.corn,rand ).toString();
            data.push({ type: "corn", num: this.corn });
        }
        if (this.mine != 0) {
            data.push({ type: "mine", num: this.mine });
        }
        if (this.diamond != 0) {
            data.push({ type: "diamond", num: this.diamond });
        } if (this.chest != 0) {
            data.push({ type: "chest", num: this.chest });
        }




        for (var i = 0; i < data.length; i++) {
            if (!this.MallItemArray[i]) {
                var node = cc.instantiate(this.MallItem);
                node.parent = this.content;
                this.MallItemArray.push(node);

            }
            // data[i].type = "mine"
            if (data[i].type == "corn") {
                cc.find("name", this.MallItemArray[i]).getComponent(cc.Label).string = "金币";
            }
            else if (data[i].type == "mine") {
                cc.find("name", this.MallItemArray[i]).getComponent(cc.Label).string = "彩矿";
            }
            else if (data[i].type == "diamond") {
                cc.find("name", this.MallItemArray[i]).getComponent(cc.Label).string = "钻石";
            }
            else if (data[i].type == "chest") {
                cc.find("name", this.MallItemArray[i]).getComponent(cc.Label).string = "宝箱";
            }
            cc.find("num", this.MallItemArray[i]).getComponent(cc.Label).string = miTools.Utils.toLabelString(data[i].num);
            this.MallItemArray[i].active = true;
        }
        for (var j = data.length; j < this.MallItemArray.length; j++) {

            this.MallItemArray[j].active = false;
        }

        this.data = data;

        if (this.data.length == 0) {
            this.node.getChildByName("result").active = false;
            miDB.BossData.statue = 0;


        }
        else {
            this.node.getChildByName("result").active = true;
            miDB.GameData.addTaskNum("fight" ,1);
        }
    }



});

