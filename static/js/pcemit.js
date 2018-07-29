"use strict";
window.multiCarouse = {

	multiCarousel1: function(id, itemMdata) {
		var imgWidth = "";
		$(function() {
			/*
			    1）设置ul宽度，达到水平排列的效果
			    2）水平轮播效果
			    3）移入移出，清除轮播效果
			    4）添加分页效果
			        * 点击分页切换
			    5）无缝滚动
			        * 把第一张复制到最后
			        * 当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
			*/
			if($('#' + id).find('ul li').length > 0) {
				let ul = $('#' + id).find('ul')[0];
				//console.log(ul.children)
				ul.appendChild(ul.children[0].cloneNode(true));
				let len = ul.children.length; //5
				// 索引值
				let index = 0;
				imgWidth = parseInt($('#' + id).css('width'));

				//let imgWidth = itemMdata.imgWidth
				// 1）设置ul宽度，达到水平排列的效果
				$('#' + id).find('ul').css('width', imgWidth * len + 'px');
				// 生成页码
				let page = document.createElement('div');
				let arrow = document.createElement('div');
				page.classList.add('page');
				arrow.classList.add('arrow');
				//var timer ="";

				for(let j = 0; j < 2; j++) {
					let span = document.createElement('span');
					arrow.appendChild(span);
				}

				$('#' + id)[0].appendChild(arrow)
				//arrow.children[0].innerText = '<';
				//arrow.children[1].innerText = '>';
				for(let i = 1; i < len; i++) {
					let span = document.createElement('span');
					if(itemMdata.curIndex == 0) {
						span.innerText = i;
					}
					if(i === 1) {
						span.classList.add('active');
					}
					page.appendChild(span);
				}
				$('#' + id)[0].appendChild(page)

				// 2）水平轮播效果
				/*
				    index       left
				    0           0
				    1           -810
				    2           -1620
				    3           -2430
				    推导公式：left = index*width
				*/
				//alert(imgWidth);
				if(itemMdata.autoPlay == true) {
					itemMdata.timer = setInterval(autoPlay, parseInt(itemMdata.speedIndex) * 1000);
				}
				// console.log(itemMdata.timer);

				// 鼠标移入移出
				$('#' + id).on('mouseover', function() {
					clearInterval(itemMdata.timer);
					//page.style.display = 'block';
					//arrow.style.display = 'block';
				})

				$('#' + id).on('mouseleave', function() {
					clearInterval(itemMdata.timer);
					if(itemMdata.autoPlay == true) {
						itemMdata.timer = setInterval(autoPlay, parseInt(itemMdata.speedIndex) * 1000);
					}
					//page.style.display = 'none';
					//arrow.style.display = 'none';
				})

				$('#' + id).on('click', '.page span', function() {

					//index = parseInt($(this).text()) - 1;
					index = $(this).index()
					console.log($(this).index())
					show();

				})
				arrow.children[0].onclick = function() {
					if(index != 0) {
						index--;
					} else {
						index = len - 2;
					}
					//3
					show();
				}
				arrow.children[1].onclick = function() {
					if(index != len - 2) {
						index++;
					} else {
						index = 0;
					}

					show();
				}
				arrow.children[0].onmouseover = function() {
					console.log($(this))
					$(this).css({
						'backgroundImage': 'url(' + itemMdata.activemulPre.url + ')',
					})
				}
				arrow.children[0].onmouseleave = function() {
					$(this).css({
						'backgroundImage': 'url(' + itemMdata.mulPre.url + ')',
					})
				}
				arrow.children[1].onmouseover = function() {
					$(this).css({
						'backgroundImage': 'url(' + itemMdata.activemulNext.url + ')',
					})
				}
				arrow.children[1].onmouseleave = function() {
					$(this).css({
						'backgroundImage': 'url(' + itemMdata.mulNext.url + ')',
					})
				}

				function autoPlay() {
					index++;
					// alert(imgWidth)
					show();
				}

				function show() {
					if(index >= len) { //0,1,2,3,4
						ul.style.left = 0;
						index = 1;
					}
					//$('#'+id).find('ul').animate(ul,{left:-index*imgWidth});
					$('#' + id).find('ul').animate({
						left: -index * imgWidth
					}, "slow");
					// 页码高亮
					// 先清除所有高亮
					for(var i = 0; i < len - 1; i++) {
						page.children[i].className = '';
						$('#' + id).find('.page span').css({
							'display': 'inline-block',
							'width': itemMdata.pageSpan.width,
							'height': itemMdata.pageSpan.height,
							'margin': '0 5px',
							'line-height': itemMdata.pageSpan.height,
							'font-size': itemMdata.pageSpan.fontSize,
							'background-color': itemMdata.pageBg.backgroudColor,
							'text-align': 'center',
							'color': itemMdata.pageBg.color,
							'border-radius': itemMdata.pageSpan.borderRadius,
							'box-shadow': ' 0 0 10px rgba(0, 0, 0, 0.5)',
							'background-image': 'url(' + itemMdata.pageImg.url + ')'
						})
					}

					if(index == len - 1) {

						page.children[0].classList.add('active')
						$('#' + id).find('.page span.active').css({
							'background-color': itemMdata.activeBg.backgroudColor,
							'color': itemMdata.activeBg.color,
							'background-image': 'url(' + itemMdata.activeImg.url + ')'
						})

					} else {
						page.children[index].classList.add('active');
						$('#' + id).find('.page span.active').css({
							'background-color': itemMdata.activeBg.backgroudColor,
							'color': itemMdata.activeBg.color,
							'background-image': 'url(' + itemMdata.activeImg.url + ')'
						})
					}
				}
				$('#' + id).find('.arrow').css({
					'width': '100%',
					'position': 'absolute',
					'left': '0',
					'top': '50%',
					'padding': '10px',
					'transform': 'translate(0,-50%)',
					'display': 'block',
					'box-sizing': 'border-box'
				});

				$('#' + id).find('.arrow span').css({
					'float': 'left',
					'display': 'inline-block',
					'width': itemMdata.spanStyle.width,
					'height': itemMdata.spanStyle.height,
					'line-height': itemMdata.spanStyle.height,
					'font-size': '25px',
					'background-color': 'rgba(0, 0, 0, 0.6)',
					'text-align': 'center',
					'color': '#fff',
					'border-radius': itemMdata.spanStyle.borderRadius,
					'box-shadow': ' 0 0 10px rgba(0, 0, 0, 0.5)',
					'backgroundImage': 'url(' + itemMdata.mulNext.url + ')',
					'background-position': 'center'

				})
				$('#' + id).find('.arrow span:first').css({

					'backgroundImage': 'url(' + itemMdata.mulPre.url + ')'
				})
				$('#' + id).find('.arrow span')[1].style.float = 'right';
				$('#' + id).find('.page').css({

					'position': 'absolute',
					'left': '50%',
					'bottom': '0',
					'padding': '10px',
					'transform': 'translate(-50%,0)',
					'display': 'block',
					'box-sizing': 'border-box',

				});
				$('#' + id).find('.page span').css({
					'display': 'inline-block',
					'width': itemMdata.pageSpan.width,
					'height': itemMdata.pageSpan.height,
					'margin': '0 5px',
					'line-height': itemMdata.pageSpan.height,
					'font-size': itemMdata.pageSpan.fontSize,
					'background-color': itemMdata.pageBg.backgroudColor,
					'text-align': 'center',
					'color': itemMdata.pageBg.color,
					'border-radius': itemMdata.pageSpan.borderRadius,
					'box-shadow': ' 0 0 10px rgba(0, 0, 0, 0.5)',
					'background-image': 'url(' + itemMdata.pageImg.url + ')'
				})

			}
		})
	},
	timer: "",
	multiCarousel2: function() {},
	multiCarousel3: function() {}
};

