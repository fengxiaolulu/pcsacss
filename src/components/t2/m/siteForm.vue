<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :active.sync="itemMdata.parentStyle.active" :z="itemMdata.parentStyle.zIndex" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height||30" :parent="itemMdata.parent" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit siteFormP hove_con" @contextmenu="showMenu" :id="siteFormId">
			<p class="edit_con" style="width: 190px;">
				<span @click="isFuncur(itemMdata)">编辑在线表单</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span class="icon style" @click="visibleNav()"><i>设置样式</i></span>
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail">
				<div style="{clear:both;overflow:hidden;}">
					<h3 :style="itemMdata.titleStyle">{{itemMdata.formTitle.name}}</h3>
					<p v-for="(list,idx) in itemMdata.onlineFormMsg" :style="itemMdata.pStyle" v-if="list.is_open==1">
						<span :style="itemMdata.spanStyle">{{list.name}}：</span>
						<input type="text" :placeholder="list.placeholder" :style = "itemMdata.inputStyle" />
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
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import mButtonEdit from './mButtonEdit.vue'
	import api from '@/api/$ajax.js'
	//import uiDialog from './uiDialog.vue'
	export default {
		name: 'siteForm',
		components: {
			VueDraggableResizable,
			mButtonEdit
			//uiDialog
		},
		props: ['itemMdata', "posCom", 'index',"itemInner"],
		created() {
			console.log(this.itemMdata)
			this.getData();
			this.itemMdata.titleStyle = this.itemMdata.titleStyle ||{}
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
			getData() {
				var v = this;
				api.get('/api/data/form?token=' + this.token,true, {},function(data) {
						console.log(data);
						v.itemMdata.onlineFormTitle = data.data
						//v.itemMdata.formTitle.name = v.itemMdata.onlineFormTitle[0].form_name;
						//v.itemMdata.formTitle.btnName = v.itemMdata.onlineFormTitle[0].button_name;
					}
				);
				
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
			}
		},
		data() {
			return {
				outerVisible: false,
				parentStyle: {

				},
				siteFormId: 'siteFormId' + this.index,
				token: this.$route.query.token,
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					rTitle: '编辑在线表单',
					isEdit: false
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
		
		/*.detail {
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
		}*/
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>