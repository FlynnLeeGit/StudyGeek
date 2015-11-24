//设定响应式修改画面
pc();
window.onresize = function() {
	pc();
}
function pc() {
	var w = document.documentElement.clientWidth;
	if (w > 600) {
		window.location.replace("index.html");
	}
}


//切换更多按钮内容
var navsMoreContent = document.querySelector(".row2");
function showMore() {
	navsMoreContent.style.display == "none" ? navsMoreContent.style.display = "flex" : navsMoreContent.style.display = "none";
}