"use strict";

const W = 41; 
const H = 51; 

const maze = [];
let ctx;

let wall = new Image();
wall.src = "壁/chipB.png"
let road = new Image();
road.src = "通路/1.png"



function random(v) {
    return Math.floor(Math.random() * v);
}

function init() {
    let canvas = document.getElementById("maze");
    ctx = canvas.getContext("2d");

    createMaze(W, H);
    repaint();
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


function repaint() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 900, 820);

    ctx.fillStyle = "brown";

    for (let x = 0; x < W; x++) {
        for (let y = 0; y < H; y++) {

            if (maze[y][x] == 1) {
    ctx.drawImage(wall, x * 16, y * 16, 16, 16);
} else {
    ctx.drawImage(road, x * 16, y * 16, 16, 16);
}

        }
    }
}