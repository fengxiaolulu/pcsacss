<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :active.sync="itemMdata.parentStyle.active" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['areaFile hove_con',{hover:isHover}]" @mouseenter="hoverAreaFile($event)" @mouseleave="leaveAreaFile($event)" @contextmenu="showMenu">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑文件下载</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail">
				<ul>
					<li v-for="(table,index) in itemMdata.areaFileTable" :style="{float:itemMdata.float,width:itemMdata.width}">
						<p>{{index}}.{{table.file_name}}<span v-show="itemMdata.size">{{table.file_size}}</span></p>
						<button @dblclick="downLoad(table)">点击下载</button>
					</li>
				</ul>
				<!--分页-->
				<!--div class="page" v-show="itemMdata.page">
					<p>
						<a href="">首页</a>
					</p>
					<p>
						<a href="">1</a>
					</p>
					<p>
						<a href="">2</a>
					</p>
					<p>
						<a href="">3</a>
					</p>
					<p>
						<a href="">4</a>
					</p>
					<p>
						<a href="">末页</a>
					</p>
				</div-->
			</div>
		</div>
		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	export default {
		name: 'areaFile',
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			console.log(this.itemMdata);
			this.getData();
		},
		data() {
			return {
				title: "在线客服",
				outerVisible: false,
				dialogVisible: false,
				innerVisible: false,
				parentStyle: {

				},
				isHover: false,
				token: this.$route.query.token,
				type: this.$route.query.type,
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "600px",
					isEdit: true,
					rTitle: '编辑文件下载',
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
			VueDraggableResizable,
			//uiDialog
		},
		methods: {
			downLoad(table) {
				//console.log(table.download_url)
				window.open(table.download_url)
			},
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
			copyItem(item) {
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.itemInner.length + 1;
				this.itemInner.itemInner.push(i);
			},
			hoverAreaFile() {
				this.isHover = true;
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;
			},
			leaveAreaFile() {
				this.isHover = false;
				this.itemInner.isStopPropagation = false;
			},
			downFloor(i) {
				i.parentStyle.zIndex = 0;
				console.log('downFloor!')
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			getData() {
				var v = this;
				api.get('/api/data/downloadList?token=' + this.token + '&type=' + this.type, true, {}, function(data) {
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.areaFileTable = data.data;
					console.log(data.data);
				});
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
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
		width: 100%;
		height: 100%;
		.edit_con {
			position: absolute;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
			padding: 0 15px;
			top: -40px;
			width: 150px;
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
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>