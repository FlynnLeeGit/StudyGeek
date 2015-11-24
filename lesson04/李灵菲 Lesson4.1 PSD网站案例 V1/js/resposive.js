//头部自适应浏览器高度

var headerObj = document.getElementsByClassName("header")[0];
var h = document.documentElement.clientHeight;
setHeight();

function setHeight() {
	h = document.documentElement.clientHeight;
	headerObj.style.height = 0.35 * h + "px";
};
window.onresize = function() {
	setHeight();
};