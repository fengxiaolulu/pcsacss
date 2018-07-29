<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :z="itemMdata.parentStyle.zIndex" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" :active.sync="itemMdata.parentStyle.active" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['newDes hove_con',{hover:isHover}]" @mouseenter="hoverMewDes($event)" @mouseleave="leaveMewDes($event)">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">新闻详情</span>
				<span class="icon style" @click="isNewEd(itemMdata)"><i>设置样式</i></span>
				<!--<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>

			<div v-bind:id="newDesId" class="detail" @contextmenu="showMenu">
				<div>
					<h3>
						<p :style="itemMdata.iStyle">{{itemMdata.newDesInfo.name}}</p>
						<div v-if="itemMdata.pageEleSIds.length>0">
							<p v-if="itemMdata.oneId>-1"><span>发表时间：</span><span>{{itemMdata.newDesInfo.add_time}}</span></p>
							<p v-if="itemMdata.twoId>-1"><span>作者：</span><span>{{itemMdata.newDesInfo.author}}</span></p>
							<p v-if="itemMdata.fourId>-1"><span>来源：</span><span>{{itemMdata.newDesInfo.source}}</span></p>
							<p v-if="itemMdata.fiveId>-1"><span>网址：</span><span>{{itemMdata.newDesInfo.source}}</span></p>
						</div>
					</h3>
					<div class="two" v-if="itemMdata.modelStyle == 1"><img :src="itemMdata.newDesInfo.image" /></div>
					<div style="clear: both;overflow:hidden;">
						<div style="float:left; clear: both;overflow:hidden;" align="center" v-if="itemMdata.modelStyle == 2">
							<img :src="itemMdata.newDesInfo.image" hspace="8"><br />
						</div>

						<img :src="itemMdata.newDesInfo.image" hspace="8" v-if="itemMdata.modelStyle == 3" style="float:right; clear: both;"><br />
						<p v-html="itemMdata.newDesInfo.content"></p>
					</div>
					<div class="next">
						<!--p>
							<span>下一篇</span>
							<span>{{itemMdata.newDesInfoList[newsNext].name}}</span>
						</p-->

						<div class="bdsharebuttonbox" v-show="itemMdata.shareId=='1'">
							<span style="float:left;">分享到：</span>
							<a href="javascript:viod(0)" class="bds_qzone" data-cmd="qzone"></a>
							<a href="javascript:viod(0)" class="bds_tsina" data-cmd="tsina"></a>
							<a href="javascript:viod(0)" class="bds_tqq" data-cmd="tqq"></a>
							<a href="javascript:viod(0)" class="bds_renren" data-cmd="renren"></a>
							<a href="javascript:viod(0)" class="bds_weixin" data-cmd="weixin"></a>
							<a href="javascript:viod(0)" class="bds_more" data-cmd="more"></a>
						</div>
					</div>
				</div>

			</div>
		</div>
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	//require("../../../../static/js/emit.js");
	export default {
		name: 'newDes',
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
				curIndex: 0,
				isHover:false,
				isHover: false,
				newsNext: '',
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
				i.parentStyle.zIndex += this.itemInner.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) {
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			hoverMewDes(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveMewDes(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;
			},
			moveDownFloor(i) {
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) {
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.itemInner.length + 1;
				this.itemInner.itemInner.push(i);
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
				api.get('/api/data/news?token=' + this.token + '&id=' + this.newDesId, true, {}, function(data) {
					console.log(data)
					v.itemMdata.newDesInfo = data.data;
				});
				api.get('/api/data/newsList?token=' + this.token, true, {}, function(data) {
					console.log(data)
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.newDesInfoList = data.data;
					//var i = v.itemMdata.newDesInfoList.indexOf(v.itemMdata.newDesInfo);
					//v.newsId = i + 1;
					for (var i=0 ; i< v.itemMdata.newDesInfoList.length ; i++) {
						if (v.itemMdata.newDesInfoList[i].id == v.itemMdata.newDesInfo.id) {
							v.newsNext = i+1 ;
							if (i == v.itemMdata.newDesInfoList.length-1) {
								v.newsNext = i;
							}
						}
					};
					console.log(v.newsNext);
					//$("#text").val(result);
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
				background: url(/static/image/bg03.png) no-repeat;
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
	
	.hove_con.hover {
		.edit_con {
			display: block;
		}
	}
</style>