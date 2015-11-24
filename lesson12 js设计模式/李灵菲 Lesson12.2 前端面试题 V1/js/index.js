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
var listtab = new NormalTab();   //创键选项卡实例对象 
listtab.init({
	btns: '.menu-list li',        //元素集合
	active:'activeitem',          //样式改变的类名
	callback: function(index,value) {   //回调函数
		radomColor();
		var currentPanel=panelArr[index];
		currentPanel.className = "panel panel-warning";   //修改目标页样式
		$('#follow-btn').css({   //修改跟随按钮位置
			left:$(currentPanel).offset().left+currentPanel.offsetWidth-50,
			top:$(currentPanel).offset().top+currentPanel.offsetHeight-50,
			position:'absolute',
			opacity:0.7
		})
	}
});
var listScroll=new Scroll('.menu-list li',400,'.panel');  //批量按钮滚动实例
var fixbtn=new Scroll('#fixed-btn',500);    //右下角按钮滚动实例
var followbtn=new Scroll('#follow-btn',500);    //跟随按钮滚动实例


