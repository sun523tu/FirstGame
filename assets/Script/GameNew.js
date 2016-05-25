var Types = require('Types');
var Decks = require('Decks');

// 方向
var Dirt = cc.Enum({
    Up: 1,   // 黑桃
    Left: 2,   // 红桃
    Down: 3,    // 梅花(黑)
    Right: 4, // 方块(红)
    Center: -1,
});

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

        // 牌的预制
        cardPrefab: cc.Prefab,


        //assetMng: cc.Node,
        //audioMng: cc.Node,

        numberOfDecks: {
            default: 1,
            type: 'Integer'
        },

        // UI
        btnNode: {
            default: null,
            type: cc.Node
        },

        scoreDisplay: {
            default: null,
            type: cc.Label,
        },

        gameOverNode: {
            default: null,
            type: cc.Node,
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

        this.accDir = 0;
        this.timer = 0;
        this.decks.reset();


        for (var i = 0; i < 4; ++i) {
            //var cardNode = cc.instantiate(this.cardPrefab);
            //var anchor = this.deskAnchors[i];

            //anchor.addChild(cardNode);
            //cardNode.position = cc.p(0, 0);

            // ActorRenderer

            var newCard = cc.instantiate(this.cardPrefab).getComponent('Card');
            var anchor = this.deskAnchors[i];
            anchor.removeAllChildren();

            anchor.addChild(newCard.node);
            this.cards[i] = this.decks.draw();
            newCard.init(this.cards[i]);
            newCard.reveal(true);

            newCard.node.setPosition(0,0);
        }

        //var newCard1 = cc.instantiate(this.cardPrefab).getComponent('Card');
        //this.mainDesk.addChild(newCard1.node);
        
        //this.playercards = this.decks.draw();
        //newCard1.init(this.cards[i]);
        //newCard1.reveal(true);

        //newCard1.node.setPosition(15,0);


        //var newCard = cc.instantiate(this.cardPrefab).getComponent('Card');

        //this.mainDesk.addChild(newCard.node);
        //newCard.init(card);
        //newCard.reveal(false);
        //newCard.node.position = cc.p(15, 0);
    },

    // use this for initialization
    onLoad: function () {
        this.createDesks();
        this.decks = new Decks(this.numberOfDecks);

        this.cards = new Array(5);
        this.playercards = null;


        //this.enabled = false;
        this.timer= 0;
        this.isRunning = false;

        this.score = "";

        this.accDir = Dirt.Center;

        // 初始化键盘输入监听
        this.setInputControl();

    },


    setInputControl: function () {
        var self = this;
        var ppStart =cc.p(0,0);
        var ppEnd =cc.p(0,0);
        var xOffset = 0;
        var yOffset = 0;
        //add keyboard input listener to jump, turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // set a flag when key pressed
            onKeyPressed: function(keyCode, event) {
                //
            },
            // unset a flag when key released
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.accDir = Dirt.Left;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.accDir = Dirt.Right;
                        break;

                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.accDir = Dirt.Up;
                        break;

                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.accDir = Dirt.Down;
                        break;
                    }
            }
        }, self.node);

        // touch input
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                ppStart = touch.getLocation();
                //if (touchLoc.x >= cc.winSize.width/2) {
                //    self.accLeft = false;
                //    self.accRight = true;
                //} else {
                 //   self.accLeft = true;
                //    self.accRight = false;
                //}
                // don't capture the event
                return true;
            },
            onTouchEnded: function(touch, event) {
                ppEnd = touch.getLocation();

                xOffset = ppEnd.x - ppStart.x;
                yOffset = ppEnd.y - ppStart.y;
                if(Math.abs(xOffset) > Math.abs(yOffset))
                {
                    if (ppEnd.x > ppStart.x)
                    {
                        self.accDir = Dirt.Right;
                    } else {
                        self.accDir = Dirt.Left;
                    }
                } else {
                    if(ppEnd.y > ppStart.y)
                    {
                        self.accDir = Dirt.Up;
                    } else {
                        self.accDir = Dirt.Down;
                    }
                }
            }
        }, self.node);
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

        var xStart = -50;
        for (var i = 0; i <= 10; i++) {
            var cardNode = cc.instantiate(this.cardPrefab);
            //var anchor = this.deskAnchors[i];
            //cardNode.card
            //cardNode.reveal(true);

            this.mainDesk.addChild(cardNode);
            //cardNode.reveal(false);
            cardNode.position = cc.p((xStart + i * 5), 0);
        }

        //var newCard = cc.instantiate(this.cardPrefab).getComponent('Card');
        //var newCard = cc.instantiate(this.cardPrefab).getComponent('Card');

        //this.mainDesk.addChild(newCard.node);
        //newCard.init(card);
        //newCard.reveal(false);
        //newCard.node.position = cc.p(15, 0);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (!this.isRunning) return;
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > 150) {
            this.gameOver();
            return;
        }

        this.timer += dt;
        this.score = "";
        switch(this.accDir){
            case Dirt.Up:
                this.score = "Up";
                break;
            case Dirt.Left:
                this.score = "Left";
                break;
            case Dirt.Down:
                this.score = "Down";
                break;
            case Dirt.Right:
                this.score = "Right";
                break;
            default:
                this.score = "Center";
                break;
        }
        this.scoreDisplay.string = 'Score: ' + this.score;
    },

    gameOver: function () {
       this.gameOverNode.active = true;
       //this.player.enabled = false;
       //this.player.stopMove();
       //this.currentStar.destroy();
       this.isRunning = false;
       this.btnNode.setPositionX(0);
       this.score = 0;
    },
});
