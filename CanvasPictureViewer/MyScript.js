let zoomIn = document.getElementById("zoomIn");
let zoomOut = document.getElementById("zoomOut");
let move = document.getElementById("move");
let filesInput = document.getElementById("files");
let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');
let cWidth = 1100,
    cHeight = 550;


let img,
    imgLoaded = false,
    imgX = 0,
    imgY = 0,
    imgScale = 1;

let x = 0,
    y = 0,
    operation = "move";

//读取本地文件
filesInput.onchange = function () {
    imgLoaded = false;
    imgX = imgY = 0;
    //1.获取选中的文件列表
    let fileList = filesInput.files;
    let file = fileList[0];
    //读取文件内容
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        //将结果显示到canvas
        showCanvas(reader.result);
        imgLoaded = true;
    }
};

//指定图片内容显示
function showCanvas(dataUrl) {
    //console.info(dataUrl);
    //加载图片
    img = new Image();
    img.onload = function () {
        imgScale = img.width > img.height ? cWidth / img.width : cHeight / img.height;
        imgScale = img.width * imgScale > cWidth ? cWidth / img.width : imgScale;
        imgScale = img.height * imgScale > cHeight ? cHeight / img.height : imgScale;
        cvs.width = img.width * imgScale;
        cvs.height = img.height * imgScale;
        drawImage();
    };
    img.src = dataUrl;
    // document.body.appendChild(img);
}

function drawImage() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(
        img, //规定要使用的图像、画布或视频。
        0, 0, //开始剪切的 x 坐标位置。
        img.width, img.height,  //被剪切图像的高度。
        imgX, imgY,//在画布上放置图像的 x 、y坐标位置。
        img.width * imgScale, img.height * imgScale  //要使用的图像的宽度、高度
    );
}

zoomIn.onclick = function () {
    operation = "zoomIn";
};
zoomOut.onclick = function () {
    operation = "zoomOut";
};
move.onclick = function () {
    operation = "move";
};

function mousemove(e) {
    let ox = e.offsetX,
        oy = e.offsetY;
    ctx.fillRect(ox, oy, 10, 10);
    cvs.style.cursor = "move";
    imgX = ox - x;
    imgY = oy - y;
    drawImage();
    //x = ox;
    //y = oy;
}

cvs.onmousedown = function (e) {
    if (!imgLoaded) {
        return false;
    }
    x = e.offsetX - imgX;
    y = e.offsetY - imgY;

    switch (operation) {
        case "zoomIn":
            imgScale *= 2;
            imgX = imgX * 2 - e.offsetX;
            imgY = imgY * 2 - e.offsetY;
            drawImage();
            break;
        case "zoomOut":
            imgScale /= 2;
            imgX = imgX / 2 + e.offsetX / 2;
            imgY = imgY / 2 + e.offsetY / 2;
            if (img.width * imgScale < cvs.width || img.height * imgScale < cvs.height) {
                imgScale *= 2;
                imgX = imgY = 0;
            }
            drawImage();
            break;
        case "move":
            cvs.addEventListener("mousemove", mousemove);
            cvs.onmouseup = function (e) {
                cvs.removeEventListener("mousemove", mousemove);
                cvs.style.cursor = "default";
            };

            cvs.onmouseout = function () {
                cvs.removeEventListener("mousemove", mousemove);
                cvs.style.cursor = "default";
            };
            break;
    }
};

cvs.oncontextmenu = function (e) {
    return false;
};
