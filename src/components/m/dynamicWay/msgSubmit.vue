<template>
	<vue-draggable-resizable :x="itemMdata.parentStyle.left" :y="itemMdata.parentStyle.top" :w="itemMdata.parentStyle.width" :h="itemMdata.parentStyle.height" :active.sync="itemMdata.parentStyle.active" v-on:dragging="onDrag" :z="itemMdata.parentStyle.zIndex" :parent="itemMdata.parent" v-on:resizing="onResize" :drag-cancel="'.edit_con'">
		<div :class="['msgSubmit hove_con',{hover:isHover}]" @contextmenu="showMenu" :id="msgSubmitId" @mouseenter="hoverMsgSubmit($event)" @mouseleave="leaveMsgSubmit($event)">
			<p class="edit_con" style="z-index:100;">
				<span @click="isFuncur(itemMdata)">编辑留言提交</span>
				<!--span class="icon style"><i>设置样式</i></span>
				<span class="icon animation"><i>设置动画</i></span>
				<span class="icon borderhid"><i>隐藏边框</i></span-->
				<span @click="visibleNav()" class="btnE" style="border-right: none"><button>编辑按钮</button></span>
				<span @click="removeComponent(itemMdata)" class="icon delete"><i>删除模块</i></span>
			</p>
			<div class="detail">
				<!--input class="formAction" name="formAction" type="hidden" value="{{'http://'.$serverName.'/siteForm'}}" /-->
				<!--input class="formId" name="formId" type="hidden" value="{{$valForitemInner['formTitle']['id']}}" /-->
				<div v-show="itemMdata.buttonEdit.buttonStyle.width == '200px'">
					<div>
						<p v-for="(list,idx) in itemMdata.ruleForm">
							<span>{{list.name}}：</span>
							<input type="text" :name="list.idTxt" :placeholder="list.placeholder" v-model="list.value" />
						</p>
					</div>
					<p>
						<span>内容：</span>
						<textarea name="msgContent" v-model="itemMdata.msgContent"></textarea>
					</p>

					<p class="btn">
						<button :id="msgbuttonId" :style="[itemMdata.buttonEdit.buttonStyle,{borderRadius:itemMdata.buttonEdit.borderRadius + 'px'},itemMdata.buttonEdit.iStyle]">{{itemMdata.buttonEdit.tText}}</button>
					</p>
				</div>
				<div v-show="itemMdata.buttonEdit.buttonStyle.width == '100%'" class="msgTwoStyle">
					<div class="information">
						<div v-for="(list,idx) in itemMdata.ruleForm" :style="itemMdata.buttonStyle">
							<span>{{list.name}}：</span>
							<input type="text" :name="list.idTxt" v-model="list.value" />
						</div>

						<div class="text" :style="itemMdata.buttonStyle">
							<span>内容：</span>
							<textarea name="msgContent" v-model="itemMdata.msgContent"></textarea>
						</div>
						<div class="ver" v-show="itemMdata.showVer">
							<span>验证码：</span>
							<input type="text" name="verail" value="" v-model="itemMdata.verail" />
							<span><img class="vailImg" height="30" width="50" :src="root+'/api/data/validateImg?token='+this.param.token" /></span>
						</div>
					</div>
					<p class="btn">
						<input type="hidden" class="" name="formAction" value="http://api.xiaohucloud.com/api/front/addMessage">
						<input type="hidden" class="" name="domian" value="www.huli.xiaohucloud.cn">
						<button :id="msgbuttonId" :style="[itemMdata.buttonEdit.buttonStyle,itemMdata.buttonEdit.iStyle,itemMdata.buttonEdit.hoverS==1?itemMdata.buttonEdit.hoverStyle:itemMdata.buttonEdit.buttonStyle,itemMdata.buttonEdit.hoverS==1?itemMdata.buttonEdit.hoverStyle:itemMdata.buttonEdit.iStyle,{borderRadius:itemMdata.buttonEdit.borderRadius + 'px'}]">{{itemMdata.buttonEdit.tText}}</button>
					</p>
				</div>
			</div>

		</div>

		<!--uiDialog v-if="itemMdata.isEdit" :itemMdata='itemMdata' :editDial="editDial"></uiDialog-->
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
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import mButtonEdit from '../frequently/mButtonEdit.vue'
	import api from '@/api/$ajax.js'
	var root = 'http://api.xiaohucloud.cn'
	//var root ="http://119.29.226.11:81"
	// 引用axios
	//var url = window.location.host;
	//console.log(url)
	if(window.location.host.indexOf(".com") != -1) {
		root = 'http://api.xiaohucloud.com'
	}
	const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;

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
		props: ['itemMdata', "posCom", "index", "itemInner"],
		created() {
			console.log(this.itemMdata);
			//siteForm.vailImg(this.param.token);
		},
		mounted() {
			siteForm.msgBtn(this.itemMdata, this.msgSubmitId);
			siteForm.vailImg(this.msgSubmitId, root, this.param.token);
			hoverAction.buttonHover(this.msgbuttonId, this.itemMdata.buttonEdit);
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
			hoverMsgSubmit(){
				this.isHover = true;				
				this.itemInner.isStopPropagation = true;
				this.itemInner.isHover = false;				
			},
			leaveMsgSubmit(){
				this.isHover = false;
				this.itemInner.isStopPropagation = false;
			},
			downFloor(i) {
				i.parentStyle.zIndex = 0;
				console.log('downFloor!');
			},
			enterStyle(e) {
				//console.log(32);
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
				token: this.$route.query.token,
				msgSubmitId: 'msgSubmitId' + this.index,
				msgbuttonId: 'msgbuttonId' + this.index,
				addVisibleNav: false,
				root: root,
				flag: 1,			
				curIndex:0,
				isHover:false,
				rules: {
					telphone: [{
							required: true,
							trigger: 'blur',
							validator: validPhone
						} //这里需要用到全局变量
					]
				},
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
				parentStyle: {

				},
				editDial: {
					editDialWidth: "650px",
					editDialHeight: "580px",
					isEdit: true,
					rTitle: '编辑留言提交',
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
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.el-button+.el-button {
		margin-left: 0;
		margin-top: 10px;
	}
	
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
			p {
				margin-bottom: 10px;
				input,
				textarea {
					border: 1px solid #ccc;
				}
			}
			button {
				text-align: center;
				font-size: 16px;
				border-width: 1px;
				border-style: solid;
				font-weight: bold;
			}
			.msgTwoStyle {
				position: relative;
				.information {
					clear: both;
					overflow: hidden;
					div {
						float: left;
						width: 44%;
						box-sizing: border-box;
						border: 1px solid #ccc;
						height: 40px;
						line-height: 40px;
						padding: 0 1%;
						margin: 0 6% 2% 0;
					}
					.text {
						height: 120px;
						line-height: 30px;
						span {
							vertical-align: top;
						}
						textarea {
							height: 100%;
						}
					}
					.ver {
						border: none;
						position: absolute;
						top: 120px;
						input {
							border: 1px solid #ccc;
							line-height: 38px;
							width: 50%;
							margin-right: 3%;
						}
					}
				}
				.btn {
					width: 50%;
					margin: 0 auto;
					margin-top: 2%;
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