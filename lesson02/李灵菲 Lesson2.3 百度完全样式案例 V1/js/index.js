var settingBtn = document.getElementById("settingBtn");
var moreBtn = document.getElementById("moreBtn");
var settingContent = document.getElementById("setting");
var moreContent = document.getElementById("more");

var timer1 = null;
var timer2 = null;

settingBtn.onmousemove = settingContent.onmousemove= function() {
	clearTimeout(timer1);
	settingContent.style.display = "block";
};
settingBtn.onmouseout = settingContent.onmouseout = function() {
	timer1 = setTimeout(function() {
		settingContent.style.display = "none";
	}, 200);
};


moreBtn.onmousemove = moreContent.onmousemove = function() {
	clearTimeout(timer2);
	moreContent.style.display = "block";
};
moreBtn.onmouseout = moreContent.onmouseout = function() {
	timer2 = setTimeout(function() {
		moreContent.style.display = "none";
	}, 200);
};


var searchBox=document.getElementById("searchBox");
searchBox.focus();
