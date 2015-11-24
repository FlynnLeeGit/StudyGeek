var classArr = ["语文", "数学", "英语", "化学", "物理", "体育"];
var colorArr = ["lightblue", "lightgrey", "lightsalmon", "lightpink", "lightgreen", "lightyellow"];
var tb = document.getElementById("table");
for (var i = 0; i < 8; i++) {
	for (var j = 0; j < 7 ; j++) {
		
		var td = document.createElement("td");
		td.className = "subject";
		var radom = parseInt(Math.random() * 6); //获得随机整数
		var bgColor = colorArr[radom]; //赋予颜色
		var subjectName = classArr[radom]; //赋予课程名称
		td.style.backgroundColor = j<5?bgColor:"white";
		td.innerHTML = j<5?subjectName:"休";
		tb.tBodies[0].rows[i].appendChild(td); //添加入表格rows节点
	};
};