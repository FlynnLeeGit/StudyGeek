var stage = document.getElementsByClassName("view")[0];
//获取舞台父级元素

var viewX = document.getElementById("viewX");
var viewY = document.getElementById("viewY");
var distance = document.getElementById("distance");
var viewXarea = document.getElementById("viewX-area");
var viewYarea = document.getElementById("viewY-area");
var disArea = document.getElementById("dis-Area");

var resetBtn = document.getElementById("reset");

//重置功能实现
resetBtn.onclick = function() {
	stage.style.webkitPerspectiveOrigin = "150px 150px";
	stage.style.webkitPerspective = "";

	viewXarea.innerHTML = "视野原点X 150px";
	viewX.value = 150;
	viewYarea.innerHTML = "视野原点Y 150px";
	viewY.value = 150;
	disArea.innerHTML = "透视距离 0px";
	distance.value = 0;
}

//滑块功能实现
viewX.onmousemove = function() {
	stage.style.webkitPerspectiveOrigin = this.value + "px " + viewY.value + "px";
	viewXarea.innerHTML = "视野原点X " + this.value + "px";
}
viewY.onmousemove = function() {
	stage.style.webkitPerspectiveOrigin = viewX.value + "px " + this.value + "px ";
	viewYarea.innerHTML = "视野原点Y " + this.value + "px";
}
distance.onmousemove = function() {
	stage.style.webkitPerspective = this.value + "px";
	disArea.innerHTML = "透视距离 " + this.value + "px";
}

paint();
//随机绘色
function paint() {
	var pieceObj = document.getElementsByClassName("piece");
	var colorArr = ["rgba(255,0,0,0.4)", "rgba(0,255,0,0.4)", "rgba(0,0,255,0.4)", "rgba(255,255,0,0.4)", "rgba(255,255,255,0.4)", "rgba(0,255,255,0.4)"];
	var pieceText = ["R", "G", "B", "Y", "W", "T"];

	var boxArr = [0, 0, 0, 0, 0, 0];

	var ranNum = -1;
	var randomColor = "";
	for (var j = 0; j < 6; j++) {
		for (var i = 0; i < 9; i++) {
			getColor();
			pieceObj[j].children[i].style.backgroundColor = randomColor;
			pieceObj[j].children[i].innerHTML = pieceText[ranNum] + boxArr[ranNum];
		};
	};

	//魔方色彩随机数函数

	function getColor() {

		ranNum = parseInt(Math.random() * 6);
		if (boxArr[ranNum] < 9) {
			boxArr[ranNum] += 1;
			randomColor = colorArr[ranNum];
		} else {
			getColor();
		};

	};
};