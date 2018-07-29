const dat = [{
	mTname: "funPanelEntryBtn_module",
	isyt: "funPanelEntryBtnIcon_module",
	stylcss: "multiSwitchBtn_module",
	cur: true,
	mText: "模块",
	mtIteml: [{
		classify: 'frequently',
		tName: "常用",
		itemArr: [{
			tName: "mFont",
			tText: "文本",
			isEdit: false,
			parent: true,
			mClass: "frequently",
			aloneIcon: "panelModuleIcon_simpleText moduleArea_simpleText",
			aloneText: "moduleAloneText",
			tCon: "双击文字实现可编辑状态",
			cur: true,
			link: "",
			parentStyle: {
				left: 0,
				top: 0,
				width: 100,
				height: 100
			}
		}, {
			tName: "mImage",
			tText: "图片",
			isEdit: false,
			mClass: "frequently",
			aloneIcon: "panelModuleIcon_floatImg moduleArea_floatImg",
			aloneText: "moduleAloneText",
			parent: true,
			link: "",
			url: "/static/image/default.png",
			cur: false,
			parentStyle: {
				left: 0,
				top: 0,
				width: 100,
				height: 100
			}

		}, {
			tName: "mButton",
			isEdit: false,
			mClass: "frequently",
			tText: "按钮",
			parentStyle: {
				left: 0,
				top: 0,
				width: 200,
				height: 50
			},
			link: "",
			parent: true,
			aloneIcon: "panelModuleIcon_floatBtn moduleArea_floatBtn",
			aloneText: "moduleAloneText",
			buttonStyle: {
				background: '#409EFF',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				borderRadius: '0px',
				color: '#fff',
				borderColor: '',
				boxShadow: ''
			},
			spanStyle: {
				background: '',
				borderRadius: '0px'
			},
			mImage0: {
				url: "/static/image/img/1.jpg"
			}
		}]
	}, {
		classify: 'foundation',
		tName: "基础",
		itemArr: [{
			tText: "图文展示",
			tName: "graphic",
			isEdit: true,
			mImage0: {
				url: "/static/image/img/1.jpg"
			},
			mClass: "base",
			aloneIcon: "panelModuleIcon_rich moduleArea_rich",
			aloneText: "moduleAloneText",
			imgStyle: {
				width: '30%',
				height: 'auto',
				float: 'left',
				margin: '0px',
				display: 'block'
			},
			parentStyle: {
				left: 0,
				top: 0,
				width: 990,
				height: 200
			},
			divStyle: {
				width: '70%',
				height: 'auto',
				float: 'right',
				margin: '0px'
			},
			moreUrl: '',
			moreTarget: '',
			moreShow: false,
			defaultMsg: '图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示图文展示'
		}, {
			tName: "columnPicture",
			tText: "列表多图",
			isEdit: true,
			url: "/static/image/default.png",
			mClass: "base",
			aloneIcon: "panelModuleIcon_list_photos moduleArea_list_photos",
			aloneText: "moduleAloneText",
			styleone: true,
			styletwo: false,
			stylethree: false,
			parentStyle: {
				left: 0,
				top: 0,
				width: 990,
				height: 400
			},
			columnPictureLlist: [{
					url: "/static/image/img/1.jpg",
					text: "列表多图",
					link: "http://fanyi.youdao.com/",
					describe: "列表多图",
					target: "_blank"
				},
				{
					url: "/static/image/img/2.jpg",
					text: "列表多图2",
					link: "https://www.baidu.com/",
					describe: "列表多图2",
					target: "_self"
				},
				{
					url: "/static/image/img/3.jpg",
					text: "列表多图3",
					link: "/",
					describe: "列表多图3",
					target: "_blank"
				},
				{
					url: "/static/image/img/4.jpg",
					text: "列表多图4",
					link: "/",
					describe: "列表多图4",
					target: "_blank"
				}
			],
			target: '_self',
			mouseenterNumber: '1',
			hidStyle: {
				borderColor: "#fff",
				borderWidth: "1px",
				borderStyle: "solid",
				background: "",
				textAlign: "center"
			},
			liStyle: {
				float: 'left',
				width: '300px',
				margin: '0 5px',
				clear: ''
			},
			imgStyle: {
				float: 'none',
				width: '100%',
				margin: '0px'
			},
			pStyle: {
				float: 'none',
				width: '100%',
				margin: '0px',
				textAlign: 'center',
				display: "block"
			}
		}, {
			tName: "multiCarousel",
			tText: '轮播多图',
			isEdit: false,
			curIndex: 100,
			parentStyle: {
				left: 0,
				top: 0,
				width: 500,
				height: 200
			},
			slideList: [{
					link: "#",
					name: "第1张",
					setlink: false,
					url: "/static/image/img/1.jpg"
				},
				{
					link: "#",
					name: "第2张",
					setlink: false,
					url: "/static/image/img/2.jpg"
				},
				{
					link: "#",
					name: "第3张",
					setlink: false,
					url: "/static/image/img/3.jpg"
				},
				{
					link: "#",
					name: "第4张",
					setlink: false,
					url: "/static/image/img/4.jpg"
				},
				{
					link: "#",
					name: "第5张",
					setlink: false,
					url: "/static/image/img/5.jpg"
				}
			],
			url: "/static/image/default.png",
			mClass: "base",
			aloneIcon: "panelModuleIcon_carousel_photos moduleArea_carousel_photos",
			aloneText: "moduleAloneText",
		}, {
			tName: "articleScrap",
			tText: '文章列表',
			mClass: "base",
			parentStyle: {
				left: 0,
				top: 0,
				width: 990,
				height: 200
			},
			isEdit: true,
			url: "/static/image/default.png",
			aloneIcon: "panelModuleIcon_article moduleArea_article",
			aloneText: "moduleAloneText",
			articleList: [{
					title: "深圳红树林",
					img: "/static/image/img/1.jpg",
					time: "2017.03.23",
					describe: "深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林",
					url: "http://fanyi.youdao.com/",
					target: "_blank"
				},
				{
					title: "珠海鳄鱼岛公园",
					img: "/static/image/img/2.jpg",
					time: "2017.03.23",
					describe: "珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园",
					url: "https://www.baidu.com/",
					target: "_blank"
				},
				{
					title: "中山紫马岭公园",
					img: "/static/image/img/3.jpg",
					time: "2017.03.23",
					describe: "中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园",
					url: "https://www.baidu.com/",
					target: "_blank"
				},
				{
					title: "汕头天坛花园",
					img: "/static/image/img/4.jpg",
					time: "2017.03.23",
					describe: "汕头天坛花园汕头天坛花园汕头天坛花园汕头天坛花园汕头天坛花园汕头天坛花园汕头天坛花园汕头天坛花园",
					url: "https://www.baidu.com/",
					target: "_blank"
				},
				{
					title: "剑英公园",
					img: "/static/image/img/5.jpg",
					time: "2017.03.23",
					describe: "剑英公园剑英公园剑英公园剑英公园剑英公园剑英公园剑英公园剑英公园剑英公园剑英公园剑英公园剑英公园剑英公园",
					url: "https://www.baidu.com/",
					target: "_blank"
				},
				{
					title: "红豆杉森林公园",
					img: "/static/image/img/5.jpg",
					time: "2017.03.23",
					describe: "红豆杉森林公园红豆杉森林公园红豆杉森林公园红豆杉森林公园红豆杉森林公园红豆杉森林公园红豆杉森林公园红豆杉森林公园",
					url: "https://www.baidu.com/",
					target: "_blank"
				},
				{
					title: "佛山季华公园",
					img: "/static/image/img/5.jpg",
					time: "2017.03.23",
					describe: "佛山季华公园佛山季华公园佛山季华公园佛山季华公园佛山季华公园佛山季华公园佛山季华公园佛山季华公园佛山季华公园",
					url: "https://www.baidu.com/",
					target: "_blank"
				},
				{
					title: "深圳红树林",
					img: "/static/image/img/1.jpg",
					time: "2017.03.23",
					describe: "深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林",
					url: "https://www.baidu.com/",
					target: "_blank"
				}
			],
			articleSelected: [{
					title: "深圳红树林",
					img: "/static/image/img/1.jpg",
					time: "2017.03.23",
					describe: "深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林深圳红树林",
					url: "http://fanyi.youdao.com/",
					target: "_blank"
				},
				{
					title: "珠海鳄鱼岛公园",
					img: "/static/image/img/2.jpg",
					time: "2017.03.23",
					describe: "珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园珠海鳄鱼岛公园",
					url: "https://www.baidu.com/",
					target: "_blank"
				},
				{
					title: "中山紫马岭公园",
					img: "/static/image/img/3.jpg",
					time: "2017.03.23",
					describe: "中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园中山紫马岭公园",
					url: "https://www.baidu.com/",
					target: "_blank"
				}
			],
			imgStyle: {
				float: 'none',
				width: '100%',
				margin: '0px',
				display: 'none'
			},
			titleStyle: {
				display: '',
				float: '',
				width: ''
			},
			timeStyle: {
				display: '',
				float: ''
			},
			describeStyle: {
				display: '',
				clear: ''
			},
			textStyle: {
				float: 'none',
				width: '100%',
				margin: '0px',
				padding: '0px'
			},
			liStyle: {
				float: 'none',
				width: '100%',
				margin: '0px',
				clear: '',
				overflow: 'hidden'
			},
			moreShow: false,
			page: true
		}]
	}, {
		classify: 'composing',
		tName: "排版",
		itemArr: [{
				tName: "freeContainer",
				tText: '自由容器',
				isEdit: false,
				isShowUp:false,
				isShowDown:false,
				mClass: "Typesetting",
				diesc: "",
				mImage:{
					url:"",
				},
				conStyle: {
					paddingTop: '0',
					paddingLeft: '0',
					paddingRight: '0',
					paddingBottom: '0',
					borderWidth: "0",
					height: "120px"
				},
				itemInner: [],
				aloneIcon: "panelModuleIcon_pack moduleArea_pack",
				aloneText: "moduleAloneText",
			}
			/*, {
						tName: "ateralLabelContainer",
						tText: '横向标签',
						isEdit: true,
						mClass: "Typesetting",
						diesc: "",
						itemInner: [{
							labelTitle: "标签1",
							item: 1,
							lblClass: "long_i1",
							itemInner: []
						}, {
							labelTitle: "标签2",
							item: 2,
							lblClass: "long_i2",
							itemInner: []
						}],
						aloneIcon: "panelModuleIcon_tabHorizonal moduleArea_tabHorizonal",
						aloneText: "moduleAloneText",
					}*/
			, {
				tName: "labelContainer",
				tText: "标签展示",
				isEdit: false,
				mClass: "Typesetting",
				isShowUp:false,
				isShowDown:false,
				diesc: "",
				mImage:{
					url:"",
				},
				conStyle: {
					paddingTop: '0',
					paddingLeft: '0',
					paddingRight: '0',
					paddingBottom: '0',
					borderWidth: "0",
					height: "120px"
				},
				itemInner: [{
						labelTitle: "标签1",
						item: 1,
						lblClass: "long_i1",
						itemInner: []
					}
					/*, {
									labelTitle: "标签2",
									item: 2,
									lblClass: "long_i2",
									itemInner: [{
										tName: "mImage",
										tText: "图片",
										mClass: "frequently",
										aloneIcon: "panelModuleIcon_floatImg moduleArea_floatImg",
										aloneText: "moduleAloneText",
										url: "/static/image/default.png",
										cur: false,
										parentStyle: {
											//textAlign: 'center'
										},
										style: {
											width: '100px',
											height: '100px'
										}
									}]
								}*/
				],
				aloneIcon: "panelModuleIcon_tabVertical moduleArea_tabVertical",
				aloneText: "moduleAloneText",
			}, {
				tName: "columnLayout",
				tText: "通栏排版",
				isEdit: false,
				isShowUp:false,
				isShowDown:false,
				itemInner: [],
				layoutStyle: {
					backgroundColor: "none",
					url:"",
					backgroundImage:'url("/static/image/img/4.jpg")',
					opacity: 1
				},
				mImage0:{
					url:"",
				},
				mImage1:{
					url:"",
				},
				layoutOuterStyle: {
					width: "990px",
					backgroundColor: ""
				},
				conStyle: {
					marginTop: '0',
					borderColor: "",
					url:"",
					borderStyle: "none",
					borderWidth: "1px",
					borderBottomWidth: "",
					borderTopWidth: '',
					borderLeftWidth: "",
					borderRightWidth: "",
					borderTop: "none",
					marginLeft: '0',
					marginRight: '0',
					backgroundColor: "none",
					marginBottom: '0',
					height: "150px"
				},
				mClass: "Typesetting",
				aloneIcon: "panelModuleIcon_fullmeasure moduleArea_fullmeasure",
				aloneText: "moduleAloneText"
			},
			{
				tName: "multiColumnContainer",
				tText: "多列容器",
				isEdit: false,
				isShowUp:false,
				isShowDown:false,
				order: 2,
				mImage:{
					url:"",
				},
				colMapStyle: {

				},
				column: 3,
				isStreamColumn: false,
				conStyle: {
					paddingTop: '0',
					paddingLeft: '0',
					paddingRight: '0',
					paddingBottom: '0',
					borderWidth: "0",
				},
				cur: true,
				mClass: "Typesetting",
				aloneIcon: "panelModuleIcon_fullmeasure moduleArea_fullmeasure",
				aloneText: "moduleAloneText",
				itemInner: []
			}
		]
	}, {
		classify: 'product',
		tName: "产品",
		itemArr: [{
			tName: "productShow",
			tText: '产品展示',
			isEdit: false,
			mClass: "product",
			aloneIcon: "panelModuleIcon_product moduleArea_product",
			aloneText: "moduleAloneText",
			productList: [{
					img: "/static/image/img/1.jpg",
					name: "8公斤变频滚筒洗衣机全自动金色超薄",
					url: "http://fanyi.youdao.com/",
					describe: "8公斤变频滚筒洗衣机全自动金色超薄",
					
					target: "_blank"
				},
				{
					img: "/static/image/img/2.jpg",
					name: "55英寸4K超高清彩电智能互联网酷开电视机",
					url: "https://www.baidu.com/",
					describe: "55英寸4K超高清彩电智能互联网酷开电视机",
					
					target: "_self"
				},
				{
					img: "/static/image/img/3.jpg",
					name: "360儿童手表6C智能拍照版电话手表 智能语音",
					url: "/",
					describe: "360儿童手表6C智能拍照版电话手表",
					
					target: "_blank"
				},
				{
					img: "/static/image/img/4.jpg",
					name: "adidas阿迪达斯SUPERSTAR三叶草系列女经典鞋",
					url: "/",
					describe: "adidas阿迪达斯SUPERSTAR三叶草系列女经典鞋",
					target: "_blank"
				},
				{
					img: "/static/image/img/1.jpg",
					name: "mate10 全面屏",
					url: "/",
					describe: "mate10 全面屏",
					target: "_blank"
				},
				{
					img: "/static/image/img/2.jpg",
					name: "MIX2 手机 黑色",
					url: "/",
					describe: "MIX2 手机 黑色",
					target: "_blank"
				},
				{
					img: "/static/image/img/3.jpg",
					name: "巴旦木 坚果零食小吃 干货干果 巴达木 巴坦木袋装238g",
					url: "/",
					describe: "巴旦木 坚果零食小吃 干货干果 巴达木 巴坦木袋装238g",
					target: "_blank"
				},
				{
					img: "/static/image/img/4.jpg",
					name: "百香果西番莲 12个装 单果50-80g 新鲜水果",
					url: "/",
					describe: "百香果西番莲 12个装 单果50-80g 新鲜水果",
					target: "_blank"
				},
				{
					img: "/static/image/img/1.jpg",
					name: "飞科(FLYCO)FI9309电熨斗家用蒸气手持迷你电熨斗",
					url: "/",
					describe: "飞科(FLYCO)FI9309电熨斗家用蒸气手持迷你电熨斗",
					target: "_blank"
				},
				{
					img: "/static/image/img/2.jpg",
					name: "飞科剃须刀男士充电式刮胡刀电动胡须刀胡子刀",
					url: "/",
					describe: "飞科剃须刀男士充电式刮胡刀电动胡须刀胡子刀",
					target: "_blank"
				}
			],
			productSelected: [{
					img: "/static/image/img/1.jpg",
					name: "8公斤变频滚筒洗衣机全自动金色超薄",
					url: "http://fanyi.youdao.com/",
					describe: "8公斤变频滚筒洗衣机全自动金色超薄",
					target: "_blank"
				},
				{
					img: "/static/image/img/2.jpg",
					name: "55英寸4K超高清彩电智能互联网酷开电视机",
					url: "https://www.baidu.com/",
					describe: "55英寸4K超高清彩电智能互联网酷开电视机",
					target: "_self"
				},
				{
					img: "/static/image/img/3.jpg",
					name: "360儿童手表6C智能拍照版电话手表 智能语音",
					url: "/",
					describe: "360儿童手表6C智能拍照版电话手表",
					target: "_blank"
				},
				{
					img: "/static/image/img/4.jpg",
					name: "adidas阿迪达斯SUPERSTAR三叶草系列女经典鞋",
					url: "/",
					describe: "adidas阿迪达斯SUPERSTAR三叶草系列女经典鞋",
					target: "_blank"
				}
			],
			productShowTable: [{
				name: "编号",
				show: true
			}, {
				name: "价格",
				show: true
			}, {
				name: "规格",
				show: true
			}, {
				name: "更新时间",
				show: true
			}],
			liStyle: {
				float: 'left',
				width: '300px',
				margin: '0 5px',
				clear: ''
			},
			imgStyle: {
				float: 'none',
				width: '100%',
				margin: '0px'
			},
			pStyle: {
				float: 'none',
				width: '100%',
				margin: '0px',
				textAlign: 'center'
			},
			parentStyle: {
				left: 0,
				top: 0,
				width: 990,
				height: 400
			},
			target: '_self',
			styleone: true,
			styletwo: false,
			stylethree: false,
			mouseenterNumber: '1',
			hidStyle: {
				borderColor: "#fff",
				borderWidth: "1px",
				borderStyle: "solid",
				background: "",
				textAlign: "center"
			},
			page: true

		}, {
			tName: "productSearch",
			tText: '产品搜索',
			isEdit: true,
			aloneIcon: "panelModuleIcon_productSearch moduleArea_productSearch",
			aloneText: "moduleAloneText",
			mClass: "product",
			parentStyle: {
				left: 0,
				top: 0,
				width: 300,
				height: 50
			},
			divStyle: {
				width: '200px',
				height: '35px',
				borderColor: '#409EFF',
				borderWidth: '2px',
				borderRadius: ''
			},
			buttonStyle: {
				height: '35px',
				background: '#409EFF',
				color: '#409EFF'
			},
			productSearchTable: ['名称', '更新时间', '规格', '产品价格', '编号', '名称'],
			productSearchText: [{
				text: ""
			}, {
				text: ""
			}, {
				text: ""
			}, {
				text: ""
			}, {
				text: ""
			}, {
				text: ""
			}, {
				text: ""
			}, {
				text: ""
			}, {
				text: ""
			}, {
				text: ""
			}]

		}, {
			tName: "productNav",
			tText: "产品导航",
			isEdit: false,
			mClass: "product",
			parentStyle: {
				left: 0,
				top: 0,
				width: 500,
				height: 300
			},
			aloneIcon: "panelModuleIcon_productNav moduleArea_productNav",
			aloneText: "moduleAloneText",
		}, {
			tName: "newlyShop",
			tText: "商城分类",
			isEdit: false,
			mClass: "product",
			parentStyle: {
				left: 0,
				top: 0,
				width: 500,
				height: 200
			},
			aloneIcon: "panelModuleIcon_productMallGroup moduleArea_productMallGroup",
			aloneText: "moduleAloneText",
		}]
	}, {
		classify: 'dynamicWay',
		tName: "互动",
		itemArr: [{
				tName: "serviceOnline",
				tText: '在线客服',
				isEdit: false,
				mClass: "dynamicWay",
				parentStyle: {
					left: 0,
					top: 0,
					width: 990,
					height: 200
				},
				aloneIcon: "panelModuleIcon_serviceOnline moduleArea_serviceOnline",
				aloneText: "moduleAloneText",
				serviceOnlineTable: [{
						type: "QQ",
						number: "10010",
						name: "客服一"
					},
					{
						type: "QQ",
						number: "10086",
						name: "客服二"
					}
				],
				time1: '周一',
				time2: '周六',
				time3: '8:30',
				time4: '17:00',
				icon: '/static/image/qq1.gif',
				float: 'none'
			}, {
				tName: "memberLogin",
				tText: '会员登录',
				isEdit: false,
				parentStyle: {
					left: 0,
					top: 0,
					width: 100,
					height: 100
				},
				aloneIcon: "panelModuleIcon_memberLogin moduleArea_memberLogin",
				aloneText: "moduleAloneText",
				mClass: "dynamicWay",

			}, {
				tName: "siteQrCode",
				tText: "网站二维码",
				isEdit: false,
				mClass: "dynamicWay",
				parentStyle: {
					left: 0,
					top: 0,
					width: 300,
					height: 100
				},
				aloneIcon: "panelModuleIcon_siteQrCode moduleArea_siteQrCode",
				aloneText: "moduleAloneText",
				imgUrl: {
					url: "/static/image/qrCode.png"
				},
				imgColor: '#000',
				imgName: '扫面查看网站',
				imgWidth: '100px'
			}
			/*, {
						tName: "siteSearch",
						tText: "全站搜索",
						isEdit: false,
						mClass: "dynamicWay",
						aloneIcon: "panelModuleIcon_siteSearch moduleArea_siteSearch",
						aloneText: "moduleAloneText",
					}, {
						tName: "shareTo",
						tText: "分享网站",
						isEdit: false,
						mClass: "dynamicWay",
						aloneIcon: "panelModuleIcon_shareTo moduleArea_shareTo",
						aloneText: "moduleAloneText",
					}*/
			, {
				tName: "msgSubmit",
				tText: "留言提交",
				isEdit: true,
				mClass: "dynamicWay",
				parentStyle: {
					left: 0,
					top: 0,
					width: 300,
					height: 50
				},
				aloneIcon: "panelModuleIcon_msgSubmit moduleArea_msgSubmit",
				aloneText: "moduleAloneText",
				buttonStyle: {
					background: '#409EFF',
					borderRadius: '0px',
					borderColor: '#409EFF',
					color: '#fff',
					width: '250px'
				}
			},
			/*{
			tName: "shoppingCart",
			tText: "购物车",
			isEdit: false,
			mClass: "dynamicWay",
			aloneIcon: "panelModuleIcon_shoppingCart moduleArea_shoppingCart",
			aloneText: "moduleAloneText",
		}, {
			tName: "vote",
			tText: "在线投票",
			isEdit: false,
			mClass: "dynamicWay",
			aloneIcon: "panelModuleIcon_vote moduleArea_vote",
			aloneText: "moduleAloneText",
		},*/
			{
				tName: "siteForm",
				tText: "在线表单",
				isEdit: true,
				mClass: "dynamicWay",
				aloneIcon: "panelModuleIcon_siteForm moduleArea_siteForm",
				aloneText: "moduleAloneText",
				siteFormTable: [{
					name: "姓名",
					show: true
				}, {
					name: "性别",
					show: true
				}, {
					name: "联系电话",
					show: true
				}, {
					name: "联系地址",
					show: true
				}],
				parentStyle: {
					left: 0,
					top: 0,
					width: 990,
					height: 400
				},
				pStyle: {
					float: 'left',
					width: '48%',
					margin: '10px 5px',
					clear: 'none'
				},
				textareaStyle: {
					width: '100%',
					marginLeft: '0'
				},
				spanStyle: {
					float: 'left',
					width: '80px',
					display: '',
					textAlign: 'right'
				},
				inputStyle: {
					float: 'left',
					width: '80%'
				}
			}
		]
	}, {
		classify: 'topGrade',
		tName: "高级",
		itemArr: [{
				tName: "photoMoreCard",
				tText: '魔方多图',
				isEdit: false,
				mClass: "topGrade",
				parentStyle: {
					left: 0,
					top: 0,
					width: 500,
					height: 400
				},
				aloneIcon: "panelModuleIcon_photoMoreCard moduleArea_photoMoreCard",
				aloneText: "moduleAloneText",
				
			}
			/*, {
						tName: "newsgroup",
						tText: '文章导航',
						isEdit: false,
						aloneIcon: "panelModuleIcon_newsgroup moduleArea_newsgroup",
						aloneText: "moduleAloneText",
						mClass: "topGrade",

					}, {
						tName: "photoGroupNav",
						tText: "图册导航",
						isEdit: false,
						mClass: "topGrade",
						aloneIcon: "panelModuleIcon_photoGroupNav moduleArea_photoGroupNav",
						aloneText: "moduleAloneText",
					} ,{
						tName: "notice",
						tText: "滚动公告",
						isEdit: false,
						mClass: "topGrade",
						aloneIcon: "panelModuleIcon_notice moduleArea_notice",
						aloneText: "moduleAloneText",
					}*/
			, {
				tName: "moduleAreaNav",
				tText: "栏目导航",
				isEdit: false,
				mClass: "topGrade",
				parentStyle: {
					left: 0,
					top: 0,
					width: 990,
					height: 100
				},
				aloneIcon: " panelModuleIcon_nav moduleArea_nav",
				aloneText: "moduleAloneText",
				navItem: []
			}, {
				tName: "areaFile",
				tText: "文件下载",
				isEdit: true,
				mClass: "topGrade",
				aloneIcon: "panelModuleIcon_file moduleArea_file",
				aloneText: "moduleAloneText",
				parentStyle: {
					left: 0,
					top: 0,
					width: 990,
					height: 200
				},
				areaFileTable: [{
					name: "文件一",
					size: "58.5KB"
				}, {
					name: "文件二",
					size: "58.5KB"
				}, {
					name: "文件三",
					size: "58.5KB"
				}, {
					name: "文件四",
					size: "58.5KB"
				}],
				float: 'none',
				width: '',
				page: true,
				size: true
			}, {
				tName: "areaFlv",
				tText: "在线视频",
				isEdit: true,
				mClass: "topGrade",
				parentStyle: {
					left: 0,
					top: 0,
					width: 300,
					height: 100
				},
				aloneIcon: "panelModuleIcon_flv moduleArea_flv",
				aloneText: "moduleAloneText",
				videoSrc: "/static/image/img/1.jpg",
				videoStyle: {
					width: '200px',
					height: '100px'
				},
				autoplay: true
			}
			/*, {
						tName: "areaFlash",
						tText: "flash",
						isEdit: false,
						mClass: "topGrade",
						aloneIcon: "panelModuleIcon_flash moduleArea_flash",
						aloneText: "moduleAloneText",
					}*/
			, {
				tName: "areaMap",
				tText: "在线地图",
				isEdit: true,
				mClass: "topGrade",
				parentStyle: {
					left: 0,
					top: 0,
					width: 990,
					height: 300
				},
				aloneIcon: "panelModuleIcon_map moduleArea_map",
				aloneText: "moduleAloneText",
				addressCity: '广州市',
				addressDetails: '天河棠下骏景广场'
			}
			/*, {
						tName: "areaWeiboShow",
						tText: "新浪微博秀",
						isEdit: false,
						mClass: "topGrade",
						aloneIcon: "panelModuleIcon_weiboShow moduleArea_weiboShow",
						aloneText: "moduleAloneText",
					}*/
			, {
				tName: "areaDate",
				tText: "当前时间",
				isEdit: false,
				parentStyle: {
					left: 0,
					top: 0,
					width: 100,
					height: 100
				},
				mClass: "topGrade",
				aloneIcon: "panelModuleIcon_date moduleArea_date",
				aloneText: "moduleAloneText",
			}, {
				tName: "areaLocation",
				tText: "当前位置",
				isEdit: true,
				mClass: "topGrade",
				aloneIcon: "panelModuleIcon_location moduleArea_location",
				aloneText: "moduleAloneText",
				parentStyle: {
					left: 0,
					top: 0,
					width: 350,
					height: 50
				},
				mImage0: {
					url: "/static/image/img/1.jpg"
				},
				mImage1: {
					url: "/static/image/img/1.jpg"
				},
				Divstyle: {
					marginLeft: '0px',
					marginTop: '0px',
					lineHeight: '30px',
					backgroundColor: '',
					paddingLeft: '0px',
					paddingRight: '0px',
					paddingTop: '0px',
					paddingBottom: '0px',
					borderColor: '',
					borderWidth: '1px',
					borderStyle: '',
					textAlign: '',
					borderTopStyle: '',
					borderBottomStyle: '',
					borderLeftStyle: '',
					borderRightStyle: ''
				},
				Astyle: {
					fontSize: '14px',
					fontWeight: 'normal',
					textDecoration: 'none',
					fontFamily: '微软雅黑',
					color: '#333'
				}

			}, {
				tName: "areaIndexFavorite",
				tText: "收藏本站",
				isEdit: true,
				mClass: "topGrade",
				aloneIcon: "panelModuleIcon_indexFavorite moduleArea_indexFavorite",
				aloneText: "moduleAloneText",
				parentStyle: {
					left: 0,
					top: 0,
					width: 300,
					height: 50
				},
				mImage0: {
					url: "/static/image/img/1.jpg"
				},
				mImage1: {
					url: "/static/image/img/1.jpg"
				},
				Divstyle: {
					marginLeft: '0px',
					marginTop: '0px',
					lineHeight: '30px',
					backgroundColor: '',
					paddingLeft: '0px',
					paddingRight: '0px',
					paddingTop: '0px',
					paddingBottom: '0px',
					borderColor: '',
					borderWidth: '1px',
					borderStyle: '',
					textAlign: '',
					borderTopStyle: '',
					borderBottomStyle: '',
					borderLeftStyle: '',
					borderRightStyle: ''
				},
				Astyle: {
					fontSize: '14px',
					fontWeight: 'normal',
					fontFamily: '微软雅黑',
					color: '#333'
				}
			}
			/*, {
						tName: "areaIframe",
						tText: "嵌入页面",
						isEdit: false,
						mClass: "topGrade",
						aloneIcon: "panelModuleIcon_iframe moduleArea_iframe",
						aloneText: "moduleAloneText",
					}*/
			, {
				tName: "areaCode",
				tText: "插件代码",
				isEdit: false,
				mClass: "topGrade",
				parentStyle: {
					left: 0,
					top: 0,
					width: 500,
					height: 300
				},
				aloneIcon: "panelModuleIcon_code moduleArea_code",
				aloneText: "moduleAloneText",
			}
		]
	}],
}, {
	mTname: "funPanelEntryBtn_skin",
	isyt: "funPanelEntryBtnIcon_skin",
	stylcss: "multiSwitchBtn_skin",
	cur: false,
	mText: "样式",
}, {
	mTname: "funPanelEntryBtn_setup",
	isyt: "funPanelEntryBtnIcon_setup",
	stylcss: "multiSwitchBtn_setup",
	cur: false,
	mText: "设置",
}, {
	mTname: "funPanelEntryBtn_opt",
	isyt: "funPanelEntryBtnIcon_opt",
	stylcss: "multiSwitchBtn_opt",
	cur: false,
	mText: "百度优化",
}];

export default dat