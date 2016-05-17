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

        // 游戏要素
        // desk：上下左右四张放牌的桌子
        deskAnchors: {
            default: [],
            type: cc.Node
        },

        // 主牌
        mainDesk: cc.Node,
        // stackDesk，堆放牌
        stackDeskAnchors: {
            default: [],
            type: cc.Node
        },

        // 牌的预制
        cardPrefab: cc.Prefab,


        assetMng: cc.Node,
        audioMng: cc.Node,
        turnDuration: 0,
        betDuration: 0,

        numberOfDecks: {
            default: 1,
            type: 'Integer'
        },

        // UI
        btnNode: {
            default: null,
            type: cc.Node
        },
        gameOverNode: {
            default: null,
            type: cc.Node
        },
    },

    statics: {
        instance: null
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

    createDesks: function () {
        // 初始化计分
        for (var i = 0; i < 4; ++i) {
            var cardNode = cc.instantiate(this.cardPrefab);
            var anchor = this.deskAnchors[i];

            anchor.addChild(cardNode);
            cardNode.position = cc.p(0, 0);


            // ActorRenderer

        }
    },

    onEnterDealState: function () {
        this.player.renderer.showStakeChips(this.player.stakeNum);
        this.player.addCard(this.decks.draw());
        var holdCard = this.decks.draw();
        this.dealer.addHoleCard(holdCard);
        this.player.addCard(this.decks.draw());
        this.dealer.addCard(this.decks.draw());
        this.audioMng.playCard();
        //this.fsm.onDealed();
    },

    // use this for initialization
    onLoad: function () {
        this.createDesks();

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (!this.isRunning) return;
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > 3) {
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
