var settingBtn = document.getElementById("settingBtn");
var moreBtn = document.getElementById("moreBtn");
var settingContent = document.getElementById("setting");
var moreContent = document.getElementById("more");

var timer1, timer2;


//设置按钮效果
settingBtn.onmousemove = settingContent.onmousemove = function() {
	clearTimeout(timer1);
	settingContent.style.display = "block";
};
settingBtn.onmouseout = settingContent.onmouseout = function() {

	timer1 = setTimeout(function() {
		settingContent.style.display = "none";
	}, 200);
};

//更多产品按钮效果
moreBtn.onmousemove = moreContent.onmousemove = function() {
	clearTimeout(timer2);
	moreContent.style.display = "block";
};
moreBtn.onmouseout = moreContent.onmouseout = function() {
	timer2 = setTimeout(function() {
		moreContent.style.display = "none";
	}, 200);
};


//响应式跳转页面
mobile();
window.onresize = function() {
	mobile();
};
function mobile() {
	var w = document.documentElement.clientWidth;
	if (w < 600) {
		window.location.replace("mobile.html");
	}
};