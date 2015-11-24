//通用选项卡函数封装
//第一个参数为父类class名 第二个为事件监听事件的事件名称 第三个为回调函数
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

//鼠标划过显示函数封装 参数为按钮 显示内容类名
function hoverShow(btn,showClass){
	var timer;
	$(btn+","+showClass).hover(function(){    //按钮与内容移入显示 移出隐藏
		clearTimeout(timer);                  //清除定时器
		$(showClass).show();

	},function(){
		timer=setTimeout(function(){         //创建定时器，为了移出的时候不会立即消失内容区
			$(showClass).hide();
		},200)
	})
}

