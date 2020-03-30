miCfg.GuideCfg = [


    //etype 1 旁白+点击引导   2 旁白 + 滑动特效 3 功能开启引导
    {
        guideId: "1", event: "UPDATE_LEFTRIGHT_TIME", showNodePos: cc.v2(-362, -57), EventData: { action: "allHide" }, nodeName: "node1", guideName: "解锁第一个怪兽", richContent: "<color=#6076a5>欢迎来到火星动物园，好多萌萌哒怪兽等你喂养！</color>\n<color=#ff560c>点击解锁第一个怪兽</color>", isForce: true, etype: 1, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 0
        }
        ]
    },

    {
        guideId: "2", event: "UPDATE_LEFTRIGHT_TIME", showNodePos: cc.v2(-362, -57), EventData: { action: "allHide" }, nodeName: "node5", nodeNameArray: ["node2", "node3"], guideName: "收集金币", richContent: "<color=#6076a5>怪兽会为你持续生产金币。</color>\n<color=#ff560c>收集10金币</color><color=#6076a5>作为启动资金</color>", isForce: true, etype: 2, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 1
        },
        {
            action: "oneManster",
            mansterId: "0",
            judge: "=",
            level: 1
        },
        {
            action: "coinCount",
            judge: "<",
            count: 10
        }
        ]
    },
    {
        guideId: "3", event: "UPDATE_LEFTRIGHT_TIME", showNodePos: cc.v2(-362, -57), EventData: { action: "allHideFeed" }, nodeName: "node4", guideName: "喂养怪兽", richContent: "<color=#6076a5>喂养怪兽提高怪兽等级，怪兽等级越高金币收益越多。</color>\n<color=#ff560c>点击喂食进行升级</color>", isForce: true, etype: 1, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 1
        },
        {
            action: "oneManster",
            mansterId: "0",
            judge: "<",
            level: 4
        },
        {
            action: "coinCount",
            judge: ">",
            count: 9
        },
        {
            action: "masterModel",
            type: "plant"
        }
        ], isMove: true
    },
    {
        guideId: "4", event: "UPDATE_LEFTRIGHT_TIME", EventData: { action: "allHide" }, guideName: "喂养怪兽", nodeName: "node6", showNodePos: cc.v2(-362, -57), richContent: "<color=#6076a5>喂养怪兽提高怪兽等级，怪兽等级越高金币收益越多。</color>\n<color=#ff560c>把花园宝宝升到4级</color>", isForce: true, etype: 1, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 1
        },
        {
            action: "oneManster",
            mansterId: "0",
            judge: "<",
            level: 4
        },
        {
            action: "coinCount",
            judge: ">",
            count: 9
        },
        {
            action: "masterModel",
            type: "levelUp"
        }
        ]
    },
    {
        guideId: "5", event: "UPDATE_LEFTRIGHT_TIME", EventData: { action: "allHide" }, guideName: "喂养怪兽", nodeName: "node6", showNodePos: cc.v2(-362, -57), richContent: "<color=#6076a5>喂养怪兽提高怪兽等级，怪兽等级越高金币收益越多。</color>\n<color=#ff560c>把花园宝宝升到4级</color>", isForce: true, etype: 1, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 1
        },
        {
            action: "oneManster",
            mansterId: "0",
            judge: "<",
            level: 4
        },
        {
            action: "coinCount",
            judge: ">",
            count: 9
        },
        {
            action: "masterModel",
            type: "levelUp"
        }
        ]
    },


    {
        guideId: "6", event: "UPDATE_LEFTRIGHT_TIME", EventData: { action: "allHide" }, guideName: "喂养怪兽", nodeName: "node7", showNodePos: cc.v2(-362, -57), richContent: "<color=#6076a5>恭喜，花园宝宝升级成功，现在能生产更多的金币了</color>\n<color=#ff560c>点击返回主界面</color>", isForce: true, etype: 1, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 1
        },
        {
            action: "oneManster",
            mansterId: "0",
            judge: ">",
            level: 3
        },

        {
            action: "masterModel",
            type: "levelUp"
        },
        {
            action: "feed",
            isFeedOpen: true,
        },
        ]
    },
    {
        guideId: "7", event: "UPDATE_LEFTRIGHT_TIME", EventData: { action: "allHide" }, guideName: "解锁第二个怪兽", showNodePos: cc.v2(-362, -57), event: "UPDATE_LEFTRIGHT_TIME", EventData: { action: "allHide" }, nodeName: "node5", nodeNameArray: ["node2", "node3"], richContent: "<color=#ff560c>再收集30金币</color><color=#6076a5>，解锁第二个怪兽</color>", isForce: true, etype: 2, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 1
        },
        {
            action: "oneManster",
            mansterId: "0",
            judge: ">",
            level: 3
        },
        {
            action: "coinCount",
            judge: "<",
            count: 30
        },
        {
            action: "feed",
            isFeedOpen: false,
        },
        ]
    },
    {
        guideId: "8", event: "UPDATE_LEFTRIGHT_TIME", showNodePos: cc.v2(-362, -57), EventData: { action: "allHide" }, nodeName: "node8", guideName: "解锁第二个怪兽", richContent: "<color=#ff560c>点击解锁第二个怪兽</color>", isForce: true, etype: 1, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 1
        },
        {
            action: "oneManster",
            mansterId: "0",
            judge: ">",
            level: 3
        },
        {
            action: "coinCount",
            judge: ">",
            count: 30
        }
        ]
    },
    {
        guideId: "9", event: "UPDATE_LEFTRIGHT_TIME", EventData: { action: "allHideFeed" }, showNodePos: cc.v2(-362, -57), nodeName: "node10", nodeNameArray: ["node2", "node9"], guideName: "收集金币", richContent: "<color=#ff560c>收集400金币</color><color=#6076a5>就可以购买自动生产。喂养怪兽提高金币产量吧。</color>", isForce: true, etype: 2, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 2
        },
        {
            action: "autoSkill",
            itemId: "0",
            isGet: false,
        },
        {
            action: "coinCount",
            judge: "<",
            count: 401
        },
        ]
    },
    {
        guideId: "10", event: "UPDATE_LEFTRIGHT_TIME", showNodePos: cc.v2(-362, -57), EventData: { action: "allHideShop" }, nodeName: "node11", guideName: "购买道具", richContent: "<color=#6076a5>收集完成！购买自动生产道具，怪兽就可以自动生产金币啦！</color>", isForce: true, etype: 1, reform: 0, condition: [{
            action: "mansterCount",
            judge: "=",
            count: 2
        },
        {
            action: "coinCount",
            judge: ">",
            count: 401
        },
        {
            action: "autoSkill",
            itemId: "0",
            isGet: false,
        },
        {
            action: "UI",
            uiTag: "isShopOpen",
            isOpen: false,
        },
        ], isMove: true
    },


    {
        guideId: "11", nodeName: "node12", showNodePos: cc.v2(-362, -57), guideName: "购买道具", richContent: "<color=#6076a5>点击购买花园宝宝</color><color=#ff560c>自动生产</color><color=#6076a5>道具</color>", isForce: true, NextGuid: "12", etype: 1, reform: 0,
        condition: [{
            action: "mansterCount",
            judge: "=",
            count: 2
        },
        {
            action: "coinCount",
            judge: ">",
            count: 401
        },
        {
            action: "autoSkill",
            itemId: "0",
            isGet: false,
        },
        {
            action: "UI",
            uiTag: "isShopOpen",
            isOpen: true,
        },
        ], isShowMall: true
    },


    {
        guideId: "12", event: "UPDATE_LEFTRIGHT_TIME", EventData: { action: "allHide" }, nodeName: "node13", showNodePos: cc.v2(-362, -57), guideName: "自动生产成功", richContent: "<color=#6076a5>恭喜！花园宝宝已经自动生产金币了。</color>\n<color=#ff560c>解锁新的怪兽后，记得购买自动生产道具。</color>", isForce: true, NextGuid: "13", etype: 1, reform: 0,
        condition: [ //{ 
            //        action : "mansterCount" ,
            //        judge : "=" ,
            //        count : 2
            //    }  ,
            //    { 
            //        action : "autoSkill" ,
            //        itemId : "0" ,
            //        isGet  : true ,
            //    }  ,  
            //    { 
            //        action : "UI" ,
            //        uiTag : "isShopOpen" ,
            //        isOpen : true ,
            //  }  , 
            {
                action: "mansterCount",
                judge: "=",
                count: 100
            }


        ], isShowMall: true
    },



    {
        guideId: "13", event: "UPDATE_LEFTRIGHT_TIME", EventData: { action: "allHide" }, nodeName: "node14", showNodePos: cc.v2(-362, -57), guideName: "开启火星动物园之旅", richContent: "<color=#6076a5>恭喜通过新手引导，继续喂养怪兽收集更多金币吧！</color>\n<color=#ff560c>解锁第4个怪兽</color><color=#6076a5>后，开启幸运转盘，期待吧！</color>", isForce: true, etype: 4, reform: 0, condition: [
            {
                action: "mansterCount",
                judge: "=",
                count: 100
            },

        ]
    },

    {
        guideId: "14", event: "UPDATE_LEFTRIGHT_TIME", EventData: { action: "showAllTurn" }, nodeName: "node15", showNodePos: cc.v2(-362, -508), guideName: "开启幸运转盘", richContent: "<color=#6076a5>恭喜开启幸运转盘，快去碰碰运气吧！\n<color=#ff560c>点击按钮，</color>体验转盘。</color>", isForce: true, etype: 1, reform: 0, condition: [
            {
                action: "mansterCount",
                judge: "=",
                count: 4
            },
            {
                action: "isFistTurnTable",
                judge: "=",
                isCan: true
            },
            {
                action: "turnOpen",
                uiTag: "isTurnTableOpen",
                isOpen: false,
            },
        ]
    },

    {
        guideId: "15", nodeName: "node16", showNodePos:cc.v2(-362, -57), guideName: "转转11", richContent: "<color=#6076a5>点击按钮转动转盘。\n转动转盘需要<color=#ff560c>消耗体力</color>，体力每分钟恢复1点。</color>", isForce: true, etype: 1, reform: 0, condition: [
            {
                action: "mansterCount",
                judge: "=",
                count: 4
            },
            {
                action: "isFistTurnTable",
                judge: "=",
                isCan: true
            },
            {
                action: "turnOpen",
                uiTag: "isTurnTableOpen",
                isOpen: true,
            },
        ]
    },





    {
        guideId: "16", nodeName: "node17", showNodePos: cc.v2(-362, -508), guideName: "开启回收", richContent: "<color=#6076a5>哈喽，把所有小怪兽卖给我，我会把潘多拉星球独特的<color=#ff560c>彩矿</color>作为报酬。</color>\n<color=#ff560c>彩矿可以大大增加金币收益！</color>", isForce: true, etype: 4, reform: 0, condition: [
            {
                action: "mansterCount",
                judge: "=",
                count: 6
            }
        ]
    },
]