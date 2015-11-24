var settingBtnObj = document.getElementById("settingBtn");
var settingMenuObj = document.getElementsByClassName("setting-menu")[0];

var moreProductBtnObj = document.getElementById("moreProduct");
var moreContentObj = document.getElementsByClassName("moreContent")[0];
var searchBoxObj = document.getElementById("searchBox");
var searchBtnObj = document.getElementById("searchBtn");
var timer=null;
searchBoxObj.focus(); //获得焦点事件


//	设置按钮事件开始
settingBtnObj.onmouseover = function() {
	settingMenuObj.style.display = "block";
	moreContentObj.style.display = "none";
};


settingMenuObj.onmouseleave = function() {
	settingMenuObj.style.display = "none";
};

settingBtnObj.onmouseleave=function(){
	timer=setTimeout(function(){
		settingMenuObj.style.display="none";
	},500)
};

settingMenuObj.onmouseover=function(){
	clearTimeout(timer);
}

//设置按钮事件结束

//	更多产品事件开始
moreProductBtnObj.onmouseover = function() {
	moreContentObj.style.display = "block";
	settingMenuObj.style.display = "none";
};

moreContentObj.onmouseleave = function() {
	this.style.display = "none";
};