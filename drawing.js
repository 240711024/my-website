let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let old_x = 0;
let old_y = 0;

let color = "#000000";
let drawColor = "#000000";

let size = 4;
let penType = "circle";

function init()
{
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove, false);

    // ○ペン
    document.getElementById("circle").addEventListener("click", function() {
        penType = "circle";
        color = drawColor;
    });

    // □ペン
    document.getElementById("square").addEventListener("click", function() {
        penType = "square";
        color = drawColor;
    });

    // 消しゴム
    document.getElementById("eraser").addEventListener("click", function() {
        color = "white";
    });

    // 色ボタン
    document.getElementById("red").addEventListener("click", function() {
        color = "red";
        drawColor = "red";
    });

    document.getElementById("blue").addEventListener("click", function() {
        color = "blue";
        drawColor = "blue";
    });

    document.getElementById("yellow").addEventListener("click", function() {
        color = "yellow";
        drawColor = "yellow";
    });
}

// ペンの太さ変更
function setSize()
{
    size = document.getElementById("penSize").value;
    document.getElementById("sizeValue").textContent = size;
}

function touchStart(event)
{
    if(event.touches.length > 1)
    {
        size = event.touches.length * 2;
    }

    old_x = event.touches[0].pageX;
    old_y = event.touches[0].pageY;
}

function touchMove(event)
{
    let c_x;
    let c_y;

    event.preventDefault();

    c_x = event.touches[0].pageX;
    c_y = event.touches[0].pageY;

    drawLine(old_x, old_y, c_x, c_y, size, color);

    old_x = c_x;
    old_y = c_y;
}

function drawLine(x1, y1, x2, y2, psize, color)
{
    ctx.beginPath();

    if(penType == "circle")
    {
        ctx.lineCap = "round";
    }
    else
    {
        ctx.lineCap = "square";
    }

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.lineWidth = psize;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// RGBカラー設定
function setRGB()
{
    let r = document.getElementById("r").value;
    let g = document.getElementById("g").value;
    let b = document.getElementById("b").value;

    color = "#" + hex(r) + hex(g) + hex(b);
    drawColor = color;

    document.getElementById("hex").textContent = color;
    document.getElementById("sample").style.backgroundColor = color;
}

function hex(v)
{
    v = parseInt(v);

    let h = v.toString(16);

    if(v < 16)
    {
        h = "0" + h;
    }

    return h;
}