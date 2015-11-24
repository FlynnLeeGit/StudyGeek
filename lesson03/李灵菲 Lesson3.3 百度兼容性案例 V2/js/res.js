var navObj = document.getElementById("nav");
var moreObj = document.getElementById("more");
var bodyObj = document.getElementById("body");
var footObj = document.getElementById("foot");
var settingObj=document.getElementById("setting");

var ieString=navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
var ieVerson = "";
//判断ie版本号,用作调整搜索栏居中样式
if (ieString == "MSIE6.0") {
	ieVerson = 6;
};
if (ieString == "MSIE7.0") {
	ieVerson = 7;
};
if (ieString == "MSIE8.0") {
	ieVerson = 8;
};

ieResponsive();

//拖动窗口边界时启用
window.onresize = function() {
	ieResponsive();
};

//分辨率响应式样式
function ieResponsive() {
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	if (w > 800) {
		navObj.style.left = moreObj.style.left = bodyObj.style.left = footObj.style.left = settingObj.style.left="";
		bodyObj.style.marginLeft = footObj.style.marginLeft = "";
		
		navObj.style.right = "15px";
		moreObj.style.right = "0";
		bodyObj.style.left = footObj.style.left = "50%";
		bodyObj.style.marginLeft = "-320px";
		footObj.style.marginLeft = "-350px";

		if (ieVerson == 6 || ieVerson == 7) {
			bodyObj.style.marginLeft = bodyObj.style.left = "0"; //ie6,7特殊 居中样式
			settingObj.style.right="69px";                      //ie6,7设置内容区位置
		};
		if(ieVerson==8){
			settingObj.style.right="76px";                   //ie8定位
		}
	};
	
	if (w <= 800) {
		navObj.style.right = moreObj.style.right = bodyObj.style.left = footObj.style.left = bodyObj.style.marginLeft = footObj.style.marginLeft= settingObj.style.right = "";
		navObj.style.left = "335px";
		moreObj.style.left = "712px";
		bodyObj.style.left = "80px";
		footObj.style.left = "50px";
		settingObj.style.left="655px";
	}
	if (h > 600) {
		bodyObj.style.top = footObj.style.top = "";

		bodyObj.style.bottom = "62%";
		footObj.style.bottom = "50px";
	};
	if (h <= 600) {
		bodyObj.style.bottom = footObj.style.bottom = "";
		bodyObj.style.top = "40px";
		footObj.style.top = "450px";
	}
};


//解决ie6 和ie7 下hove以及focus无效的bug
var searchBox = document.getElementById("searchBox");
searchBox.focus();
var flag;

searchBox.onfocus = function() {
	flag = 1;
	this.style.borderColor = "#4791FF";
};
searchBox.onblur = function() {
	flag = 0;
	this.style.borderColor = "#B8B8B8";
};

document.onmousemove = function() { //判断文档鼠标事件,当已有focus事件时不触发调整边框颜色
	if (flag == 0) {
		searchBox.onmouseover = function() {
			this.style.borderColor = "#999999";
		};
		searchBox.onmouseout = function() {
			this.style.borderColor = "#B8B8B8";
		};
	} else if (flag == 1) {
		searchBox.onmouseover = function() {
			this.style.borderColor = "#4791FF";
		};
		searchBox.onmouseout = function() {
			this.style.borderColor = "#4791FF";
		};
	};
};

