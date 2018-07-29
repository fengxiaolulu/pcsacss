<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" v-on:dragging="onDrag" :parent="itemMdata.parent" :active.sync = "itemMdata.parentStyle.active" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['productSearch hove_con',{hover:isHover}]" @mouseenter="hoverProductSearch($event)" @mouseleave="leaveProductSearch($event)"  @contextmenu="showMenu" :id="productSearchId">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑产品搜索</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail" :style="itemMdata.divStyle">
				<input type="text" :style="{height:itemMdata.divStyle.height}" value="" :placeholder="itemMdata.placeholderTxt" class="searchCon"/>
				
				<button type="submit" :style="[itemMdata.buttonStyle,{height:itemMdata.divStyle.height}]" @dblclick="goProduct()">
					<i v-if="itemMdata.setProductSearch ==1||itemMdata.setProductSearch ==2" :style="{color:itemMdata.buttonStyle.color}">搜索</i>
					<span class="el-icon-search" v-if="itemMdata.setProductSearch ==3||itemMdata.setProductSearch ==4||itemMdata.setProductSearch ==5||itemMdata.setProductSearch ==6"></span>
				</button>
			</div>
			<p class="keyword">
				<span v-for="item in itemMdata.productSearchText" :style="itemMdata.spanStyle">{{item.text}}</span>
			</p>
		</div>
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import api from '@/api/$ajax.js'
	//import uiDialog from './uiDialog.vue'
	export default {
		name: 'productSearch',
		components: {
			VueDraggableResizable,
		//	uiDialog
		},
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			var ts = this;
			api.get('/api/data/columnList?template_id=' + this.param.id + '&token=' + this.param.token + "&version_id=" + this.param.version_id, false,{}, function(r) {
				if(r.code == 422) {
					return;
				}
				for(let i = 0; r.data.list.length > i; i++) {
					if(r.data.list[i].url == "productList") {
						console.log("productList");
						console.log(r.data.list)
						//ts.param.id = r.data.list[i].id;
						ts.itemMdata.paramUrl = r.data.list[i].id;
						console.log()
					}
				}
			});
			console.log(this.itemMdata.paramUrl);
			this.itemMdata.param = this.param;
			this.itemMdata.preview = '/t1/prev/' + this.$route.params.id + "/";
		},
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				isHover:false,
				productSearchId:'productSearchId'+this.index,
				searchValue:[],
				preview: '/pc/t1/' + this.$route.params.id + "/",
				param: {
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					pc_version_id: this.$route.query.pc_version_id,
					mobile_version_id:this.$route.query.mobile_version_id,
					version_id: this.$route.query.pc_version_id
				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit:true,
					rTitle: '编辑产品搜索',
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
				},

			}
		},
		methods: {
			goProduct(){
				//http://localhost:8083/pc/t1/61/490?token=2f3414a0ca414903937ce34af1345e07WampO2&company_id=100037&type=1&pc_version_id=105&mobile_version_id=undefined
				//http://localhost:8083/t1/61/491?token=2f3414a0ca414903937ce34af1345e07WampO2&company_id=100037&type=1&pc_version_id=105&mobile_version_id=undefined&keyword=%E7%94%9F%E6%80%81
				window.open(this.preview  + this.itemMdata.paramUrl +'?token=' + this.param.token + '&company_id=' + this.param.company_id + '&type=' + this.param.type +
				 '&pc_version_id='+ this.param.pc_version_id + '&mobile_version_id=' + this.param.mobile_version_id+'&keyword='+$('#' + this.productSearchId).find('.searchCon').val())
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
			downFloor(i) {
				i.parentStyle.zIndex = 0;
				console.log('downFloor!')
			},	
			onResize: function(x, y, width, height) {
				this.parentStyle.left = x;
				this.parentStyle.top = y;
				this.parentStyle.width = width;
				this.parentStyle.height = height;
				this.itemMdata.parentStyle = this.parentStyle;
			},
			onDrag: function(x, y) {
				this.itemMdata.parentStyle.left = x;
				this.itemMdata.parentStyle.top = y;
			},
			hoverProductSearch(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveProductSearch(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;
			},
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i,this.editDial);
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			}
		},
		
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.hove_con {
		position: relative;
		height: 100%;
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
			span:nth-child(1){
				padding-right: 7px;
				line-height: 25px;
				margin-top: 8px;
			}
			.icon{
				display: block;
				float: left;
				border-right: none;
				background: url(/static/image/bg03.png)no-repeat;
			}
			.icon i{
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
			.style{
				background-position: -60px -186px;
				width: 21px;
				height: 21px;
				margin-top: 10px;
			}
			.style:hover{
				background-position: -60px -232px;
			}
			.style:hover i{
				display: block;
			}
			.animation{
				background-position: -372px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.animation:hover{
				background-position: -372px -232px;
			}
			.animation:hover i{
				display: block;
			}
			.borderhid{
				background-position: -275px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.borderhid:hover{
				background-position: -275px -232px;
			}
			.borderhid:hover i{
				display: block;
			}
			.delete{
				background-position: -105px -186px;
				width: 21px;
				height: 20px;
				margin-top: 10px;
			}
			.delete:hover{
				background-position: -105px -232px;
			}
			.delete:hover i{
				display: block;
			}
		}
		.keyword{
			margin:10px;
			span{
				display:inline-block;
				padding-right:20px;
			}
		}
		.detail {
			clear: both;
			overflow: hidden;
			border-style: solid;
			input {
				width: 70%;
				height: 30px;
				float: left;
			}
			
			button {
				width: 18%;
				float: right;
				span {
					display: block;
					width: 20px;
					height: 20px;
					margin-left: 30%;
					font-size: 18px;
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