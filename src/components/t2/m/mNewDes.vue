<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" v-on:dragging="onDrag" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit newsDesP hove_con">
			<p class="edit_con" style="z-index:100;">
				<!--<span @click="isFuncur(itemMdata)">编辑新闻详情</span>-->
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span
				<span class="icon style" @click="isProEd(itemMdata)"><i>设置样式</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" :id="newDesId">
				<div class="top">
					<p>
						<span class="name" :style="itemMdata.nameStyle">{{itemMdata.newDesInfo.name}}</span>
						<span class="time">发表时间：{{itemMdata.newDesInfo.add_time}}</span>
						<span class="time">作者：{{itemMdata.newDesInfo.author}}</span>
					</p>									
				</div>
				<div class="text">
					<img :src="itemMdata.newDesInfo.image" />
					<p v-html="itemMdata.newDesInfo.content"></p>
				</div>
				<div class="buttom">
					<p>
						<span>上一个：</span>
						<span>{{itemMdata.newDesInfoList[newsPrev].name}}</span>
					</p>
					<p>
						<span>下一个：</span>
						<span>{{itemMdata.newDesInfoList[newsNext].name}}</span>
					</p>
				</div>
			</div>
		</div>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	//require("../../../../static/js/emit.js");
	export default {
		name: 'mNewDes',
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			this.getData();
			//this.idNewDes = this.itemMdata.pageEleSIds.indexOf(this.itemMdata.pageEleSId)
			//console.log(this.idNewDes);
		},
		data() {
			return {
				title: "新闻列表",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				token: this.$route.query.token,
				newDesId: this.$route.query.newDesId,
				parentStyle: {

				},
				newsPrev: 5,
				newsNext:7,
				idNewDes: '',
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					isEdit: true,
					rTitle: '编辑文章列表',
				},
				contextMenuData: {
					// the contextmenu name(@1.4.1 updated)
					menuName: this.$utils.guid(),
					axios: {
						x: null,
						y: null
					},
					//Menu options (菜单选项)
					menulists: [{
							fnHandler: 'upFloor', // Binding events(绑定事件)
							btnName: '置于顶层' // The name of the menu option (菜单名称)
						},
						{
							fnHandler: 'moveUpFloor',
							btnName: '上移一层'
						},
						{
							fnHandler: 'moveDownFloor',
							btnName: '下移一层'
						},
						{
							fnHandler: 'copyItem',
							btnName: '复制模块'
						},
						{
							fnHandler: 'downFloor',
							btnName: '置于底层'
						}
					]
				}
			}
		},
		components: {
			VueDraggableResizable
			//uiDialog
		},
		methods: {
			showMenu(index) {
				event.preventDefault();
				event.stopPropagation();
				var x = event.clientX;
				var y = event.clientY;
				this.contextMenuData.axios = {
					x,
					y
				}
			},
			upFloor(i) {
				console.log(i.parentStyle);
				i.parentStyle.zIndex += this.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) {
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			moveDownFloor(i) {
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) {
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.length + 1;
				this.itemInner.push(i);
			},
			downFloor(i) {
				i.parentStyle.zIndex = 0;
				console.log('downFloor!')
			},
			isNewEd(i) {
				i.isEdit = true;
				i.isNewDes = false;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
				console.log(i.isNewDes)

			},
			gotolink: function(link, target) {
				//debugger;
				window.open(link, target);
			},
			isFuncur(i) {
				i.isEdit = true;
				i.isNewDes = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			getData() {
				var v = this;
				api.get('/api/data/news?token=' + this.token + '&id=' + this.newDesId, false, {}, function(data) {
					//console.log(data)
					v.itemMdata.newDesInfo = data.data;
				});
				api.get('/api/data/newsList?token=' + this.token, false, {}, function(data) {
					//console.log(data)
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.newDesInfoList = data.data;
					for (var i= 0 ; i< v.itemMdata.newDesInfoList.length ; i++) {
						if (v.itemMdata.newDesInfoList[i].id == v.itemMdata.newDesInfo.id) {
							//debugger
							v.newsPrev = i-1;
							v.newsNext = i+1;
							if (i == 0) {
								v.newsPrev = 0;
							}
							if (i == v.itemMdata.newDesInfoList.length-1) {
								v.newsNext = i;
							}
						}
					};
					//console.log(v.itemMdata.newDesInfoList[v.newsPrev].name);
					//console.log(v.itemMdata.newDesInfoList[v.newsNext].name);
				});
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}
		},
		mounted() {
			//百度分享
			let _this = this;
			this.$nextTick(function() {
				window._bd_share_config = {
					"common": {
						"bdSnsKey": {},
						"bdText": "",
						"bdMini": "2",
						"bdPic": "",
						"bdStyle": "0",
						"bdSize": "16"
					},
					"share": {},
					/*
					"image":{
						"viewList":["qzone","tsina","tqq","renren","weixin"],
						"viewText":"分享到：",
						"viewSize":"16"
					},*/
					"selectShare": {
						"bdContainerClass": null,
						"bdSelectMiniList": ["qzone", "tsina", "tqq", "renren", "weixin"]
					}

				};
				const s = document.createElement('script');
				s.type = 'text/javascript';
				s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
				document.body.appendChild(s);
			})

			console.log($("#" + this.newDesId).parents(".freeContainer").height());
			var newDesH = $("#" + this.newDesId).height();
			if($("#" + this.newDesId).parents(".freeContainer").height() < newDesH+50) {
				var conDes = $("#" + this.newDesId).parents(".freeContainer").height(newDesH + 50);
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		.edit_con {
			position: absolute;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
			padding: 0 15px;
			top: -40px;
			width: auto;
			height: 40px;
			line-height: 40px;
			display: none;
			span {
				float: left;
				cursor: pointer;
				border-right: 1px solid #E3E3E3;
				margin: 0 8px;
			}
			span:nth-child(1) {
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon {
				display: block;
				float: left;
				border-right: none;
				background: url(/static/image/bg03.png)no-repeat;
			}
			.icon i {
				position: absolute;
				display: block;
				font-size: 12px;
				width: auto;
				line-height: 25px;
				padding: 0px 10px;
				background: #FFFFFF;
				border-radius: 5px;
				box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.1);
				top: -23px;
				margin-left: -25px;
				display: none;
			}
			.style {
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover {
				background-position: -60px -232px;
			}
			.style:hover i {
				display: block;
			}
			.animation {
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover {
				background-position: -372px -232px;
			}
			.animation:hover i {
				display: block;
			}
			.borderhid {
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover {
				background-position: -275px -232px;
			}
			.borderhid:hover i {
				display: block;
			}
			.delete {
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover {
				background-position: -105px -232px;
			}
			.delete:hover i {
				display: block;
			}
		}
		.detail {
			h3 {
				line-height: 100px;
				border-bottom: 3px solid #ccc;
				margin-bottom: 30px;
				div {
					p {
						display: inline-block;
						color: #655d5d;
						font-size: 12px;
					}
				}
			}
			.next {
				p {
					span {
						display: inline-block;
						margin-right: 30px;
					}
					span:last-child {
						font-weight: bold;
					}
				}
			}
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>