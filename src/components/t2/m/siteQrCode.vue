<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :active.sync="itemMdata.parentStyle.active" :z="itemMdata.parentStyle.zIndex" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height||30" :parent="itemMdata.parent" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit siteQrCodeP hove_con">
			<p class="edit_con">
				<span @click="isFuncur(itemMdata)">编辑网站二维码</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" :style="{width:itemMdata.imgWidth}" @contextmenu="showMenu">
				<img @mousedown="defaultStop($event)" :src="itemMdata.imgUrl.url" :style="{background:itemMdata.imgColor,width:itemMdata.imgWidth}" />
				<p>{{itemMdata.imgName}}</p>
			</div>
		</div>
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	//import uiDialog from './uiDialog.vue'
	export default {
		name: 'siteQrCode',
		components: {
			VueDraggableResizable,
			//uiDialog
		},
		props: ['itemMdata', "posCom", 'index',"itemInner"],
		created() {
			console.log(this.itemMdata)
			this.getData()
		},
		methods: {
			getData(){
				var v = this;
				api.get('/api/data/qrCodeList?token='+this.token,
					true,{},function(data){
						console.log(data)
						v.itemMdata.siteQList = data.data;
						//itemMdata.imgUrl.url
					}
				)
			},
			onResize: function(x, y, width, height) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
				this.itemMdata.parentStyle.width = width;
				this.itemMdata.parentStyle.height = height;
				//this.itemMdata.parentStyle = this.parentStyle;
			},		
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
			},
			delModule(i) {
				this.$emit('delModule', i);
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
			},
			defaultStop(e) {
				e.preventDefault();
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
			upFloor(i) {//置于顶层
				//console.log(i.parentStyle);
				i.parentStyle.zIndex = this.itemInner.length;
				console.log("upFloor");
			},
			moveUpFloor(i) {//上移一层
				++i.parentStyle.zIndex;
				console.log('moveUpFloor!');
			},
			moveDownFloor(i) {//下移一层
				--i.parentStyle.zIndex;
				console.log('moveDownFloor!');
			},
			copyItem(item) {//复制模块
				var i = JSON.parse(JSON.stringify(item));
				i.parentStyle.left = item.parentStyle.left + 20;
				i.parentStyle.top = item.parentStyle.top + 20;
				i.parentStyle.zIndex = this.itemInner.length + 1;
				this.itemInner.push(i);
			},
			downFloor(i) {//置于底层
				i.parentStyle.zIndex = 0;
				console.log('downFloor!');
			}
		},
		data() {
			return {
				token:this.$route.query.token,
				outerVisible: false,
				parentStyle: {

				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "550px",
					rTitle: '编辑网站二维码',
					isEdit: false
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
							fnHandler: 'upFloor', //Binding events(绑定事件)
							btnName: '置于顶层' //The name of the menu option (菜单名称)
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
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		height: 100%;
		
		.detail{
			img{
				height:auto;
			}
			p{
				width: 100%;
				text-align: center;
				line-height: 25px;
				color: #666666;
			}
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
	
</style>