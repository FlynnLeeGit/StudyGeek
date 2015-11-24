//此js为公有js函数文件

//cookie设置函数封装  传入键名 键值 和过期天数
function setCookie(name, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay); //当前日期加上过期天数成为存到时间对象
	document.cookie = name + '=' + value + ';expires=' + oDate; //设置cookie
}

//读取cookie函数 传入键名
function getCookie(name) {
	var cookieArr = document.cookie.split("; "); //以; 分割cookie并保存为数组
	for (var i = 0; i < cookieArr.length; i++) {
		var tmpArr = cookieArr[i].split("="); //以=分割每个数组元素，
		if (tmpArr[0] == name) { //如果与传参相等 返回键值
			return tmpArr[1];
		}
	}
	return ""; //没有值则返回空
}

//选项卡切换函数封装
function tabSwitch(cName, eventType, fnCallback) {
	var tabIndex; //设定初始索引
	var tag = document.querySelector(cName).children[0].tagName; //获取第一个子标签名
	var tabEles = $(cName + ">" + tag); //获取子元素集合
	var arglen = arguments.length; //获取不定参数量
	tabEles.each(function(index, value) { //遍历元素集合
		$(this).on(eventType, function() { //事件类型由传参决定
			tabEles.removeClass('active');
			$(this).addClass('active'); //时间发生的元素切换样式
			if (arglen == 3) { //不定参等于3执行回调
				fnCallback(index);
			}
		})
	})
}