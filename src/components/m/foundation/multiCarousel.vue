<template>
	<vue-draggable-resizable class="multiCarousel" :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height||200" :active.sync="itemMdata.parentStyle.active" :parent="itemMdata.parent" v-on:resizing="onResize" v-on:dragging="onDrag" @resizestop="onResizstop" :drag-cancel="'.edit_con'">
		<div :class="['multiCarousel hove_con',{hover:isHover}]" @mouseenter="hoverMultiCarousel($event)" @mouseleave="leaveMultiCarousel($event)">
			<p class="edit_con">
				<span@click="isFuncur(itemMdata)">编辑轮播多图</span>
					<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon bord"><i>隐藏边框</i></span-->
					<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="carousel-wrap" :id="carouselId" :data-speedindex="itemMdata.speedIndex" :style="style" @contextmenu="showMenu">
				<ul class="slide-ul activeimg" :style="style" ref="slide" id="activeimg">
					<li v-for="(list,index) in itemMdata.slideList" :style="{width:itemMdata.parentStyle.width+'px',height:itemMdata.parentStyle.height+'px'}" :key="index">
						<!--<img @mousedown="defaultStop($event)" :src="list.image" :alt="list.name" :width="itemMdata.parentStyle.width" :height="itemMdata.parentStyle.height">-->
						<img @mousedown="defaultStop($event)" :src="list.image" :alt="list.name" :style="[itemMdata.imgStyle]">
						<div v-show="itemMdata.txtMul" class="txt" :style="itemMdata.txtStyle" v-html="list.content"></div>
					</li>
				</ul>
			</div>
		</div>
		<!---uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	export default {
		name: 'multiCarousel',
		components: {
			VueDraggableResizable,
			//uiDialog
		},
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			this.getData();
			this.itemMdata.pageBg = this.itemMdata.pageBg || {};
			this.itemMdata.activeBg = this.itemMdata.activeBg || {};
			this.itemMdata.pageSpan = this.itemMdata.pageSpan || {};

			this.itemMdata.spanStyle = this.itemMdata.spanStyle || {};
			this.itemMdata.mulNext = this.itemMdata.mulNext || {};
			this.itemMdata.mulPre = this.itemMdata.mulPre || {};
			this.itemMdata.activemulPre = this.itemMdata.activemulPre || {};
			this.itemMdata.activemulNext = this.itemMdata.activemulNext || {};
			this.itemMdata.pageImg = this.itemMdata.pageImg || {};
			this.itemMdata.activeImg = this.itemMdata.activeImg || {};
			this.itemMdata.imgStyle = this.itemMdata.imgStyle || {};

		},
		data() {
			return {
				title: "轮播多图",
				outerVisible: false,
				carouselId: "carousel" + this.posCom + this.index,
				width: 0,
				carouse: 300,
				height: 0,
				style: {
					width: this.itemMdata.parentStyle.width + 'px',
					height: this.itemMdata.parentStyle.height + 'px'
				},
				x: 0,
				y: 0,
				parentStyle: {

				},
				curIndex: 0,
				isHover: false,
				token: this.$route.query.token,
				type: this.$route.query.type,
				currentIndex: 0,
				timer: '',
				editDial: {
					editDialWidth: "950px",
					editDialHeight: "680px",
					isEdit: false,
					rTitle: '编辑轮播图'
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
		mounted() {
			var btnPages = document.querySelectorAll('.btnPage');
			console.log(btnPages);
			if(btnPages.length > 0) {
				btnPages[0].classList.add('active');
			}
			var ts = this;
			if(ts.itemMdata.timer) {
				clearInterval(ts.itemMdata.timer);
			}
			multiCarouse.multiCarousel1(ts.carouselId, ts.itemMdata);
		},
		watch: {
			'itemMdata.slideList': function() {
				this.$nextTick(function() {
					//multiCarouse.multiCarousel1(this.carouselId,this.itemMdata);
				});
			},

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
			moveDownFloor(i) {
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			hoverMultiCarousel() {
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveMultiCarousel() {
				this.isHover = false;
				this.itemInner.isStopPropagation = false;
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
				//console.log('downFloor!')
			},
			onResize: function(x, y, width, height) {
				//console.log(width)				
				if(!width) {
					return;
				}
				this.style.width = width + "px";
				this.style.height = height + "px";
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
			},
			getData() {
				var v = this;
				if(v.itemMdata.slideList.length) {
					return;
				}
				api.get('/api/data/bannerList?token=' + this.token + '&type='+this.type,false,{}, function(data) {
						//var result = JSON.stringify(data); //json对象转成字符串
						v.itemMdata.slideList = data.data;
						//console.log(data.data);
					}
				);
			
				//http://api.xiaohucloud.com/api/data/bannerCategory?token=a1c81f9f4ef24f08afe7a78156d5882bkUj8mu
				api.get('/api/data/bannerCategory?token=' + this.token, true, {}, function(data) {
					console.log(data.data)
					v.itemMdata.mulTypeList = data.data
					
				});

			
			},
			defaultStop(e) {
				//console.log("dd")
				e.preventDefault();
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			},
			onResizstop: function() {
				var ts = this;
				ts.itemMdata.isShow = false;
				console.log("ts");
				console.log(ts.itemMdata.timer);
				if(ts.itemMdata.timer) {
					clearInterval(ts.itemMdata.timer);
				}
				setTimeout(function() {
					ts.itemMdata.isShow = true;
				}, 10);
				//multiCarouse.multiCarousel1(this.carouselId,this.itemMdata);
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			}

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		height: 100%;
		.active {
			background: #2D64B3;
			color: #fff;
		}
		.carousel-is0 span {
			padding: 0 5px;
		}
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
			.bord {
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.bord:hover {
				background-position: -275px -232px;
			}
			.bord:hover i {
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
	}
	
	.carousel-wrap {
		position: relative;
		.active {
			background-color: rgba(255, 0, 0, 0.8),
		}
		.txt{
			float:right;
		}
	}
	
	.hove_con.hover {
		.edit_con {
			display: block;
		}
	}
</style>