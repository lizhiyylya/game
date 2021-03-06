/**
 * Created by xiaochuntian on 2018/5/3.
 */


tywx.EventType = {
    // tcp状态的事件
    TCP_ERROR: 'tcp_error',
    TCP_CLOSE: 'tcp_close',
    TCP_OPENED: 'tcp_opened', // 连接建立好之后的回调
    TCP_RECONNECT: 'tcp_reconnect',
    TCP_RECEIVE: 'tcp_receive',//长连接接收任何消息的事件

    SDK_LOGIN_SUCCESS: 'sdk_login_success',
    SDK_LOGIN_FAIL: 'sdk_login_fail',
    WEIXIN_LOGIN_SUCCESS: 'weixin_login_success',
    WEIXIN_LOGIN_FAIL: 'weixin_login_fail',


    GET_USER_FEATURE_SUCCESS: 'GET_USER_FEATURE_SUCCESS',
    GET_USER_FEATURE_FAIL: 'GET_USER_FEATURE_FAIL',
    GET_SHARE_CONFIG_SUCCESS: 'GET_SHARE_CONFIG_SUCCESS',
    GET_SHARE_CONFIG_FAIL: 'GET_SHARE_CONFIG_FAIL',

    GET_OPEN_DATA_RESULT_SUCCESS: "GET_OPEN_DATA_RESULT_SUCCESS",
    GET_OPEN_DATA_RESULT_FAIL: "GET_OPEN_DATA_RESULT_FAIL",
    GET_OPEN_DATA_RESULT_TIMEOUT: "GET_OPEN_DATA_RESULT_TIMEOUT",

    SEND_HEART_BEAT: 'SEND_HEART_BEAT',
    GAME_SHOW: 'GAME_SHOW',
    GAME_HIDE: 'GAME_HIDE',
    
    START_AUTHORIZATION_SUCCESS : 'START_AUTHORIZATION_SUCCESS', //授权成功
    START_AUTHORIZATION_FAILED : 'START_AUTHORIZATION_FAILED', //授权失败
    
    SHARE_RESULT : 'SHARE_RESULT_RET', 				//分享返回
    FORCESHARE_SUCCESS : 'FORCE_SHARE_SUCESS', 			//暴力分享成功,
    GROUP_SHARE_SUCCESS : 'GROUP_SHARE_SUCCESS', 	//群分享成功,
    GETRFRIENDRANK_SUSSESS:"GETRFRIENDRANK_SUSSESS" ,    //获取好友排行成功

    MSG_LOGIN_SUCCESS : "MSG_LOGIN_SUCCESS",

    PROPAGATE_SHARE_SUCESS : "propagate_share_sucess",  //智能分享成功
    PROPAGATE_SHARE_FAIL : "propagate_share_fail",  //智能分享失败

    GETRFRIENDRANK_SUCCESS: "GETRFRIENDRANK_SUCCESS", //获取好友排行成功
    GETUSERINFO_SUCCESS: "GETUSERINFO_SUCCESS", //获取个人数据成功
    GETGROUPRANK_SUCCESS: "GETGROUPRANK_SUCCESS", //获取群排行数据

    GETSWITCH_RESULT: "GETSWITCH_RESULT", //获取分享开关

    MSG_LIMITE_CITY : "MSG_LIMITE_CITY", //监管城市判定 监听
    MSG_LIMITE_TIME : "MSG_LIMITE_TIME", //监管时间判定 监听

    FRIST_ACTIVITY_STATE : "FRIST_ACTIVITY_STATE", // 首页状态
    SECOND_ACTIVITY_STATE : "SECOND_ACTIVITY_STATE", // 游戏内状态
};