/*
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
                    if(_li_scroll > _li_size - 100) {
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
        var columnwidth = columnmain.find(".width");
        var columnslide = columnwidth.find(".slide-ul");
        var columnlist = columnslide.find("li");
        var columnw = columnlist.width();
        columnslide.css({
            width: 9999,
        });
        var columncurrentIndex = 0;
        //下一张
        $('#prev').click(function() {
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
            columncurrentIndex++;
            columnslide.animate({
                left: columncurrentIndex * -columnw
            }, "slow");
            if(columncurrentIndex > columnlist.length - 1) {
                columncurrentIndex = 0;
                columnslide.animate({
                    left: 0
                }, "normal");
            }
        });

    },
};
*/
window.productShow = {
	productShow1: function(id,itemMdata) {
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
					if(_li_scroll > _li_size - 100) {
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
			productcurrentIndex++;
			productslide.animate({
				left: productcurrentIndex * -productw
			}, "slow");
			if(productcurrentIndex > productlist.length - 1) {
				productcurrentIndex = 0;
				productslide.animate({
					left: 0
				}, "normal");
			}
		});
			var curPage = 1;
		$("#" + id).find(".page").on("click", "p", function() {
			
			var pageNum = itemMdata.page.pageNum;
			var index = $(this).data("index");
			
			if(index=="up"){
				if(curPage!=1){
					curPage--;
				}				
			}else if(index=="down"){
				if(curPage!=Math.ceil(itemMdata.page.talNum/itemMdata.page.pageNum)){
					++curPage;
				}
			}else{
				curPage = Number($(this).data("index"))
			}
				curNum = (curPage -1)*pageNum;
			
			$("#" + id).find(".oneUl").find("li").hide();
			
			for(var i = 0; i < pageNum; i++) {			
				$("#" + id).find(".oneUl").find("li:eq("+(curNum+i)+")").show();				
			}
			
			//var str = "";
			/*for(var j = index; itemMdata.productDesListSelected.length > j; j++) {
				//str += "";
				if(itemMdata.productDesListSelected[j].image) {
					 $("#" + id).find("li").each(function(){
						$(this).find("img").attr("src",itemMdata.productDesListSelected[j].image);
					 });
				}			   				
				// var et = dt 
			}*/	
			
			console.log(itemMdata.productDesListSelected);			
		});
	},
};
//链接跳转
window.urlLink = {
	linkUrl: function(item, preview, param, id) {
		$(function() {
			$('#' + id).on('click', function() {
				var link = item.link;
				console.log(link)
				if(Number(link)) {
					console.log(link)
					if(item.target == '_blank') {
						console.log(link)
						window.open(preview + link + '?token=' + param.token + '&company_id=' + param.company_id + '&type=' + param.type + '&pc_version_id=' + param.pc_version_id + '&mobile_version_id=' + param.mobile_version_id);
					}
					if(item.target == '_self') {
						console.log(link)
						location.href = preview + link + '?token=' + param.token + '&company_id=' + param.company_id + '&type=' + param.type + '&pc_version_id=' + param.pc_version_id + '&mobile_version_id=' + param.mobile_version_id;
					}
					if(!item.target){
						window.open(preview + link + '?token=' + param.token + '&company_id=' + param.company_id + '&type=' + param.type + '&pc_version_id=' + param.pc_version_id + '&mobile_version_id=' + param.mobile_version_id);
					}
				} else {
					if(link.indexOf("http") > -1 && item.target == '_blank') {
						window.open(link)
					} else if(link.indexOf("http") < 0 && item.target == '_blank') {
						window.open(preview + link + '?token=' + param.token + '&company_id=' + param.company_id + '&type=' + param.type + '&pc_version_id=' + param.pc_version_id + '&mobile_version_id=' + param.mobile_version_id)
					}
					if(link.indexOf("http") > -1 && item.target == '_self') {
						location.href = link
					} else if(link.indexOf("http") < 0 && item.target == '_self') {
						location.href = preview + link + '?token=' + param.token + '&company_id=' + param.company_id + '&type=' + param.type + '&pc_version_id=' + param.pc_version_id + '&mobile_version_id=' + param.mobile_version_id
					}
					if(link.indexOf("http") > -1 && !item.target) {
						window.open(link)
					} else if(link.indexOf("http") < 0 && !item.target) {
						window.open(preview + link + '?token=' + param.token + '&company_id=' + param.company_id + '&type=' + param.type + '&pc_version_id=' + param.pc_version_id + '&mobile_version_id=' + param.mobile_version_id)
					}
				}

			})
		})

	},
	
	//显示小手图标
	showHand: function(id, item) {
		$(function() {
			var link = item.link;
			//console.log(link)
			if(link != '') {
				$('#' + id).on('mouseover', function() {
					//console.log(id)
					$(this).css({
						'cursor': 'pointer'
					})
				})
				$('#' + id).on('mouseout', function() {
					//console.log(id)
					$(this).css({
						'cursor': 'auto'
					})
				})
			}

		})
	}
};
//返回顶部
window.goTop = {
	//在线客服
	serReturnTop: function(serviceOnlineId, itemMdata) {
		console.log(12)
		$(function() {
			var topH = document.documentElement.scrollTop || document.body.scrollTop;
			var timer = null;
			$('#' + serviceOnlineId).find('.returnTop').on('click', function() {
				console.log(0)
				timer = setInterval(function() {
					var topH = document.documentElement.scrollTop || document.body.scrollTop;
					var stepLength = Math.ceil(topH / 5);
					document.documentElement.scrollTop = document.body.scrollTop = topH - stepLength;
					if(topH == 0) {
						clearInterval(timer);
					}
				}, 30);
			})

		})
	},

}
window.hoverAction = {
	//文本交互效果--悬浮事件
	fontHover: function(fontId,itemMdata) {
		$(function() {

			$('#' + fontId).on("mouseover", function() {
				if($(this).css("color") && itemMdata.iStyle.isHover == true) {
					itemMdata.spanColor = $(this).find("p").css("color");
					var t = $(this)
					setTimeout(function() {
						t.find("p").css("color", itemMdata.iStyle.hoverColor);
					}, 1);

				}
				if($(this).find("span").css("color") && itemMdata.iStyle.isHover == true) {
					itemMdata.spanColor = $(this).find("span").css("color");
					setTimeout(function() {
						t.find("span").css("color", itemMdata.iStyle.hoverColor);
					}, 1);
				}
			});
			$('#' + fontId).on("mouseout", function() {
				if($(this).find("p").css("color") && itemMdata.iStyle.isHover == true) {
					$(this).find("p").css("color", itemMdata.spanColor);
				}
				if($(this).find("span").css("color") && itemMdata.iStyle.isHover == true) {
					$(this).find("span").css("color", itemMdata.spanColor);
				}
			})

		})
	},

	//按钮
	buttonHover: function(buttonId,itemMdata) {
		$(function() {
			$("#" + buttonId).on("mouseover", function() {
				if(itemMdata.setHover == true) {
					itemMdata.hoverS = 1;
				}
			});
			$("#" + buttonId).on("mouseout", function() {
				itemMdata.hoverS = 2;
			})
		})
	},

	//图片
	imageHover: function(imageId,itemMdata) {
		$(function() {
			var imgP = document.querySelector('.imgP');
			var imgs = document.querySelector('.imgsModel');
			$("#" + imageId).on("mouseover", function() {
				if(itemMdata.isHover == true) {
					imgs.style.borderColor = itemMdata.hoverStyle.borderColor;
					imgs.style.borderStyle = itemMdata.hoverStyle.borderStyle;
				}
				if(itemMdata.isTxt == true) {
					imgP.style.display = 'flex';
				}
				
				if(itemMdata.isRotate == true&&itemMdata.isImg == true) {
					$(this).css('willChange','transform')
					$(this).css('transform', 'rotateY(180deg)');
					$(this).find('.front').css({
						'transform': 'rotateY(180deg)'
					})
				}
				if(itemMdata.isImg == true&&itemMdata.isRotate == false){
					$(this).css('willChange','auto')
					$(this).css('transform', 'rotateY(0deg)');
					$(this).find('.front').css({
						'transform': 'rotateY(0deg)'
					})
					$(this).find('.back').css({
						'position': 'static'
					})
				}
			});
			$("#" + imageId).on("mouseout", function() {
				imgs.style.borderColor = '';
				imgs.style.borderStyle = '';
				imgP.style.display = 'none';
				$(this).css('willChange','auto')
				$(this).css('transform', 'rotateY(0)');
				$(this).find('.back').css({
					'position': 'absolute'
				})
			});
		})
	},

	//多图列表
	columnPictureHover: function(columnPictureId,itemMdata) {
		$(function() {
			var currentIndex = 0;
			var marginleft = 0;

			$("#" + columnPictureId).on("mouseover", ".colimgHover", function() {

                if(itemMdata.isImg == true) {
					$(this).css('willChange','transform')
                    $(this)[0].style.transform = 'rotateY(180deg)';
                }
                if(itemMdata.setnumber==true){
					//console.log(itemMdata.setnumber)
					$(this).parent('li').css('backgroundImage',itemMdata.liStyleH.backgroundImage);
					if($(this).next('.pW')){
						$(this).next('.pW').find('span:first').css('color',itemMdata.liStyle.color)
						$(this).next('.pW').find('span:last').css('color',itemMdata.liStyleH.color)
					}
					if(columnPictureId.indexOf('productShowId')){
						$(this).children('p').css('color',itemMdata.liStyle.color)
					}
                   
                }
               
            });
            $("#" + columnPictureId).on("mouseout", ".colimgHover", function() {
				//$(this).css('willChange','auto')
                $(this)[0].style.transform = 'rotateY(0)';
				$(this).parent('li').css('backgroundImage',itemMdata.liStyle.backgroundImage);
				if($(this).next('.pW')){
					$(this).next('.pW').find('span:first').css('color',itemMdata.pStyle.color)
					$(this).next('.pW').find('span:last').css('color',itemMdata.hoverP.color)
					
				}
				if(columnPictureId.indexOf('productShowId')){
					$(this).children('p').css('color',itemMdata.pStyle.color)
				}
            });
			
			//轮播轮播
			if(itemMdata.stylethree||itemMdata.stylethree){
				var speed = 10
				$("#" + columnPictureId).find('.threeStyle .tableBox .new')[0].innerHTML = $("#" + columnPictureId).find('.threeStyle .tableBox .old')[0].innerHTML

				function Marquee() {
					if($("#" + columnPictureId).find('.threeStyle .tableBox')[0].scrollLeft >= $("#" + columnPictureId).find('.threeStyle .tableBox .old')[0].scrollWidth) {
						$("#" + columnPictureId).find('.threeStyle .tableBox')[0].scrollLeft = 0

					} else {
						$("#" + columnPictureId).find('.threeStyle .tableBox')[0].scrollLeft++
					}
				}
				//if(itemMdata.stylethree == true) {
					itemMdata.MyMar = setInterval(Marquee, speed)
				//}
				$("#" + columnPictureId).find('.threeStyle .tableBox').on('mouseover', function() {
					clearInterval(itemMdata.MyMar);
					//console.log($("#" + columnPictureId).find('.threeStyle .tableBox .old')[0].scrollWidth)
				})
				$("#" + columnPictureId).find('.threeStyle .tableBox').on('mouseout', function() {
					itemMdata.MyMar = setInterval(Marquee, speed);
					//console.log($("#" + columnPictureId).find('.threeStyle .tableBox .old')[0].scrollWidth)
				})
			}
		})
	},
	colPreNext: function(columnPictureId,itemMdata) {
		//debugger
		$(function() {
			
			var liWidth = itemMdata.imgW + parseInt(itemMdata.liStyle.marginLeft) + parseInt(itemMdata.liStyle.marginRight)
			$("#" + columnPictureId).on('click','.next1',function() { //右切换
				let i;
				if(itemMdata.showbtnP==0){
					i = $(this).parent().prev('.width').children('ul')
				}else{
					i = $(this).parent().parent().find('.width').children('ul')
				}
				
				i.css({
					"margin-left": "0px"
				}).find("li:first").appendTo(i);
				i.stop().animate({
					"margin-left": -liWidth + "px"
				}, 800, function() {
					//326是一个li元素的width，先将ul整体向左移出一个li 

					//将移出的那个li**剪切**到ul的末尾，然后将ul的margin-left设为0。
					
				});
				
			});

			$("#" + columnPictureId).on('click','.pre1',function() { //左切换
				//console.log($(this))
				let i;
				if(itemMdata.showbtnP==0){
					i = $(this).parent().prev('.width').children('ul')
					//console.log($self)
				}else{
					i = $(this).parent().parent().find('.width').children('ul')
					//console.log($self)
				}
			//	console.log($self)
				i.css({
					"margin-left": -liWidth + "px"
				}).find("li:last").prependTo(i);
				i.stop().animate({
					"margin-left": "0px"
				}, 800, function() {

					//将ul的最后一个li剪切到ul的第一个li，然后将其margin-left设为-326。
					
				}); //显示
			});
			if(itemMdata.autoPlay){
				itemMdata.carouse = setInterval(autoPlay,2000);
				
			}else{
				clearInterval(itemMdata.carouse)
			}
			function autoPlay(){
				let i;
				if(itemMdata.showbtnP==0){
					i = $("#" + columnPictureId).find('.next1').parent().prev('.width').children('ul')
					//$self = $("#" + columnPictureId).find('.next1').parent().prev('.width').children('ul')
				}else{
					i = $("#" + columnPictureId).find('.next1').parent().parent().find('.width').children('ul')
					//$self = $("#" + columnPictureId).find('.next1').parent().parent().find('.width').children('ul')
				}
				//console.log($self)
				//console.log(i)
				i.css({
					"margin-left": "0px"
				}).find("li:first").appendTo(i);
				i.stop().animate({
					"margin-left": -liWidth + "px"
				},2000,function() {
					//326是一个li元素的width，先将ul整体向左移出一个li 

					//将移出的那个li**剪切**到ul的末尾，然后将ul的margin-left设为0。
					
				});
			}
			$("#" + columnPictureId).on('mouseover','.slideUl',function(){
				//console.log($(this))
				if(itemMdata.autoPlay){
					clearInterval(itemMdata.carouse)
				}
			})
			$("#" + columnPictureId).on('mouseout','.slideUl',function(){
			//	console.log($(this))
				if(itemMdata.autoPlay){
					itemMdata.carouse = setInterval(autoPlay,2000);
				}
			})
		});
	},
	//产品列表
	productShowHover: function(productShowId,itemMdata) {
		$(function() {
			var currentIndex = 0;
			var marginleft = 0;

			$("#" + productShowId).on("mouseover", ".colimgHover", function() {

                if(itemMdata.isImg == true) {
					$(this).css('willChange','transform')
                    $(this)[0].style.transform = 'rotateY(180deg)';
                }
                if(itemMdata.setnumber==true){
					//console.log(itemMdata.setnumber)
					$(this).parent('li').css('backgroundImage',itemMdata.liStyleH.backgroundImage);
					$(this).parent('li').css('backgroundColor',itemMdata.liStyleH.backgroundColor);

					$(this).find('p:first').css('color',itemMdata.liStyle.color)
					$(this).find('p.desStyle').css('color',itemMdata.liStyleH.color)
					$(this).find('p.contentStyle').css('color',itemMdata.hoverP.color)
                   
                }
               
            });
            $("#" + productShowId).on("mouseout", ".colimgHover", function() {
				//$(this).css('willChange','auto')
                $(this)[0].style.transform = 'rotateY(0)';
				$(this).parent('li').css('backgroundImage',itemMdata.liStyle.backgroundImage);
				$(this).parent('li').css('backgroundColor',itemMdata.liStyle.backgroundColor);
				$(this).find('p:first').css('color',itemMdata.pStyle.color)
				$(this).find('p.desStyle').css('color',itemMdata.desStyle.color)
				$(this).find('p.contentStyle').css('color',itemMdata.contentStyle.color)
				
            });

			//轮播轮播
			if(itemMdata.stylethree){
				var speed = 10
				$("#" + productShowId).find('.threeStyle .tableBox .new')[0].innerHTML = $("#" + productShowId).find('.threeStyle .tableBox .old')[0].innerHTML

				function Marquee() {
					if($("#" + productShowId).find('.threeStyle .tableBox')[0].scrollLeft >= $("#" + productShowId).find('.threeStyle .tableBox .old')[0].scrollWidth) {
						$("#" + productShowId).find('.threeStyle .tableBox')[0].scrollLeft = 0

					} else {
						$("#" + productShowId).find('.threeStyle .tableBox')[0].scrollLeft++
					}
				}
				if(itemMdata.stylethree == true) {
					itemMdata.MyMar = setInterval(Marquee, speed)
				}
				$("#" + productShowId).find('.threeStyle .tableBox').on('mouseover', function() {
					clearInterval(itemMdata.MyMar);
					console.log($("#" + productShowId).find('.threeStyle .tableBox .old')[0].scrollWidth)
				})
				$("#" + productShowId).find('.threeStyle .tableBox').on('mouseout', function() {
					itemMdata.MyMar = setInterval(Marquee, speed);
					console.log($("#" + productShowId).find('.threeStyle .tableBox .old')[0].scrollWidth)
				})
			}
		})
	},
	productShowPreNext: function(productShowId,itemMdata) {
		//debugger
		$(function() {
			
			var liWidth = itemMdata.imgW + parseInt(itemMdata.liStyle.marginLeft) + parseInt(itemMdata.liStyle.marginRight)
			$("#" + productShowId).on('click','.next1',function() { //右切换
				//console.log($(this))
				let i;
				if(itemMdata.showbtnP==0){
					i = $(this).parent().prev('.width').children('ul')
				}else{
					i = $(this).parent().parent().find('.width').children('ul')
				}
				console.log(i)
				i.css({
					"margin-left": "0px"
				}).find("li:first").appendTo(i);
				i.stop().animate({
					"margin-left": -liWidth + "px"
				}, 800, function() {
					//326是一个li元素的width，先将ul整体向左移出一个li 

					//将移出的那个li**剪切**到ul的末尾，然后将ul的margin-left设为0。
					
				});
				
			});

			$("#" + productShowId).on('click','.pre1',function() { //左切换
				console.log($(this))
				let i;
				if(itemMdata.showbtnP==0){
					i = $(this).parent().prev('.width').children('ul')
					//console.log($self)
				}else{
					i = $(this).parent().parent().find('.width').children('ul')
					//console.log($self)
				}
				
				i.css({
					"margin-left": -liWidth + "px"
				}).find("li:last").prependTo(i);
				i.stop().animate({
					"margin-left": "0px"
				}, 800, function() {

					//将ul的最后一个li剪切到ul的第一个li，然后将其margin-left设为-326。
					
				}); //显示
			});


		});
	},
	//标签
	labelHover: function(v, itemMdata) {
		var index = 0;
		$(v).find("li.labelList").each(function() {
			if($(this).hasClass("cur")) {
				index = $(this).index();
				$(this).css({
					"background": itemMdata.labelTitleStyleHover.background,
					"color": itemMdata.labelTitleStyleHover.color,
					"border-color": itemMdata.labelTitleStyleHover.borderColor,
					"border-width": itemMdata.labelTitleStyleHover.borderWidth,
					"border-style": itemMdata.labelTitleStyleHover.borderStyle
				});
			}
		});
		$(v).find(".tit_con").find(".conStyle").eq(index).show().siblings().hide();
		if(itemMdata.labelStyle == 2) {

			$(v).find("li>p").hover(function() {
				$(this).css({
					"background": itemMdata.labelTitleStyleHover.background,
					"color": itemMdata.labelTitleStyleHover.color,
					"border-color": itemMdata.labelTitleStyleHover.borderColor,
					"border-width": itemMdata.labelTitleStyleHover.borderWidth,
					"border-style": itemMdata.labelTitleStyleHover.borderStyle
				});
			}, function() {
				$(this).css({
					"background": "",
					"color": itemMdata.labelTitleStyle.color,
					"border-color": "",
					"border-width": "",
					"border-style": ""
				});
			});
		}
		//	console.log(itemMdata.labelStyle)

		$(v).on("mouseover", "li.labelList", function() {
			if(itemMdata.labelStyle == 1) {
				index = $(this).index();
				$(this).css({
					"background": itemMdata.labelTitleStyleHover.background,
					"color": itemMdata.labelTitleStyleHover.color,
					"border-color": itemMdata.labelTitleStyleHover.borderColor,
					"border-width": itemMdata.labelTitleStyleHover.borderWidth,
					"border-style": itemMdata.labelTitleStyleHover.borderStyle
				});
				//console.log("dsdsds")
				$(this).siblings(".labelList").each(function() {
					//console.log("dsdsds")
					$(this).css({
						"background": itemMdata.labelTitleStyle.background,
						"color": itemMdata.labelTitleStyle.color,
						"border-color": itemMdata.labelTitleStyle.borderColor,
						"border-width": itemMdata.labelTitleStyle.borderWidth,
						"border-style": itemMdata.labelTitleStyle.borderStyle
					});
				});

				$(this).parents(".titlbl").siblings(".lbl_con").find(".conStyle").eq(index).show().siblings().hide();
			}
		});

		$(v).on("click", "li.labelList", function() {
			if(itemMdata.labelStyle == 2) {
				index = $(this).index();
				$(this).css({
					"background": itemMdata.labelTitleStyleHover.background,
					"color": itemMdata.labelTitleStyleHover.color,
					"border-color": itemMdata.labelTitleStyleHover.borderColor,
					"border-width": itemMdata.labelTitleStyleHover.borderWidth,
					"border-style": itemMdata.labelTitleStyleHover.borderStyle
				});
				$(this).siblings(".labelList").each(function() {
					$(this).css({
						"background": itemMdata.labelTitleStyle.background,
						"color": itemMdata.labelTitleStyle.color,
						"border-color": itemMdata.labelTitleStyle.borderColor,
						"border-width": itemMdata.labelTitleStyle.borderWidth,
						"border-style": itemMdata.labelTitleStyle.borderStyle
					});
				});
				$(this).parents(".titlbl").siblings(".lbl_con").find(".conStyle").eq(index).show().siblings().hide();
			}
		});

	},

	//魔方多图
	photoMoreCard: function(itemMdata, photoMoreCardId) {
		$(function() {
			$('#' + photoMoreCardId).on('mouseover', '.positionR', function() {
				if(itemMdata.mouseenterNumber == 1) {
					$(this).find('.hid').css('display', 'block');
					itemMdata.hidStyle.background = "#fff";
					$(this).find('.hid').find('i').css('display', 'none');
				}
				if(itemMdata.mouseenterNumber == 2) {
					$(this).find('.hid').css('display', 'block');
					itemMdata.hidStyle.borderColor = "#fff";
					itemMdata.hidStyle.background = "#fff";
					$(this).find('.hid').find('i').css('display', 'block');
				}
				if(itemMdata.mouseenterNumber == 3) {
					$(this).find('.hid').css('display', 'block');
					itemMdata.hidStyle.borderColor = "#fff";
					$(this).find('.hid').find('i').css('display', 'none');
				}
			})
			$('#' + photoMoreCardId).on('mouseout', '.positionR', function() {
				if(itemMdata.mouseenterNumber == 1 || itemMdata.mouseenterNumber == 2 || itemMdata.mouseenterNumber == 3) {
					$(this).find('.hid').css('display', 'none');
				}
			})
		});
	},
	//栏目导航
	moduleNavHover: function(moduleNavId, itemMdata) {
		//console.log(moduleNavId);
		//console.log(itemMdata.hoverSec);
		//console.log(itemMdata.hoverSecBg);
		//一级导航
		$("#" + moduleNavId).on("mouseover", "li .tit_i1", function() {
			this.style.background = itemMdata.hoverColor.backgroundColor;
			this.style.color = itemMdata.hoverColor.color;
			this.style.border = itemMdata.hoverColor.border;
			//console.log("mouseover1");
		}).on('mouseout', 'li .tit_i1', function() {
			//console.log("mouseout1");		
			this.style.background = '';
			this.style.color = itemMdata.layoutOuterStyle.color;
			this.style.border = "none";
		});
		//二级导航
		$("#" + moduleNavId).on("mouseover", ".sec_con>li", function() {
			this.style.background = itemMdata.hoverSec.backgroundColor;
			this.style.color = itemMdata.hoverSec.color;
			this.style.border = itemMdata.hoverSec.border;
			//console.log("mouseover2");
		}).on('mouseout', 'li', function() {
			//console.log("mouseout2");
			this.style.background = '';
			this.style.color = itemMdata.hoverSecBg.color;
			this.style.border = "none";
		});
		//三级导航
		$("#" + moduleNavId).on("mouseover", "div.third_con>div", function() {
			this.style.background = itemMdata.hoverThr.backgroundColor;
			this.style.color = itemMdata.hoverThr.color;
			this.style.border = itemMdata.hoverThr.border;
			//console.log("mouseover3");
		}).on('mouseout', 'li', function() {
			//console.log("mouseout3");
			this.style.background = '';
			this.style.color = itemMdata.hoverThrBg.color;
			this.style.border = "none";
		});

	},
	//新闻列表
	articleSHover:function(articleId,itemMdata){
		//debugger
		$(function() {//articleLi
			$('#' + articleId).on("mouseover",".articleLi .inlineBlock .text", function() {
				if(itemMdata.setHover == true) {
					var t = $(this)
					//console.log(t)
					t.css('background',itemMdata.textStyleH.background)
					t.find('.title').css('color',itemMdata.titleStyleH.color)
					t.find('.time').css('color',itemMdata.timeStyleH.color)
					t.find('.describe').css('color',itemMdata.describeStyleH.color)
				}
				
			});
			$('#' + articleId).on("mouseout",".articleLi .inlineBlock .text", function() {
				//console.log($(this))
				$(this).css('background',itemMdata.textStyle.background)
				$(this).find('.title').css('color',itemMdata.titleStyle.color)
				$(this).find('.time').css('color',itemMdata.timeStyle.color)
				$(this).find('.describe').css('color',itemMdata.describeStyle.color)
			
			})

		})
	},
	//友情链接
	friendLinkHover:function(friendLinkId,itemMdata){
		$(function(){
			$('#'+friendLinkId).on('mouseover','li .text',function(){
				$(this).css({
					"backgroundColor":itemMdata.timeStyle.backgroundColor,
				})
				$(this).find('.title').css({
					"color":itemMdata.timeStyle.colorT,
				})
				$(this).find('.describe').css({
					"color":itemMdata.timeStyle.colorD,
				})
			})
			$('#'+friendLinkId).on('mouseout','li .text',function(){
				$(this).css({
					"backgroundColor":itemMdata.textStyle.backgroundColor,
				})
				$(this).find('.title').css({
					"color":itemMdata.titleStyle.color,
				})
				$(this).find('.describe').css({
					"color":itemMdata.describeStyle.color,
				})
			})

		})
	},
	//侧边栏

	accordion:function(sidebarId,itemMdata){
		$(function() {
			$('#'+sidebarId).on('click','.twoLevel',function(){
				$(this).find('')
			})
		});
	
	}
};
//在线表单、留言提交
window.siteForm = {
	//提交表单
	submitBtn: function(itemMdata, token, siteFormId) {
		//var v = this;
		console.log(itemMdata)
		$(function() {
			$('#' + siteFormId).on('click', '.btn', function() {
				var str = '';
				for(var i = 0; i < itemMdata.onlineFormMsg.length; i++) {
					str = str + $(this).prev().children('p').children('input')[i].name + '=' + $(this).prev().children('p').children('input')[i].value + '&'
				}
				str = str.slice(0, str.length - 1);
				var domian = $('#' + siteFormId).find('input[name="domian"]').val();
					str = str + "&domian=" + domian;
				console.log(str)
				//$(this).prev('.formAction').val()
				$.ajax({
					url: $(this).prev().children('.formAction').val() + '?form_id=' + itemMdata.formTitle.id + '&' + str,
					type: "post",
					dataType: "jsonp", //指定服务器返回的数据类型
					success: function(data) {
						if(data.result_code==0) {
							alert("验证错误");							
						}
						if($('#' + msgSubmitId).find('input[name="verail"]').length){
                            var root = $('#' + msgSubmitId).find('input[name="verail"]')[0].value;
                            vailImg(msgSubmitId, root); 
                        }
							
						for(var i = 0; i < textArr.length; i++) {
							textArr[i].value ="";
						}		
						console.log(data);
						alert("提交成功！");
					}
				});
			});
		});
	},
	vailImg(msgSubmitId, root) {
		$('#' + msgSubmitId).on('click', '.vailImg', function() {
			$(this).attr("src", root + "?t=" + new Date);
		});
	},
	//留言提交
	msgBtn: function(itemMdata, msgSubmitId) {
		$(function() {
			$('#' + msgSubmitId).on('click', '.btn', function() {
				var str = '';
				 var textArr = $('#' + msgSubmitId).find('input[type="text"]:visible');
				for(var i = 0; i < textArr.length; i++) {
					if(!textArr[i].value){					
						alert("请填写您的信息");
						return;
					}
					str = str + textArr[i].name + '=' + textArr[i].value + '&'
				}			
				str = str + $('#' + msgSubmitId).find("textarea")[0].name + '=' + $('#' + msgSubmitId).find('textarea')[0].value;
				str = str.slice(0, str.length - 1);
				console.log(str);
				var formAction = $('#' + msgSubmitId).find('input[name="formAction"]').val();
				var domain = $('#' + msgSubmitId).find('input[name="domain"]').val();
				str = str + "&domain=" + domain;
				//if()
				$.ajax({ //'http://119.29.226.11:88/api/data/addForm?token=' + token + 
					url: formAction + '?' + str,
					type: "post",
					dataType: "jsonp", //指定服务器返回的数据类型
					success: function(data) {
						if(data.result_code==0) {
							alert("验证错误");							
						}
						if($('#' + msgSubmitId).find('input[name="verail"]').length){
							var root = $('#' + msgSubmitId).find('input[name="verail"]')[0].value;
							vailImg(msgSubmitId, root); 
						}
						
						
						for(var i = 0; i < textArr.length; i++) {
							textArr[i].value ="";
						}		
						console.log(data);
						alert("提交成功！")
					}
				});
			});
		});
	},
	//产品搜索
	goProduct:function(productSearchId,param,preview,paramUrl){
		$('#'+productSearchId).on('click','.searchBtn',function(){
			console.log($(this))
			window.open(preview  + paramUrl +'?token=' + param.token + '&company_id=' + param.company_id + '&type=' + param.type +
			'&pc_version_id='+ param.pc_version_id + '&mobile_version_id=' + param.mobile_version_id)
		})
		
	}
};
