<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :z="itemMdata.parentStyle.zIndex" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :active.sync="itemMdata.parentStyle.active" v-on:dragging="onDrag" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['siteForm hove_con',{hover:isHover}]" @mouseenter="hoverSiteForm($event)" @mouseleave="leaveSiteForm($event)" @contextmenu="showMenu" :id="siteFormId">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑在线表单</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span class="icon style" @click="visibleNav()"><i>设置样式</i></span>
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail">
				<div style="{clear:both;overflow:hidden;}">
					<h3 :style="itemMdata.titleStyle">{{itemMdata.formTitle.name}}</h3>
					<p v-for="(list,idx) in itemMdata.onlineFormMsg" :style="itemMdata.pStyle" v-if="list.is_open==1">
						<span :style="itemMdata.spanStyle">{{list.name}}：</span>
						<input type="text" :placeholder="list.placeholder" :style="itemMdata.inputStyle" />
					</p>
				</div>

				<p class="btn">
					<button :style="[itemMdata.buttonEdit.buttonStyle,{borderRadius:itemMdata.buttonEdit.borderRadius + 'px'},itemMdata.buttonEdit.iStyle]">{{itemMdata.formTitle.btnName}}</button>
				</p>
			</div>
		</div>
		<el-dialog title="编辑按钮" :modal=false :visible.sync="addVisibleNav" :append-to-body=true width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mButtonEdit :itemMdata="itemMdata.buttonEdit"></mButtonEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisibleNav = false">取 消</el-button>
				<el-button type="primary" @click="addVisibleFun">保 存</el-button>
			</span>
		</el-dialog>
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>
		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import mButtonEdit from '../frequently/mButtonEdit.vue'
	import api from '@/api/$ajax.js'
	export default {
		name: 'siteForm',
		components: {
			VueDraggableResizable,
			mButtonEdit
			//uiDialog
		},
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			console.log(this.itemMdata)
			this.getData();
			this.itemMdata.titleStyle = this.itemMdata.titleStyle || {}
		},
		methods: {
			submitBtn() {
				var v = this;
				//v.itemMdata.onlineFormMsg	
				var str = '';
				for(var i = 0; i < this.itemMdata.onlineFormMsg.length; i++) {
					var j = i + 1
					str = str + 'id' + j + '=' + this.itemMdata.onlineFormMsg[i].placeholder + '&'
				}
				str = str.slice(0, str.length - 1);
				console.log(str)
				api.get('/api/data/addForm?token=' + this.token + '&form_id=' + v.itemMdata.formTitle.id + '&' + str,
					true, {},
					function(data) {
						console.log(data);
					}
				);
			},
			hoverSiteForm() {
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;	
			},
			leaveSiteForm() {
				this.isHover = false;
				this.itemInner.isStopPropagation = false;	
			},
			getData() {
				var v = this;
				api.get('/api/data/form?token=' + this.token, true, {}, function(data) {
					console.log(data);
					v.itemMdata.onlineFormTitle = data.data
					//v.itemMdata.formTitle.name = v.itemMdata.onlineFormTitle[0].form_name;
					//v.itemMdata.formTitle.btnName = v.itemMdata.onlineFormTitle[0].button_name;
				});

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
			visibleNav() {
				this.addVisibleNav = true;
				console.log("ssd");
			},

			addVisibleFun() {
				this.addVisibleNav = false;
				this.itemMdata.formTitle.btnName = this.itemMdata.buttonEdit.tText;
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
			isFuncur(i) {
				i.isEdit = true;
				this.editDial.isEdit = true;
				this.$emit('isFuncur', i, this.editDial);
			},
			removeComponent(i) {
				this.$emit('removeComponent', i);
				this.$emit('recomponent', i);
			}
		},
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				siteFormId: 'siteFormId' + this.index,
				token: this.$route.query.token,
				curIndex: 0,
				isHover: false,
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit: true,
					rTitle: '编辑在线表单',
				},
				addVisibleNav: false,
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
			siteForm.submitBtn(this.itemMdata, this.token, this.siteFormId)
		}
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
			.btn {
				text-align: center;
			}
			div {
				h3 {
					text-align: center;
					font-size: 18px;
				}
			}
			p {
				overflow: hidden;
				line-height: 40px;
				span {
					text-align: right;
				}
				input {
					line-height: 40px;
					border: 1px solid #E3E3E3;
					border-radius: 5px;
					padding-left: 10px;
				}
			}
			textarea {
				border: 1px solid #E3E3E3;
				border-radius: 5px;
				margin-top: 15px;
				padding: 10px;
				box-sizing: border-box;
			}
		}
	}
	
	.hove_con.hover {
		.edit_con {
			display: block;
		}
	}
</style>