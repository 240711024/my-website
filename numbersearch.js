function q(){
    let dgt = [1,2,3,4,5,6,7,8,9];

    dgt.shuffle()

    let a = Array(8);
    x = Math.floor(Math.random()*9);
    x = dgt[x];
    for (let i = 0, j = 0; i < 9; i++) {
        if (dgt[i]==x) {
            continue;
        }

        a[j] = dgt[i];
        j++;
    }
    document.getElementById("question"+qno).innerText = a.join(" ");
}

function start(){
    q();
    stime = Date.now();
}

let qno = 1;
let x = 0;
let stime = 0;
let rank = 0;
document.addEventListener('keydown',myhandler,false);

function myhandler(event) {
    for (let i = '1'; i <= '9'; i++) {
        if (event.key == i) {
            
            document.getElementById("ans"+qno).innerText = '　['+i+']';
            if (i == String(x)) {

                if(qno == 10){
                    let etime = Date.now();
                    let sec = (etime-stime)/1000;
                    if(sec < 10){
                        result.className = "gold"
                        rank = "ゴールド👑";
                    }
                    else if(sec < 15)
                        {
                            result.className = "silver"
                            rank = "シルバー⚔";
                        }
                    else
                        {
                            result.className = "bronze"
                            rank = "ブロンズ🐻";
                        }

                    document.getElementById("result").innerText = "タイム："+sec.toFixed(2)+"秒　ランク："+rank;
                } else {
            
                qno++;
                q();
                }
            }
        }
    }
}

Array.prototype.shuffle = function() {
    let i = this.length;
    while(i){
        let j = Math.floor(Math.random() * i);
        let t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

function shuffle(cards){
    
    cards.shuffle();
    document.getElementById("question"+qno).innerText = cards.join(" ");
}