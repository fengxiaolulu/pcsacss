window.multiCarouse = {
	multiCarousel1: function(id) {
		var slide = $("#" + id).find(".slide-ul");
		var list = slide.find("li").length;

		//自动播放 2秒播放一次 无限循环
		//打开定时器
		//this.timer = '';
		var num = 0;
		var interval = (function interval() {
			var w = slide.find("li").width();
			//console.log(w)
			slide.css({
				width: list * w,
			});
			multiCarouse.timer = setInterval(function() {
				slide.animate({
					left: -w
				}, "slow", function() {
					slide.find("li:first").appendTo(slide);
					slide.css('left', 0);
					//console.log(slide.find("li:first"));
				});
			}, 2000);
			return interval;
		})();

		slide.hover(function() {
			clearInterval(multiCarouse.timer);
		}, function() {
			interval();
		});
		//console.log("multiCarousel1");
	},
	timer: "",
	multiCarousel2: function() {
		console.log("multiCarousel2");
	},
	multiCarousel3: function() {
		console.log("multiCarousel3");
	}
};

var index = 0;
//下一张
function next(list) {
	if(index < list - 1) {
		index++;
		$('.activeimg').animate({
			left: index * -w
		}, "slow");
		$('.bot-img ul li').eq(index).addClass('active').siblings('li').removeClass('active');
	} else {
		index = 0;
		$('.activeimg').animate({
			left: index * -w
		}, "slow");
		$('.bot-img ul li').eq(index).addClass('active').siblings('li').removeClass('active')
	}
}
//        上一张
function prev(list) {
	index--;
	if(index < 0) {
		index = list - 1;
		$('.activeimg').animate({
			left: index * -500
		}, "slow");
		$('.bot-img ul li').eq(index).addClass('active').siblings('li').removeClass('active')
	} else {
		$('.activeimg').animate({
			left: index * -500
		}, "slow");
		$('.bot-img ul li').eq(index).addClass('active').siblings('li').removeClass('active')
	}
}


window.columnPicture = {
	columnPicture1: function(id) {
		$.fn.imgscroll = function(o) {
			var defaults = {
				speed: 2000,
				amount: 3000,
				width: 300,
				dir: "left"
			};
			o = $.extend(defaults, o);

			return this.each(function() {
				var _li = $("li", this);
				_li.parent().parent().css({
					overflow: "hidden",
					position: "relative"
				}); //div
				_li.parent().css({
					margin: "0",
					padding: "0",
					overflow: "hidden",
					position: "relative",
					"list-style": "none"
				}); //ul
				_li.css({
					position: "relative",
					overflow: "hidden"
				}); //li
				if(o.dir == "left") _li.css({
					float: "left"
				});

				//初始大小
				var _li_size = 0;
				for(var i = 0; i < _li.size(); i++)
					_li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true);

				//循环所需要的元素
				if(o.dir == "left") _li.parent().css({
					width: 9999 + "px"
				});
				_li.parent().empty().append(_li.clone());
				_li = $("li", this);

				//滚动
				var _li_scroll = 0;

				function goto() {
					_li_scroll += o.width;
					if(_li_scroll > _li_size-100) {
						_li_scroll = -310;
						_li.parent().css(o.dir == "left" ? {
							left: -_li_scroll
						} : {
							top: -_li_scroll
						});
						_li_scroll += o.width;
					}
					_li.parent().animate(o.dir == "left" ? {
						left: -_li_scroll
					} : {
						top: -_li_scroll
					}, o.amount);
				}

				//开始
				var move = setInterval(function() {
					goto();
				}, o.speed);
				_li.parent().hover(function() {
					clearInterval(move);
				}, function() {
					clearInterval(move);
					move = setInterval(function() {
						goto();
					}, o.speed);
				});
			});
		};
		$(document).ready(function() {
			$(".slide2").imgscroll({
				speed: 2000, //图片滚动速度
				amount: 3000, //图片滚动过渡时间
				width: 300, //图片滚动步数
				dir: "left" 
			});

		});
		var columnmain = $("#" + id).find(".slide1");
		var columnslide = columnmain.find(".slide-ul");
		var columnlist = columnslide.find("li");
		var columnw = columnlist.width();
		columnslide.css({
			width: 9999,
		});
		var columncurrentIndex = 0;
		//下一张
		$('#prev').click(function() {
			console.log(columncurrentIndex);
			columncurrentIndex--;
			columnslide.animate({
				left: columncurrentIndex * -columnw
			}, "slow");
			if(columncurrentIndex < 0) {
				alert("已经是第一项啦！");
				columncurrentIndex = 0;
				columnslide.animate({
					left: 0
				}, "normal");
			}
		});
		//        上一张
		$('#next').click(function() {
			console.log(columncurrentIndex);
			columncurrentIndex++;
			columnslide.animate({
				left: columncurrentIndex * -columnw
			}, "slow");
			if(columncurrentIndex > columnlist.length-1) {
				columncurrentIndex = 0;
				columnslide.animate({
					left: 0
				}, "normal");
			}
		});

	},
};

