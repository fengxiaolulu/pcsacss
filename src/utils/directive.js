import Vue from 'vue'

var winWidth = 0;
var winHeight = 0;

function findDimensions() {
	//获取窗口宽度
	if(window.innerWidth)
		winWidth = window.innerWidth;
	else if((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;
	//获取窗口高度
	if(window.innerHeight)
		winHeight = window.innerHeight;
	else if((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	//通过深入Document内部对body进行检测，获取窗口大小
	if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
	//结果输出至两个文本框
	return {
		winWidth,
		winHeight
	}
	//document.form1.availWidth.value = winWidth;
}
var obj = findDimensions();
//Find out what kind of resize! Return a string inlcluding the directions
function getDirection(el) {
	var xPos, yPos, offset, dir;
	dir = "";

	xPos = window.event.offsetX;
	yPos = window.event.offsetY;

	offset = 8; //The distance from the edge in pixels

	if(yPos < offset) dir += "n";
	else if(yPos > el.offsetHeight - offset) dir += "s";
	if(xPos < offset) dir += "w";
	else if(xPos > el.offsetWidth - offset) dir += "e";

	return dir;
}

function g(id) {
	return document.getElementById(id)
};

window.onresize = function temp() {
	obj = findDimensions();
	//console.log(obj);
};

console.log(obj);
//声明需要用到的变量
var mx = 0,
	my = 0; //鼠标x、y轴坐标（相对于left，top）
var dx = 0,
	pageW,
	pageH,
	dialogW,
	dialogH,
	dy = 0; //对话框坐标（同上）
var isDraging = false; //不可拖动
var moveX,moveY;
//调用函数，获取数值
//window.onresize = findDimensions;
var isEleDrag = false;
var oDivPart; //当前元素
Vue.directive('drags', //自定义指令 JS
	{
		bind: function(el, binding) {
			console.log(el);
			//鼠标按下
			
			el.addEventListener('mousedown', function(e) {
				var e = e || window.event;
				console.log("funPanelArea");
				e.stopPropagation();
				mx = e.pageX; //点击时鼠标X坐标
				my = e.pageY; //点击时鼠标Y坐标
				dx = g("funPanelArea").offsetLeft;
				dy = g("funPanelArea").offsetTop;
				isDraging = true; //标记对话框可拖动
				document.onmousemove = function(e) {
					var e = e || window.event;
					var x = e.pageX; //移动时鼠标X坐标
					var y = e.pageY; //移动时鼠标Y坐标
					if(isDraging) { //判断对话框能否拖动
						moveX = dx + x - mx; //移动后对话框新的left值
						moveY = dy + y - my; //移动后对话框新的top值
						g("funPanelArea").style.left = moveX + 'px'; //重新设置对话框的left
						g("funPanelArea").style.top = moveY + 'px'; //重新设置对话框的top
						//设置拖动范围
						var pageavW = document.documentElement.clientWidth;
						var pageavH = document.documentElement.clientHeight;
						//console.log(pageavW);
						//console.log(pageavH);
						var dialogavW = el.offsetWidth;
						var dialogavH = el.offsetHeight;
						var maxX = pageavW - dialogavW; //X轴可拖动最大值
						var maxY = pageavH - dialogavH; //Y轴可拖动最大值

						moveX = Math.min(Math.max(0, moveX), maxX); //X轴可拖动范围
						moveY = Math.min(Math.max(0, moveY), maxY); //Y轴可拖动范围
						console.log(moveX);
						//console.log(moveY);
						//console.log("funPanelAreaMove");
						g("funPanelArea").style.left = moveX + 'px'; //重新设置对话框的left
						g("funPanelArea").style.top = moveY + 'px'; //重新设置对话框的top
					};
				};

			});
			//console.log(document.onmousemove);
			//鼠标离开
			document.addEventListener('mouseup', function() {
				isDraging = false;
				//console.log("funPanelAreaDown");
			});
		}
	}
);

Vue.directive('dragresize', //自定义指令 JS
	{
		bind: function(el, binding) {
			var theobject = null; //

			function resizeObject() {
				this.el = null; //
				this.dir = ""; //(n, s, e, w, ne, nw, se, sw)
				this.grabx = null; //
				this.graby = null;
				this.width = null;
				this.height = null;
				this.left = null;
				this.top = null;
			}

			//
			function getDirection(el) {
				var xPos, yPos, offset, dir;
				dir = "";

				xPos = window.event.offsetX;
				yPos = window.event.offsetY;

				offset = 20; //The distance from the edge in pixels
				console.log(yPos);
				if(yPos < offset) dir += "n";
				else if(yPos > el.offsetHeight - offset) dir += "s";
				if(xPos < offset) dir += "w";
				else if(xPos > el.offsetWidth - offset) dir += "e";

				return dir;
			}
			var dir = "";

			function doDown() {
				$(el).find(".v_con").addClass("block");
				if(el == null) {
					theobject = null;
					return;
				}
				dir = getDirection(el);
				if(dir == "") return;

				theobject = new resizeObject();
				theobject.el = el;
				theobject.dir = dir;

				theobject.grabx = window.event.clientX;
				theobject.graby = window.event.clientY;
				theobject.width = el.offsetWidth;
				theobject.height = el.offsetHeight;
				theobject.left = el.offsetLeft;
				theobject.top = el.offsetTop;
				document.onmousemove = doMove;
			}

			function doUp() {
				if(theobject != null) {
					theobject = null;
				}
				document.onmousemove = null;
				$('.resizeMe').find(".v_con").removeClass("block");
				el.style.cursor = null;
			}

			function elDoUp() {
				if(theobject != null) {
					theobject = null;
				}
				document.onmousemove = null;
				var xPos, yPos, str, xMin, yMin;
				xMin = 8; //The smallest width possible
				yMin = 8; //height
				if(el.className.indexOf("resizeMe") != -1) {
					str = getDirection(el);
					if(str == "") str = "default";
					else str += "-resize";
					el.style.cursor = str;
				}
			}

			function doMove() {
				var xPos, yPos, str, xMin, yMin;
				xMin = 8; //The smallest width possible
				yMin = 8; //height

				if(el.className.indexOf("resizeMe") != -1) {
					str = getDirection(el);
					if(str == "") str = "default";
					else str += "-resize";
					el.style.cursor = str;
					if(theobject != null) {
						console.log(dir);
						if(dir.indexOf("e") != -1) {
							if(theobject.width + window.event.clientX - theobject.grabx >= 990) {
								//theobject.el.style.width = '990px'
								return
							}
						}
						if(dir.indexOf("s") != -1)
							theobject.el.style.height = Math.max(yMin, theobject.height + window.event.clientY - theobject.graby) + "px";

						if(dir.indexOf("w") != -1) {
							if(theobject.width - window.event.clientX + theobject.grabx >= 990) {
								//theobject.el.style.width = '990px'
								return
							}
							theobject.el.style.left = Math.min(theobject.left + window.event.clientX - theobject.grabx, theobject.left + theobject.width - xMin) + "px";
						}
						if(dir.indexOf("n") != -1) {
							theobject.el.style.top = Math.min(theobject.top + window.event.clientY - theobject.graby, theobject.top + theobject.height - yMin) + "px";
							theobject.el.style.height = Math.max(yMin, theobject.height - window.event.clientY + theobject.graby) + "px";
						}
						$(".multi_con").each(function(v) {
							var h = $(this).height();
							$(this).find(".area_conn").height(h);
							$(this).find(".clm").height(h);
						})
						binding.value({
							height: theobject.el.style.height,
							el: theobject.el.id
						});
					}
				}
			}

			function getReal(el, type, value) {
				var temp = el;
				while((temp != null) && (temp.tagName != "BODY")) {
					if(eval("temp." + type) == value) {
						el = temp;
						return el;
					}
					temp = temp.parentElement;
				}
				return el;
			}

			el.onmousedown = doDown;
			document.onmouseup = doUp;
			el.onmouseup = elDoUp;
		}
	}
);

Vue.directive('to-focus', //自定义指令 JS
	{
		bind: function(el, binding) {
			if(binding.value) {
				el.focus();
				console.log(el)
			}
		}
	}
);
console.log("directive")
//export default dat