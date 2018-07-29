window.xIndex2 = {
	label: function(labelContainerId, labelContainer) {
		$("#" + labelContainerId).on("click", "li", function() {
			var index = $(this).index();
			//labelContainer.curItem = labelContainer.labelTitle[index].curItem;			
			if(labelContainer.labelTitle[index].curItem == index) {
				$(this).find("p").css({
					"background": labelContainer.labelTitleStyleHover.background,
					"color": labelContainer.labelTitleStyleHover.color,
					"border-radius": labelContainer.labelTitleBasis.borderRadius,
					"border-color": labelContainer.labelTitleStyleHover.borderColor,
					"border-width": labelContainer.labelTitleStyleHover.borderWidth,
					"border-style": labelContainer.labelTitleStyleHover.borderStyle
				});
				$(this).siblings().find("p").removeAttr("style")
			};

			$(this).parents(".tit_con").find(".ateralLabelAll .ateralLabel").eq(index).show().siblings().hide();
		});

		$("#" + labelContainerId).find(".labelTitleAll li").eq(0).find("p").css({
			"background": labelContainer.labelTitleStyleHover.background,
			"color": labelContainer.labelTitleStyleHover.color,
			"border-radius": labelContainer.labelTitleBasis.borderRadius,
			"border-color": labelContainer.labelTitleStyleHover.borderColor,
			"border-width": labelContainer.labelTitleStyleHover.borderWidth,
			"border-style": labelContainer.labelTitleStyleHover.borderStyle
		});

		//		$(function() {
		//			$(".navigation").on("mouseover", "li", function() {
		//				var index = $(this).index();
		//				$(this).addClass("textcolor");
		//			});
		//			$(".navigation").on("mouseout", "li", function() {
		//				var index = $(this).index();
		//				$(this).removeClass("textcolor");
		//			})
		//		})
	},

	back: function() {
		$("#back").on("click", function() {
			window.history.go(-1)
		})
	}
};

window.phoneSwiper = {
	phoneSwiper: function(swiperId, itemMdata) {

		var span = $("#" + swiperId).find(".swiper-pagination span");
		for(var a = 0; a < span.length; a++) {
			if(span.eq(a).hasClass('swiper-pagination-bullet-active')) {
				span.eq(a).css({
					"background": itemMdata.PaginationActive.background,
					"border-color": itemMdata.PaginationActive.borderColor,
					"border-width": itemMdata.PaginationActive.borderWidth,
					"border-style": itemMdata.PaginationActive.borderStyle,
					"width": itemMdata.PaginationActive.width,
					"height": itemMdata.PaginationActive.height,
					"border-radius": itemMdata.PaginationActive.borderRadius
				});

				span.eq(a).siblings().css({
					"background": itemMdata.PaginationStyle.background,
					"border-color": itemMdata.PaginationStyle.borderColor,
					"border-width": itemMdata.PaginationStyle.borderWidth,
					"border-style": itemMdata.PaginationStyle.borderStyle,
					"opacity": itemMdata.PaginationStyle.opacity,
					"width": itemMdata.PaginationStyle.width,
					"height": itemMdata.PaginationStyle.height,
					"border-radius": itemMdata.PaginationStyle.borderRadius
				});

			}
		}

	}
};

window.productSwiper = {
	productSwiper: function(id,swiperId, itemMdata) {

		var span = $("#" + swiperId).find(".swiper-pagination span");
		for(var a = 0; a < span.length; a++) {
			if(span.eq(a).hasClass('swiper-pagination-bullet-active')) {
				span.eq(a).css({
					"background": itemMdata.PaginationActive.background,
					"border-color": itemMdata.PaginationActive.borderColor,
					"border-width": itemMdata.PaginationActive.borderWidth,
					"border-style": itemMdata.PaginationActive.borderStyle,
					"width": itemMdata.PaginationActive.width,
					"height": itemMdata.PaginationActive.height
				});

				span.eq(a).siblings().css({
					"background": itemMdata.PaginationStyle.background,
					"border-color": itemMdata.PaginationStyle.borderColor,
					"border-width": itemMdata.PaginationStyle.borderWidth,
					"border-style": itemMdata.PaginationStyle.borderStyle,
					"opacity": itemMdata.PaginationStyle.opacity,
					"width": itemMdata.PaginationStyle.width,
					"height": itemMdata.PaginationStyle.height
				});

			}
		};
		
        var curPage = 1;
		$("#" + id).find(".page").on("click", "p", function() {

			var pageNum = itemMdata.page.pageNum;
			var index = $(this).data("index");

			if(index == "up") {
				if(curPage != 1) {
					curPage--;
				}
			} else if(index == "down") {
				if(curPage != Math.ceil(itemMdata.page.talNum / itemMdata.page.pageNum)) {
					++curPage;
				}
			} else {
				curPage = Number($(this).data("index"))
			}
			curNum = (curPage - 1) * pageNum;

			$("#" + id).find(".oneUl").find("li").hide();

			for(var i = 0; i < pageNum; i++) {
				$("#" + id).find(".oneUl").find("li:eq(" + (curNum + i) + ")").show();
			}

			//console.log("dd");
		});

	}
};

window.articleScrap = {
	articleScrap: function(id, itemMdata) {		
        var curPage = 1;
		$("#" + id).find(".page").on("click", "p", function() {

			var pageNum = itemMdata.page.pageNum;
			var index = $(this).data("index");

			if(index == "up") {
				if(curPage != 1) {
					curPage--;
				}
			} else if(index == "down") {
				if(curPage != Math.ceil(itemMdata.page.talNum / itemMdata.page.pageNum)) {
					++curPage;
				}
			} else {
				curPage = Number($(this).data("index"))
			}
			curNum = (curPage - 1) * pageNum;

			$("#" + id).find(".oneUl").find("li").hide();

			for(var i = 0; i < pageNum; i++) {
				$("#" + id).find(".oneUl").find("li:eq(" + (curNum + i) + ")").show();
			}

			//console.log("dd");
		});

	}
};

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
				$.ajax({ // 'http://119.29.226.11:88/api/data/addForm?token=' + token + 
					url: $(this).prev().children('.formAction').val() + '?form_id=' + itemMdata.formTitle.id + '&' + str,
					type: "post",
					dataType: "jsonp", //指定服务器返回的数据类型
					success: function(data) {
						if(data.result_code==0) {
							alert("验证错误");							
						}
						var root = $('#' + msgSubmitId).find('input[name="verail"]')[0].value;
						vailImg(msgSubmitId, root); 
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
	}
};

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

//$(function() {
//	$(function() {
//		$("#labelTitle").on("click", "li", function() {
//			var index = $(this).index();
//			$(this).addClass("cur").siblings().removeClass("cur");
//			$(this).parents(".tit_con").find(".ateralLabelAll .ateralLabel").eq(index).show().siblings().hide();
//		})
//	});
//});