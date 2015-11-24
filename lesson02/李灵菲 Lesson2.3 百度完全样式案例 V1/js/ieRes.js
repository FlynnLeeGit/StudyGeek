window.onload = function() {
	var navObj = document.getElementById("nav");
	var moreObj = document.getElementById("more");
	var bodyObj = document.getElementById("body");
	var footObj = document.getElementById("foot");

	ieResponsive();


	window.onresize = function() {
		ieResponsive();
	};


	function ieResponsive() {
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;
		if (w > 800) {
			navObj.style.left = moreObj.style.left = bodyObj.style.left = footObj.style.left = bodyObj.style.marginLeft = footObj.style.marginLeft = "";
			navObj.style.right = "15px";
			moreObj.style.right = "0";
			bodyObj.style.left = footObj.style.left = "50%";
			bodyObj.style.marginLeft = "-320px";
			footObj.style.marginLeft = "-350px";
		};
		if (w <= 800) {
			navObj.style.right = moreObj.style.right = bodyObj.style.left = footObj.style.left = bodyObj.style.marginLeft = footObj.style.marginLeft = "";
			navObj.style.left = "335px";
			moreObj.style.left = "712px";
			bodyObj.style.left = "80px";
			footObj.style.left = "50px";
		}
		if (h > 600) {
			bodyObj.style.top = footObj.style.top = "";

			bodyObj.style.bottom = "62%";
			footObj.style.bottom = "50px";
		};
		if (h <= 600) {
			bodyObj.style.bottom = footObj.style.bottom = "";
			bodyObj.style.top = "40px";
			footObj.style.top = "450px";
		}

	};
};