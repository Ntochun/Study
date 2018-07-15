let bColor = ["#000000", "#999999", "#cc66ff", "#ff0000", "#ff9900", "#ffff00", "#008000", "#00ccff"];
let color = "ff0000"; //当前画笔颜色

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

function initBrush() {
    let colorContainer = document.getElementById("colorContainer");
    for (let i=0; i<=bColor.length; i++){
        let span = document.createElement("span");
        span.className = "setColor";
        if (i<bColor.length){
            span.style.cssText += "background-color :" + bColor[i];
            span.addEventListener("click", function () {
                color = bColor[i];
            });
        } else {
            span.style.cssText += "background-color : white";
            let node = document.createTextNode("X");
            span.appendChild(node);
            span.addEventListener("click", function () {
                ctx.clearRect(0, 0, cvs.width, cvs.height);
            });
        }
        colorContainer.appendChild(span);
    }

}
function initPaint(){
    let x, y;
    ctx.lineWidth = 2;

    let mousemove = function (ev) {

        let ox = ev.offsetX,
            oy = ev.offsetY;
        ctx.lineTo(x, y);
        ctx.stroke();
        x = ox;
        y = oy;
    };

    cvs.addEventListener("mousedown", function (ev) {
        ev.preventDefault();
        ctx.strokeStyle = color;
        x = ev.offsetX;
        y = ev.offsetY;
        ctx.beginPath();
        ctx.moveTo(x, y);
        cvs.addEventListener("mousemove", mousemove);
    });

    cvs.addEventListener("mouseup", function (ev) {
        cvs.removeEventListener("mousemove", mousemove);
    })
}

initBrush();
initPaint();
