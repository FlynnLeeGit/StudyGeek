var eles = document.querySelectorAll(".theme"); //获取所有主题相关元素集合

var themeArr = ["default", "indigo", "amber", "purple", "pink"]; //主题索引数组
var themeIndex = getCookie("themeIndex") || 0; //获取存取主题索引cookie值 若为空则设获取

initTheme(themeIndex); //初始化页面主题

function initTheme(themeIndex) {
	var pickEles = document.querySelectorAll(".theme-picker>a"); //获取主体选项卡元素集合
	for (var i = 0; i < eles.length; i++) { //应用cookie中存储的主题颜色
		eles[i].addClass(themeArr[themeIndex]);
	}
	pickEles[themeIndex].className += "active"; //已选取主题的选项卡设为active
};

tabSwitch(".theme-picker", function(index) { //主题选取选项卡启用，返回被点击选项卡的index值
	for (var i = 0; i < eles.length; i++) { //遍历元素
		eles[i].removeClass(themeArr[themeIndex]); //去除已存在的主题类
		eles[i].addClass(themeArr[index]); //添加新的主题类
	}
	themeIndex = index; //保存索引值 并将其存入cookies中
	setCookie("themeIndex", themeIndex, 14);
});

tabSwitch(".navs-menu"); //页面导航选项卡启用
tabSwitch(".topic-wrap"); //侧边栏话题区导航选项卡启用