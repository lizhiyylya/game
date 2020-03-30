
miDB.PropData = {
    TAG : "PropData",

    sumPropNum:2,

    DB : {
        propList : [], 


    },
    //建筑对象数据模型
    createPropModel : function( ){

        var model = new Object();
        model.propIdx = undefined ;//道具索引
        model.propEndTime =undefined; // 道具  结束时间  结束时间到了 自动剔除

        model.statue =0;        // 初始化 道具状态    （ 0 ：未领取 ， 1 ：领取中 ， ）

        model.getcfg =function ()
        {
           return miDB.PropData.getcfg ( this.propIdx);
        }

        return model;
    },

    getcfg : function (  propIndex )
    {
    
        return  miDB.prop.propConfig [propIndex];
    },
 

    init : function () {
      

         // 增加一个道具
         tywx.NotificationCenter.listen(miDB.EVENT.ADD_PROP_DATA ,this.addPropData,this);

        // // 领取后 删除
          tywx.NotificationCenter.listen(miDB.EVENT.REMOVE_HAND_PROP_DATA,this.removeHandPropData,this);


       //this.addPropData ("P1001") ; // test

       if (miDB.localData.prop.type ==1 )  // 正在使用加速卡
       {
           this.addStatuProp( "P1001", miDB.localData.prop.needTime);
      }

        
        setInterval(this.updateProptime,1000);
      // setInterval(this.creatorProp,miDB.prop.interval);
    },

    addStatuProp :function ( propIdx, time)
    {

        if (this.DB.propList.length >this.sumPropNum)
        {
            return ;
        }

        if(propIdx){
            var isExist = false;
            for(var i=0;i<this.DB.propList.length;i++){


                var propData = this.DB.propList[i];
                if(propData.propIdx === propIdx){
                    isExist = true;
                }
            }
            if(!isExist){
                // 创建了一个道具
                var oneProp = new this.createPropModel();
                oneProp.propIdx = propIdx; //建筑索引

                var ttime =new Date(miDB.localData.systime * 1000);
                ttime.setSeconds(ttime.getSeconds()+ time);
                oneProp.propEndTime  =Date.parse(ttime)/1000;
                oneProp.statue =1; 
                miDB.prop.bufferProp=oneProp.getcfg().PropGain;    

                console.log ("统计时间加速卡");

                this.DB.propList.push(oneProp);
         

            }else{
                // tywx.LOGE("道具以及增加了");
               // console.log ("道具已经增加了");
            }
        }

    },

    creatorProp : function()
    {

    //    var  index= "P100"+   Math.random() * 1 +1;
        var  index= "P100"+Math.ceil(Math.random()*2);
        miDB.PropData.addPropData (index) ;
     
    },

    updateProptime : function ()
    {
        //console.log ("propTime");
        var time= new Date(miDB.localData.systime * 1000)
        time.setSeconds(time.getSeconds()+ 1);
        miDB.localData.systime = Date.parse( time)/1000;

        if(miDB.PropData.DB.propList.length <=0)
        {
            return;
        }

        var isUpadte =false;
        for (var i=0 ; i<miDB.PropData.DB.propList.length; i++ )
        {
            
            if ( miDB.localData.systime >miDB.PropData.DB.propList[i].propEndTime  )
            {
                isUpadte=true;

                if (miDB.PropData.DB.propList[i].getcfg().type ==1)
                {
                    console.log ("加速卡效果消失");
                    miDB.prop. bufferProp=1;
                }
             
                miDB.PropData.DB.propList[i] = undefined;
                miDB.PropData.DB.propList.splice(i,1);
                 i--;
                break;

            }

        }

        if (isUpadte)
        {
              // 更新界面 显示
              tywx.NotificationCenter.trigger( miDB.EVENT.UPDATE_PROP_DATA, {  DBlist:miDB.PropData.DB.propList ,action:"remove"  });

        }

    },




    // 增加一个建筑物
    addPropData : function(propIdx){

        //   界面显示最多  ，增加到三个红包 
        if (this.DB.propList.length >this.sumPropNum)
        {
            return ;
        }

        if(propIdx){
            var isExist = false;
            for(var i=0;i<this.DB.propList.length;i++){


                var propData = this.DB.propList[i];
                if(propData.propIdx === propIdx){
                    isExist = true;
                }
            }
            if(!isExist){
                // 创建了一个道具
                var oneProp = new this.createPropModel();
                oneProp.propIdx = propIdx; //建筑索引
                // oneProp.propEndTime =oneProp.propInitTime +oneProp.getcfg().propSumTime;
                var ttime =new Date(miDB.localData.systime * 1000);
                ttime.setSeconds(ttime.getSeconds()+ oneProp.getcfg().propSumTime);
                oneProp.propEndTime  =ttime ;
                oneProp.propEndTime  =Date.parse(ttime)/1000;
                this.DB.propList.push(oneProp);

               
                // 更新界面 显示
                tywx.NotificationCenter.trigger( miDB.EVENT.UPDATE_PROP_DATA, {  DBlist:this.DB.propList ,action:"add"  });

            }else{
                // tywx.LOGE("道具以及增加了");
               // console.log ("道具已经增加了");
            }
        }
    },

     // 点击领取 
    removeHandPropData : function(propIdx){
        if(propIdx){
 
            for(var i=0;i<this.DB.propList.length;i++){
                if(this.DB.propList[i] && (this.DB.propList[i].propIdx === propIdx)){
                    // this.DB.propIdx[i] = undefined;
                    // this.DB.propIdx.splice(i,1);
                
                       
                    this.mangerPropState (this.DB.propList[i]);
                    break;
                }
            }
            // // 修改当前页面属性面板 数据
            tywx.NotificationCenter.trigger( miDB.EVENT.UPDATE_PROP_DATA, {  DBlist:this.DB.propList ,action:"removeHandPropData"  });
        }
    },
    mangerPropState : function( oneProp )
    {
        if (oneProp.statue ==1 )
        {
            console.log ("不能重复领取 ");
            return ;
        }
        if (oneProp.getcfg().type ==1 )   // 加速卡类型   加速 收益时间到后 删除 
        {
            var ttime =new Date(miDB.localData.systime * 1000);
            ttime.setSeconds(ttime.getSeconds()+ oneProp.getcfg().propGainTime);
            oneProp.propEndTime  = Date.parse(ttime)/1000 ;
            miDB.prop.bufferProp=oneProp.getcfg().PropGain;     // 设置加速卡 buff
            oneProp.statue =1; 
        } 
        else if (oneProp.getcfg().type ==2)  // 红包类型
        {

            oneProp.propEndTime =miDB.localData.systime;
            tywx.NotificationCenter.trigger(miDB.EVENT.GAIN_CORN_DATA,{storageCorn :oneProp.getcfg().gainNum });
            oneProp.statue =1; 

        }
       


    },

    getLocalData ()
    {
        var prop ={ 
            type :0,
            needTime:0
        };
        for (var i =0; i<this.DB.propList.length ;i++ )
        {
            
           var send = miDB.PropData.DB.propList[i].propEndTime - miDB.localData.systime ;
           if ( this.DB.propList[i].getcfg().type ==1 &&this.DB.propList[i].statue==1 && send>0  )
           {
            prop.type=1;
            prop.needTime=send;
            break;
           }
        }
        return prop;
    },





    cleanGameData : function(){

        this.DB.propList= [];
    },  









};
