/**
 * 对scheduler进行封装
 */

tywx.Timer = {
    /**
     * 开始定时器
     * 参数的含义依次是：回调的obj、回调函数、tick的间隔、不算这次还要重复的次数，开始tick的delay时间
     * @param {[type]}   obj       [description]
     * @param {Function} callback  [description]
     * @param {[type]}   interval  [description]
     * @param {[type]}   repeatNum [description]
     * @param {[type]}   delay     [description]
     */
	setTimer:function(obj, callback, interval, repeatNum, delay){
        if (obj && obj._TAG) {
            tywx.LOGD('tywx.Timer', '----------in setTimer----------' + (obj._TAG ? obj._TAG : ''));
        }
        var scheduler = cc.director.getScheduler();
        // 直接屏蔽paused
        var paused = false;
        var times =  (null != repeatNum) ? repeatNum : cc.macro.REPEAT_FOREVER;
        
        scheduler.schedule(callback, obj, interval, repeatNum, delay, paused);
	},

    /**
     * 取消定时器
     * @param  {[type]}   obj      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
	cancelTimer:function(obj, callback){
		// 这个类在jsb_cocos2dx_auto_api.js中可以找到
        if (obj && obj._TAG) {
            tywx.LOGD('tywx.Timer', '----------in cancelTimer ---------' + (obj._TAG ? obj._TAG : ''));
        }
        var scheduler = cc.director.getScheduler();
		scheduler.unschedule(callback, obj);
    },
    



    setUpdateTimer:function(obj){

        var scheduler = cc.director.getScheduler();
        // 直接屏蔽paused
        var paused = false;
        scheduler.scheduleUpdate(obj, 0, paused);
    },
    


    cancelUpdateTimer:function(obj){
        var scheduler = cc.director.getScheduler();
        // 直接屏蔽paused
        scheduler.unscheduleUpdate(obj);
	},

    /**
     * 判断定时器
     * @param  {[type]}   obj      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    isScheduledTimer:function(obj, callback){
        // 这个类在jsb_cocos2dx_auto_api.js中可以找到
        if (obj && obj._TAG) {
            tywx.LOGD('tywx.Timer', '----------in isScheduledTimer ---------' + (obj._TAG ? obj._TAG : ''));
        }
        var scheduler = cc.director.getScheduler();
        return scheduler.isScheduled(callback, obj);
    }
};
