let canvas = document.getElementById("cvs");
let ctx = canvas.getContext("2d");
let timerId = NaN;
let count = 0;
let num = 0;      

let img = new Array();

for (i = 0; i < 10; i++) {
    img[i] = new Image();
    img[i].src = "numbers/" + i + ".png";
}

function startTimer() {
    timerId = setInterval(tick, 500);
}

function stopTimer() {
    clearInterval(timerId);
}

function tick() {
    ctx.clearRect(0, 0, 640, 352);

    ctx.drawImage(img[num], 100, 100);
    ctx.drawImage(img[num], 200, 100);
    ctx.drawImage(img[num], 300, 100);
    ctx.drawImage(img[num], 400, 100,200,200);
    count++;
    num++;        

    if (count == 10) {
        count = 0;
        num = 0;
    }
}