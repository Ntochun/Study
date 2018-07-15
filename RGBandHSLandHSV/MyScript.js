let rgb = [128, 128, 128],
    hsl = [180, "50%", "50%"],
    hsv = [180, "50%", "50%"];

let colorRGB = document.getElementById("colorRGB"),
    colorHSL = document.getElementById("colorHSL"),
    colorHSV = document.getElementById("colorHSV");

let setR = document.getElementById("setR"),
    setG = document.getElementById("setG"),
    setB = document.getElementById("setB"),
    valueR = document.getElementById("valueR"),
    valueG = document.getElementById("valueG"),
    valueB = document.getElementById("valueB");

let setLH = document.getElementById("setLH"),
    setLS = document.getElementById("setLS"),
    setLL = document.getElementById("setLL"),
    valueLH = document.getElementById("valueLH"),
    valueLS = document.getElementById("valueLS"),
    valueLL = document.getElementById("valueLL");

let setVH = document.getElementById("setVH"),
    setVS = document.getElementById("setVS"),
    setVV = document.getElementById("setVV"),
    valueVH = document.getElementById("valueVH"),
    valueVS = document.getElementById("valueVS"),
    valueVV = document.getElementById("valueVV");

function init() {
    setR.value = valueR.value = rgb[0];
    setG.value = valueG.value = rgb[1];
    setB.value = valueB.value = rgb[2];
    setLH.value = valueLH.value = hsl[0];
    setLS.value = valueLS.value = hsl[1];
    setLL.value = valueLL.value = hsl[2];
    setVH.value = valueVH.value = hsv[0];
    setVS.value = valueVS.value = hsv[1];
    setVV.value = valueVV.value = hsv[2];

}

function colorGet() {
    let setRGBValue = function (ele, set) {
        if (ele.value === "") {
            set.value = ele.value = 0;
        } else if (parseInt(ele.value) > 255) {
            set.value = ele.value = 255;
        } else if (ele.value.length > 1) {
            if (ele.value.charAt(0) === "0") {
                set.value = ele.value = parseInt(ele.value);
            } else {
                set.value = ele.value;
            }
        } else {
            set.value = ele.value;
        }
        return set.value;
    };

    let setAngle = function (ele) {
      if (ele.value === ""){
          ele.value = 0;
          return 0;
      }  else if (parseInt(ele.value) > 360){
          ele.value = 360;
          return 360;
      } else if (ele.value.length > 1){
          if (ele.value.charAt(0) === "0"){
              ele.value = parseInt(ele.value);
          } else {
              return ele.value;
          }
      } else {
          return ele.value;
      }
    };

    if (valueR === document.activeElement ||
        valueB === document.activeElement ||
        valueG === document.activeElement ||
        valueLH === document.activeElement ||
        valueLS === document.activeElement ||
        valueLL === document.activeElement ||
        valueVH === document.activeElement ||
        valueVS === document.activeElement ||
        valueVV === document.activeElement) {

        setLH.value = setAngle(valueLH);
        setLS.value = parseInt(valueLS.value);
        setLL.value = parseInt(valueLL.value);
        setVH.value = setAngle(valueVH);
        setVS.value = valueVS.value;
        setVV.value = valueVV.value;

        rgb = [setRGBValue(valueR, setR), setRGBValue(valueG, setG), setRGBValue(valueB, setB)];
        hsl = [setLH.value, setLS.value, setLL.value];
        hsv = [valueVH.value, valueVS.value, valueVV.value];
        let htoRgb = hsvToRgb(hsv);
        setColor(colorRGB, rgb, "rgb");
        setColor(colorHSL, hsl, "hsl");
        setColor(colorHSV, htoRgb, "rgb");

    } else {
        rgb[0] = valueR.value = setR.value;
        rgb[1] = valueG.value = setG.value;
        rgb[2] = valueB.value = setB.value;
        valueLH.value = setLH.value;
        valueLS.value = setLS.value + "%";
        valueLL.value = setLL.value + "%";
        hsv[0] = valueVH.value = setVH.value;
        hsv[1] = valueVS.value = setVS.value + "%";
        hsv[2] = valueVV.value = setVV.value + "%";
        hsl = [valueLH.value, valueLS.value, valueLL.value];
        let htoRgb = hsvToRgb(hsv);
        setColor(colorRGB, rgb, "rgb");
        setColor(colorHSL, hsl, "hsl");
        setColor(colorHSV, htoRgb, "rgb");
    }
}

function setColor(element, color, type) {
    let current = "";

    switch (type) {
        case "rgb":
            current = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
            break;
        case "hsl":
            current = "hsl(" + color[0] + "," + color[1] + "," + color[2] + ")";
            break;

    }
    element.style.backgroundColor = current;
}

window.onload = function () {
    init();
    setInterval(function () {
            colorGet();
        }, 100
    );
};

function hsvToRgb(hsv) {
    let h = parseFloat(hsv[0]),
        s = parseFloat(hsv[1]) / 100,
        v = parseFloat(hsv[2]) / 100;
    let hi = (h / 60) % 6;
    hi = Math.floor(hi);
    let f = h / 60 - hi;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    v = v * 255;
    t = t * 255;
    p = p * 255;
    q = q * 255;

    switch (hi){
        case 0:
            return [v, t, p];
        case 1:
            return [q, v, p];
        case 2:
            return [p, v, t];
        case 3:
            return [p, q, v];
        case 4:
            return [t, p, v];
        case 5:
            return [v, p, q];
    }
}