
cc.Class({
    extends: cc.Component,

    properties: {
        uiType: 2,
        uiName: "UpdateLayer",
        progress: cc.Label,
        progressBar: cc.Node,
    },



    onDestory: function () {

    },
    // update (dt) {},



    onLoad: function () {

   


        this.updateFile = "1_0_45.zip";
        this.version = "1.0.45";
        var dirName = "master_frame";  //更换成自己的下载目录
        this.openUpdate = true;
        this.jsonDataUrl = tywx.SystemInfo.cdnPath + "/" + dirName + "/";

        this.progress.node.active = false;
        // this.bitProgress.node.active = false
        this.progressUpdateCallback(0, 0, 0);

        var action = cc.fadeTo(0.5, 0);
        var action1 = cc.fadeTo(0.5, 255);

        cc.find ("loading",this.node).runAction(  cc.sequence( [action, action1]).repeatForever()); 
    },

    getVersion: function () {
        var that = this;

        var oldVersion = tywx.Util.getItemFromLocalStorage("version", "1.0.0")
        var jsonDataUrl = this.jsonDataUrl + "version.json"

        var data = {
            version: this.version,
            updateFile: this.updateFile
        }
        // cc.loader.load(jsonDataUrl,function (err, data) {
        //     if(!err){
        if (data["version"] == oldVersion) {
            console.log ("downLoadEnd");
            that.downLoadEnd()
        } else {
            that.downLoadZip(data)
        }
        //     }
        // });
    },

    downLoadZip: function (versionData) {
        var that = this
        var updateFile = versionData["updateFile"]
        var url = this.jsonDataUrl + "update/" + updateFile
        console.log (" zip = " + url);

        var downloadTask = tywx.wxFileUtil.downloadFile(url, function (data) {
            //下载-解压完成后，修改本地版本号
            tywx.Util.setItemToLocalStorage("version", versionData["version"])
            that.downLoadEnd()
        }, function (data) {
            that.downLoadEnd()
            cc.log("资源下载失败！")
        })

        downloadTask.onProgressUpdate(function (res) {
            //that.progress.node.active = true
            // that.bitProgress.node.active = true
            that.progressUpdateCallback(res.progress, res.totalBytesWritten, res.totalBytesExpectedToWrite)
        });
    },
    /**动态更新更新进度
     * @param 百分比进度
     * @param 当前下载bit
     * @param 总下载bit
    */
    progressUpdateCallback: function (progress, totalBytesWritten, totalBytesExpectedToWrite) {
        this.progress.string = progress + "%"
        this.progressBar.getComponent(cc.ProgressBar).progress = progress/100;
        // this.bitProgress.string = Math.ceil(totalBytesWritten/1024)+"/"+Math.ceil(totalBytesExpectedToWrite/1024)+"kb"
    },


    //下载结束，切换游戏界面
    downLoadEnd: function () {
        this.changeScene()
    },
    //开始游戏
    changeScene: function () {
        console.log ("开始游戏");
        //cc.log("changeScene")
        // cc.director.loadScene('GameScene')
        tywx.isFristLoaded = true
        mi.UIManager.showUI("LoginLayer");
        mi.UIManager.hideUI(this.uiName);
    },

    //开始下载
    startLoadScene: function () {
        cc.log("开始下载")
        this.getVersion()
    },

    //清理缓存
    cleanLoadFile: function () {
        // tywx.wxFileUtil.rmFiledir(wx.env.USER_DATA_PATH)
        // tywx.wxFileUtil.rmSubFileDir(wx.env.USER_DATA_PATH)
    },

    start: function () {
        //微信平台需要下载，非微信平台直接跳过
        if (!tywx.isInCreator && this.openUpdate) {
            this.startLoadScene()
        } else {
            this.downLoadEnd()
        }
    },

    show: function (params) { 

    },

    update: function (dt) {
        //console.log("start");
    },
});
