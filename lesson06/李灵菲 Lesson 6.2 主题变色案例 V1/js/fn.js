//对象原型上添加类操作的相关方法
Object.prototype.addClass = function(cname) {        //添加类
	this.className += " "+cname;
}

Object.prototype.removeClass = function(cname) {     //移除类 正则判断有就删除此类
	var reg = eval('/\s*' + cname + '\s*/'); 
	this.className = this.className.replace(reg, "");
}

//选项卡函数封装 传入参数为父级class名称 以及回调函数
function tabSwitch(cName, fnCallback) {
	var flag = arguments.length; //开关变量 获得不定参的数量	
	var tag=document.querySelector(cName).children[0].tagName; //获得子节点的第一个标签名
	var elements=document.querySelectorAll(cName+">"+tag);

	for (var i = 0; i < elements.length; i++) {
		if (/active/.test(elements[i].className)) { //判断 含有active的选项卡存到listIndex索引中
			var listIndex = i;
		}
		elements[i].index = i; //此时的i还在循环中，将它赋值给元素对象 的index键名  当成索引值
		elements[i].onclick = function() { //循环赋予onclick事件
			elements[listIndex].removeClass("active"); //原选项卡移除active样式
			this.addClass("active");      //现选项卡添加active样式
			listIndex = this.index; //索引值保存
			if (flag == 2) { //不定参为2 时 执行回调函数,并且传入索引值
				fnCallback(listIndex);
			}
		}
	}
}

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