function init() {
    let b = document.getElementById("board");
    for (let i= 0; i < 8; i++) {
        let tr = document.createElement("tr");
        for (let j= 0; j < 8; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
            let img = document.createElement("img");
            //属性設定(src, classname, id, onclick)
            img.setAttribute("src","壁/chipA.png")
            img.setAttribute("class","cell")
            img.setAttribute("id", "img" + i + j)
            img.setAttribute("onclick", "clicked(this)");

            img.setAttribute("onmouseover","overed(this)");
            
            td.appendChild(img);
        }
        b.appendChild(tr);
    }

}

function clicked(e) {
    e.setAttribute("src", "壁/chipC.png");
}

function overed(e) {
    if (press) {
        e.setAttribute("src","壁/chipC.png");
    }
}

let press = false;
function mode() {
    press = !press;

    if (press)
 {
    document.getElementById("info").innerHTML = "描画ON";
} else {
    document.getElementById("info").innerHTML = "描画OFF";
}}
