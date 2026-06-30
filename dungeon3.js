"use strict";

const W = 13;
const H = 13;

const maze = [];
let ctx;

//======================
// 画像
//======================

let wall = new Image();
wall.src = "壁/chipB.png";

let road = new Image();
road.src = "通路/1.png";

let enemyImg = new Image();
enemyImg.src = "enemy.png";

let treasure = new Image();
treasure.src = "takara.png";

let doorClose = new Image();
doorClose.src = "tobira.png";

let doorOpen = new Image();
doorOpen.src = "tobira2.png";

//======================
// 定数
//======================

const CHIP = 60;

const goalPos = {
    x: W - 2,
    y: H - 2
};

const treasurePos = {
    x: 3,
    y: 3
};

let haveKey = false;
let doorOpenFlag = false;
let keyCode = 0;
let timer = NaN;

//======================
// 主人公・敵
//======================

const player = new Player(1, 1);
const enemy = new Enemy(5, 5);

function random(v) {
    return Math.floor(Math.random() * v);
}

//======================
// 主人公
//======================

function Player(x, y) {

    this.x = x;
    this.y = y;
    this.dir = 1;

    this.update = function () {

        let nx = 0;
        let ny = 0;

        switch (keyCode) {

            case 37:
                nx = -1;
                this.dir = 2;
                break;

            case 38:
                ny = -1;
                this.dir = 0;
                break;

            case 39:
                nx = 1;
                this.dir = 3;
                break;

            case 40:
                ny = 1;
                this.dir = 1;
                break;
        }


        if (
            maze[this.y + ny][this.x + nx] == 0 &&
            (nx != 0 || ny != 0)
        ) {

            this.x += nx;
            this.y += ny;
        }
    };

    this.paint = function(gc){

        let img = document.getElementById("hero"+this.dir);

        gc.drawImage(
            img,
            this.x*CHIP,
            this.y*CHIP,
            CHIP,
            CHIP
        );
    };
}

//======================
// 敵
//======================

function Enemy(x,y){

    this.x=x;
    this.y=y;

    this.update=function(){

        let dir=random(4);

        let nx=0;
        let ny=0;

        switch(dir){

            case 0:
                ny=-1;
                break;

            case 1:
                ny=1;
                break;

            case 2:
                nx=-1;
                break;

            case 3:
                nx=1;
                break;
        }

        if(maze[this.y+ny][this.x+nx]==0){

            this.x+=nx;
            this.y+=ny;
        }
    };

    this.paint=function(gc){

        gc.drawImage(
            enemyImg,
            this.x*CHIP,
            this.y*CHIP,
            CHIP,
            CHIP
        );
    };
}

//======================
// 初期化
//======================

function init(){

    let canvas=document.getElementById("maze");
    ctx=canvas.getContext("2d");

    player.x=1;
    player.y=1;
    player.dir=1;

    keyCode=0;
    haveKey = false;
    doorOpenFlag = false;

    createMaze(W,H);

    maze[goalPos.y][goalPos.x]=0;

    do{

        enemy.x=random(W-2)+1;
        enemy.y=random(H-2)+1;

    }while(

        maze[enemy.y][enemy.x]==1 ||

        (enemy.x==1 && enemy.y==1) ||

        (enemy.x==goalPos.x &&
        enemy.y==goalPos.y)
    );

    do{

        treasurePos.x=random(W-2)+1;
        treasurePos.y=random(H-2)+1;

    }while(

        maze[treasurePos.y][treasurePos.x]==1 ||

        (treasurePos.x==1 &&
        treasurePos.y==1) ||

        (treasurePos.x==enemy.x &&
        treasurePos.y==enemy.y) ||

        (treasurePos.x==goalPos.x &&
        treasurePos.y==goalPos.y)
    );

    repaint();

    go();
}

function go(){

    clearInterval(timer);

    window.onkeydown=mykeydown;
    window.onkeyup=mykeyup;

    timer=setInterval(tick,130);
}

//======================
// 迷路生成
//======================

function createMaze(w, h) {

    for (let y = 0; y < h; y++) {

        maze[y] = [];

        for (let x = 0; x < w; x++) {

            maze[y][x] =
                (x == 0 || x == w - 1 || y == 0 || y == h - 1)
                ? 1 : 0;
        }
    }

    for (let y = 2; y < h - 2; y += 2) {

        for (let x = 2; x < w - 2; x += 2) {

            maze[y][x] = 1;

            let dir = random(y == 2 ? 4 : 3);

            let px = x;
            let py = y;

            switch (dir) {

                case 0:
                    py++;
                    break;

                case 1:
                    px--;
                    break;

                case 2:
                    px++;
                    break;

                case 3:
                    py--;
                    break;
            }

            maze[py][px] = 1;
        }
    }
}

//======================
// メイン処理
//======================

function tick() {

    player.update();
    enemy.update();

    // 宝箱
    if (
        !haveKey &&
        player.x == treasurePos.x &&
        player.y == treasurePos.y
    ) {

        haveKey = true;
        alert("鍵を手に入れた！");
    }

    // 敵
    if (
        player.x == enemy.x &&
        player.y == enemy.y
    ) {

        clearInterval(timer);
        alert("ゲームオーバー");
        init();
        return;
    }

    // ゴール
if (
    player.x == goalPos.x &&
    player.y == goalPos.y
) {

    if (haveKey) {

        doorOpenFlag = true;
        repaint();

        clearInterval(timer);

        setTimeout(function () {
            alert("ゴール！");
            init();
        }, 500);

        return;

    } else {

        alert("扉に鍵がかかっている！");
        player.x = goalPos.x - 1;
    }
}

    repaint();
}

//======================
// 描画
//======================

function repaint() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W * CHIP, H * CHIP);

    for (let y = 0; y < H; y++) {

        for (let x = 0; x < W; x++) {

            if (maze[y][x] == 1) {

                ctx.drawImage(
                    wall,
                    x * CHIP,
                    y * CHIP,
                    CHIP,
                    CHIP
                );

            } else {

                ctx.drawImage(
                    road,
                    x * CHIP,
                    y * CHIP,
                    CHIP,
                    CHIP
                );
            }
        }
    }

    // 宝箱
    if (!haveKey) {

        ctx.drawImage(
            treasure,
            treasurePos.x * CHIP,
            treasurePos.y * CHIP,
            CHIP,
            CHIP
        );
    }

    // 扉
    if (doorOpenFlag) {

    ctx.drawImage(
        doorOpen,
        goalPos.x * CHIP,
        goalPos.y * CHIP,
        CHIP,
        CHIP
    );

} else {

    ctx.drawImage(
        doorClose,
        goalPos.x * CHIP,
        goalPos.y * CHIP,
        CHIP,
        CHIP
    );
}

    // 敵
    enemy.paint(ctx);

    // 主人公
    player.paint(ctx);
}

//======================
// キー入力
//======================

function mykeydown(e) {

    keyCode = e.keyCode;
}

function mykeyup(e) {

    keyCode = 0;
}