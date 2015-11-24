//用户名输入框失去焦点时ajax请求是否存在此用户
$('#username').blur(function() {
	var userid = $(this).val();
	$.ajax({
		url: '/admin/userAjax/'+userid,
		success: function(data) {
			if (data == 1) {
				$('#username').css('border-color', 'green');  //返回1则存在 边框绿
			} else {
				$('#username').css('border-color', 'red');    //返回0则不存在 边框红
			}
		}
	})
});

$('#login-form').on('submit',function(){
	$.ajax({
		url:'/admin/userLogin/',
		type:'post',
		data:{'username':$('#username').val(),'password':$('#password').val()},
		success:function(data){
			if(data==0){
				$('.errlogin').css('visibility','visible');
			}
		}
	});
});