window.productShow = {
	productShow1: function(id) {
		$.fn.imgscroll2 = function(o) {
			var defaults = {
				speed: 2000,
				amount: 3000,
				width: 300,
				dir: "left"
			};
			o = $.extend(defaults, o);

			return this.each(function() {
				var _li = $("li", this);
				_li.parent().parent().css({
					overflow: "hidden",
					position: "relative"
				}); //div
				_li.parent().css({
					margin: "0",
					padding: "0",
					overflow: "hidden",
					position: "relative",
					"list-style": "none"
				}); //ul
				_li.css({
					position: "relative",
					overflow: "hidden"
				}); //li
				if(o.dir == "left") _li.css({
					float: "left"
				});

				//初始大小
				var _li_size = 0;
				for(var i = 0; i < _li.size(); i++)
					_li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true);

				//循环所需要的元素
				if(o.dir == "left") _li.parent().css({
					width: 9999 + "px"
				});
				_li.parent().empty().append(_li.clone());
				_li = $("li", this);

				//滚动
				var _li_scroll = 0;

				function goto() {
					_li_scroll += o.width;
					if(_li_scroll > _li_size-100) {
						_li_scroll = -310;
						_li.parent().css(o.dir == "left" ? {
							left: -_li_scroll
						} : {
							top: -_li_scroll
						});
						_li_scroll += o.width;
					}
					_li.parent().animate(o.dir == "left" ? {
						left: -_li_scroll
					} : {
						top: -_li_scroll
					}, o.amount);
				}

				//开始
				var move = setInterval(function() {
					goto();
				}, o.speed);
				_li.parent().hover(function() {
					clearInterval(move);
				}, function() {
					clearInterval(move);
					move = setInterval(function() {
						goto();
					}, o.speed);
				});
			});
		};
		$(document).ready(function() {
			$(".slide2").imgscroll2({
				speed: 2000, //图片滚动速度
				amount: 3000, //图片滚动过渡时间
				width: 300, //图片滚动步数
				dir: "left" 
			});

		});
		var productmain = $("#" + id).find(".slide1");
		var productslide = productmain.find(".slide-ul");
		var productlist = productslide.find("li");
		var productw = productlist.width();
		productslide.css({
			width: 9999,
		});
		var productcurrentIndex = 0;
		//下一张
		$('#prev2').click(function() {
			console.log(productcurrentIndex);
			productcurrentIndex--;
			productslide.animate({
				left: productcurrentIndex * -productw
			}, "slow");
			if(productcurrentIndex < 0) {
				alert("已经是第一项啦！");
				productcurrentIndex = 0;
				productslide.animate({
					left: 0
				}, "normal");
			}
		});
		//        上一张
		$('#next2').click(function() {
			console.log(productcurrentIndex);
			productcurrentIndex++;
			productslide.animate({
				left: productcurrentIndex * -productw
			}, "slow");
			if(productcurrentIndex > productlist.length-1) {
				productcurrentIndex = 0;
				productslide.animate({
					left: 0
				}, "normal");
			}
		});

	},
};