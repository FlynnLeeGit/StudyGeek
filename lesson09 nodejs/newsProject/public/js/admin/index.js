$(function() {
	$("#table1").collapse("show"); //bs collapse控件 
	$('[data-toggle="tooltip"]').tooltip(); //气泡组件 显示完整的标题与内容

	autoLimitString('.td-title', 16); //调用autoLimitString方法限制标题字符数量
	autoLimitString('.td-content', 38); //限制autoLimitString方法内容字符数量

	function autoLimitString(cName, strNum) {
		var limitEles = $(cName + '>div');
		for (var i = 0; i < limitEles.length; i++) {
			var Txt = limitEles.eq(i).text();
			if (Txt.length > strNum) {
				limitEles.eq(i).text(Txt.substring(0, strNum) + '...');
			}
		}
	}
});
//编辑按钮点击事件
$('.edit-link').click(function() {
	var newsid = $(this).attr('data-id');

	$.ajax({
		type: "get",
		url: "/admin/edit/" + newsid,
		success: function(data) {
			$('.editId').val(data[0].id);
			$('.editTitle').val(data[0].news_title);
			$('.editContent').val(data[0].news_content);
			$('.editImg').attr('src', '/image/front/newslist/' + data[0].news_img);
			$('.editType option').eq(data[0].news_type_id).attr('selected', true);
			$('.editLabel option').eq(data[0].news_label_id).attr('selected', true);
			$('.editMsg').hide();
			$('#editNews').modal('show'); //模态编辑窗口显示
		},
		error: function(err) {
			alert('服务器连接不上！');
		}
	});
});

$('.del-link').click(function() {
	var newsid = $(this).attr('data-id');
	if (confirm('确定需要删除记录么?')) {
		$.ajax({
			type: "get",
			url: "/admin/del/" + newsid,
			success: function(data) {
				if (data == 'ok') {
					window.location.reload();
				} else {
					alert('数据删除失败！');
				}
			},
			error: function() {
				alert('服务器连接失败！');
			}
		});
	}
});



function ajaxEdit(msg) {
	$('.editMsg').hide();
	if (msg == 1) {
		$('.editMsg1').show();
	}
	if (msg == 2) {
		$('.editMsg2').show();
	}
	if (msg == 4) {
		$('.editMsg4').show();
		setTimeout(function() {
			$('#editNews').modal('hide');
			window.location.reload();
		}, 100);
	}
}


function ajaxAdd(msg) {
	$('.addMsg').hide();
	$('.addMsg' + msg).show(); //相应的信息显示
	if (msg == 4) {
		setTimeout(function() {
			$('#addNews').modal('hide');
			window.location.reload();
		}, 100);
	}
}