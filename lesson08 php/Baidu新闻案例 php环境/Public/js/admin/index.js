$(function() {
	$("#table1").collapse("show"); //bs collapse控件 
	$('[data-toggle="tooltip"]').tooltip(); //气泡组件 显示完整的标题与内容


	autoLimitString('.td-title', 10); //调用autoLimitString方法限制标题字符数量
	autoLimitString('.td-content', 35); //限制autoLimitString方法内容字符数量

	function autoLimitString(cName, strNum) {
		var limitEles = $(cName + '>div');
		for (var i = 0; i < limitEles.length; i++) {
			var Txt = limitEles.eq(i).html();
			if (limitEles.length > strNum) {
				limitEles.eq(i).html(Txt.substring(0, strNum) + '...');
			}
		}
	}
});

//编辑按钮点击事件
$('.edit-link').click(function() {
	var newsid = $(this).attr('data-id'); //获得新闻id
	$.ajax({ //ajax请求获得当前id内容
		type: "get",
		url: appPath + "/edit",
		data: {
			'id': newsid
		},
		success: function(data) {
			$('#editnews').html(data); //编辑modal区dom添加
			$('#editnews').modal('show'); //modal窗口显示
		},
		error: function() {
			alert('服务器连接失败');
		}
	});
});