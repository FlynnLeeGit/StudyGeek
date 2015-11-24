var birthRange = document.getElementById("birth");
var birthShow = document.getElementById("birthShow");
birthRange.onmousemove = function() {
	birthShow.innerHTML = this.value + "年";  //使用range显示年份
};