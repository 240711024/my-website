"use strict";

const W = 13;
const H = 13;

const maze = [];
let ctx;

let wall = new Image();
wall.src = "壁/chipB.png";

let road = new Image();
road.src = "通路/1.png";

// 主人公
const player = new Player(1, 1);
let keyCode = 0;
let timer = NaN;

// マスの大きさ
const CHIP = 60;

function random(v) {
    return Math.floor(Math.random() * v);
}

// 主人公オブジェクト
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

    this.paint = function (gc) {
        let img = document.getElementById("hero" + this.dir);

        gc.drawImage(
            img,
            this.x * CHIP,
            this.y * CHIP,
            CHIP,
            CHIP
        );
    };
}

function init() {
    let canvas = document.getElementById("maze");
    ctx = canvas.getContext("2d");

    createMaze(W, H);
    repaint();

    go();
}

function go() {
    window.onkeydown = mykeydown;
    window.onkeyup = mykeyup;

    let canvas = document.getElementById("maze");

    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    timer = setInterval(tick, 200);
}

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

// メインルーチン
function tick() {
    player.update();
    repaint();
}

// 描画
function repaint() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W * CHIP, H * CHIP);

    for (let x = 0; x < W; x++) {
        for (let y = 0; y < H; y++) {

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

    // 主人公描画
    player.paint(ctx);
}

// キー入力
function mykeydown(e) {
    keyCode = e.keyCode;
}

function mykeyup(e) {
    keyCode = 0;
}