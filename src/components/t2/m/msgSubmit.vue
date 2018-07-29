<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :active.sync="itemMdata.parentStyle.active" :z="itemMdata.parentStyle.zIndex" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height||30" :parent="itemMdata.parent" v-on:dragging="onDrag" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div class="phoneedit msgSubmitP hove_con" @contextmenu="showMenu" :id="msgSubmitId">
			<p class="edit_con" style="width: 220px;">
				<span @click="isFuncur(itemMdata)">编辑留言提交</span>
				<!--<span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span>-->
				<span @click="visibleNav()" class="btnE" style="border-right: none"><button>编辑按钮</button></span>
				<span @click="removeComponent(itemMdata);delModule(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<!--<div class="detail">
				<button :style="itemMdata.buttonStyle">提交</button>
			</div>-->
			<div class="detail phoneform">
				<div class="list">
					<p v-for="(list,idx) in itemMdata.ruleForm">
						<span>{{list.name}}：</span>
						<input type="text" :name="list.idTxt" :placeholder="list.placeholder" v-model="list.value" :style="itemMdata.inputStyle" />
					</p>
				</div>
				<p class="content">
					<span>内容：</span>
					<textarea name="msgContent" v-model="itemMdata.msgContent" :style="itemMdata.inputStyle"></textarea>
				</p>

				<p class="btn">
					<button :id="msgbuttonId" :style="[itemMdata.buttonEdit.buttonStyle,{borderRadius:itemMdata.buttonEdit.borderRadius + 'px'},itemMdata.buttonEdit.iStyle]">{{itemMdata.buttonEdit.tText}}</button>
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
		<!--<uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog>-->
		<vue-context-menu :contextMenuData="contextMenuData" @upFloor="upFloor(itemMdata)" @moveUpFloor="moveUpFloor(itemMdata)" @moveDownFloor="moveDownFloor(itemMdata)" @downFloor="downFloor(itemMdata)" @copyItem="copyItem(itemMdata)">
		</vue-context-menu>

	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import mButtonEdit from './mButtonEdit.vue'
	import api from '@/api/$ajax.js'
	var root = 'http://api.xiaohucloud.cn'
	//import uiDialog from './uiDialog.vue'

	if(window.location.host.indexOf(".com") != -1) {
		root = 'http://api.xiaohucloud.com'
	}
	const reg = /^1[3|4|5|7|8][0-9]\d{8}$/

	var validPhone = (rule, value, callback) => {
		if(!value) {
			callback(new Error('请输入电话号码'))
		} else if(!reg.test(value)) {
			callback(new Error('请输入正确的11位手机号码'))
		} else {
			callback()
		}
	}

	export default {
		name: 'msgSubmit',
		components: {
			VueDraggableResizable,
			mButtonEdit
			//uiDialog
		},
		props: ['itemMdata', "posCom", 'index', "itemInner"],
		created() {
			console.log(this.itemMdata)
		},
		mounted() {
			//this.ruleForm = JSON.parse(JSON.stringify(this.itemMdata.ruleForm));
			siteForm.msgBtn(this.itemMdata, this.msgSubmitId);
			siteForm.vailImg(this.msgSubmitId, root, this.param.token);
		},
		methods: {
			getData() {
				var v = this;
				api.get('/api/data/getMessageConfig?token=' + this.token, true, {},
					function(data) {
						console.log(data);
					}
				);
			},
			putData() {
				var v = this;
				api.get('/api/data/addMessage?token=' + this.token + '&userName=' + this.ruleForm.name + '&mobilePhone=' + this.ruleForm.telphone + '&email=' + this.ruleForm.email + '&content=' + this.ruleForm.desc,
					true, {},
					function(data) {
						//console.log(data);
						//v.itemMdata.msgList = data.data;

						//var result = JSON.stringify(data); //json对象转成字符串
						//$("#text").val(result);
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
				console.log('downFloor!');
			},
			enterStyle(e) {
				console.log(32);
				this.itemMdata.buttonEdit.hoverS = 1;
			},
			leaveStyle(e) {
				this.itemMdata.buttonEdit.hoverS = 2;
			},
			visibleNav() {
				this.addVisibleNav = true;
			},

			addVisibleFun() {
				this.addVisibleNav = false;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//提交值数据库
						this.putData();
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				this.itemMdata.ruleForm = JSON.parse(JSON.stringify(this.ruleForm));
			},
			resetForm(formName) {
				console.log(formName)
				this.$refs[formName].resetFields();
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
				this.$emit('isFuncur', i, this.editDial);
			}
		},
		data() {
			return {
				token: this.$route.query.token,
				outerVisible: false,
				parentStyle: {

				},
				msgSubmitId: 'msgSubmitId' + this.index,
				msgbuttonId: 'msgbuttonId' + this.index,
				addVisibleNav: false,
				root: root,
				flag: 1,
				outerVisible: false,
				param: {
					id: this.$route.params.id,
					company_id: this.$route.query.company_id,
					token: this.$route.query.token,
					type: this.$route.query.type,
					mobile_version_id: this.$route.query.mobile_version_id,
					pc_version_id: this.$route.query.pc_version_id,
					version_id: this.$route.query.pc_version_id
				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					rTitle: '编辑留言提交',
					isEdit: false
				},
				ruleForm: {
					name: '',
					email: '',
					telphone: '',

					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					telphone: [{
							required: true,
							trigger: 'blur',
							validator: validPhone
						} //这里需要用到全局变量
					]
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
		/*.detail {
			button {
				text-align: center;
				line-height: 35px;
				font-size: 16px;
				border-width: 1px;
				border-style: solid;
				font-weight: bold;
			}
		}*/
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>