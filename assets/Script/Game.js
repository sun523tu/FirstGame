cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        btnNode: {
            default: null,
            type: cc.Node
        },
        gameOverNode: {
            default: null,
            type: cc.Node
        },
    },

    onStartGame: function () {
        // 初始化计分
        //this.resetScore();
        // set game state to running
        this.isRunning = true;
        // set button and gameover text out of screen
        this.btnNode.setPositionX(3000);
        this.gameOverNode.active = false;
        // reset player position and move speed
        //this.player.startMoveAt(cc.p(0, this.groundY));
        // spawn star
        //this.spawnNewStar();
        this.timer = 0;
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (!this.isRunning) return;
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > 10) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },

        gameOver: function () {
       this.gameOverNode.active = true;
       //this.player.enabled = false;
       //this.player.stopMove();
       //this.currentStar.destroy();
       this.isRunning = false;
       this.btnNode.setPositionX(0);
    },
});
