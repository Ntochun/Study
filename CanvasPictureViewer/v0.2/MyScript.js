let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let sWidth = window.innerWidth,
    sHeight = window.innerHeight;

cvs.width = sWidth * 0.95;
cvs.height = sHeight * 0.95;

let img,
    imgLoaded = false,
    imgX = 0,
    imgY = 0,
    imgScale = 1;

function clearCanvas() {
    //实验表明重置canvas宽度或高度比clearRect效果好。
    cvs.height = sHeight * 0.95;
}

class Button {
    constructor(type, x, y, radius) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.r = radius;
    };

    isOnButton(ox, oy) {
        let d = Math.sqrt(Math.pow(this.x - ox, 2) + Math.pow(this.y - oy, 2)) - this.r;
        return d <= 0;
    }

    draw(r) {
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.stroke();
    }

    show() {
        this.draw(this.r);
    }

    mouseMove(ox, oy) {
        if (this.isOnButton(ox, oy)) {
            ctx.strokeStyle = "white";
            this.draw(this.r);
        } else {
            this.show(this.r);
        }
    }

    mouseDown(ox, oy) {
        if (!this.isOnButton(ox, oy)){return false;}
        ctx.strokeStyle = "white";
        this.draw(this.r - 3);
    }

    mouseUp(ox, oy) {
        if (!this.isOnButton(ox, oy)){return false;}
        ctx.strokeStyle = "white";
        this.draw(this.r);
    }
}

let btn = new Button("open", 100, 100, 15);
btn.show();

cvs.onmousemove = function (e) {
    clearCanvas();
    if(imgLoaded){
        drawImage();
    }

    //ctx.clearRect(0, 0, cvs.width, cvs.height);
    let ox = e.offsetX,
        oy = e.offsetY;
    btn.show();
    btn.mouseMove(ox, oy);

};

cvs.onmousedown = function (e) {
    clearCanvas();
    let ox = e.offsetX,
        oy = e.offsetY;
    btn.mouseDown(ox, oy);
};

cvs.onmouseup = function (e) {
    clearCanvas();
    let ox = e.offsetX,
        oy = e.offsetY;
    btn.mouseUp(ox, oy);
};

cvs.onclick = function (e) {
    let ox = e.offsetX,
        oy = e.offsetY;
    if (btn.isOnButton(ox, oy)){
        let inputFiles = document.createElement("input");
        inputFiles.type = "file";
        inputFiles.accept = "image/*";
        inputFiles.id = "files";
        inputFiles.onchange = function(){
            imgLoaded = false;
            imgX = imgY = 0;
            //1.获取选中的文件列表
            let fileList = inputFiles.files;
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
        inputFiles.click();
    }
};

//指定图片内容显示
function showCanvas(dataUrl) {
    //console.info(dataUrl);
    //加载图片
    img = new Image();
    img.onload = function () {
        // 确定缩放比例尺
        imgScale = img.width > img.height ? cvs.width / img.width : cvs.height / img.height;
        imgScale = img.width * imgScale > cvs.width ? cvs.width / img.width : imgScale;
        imgScale = img.height * imgScale > cvs.height ? cvs.height / img.height : imgScale;

        //cvs.width = img.width * imgScale;
        //cvs.height = img.height * imgScale;
        imgX = (cvs.width - img.width*imgScale) / 2;
        imgY = (cvs.height - img.height*imgScale) / 2;
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