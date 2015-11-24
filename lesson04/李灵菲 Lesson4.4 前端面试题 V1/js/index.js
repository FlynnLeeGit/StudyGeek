var panelArr = document.querySelectorAll(".panel"); //获取panel元素dom集盒
var colorArr = [" panel-default", " panel-info", " panel-primary"];
var radom;
radomColor();

function radomColor() { //随机panel色函数
	for (var i = 0; i < panelArr.length; i++) {
		radom = parseInt(Math.random() * 3);
		panelArr[i].className = "panel" + colorArr[radom];
	}
}

function changeColor(num) { //点击连接修改颜色
	radomColor();
	panelArr[num].className = "panel panel-warning";
}