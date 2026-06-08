let ctx;

function init() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    setInterval(drawClock, 1000);
    drawClock();
}

function drawClock() {

    ctx.clearRect(0, 0, 200, 200);


    for (let i = 0; i < 12; i++) {

        ctx.save();

        let r = (Math.PI / 6) * i;

        ctx.translate(100, 100);
        ctx.rotate(r);

        ctx.beginPath();
        ctx.moveTo(0, -80);
        ctx.lineTo(0, -70);
        ctx.stroke();

        ctx.restore();
    }


    let now = new Date();

    let h = now.getHours() % 12;
    let m = now.getMinutes();
    let s = now.getSeconds();

    
    let radH = ((Math.PI * 2) / 12) * h
             + ((Math.PI * 2) / 12) * (m / 60);

    let radM = ((Math.PI * 2) / 60) * m;

    let radS = ((Math.PI * 2) / 60) * s;

    // 時針
    ctx.save();
    ctx.translate(100, 100);
    ctx.rotate(radH);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -40);
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.restore();

    // 分針
    ctx.save();
    ctx.translate(100, 100);
    ctx.rotate(radM);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -60);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();

    // 秒針
    ctx.save();
    ctx.translate(100, 100);
    ctx.rotate(radS);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -70);
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
}