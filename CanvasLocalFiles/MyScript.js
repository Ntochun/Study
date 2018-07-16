let filesInput = document.getElementById("files");
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let cvsWidth = canvas.width,
    cvsHeight = canvas.height;

let currentImage,
    imgWidth = 0,
    imgHeight = 0;
let x = 0,
    y = 0;
//读取本地文件
filesInput.onchange = function () {
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);
    //1.获取选中的文件列表
    let fileList = filesInput.files;
    let file = fileList[0];
    //读取文件内容
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        //将结果显示到canvas
        showCanvas(reader.result);
    }
};

//指定图片内容显示
function showCanvas(dataUrl) {
    //console.info(dataUrl);
    //加载图片
    let img = new Image();
    currentImage = img;
    img.onload = function () {
        imgWidth = img.width;
        imgHeight = img.height;

        let offset = imgWidth > imgHeight ? cvsWidth / imgWidth : cvsHeight / imgHeight;
        imgWidth = imgWidth * offset;
        imgHeight = imgHeight * offset;

        let setX = Math.abs(cvsWidth - imgWidth) / 2;
        let setY = Math.abs(cvsHeight - imgHeight) / 2;
        ctx.drawImage(img, setX, setY, imgWidth, imgHeight);
    };
    img.src = dataUrl;
    // document.body.appendChild(img);
}

function mousemove(e) {
    let ox = e.offsetX,
        oy = e.offsetY;
    ctx.fillRect(ox, oy, 10, 10);
    x = ox;
    y = oy;
}

canvas.onmousedown = function (e) {
    x = e.offsetX;
    y = e.offsetY;
    canvas.addEventListener("mousemove", mousemove);
};

canvas.onmouseup = function () {
    canvas.removeEventListener("mousemove", mousemove);
};

canvas.onmouseout = function () {
    canvas.removeEventListener("mousemove", mousemove);
};