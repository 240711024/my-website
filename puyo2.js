let ctx;
let timer = NaN;

const FW = 6;
const FH = 13;
const DELETE = 3;

let field = [
[0,0,0,0,0,0,0,0,0,1,2,2,1],
[0,0,0,0,0,0,0,0,3,1,1,1,3],
[0,0,0,0,0,0,0,0,0,1,3,3,2],
[0,0,0,0,0,0,0,0,0,0,0,0,3],
[0,0,0,0,0,0,0,0,0,0,0,0,1],
[0,0,0,0,0,0,0,0,0,0,0,0,2],
];
let n = 0;
let d_flag = false;
let f_flag = false;


// ゲームフィールドを描く
function paint() {
    for (y=1;y<FH;y++){//一番上の行は表示しない
        ctx.fillStyle = "brown";
        ctx.fillRect(0, (y+1) * 44, 42, 42);
        for (x = 0; x < FW; x++) {
            switch (field[x][y]) {
                case 0: ctx.fillStyle = "white"; break;
                case 1: ctx.fillStyle = "red"; break;
                case 2: ctx.fillStyle = "green"; break;
                case 3: ctx.fillStyle = "blue"; break;
            }
            ctx.fillRect((x+1) * 44 ,(y+1) * 44 , 42 , 42);
        }
        ctx.fillStyle = "brown";
        ctx.fillRect((FW+1)*44, (y+1)*44, 42, 42);
    }
    ctx.fillStyle = "brown";
    ctx.fillRect(0, (FH+1) * 44, (FW+2) * 44, 42)
}


function init() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    timer = setInterval(tick,500);
    paint();

    window.onkeydown = mykeydown;
    window.onkeyup = mykeyup;
}

// 入力処理
function input() {
    switch (keyCode) {
        case 37:
            if (px> 0){
                if (field[px-1][py] == 0 && field[px-1][py-1] == 0){
                    field[px-1][py] = field[px][py];
                    field [px-1][py-1] = field[px][py-1];
                    field[px][py] = 0;
                    field[px][py-1] = 0;
                    px --;
                }
            }
            break;
        case 39:
            if (px < field.length - 1) {
                if (field[px + 1][py] == 0 && field[px + 1][py - 1] == 0) {
                    field[px + 1][py] = field[px][py];
                    field[px + 1][py - 1] = field[px][py - 1];
                    field[px][py] = 0;
                    field[px][py - 1] = 0;
                    px++;
                }
            }
            break;
        case 32:
            let temp = field[px][py];
            field[px][py] = field[px][py - 1];
            field[px][py - 1] = temp;
            break;
            keyCode = 0;
    }
}

function count(x, y) {
    c = field[x][y];
    field[x][y] = 0;
    n++;
    if (x+1 < FW && field[x+1][y] == c) {count(x+1, y)}; // 右方向に再帰検索
    if (y+1 < FH && field[x][y+1] == c) {count(x, y+1)}; // 下方向に再帰検索
    if (x-1 >= 0 && field[x-1][y] == c) {count(x-1, y)}; // 左方向に再帰検索
    if (y-1 >= 0 && field[x][y-1] == c) {count(x, y-1)}; // 上方向に再帰検索
    field[x][y] = c;
}


// ぷよを消す(count関数の応用)
function vanish(f, x, y) {
    c=f[x][y]; //自分の色

    f[x][y]= 0; // 色ぷよを消す
     
    if (x+1 < FW && field[x+1][y] == c) {count(x+1, y)}; // 右方向に再帰検索
    if (y+1 < FH && field[x][y+1] == c) {count(x, y+1)}; // 下方向に再帰検索
    if (x-1 >= 0 && field[x-1][y] == c) {count(x-1, y)}; // 左方向に再帰検索
    if (y-1 >= 0 && field[x][y-1] == c) {count(x, y-1)}; // 上方向に再帰検索

}


function copy_field(to , from){
    for(y = 0 ; y < FH; y++) {
        for (x = 0 ; x < FW; x++) {
            to[x][y] = from[x][y];
        }
    }
}


function delete_puyo() {
    let f = Array(FW);
    for (yy=0; yy < FH; yy++) {
        f[yy] = Array(FH);
    }
    d = 0;

    copy_field(f, field);
    for (y =0; y < FH; y++) {
        for (x= 0; x < FW; x++) {
            n = field[x][y];
            if (n != 0) {
                n = 0;
                count(x, y);
                if (n >= DELETE) {
                    vanish(f, x, y);
                    d += n;
                }
            }
        }
    }
    copy_field(field, f);
    return d;
}


// 戻り値:ぷよを落とした列数
function fall_puyo() {

    py++;
    input();

    n = 0;
    for (x= 0; x < FW; x++) {
        for (y = FH-1; y >= 0; y -- ) {
            if (field[x][y] == 0) {
                for (iy = y-1; iy >=0 && field[x][iy] == 0; iy -- );
                if (iy < 0) break;
                n++;
                for (iy = y; iy >= 0; iy -- ) {
                    if (iy-1 >= 0)
                        field[x][iy] = field[x][iy-1];
                    else
                        field[x][iy]=0;
                }
                break;
            }
        }
    }
    return n;
}


function new_puyo() {

    px = FW/2;
    py = 0;

// r = Math.floor(Math.random()*FW);

    // 出現位置が埋まっていたらゲームオーバー
    if (field[px][0] != 0 || field[px][1] != 0) {
        alert("ゲームオーバー");
        gameover();
        return;
    }
    field[px][0] = Math.floor(Math.random()*3)+1;
    field[px][1]= Math.floor(Math.random()*3)+1;
}
// メイン
function tick() {
    f_flag = fall_puyo();
    paint();
    if (f_flag == 0){
        d_flag = delete_puyo();
        if (d_flag == 0)
            new_puyo();
    }
}

// ゲームオーバー(現状どこからも呼ばれていない)
function gameover() {
    clearInterval(timer);
    timer = NaN;
}

let px = 0;
let py = 0;
let keyCode = 0;

function mykeydown(e) {
    keyCode = e.keyCode;
}
function mykeyup(e) {
    keyCode = 0;
}

