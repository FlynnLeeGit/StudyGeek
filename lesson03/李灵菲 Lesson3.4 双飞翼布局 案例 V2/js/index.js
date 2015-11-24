var leftInput = document.getElementById("lr");
var rightInput = document.getElementById("rr");
var leftText = document.getElementById("lr-text");
var rightText = document.getElementById("rr-text");
//获取控制按钮对象

var leftSide = document.getElementsByClassName("left")[0];
var rightSide = document.getElementsByClassName("right")[0];
var middleContent = document.getElementsByClassName("middleContent")[0];
//获取区块对象

var w = "";
var h = "";


//实时更新区块宽度
leftInput.onmousemove = function() {
	leftSide.style.width = middleContent.style.marginLeft = this.value + "px";
	leftText.innerHTML = this.value;
}
rightInput.onmousemove = function() {
	rightSide.style.width = middleContent.style.marginRight = this.value + "px";
	rightSide.style.marginLeft = "-" + this.value + "px";
	rightText.innerHTML = this.value;
}

//响应式区块宽度
window.onresize = function() {
	w = document.documentElement.clientWidth
	h = document.documentElement.clientHeight;
	if (w > 970) {
		leftSide.style.display = rightSide.style.display = "block";
		middleContent.style.marginLeft = leftInput.value + "px";
		middleContent.style.marginRight = rightInput.value + "px";
	};
	if (w > 750 && w < 970) {
		leftSide.style.display = "block";
		middleContent.style.marginLeft = leftInput.value + "px";
		rightSide.style.display = "none";
		middleContent.style.marginRight = "0";
	};
	if (w < 750) {
		leftSide.style.display = "none";
		middleContent.style.marginLeft = "0";
	};
}