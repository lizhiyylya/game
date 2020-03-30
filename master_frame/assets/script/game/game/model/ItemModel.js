cc.Class({
    extends: cc.Component,

    properties: {
        itemFrame : cc.SpriteAtlas,
        iconSprite : cc.Sprite,
    },

    start() {
        // var num = miTools.Utils.RandomNumBoth(1, 4)
        // this.iconSprite.spriteFrame = this.itemFrame.getSpriteFrame("jinbi_"+Math.floor(num))
    },
    

    onLoad : function(){

    },
    onDestroy : function(){

    }
});

