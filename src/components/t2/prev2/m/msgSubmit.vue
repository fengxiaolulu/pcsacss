<template>

	<div class="phoneedit msgSubmitP hove_con" :style="parentStyle" :id="msgSubmitId">

		<div class="detail phoneform">
			<div class="list">
				<p v-for="(list,idx) in itemMdata.ruleForm">
					<span>{{list.name}}：</span>
					<input type="text" :name="list.idTxt" :placeholder="list.placeholder" v-model="list.value" />
				</p>
			</div>
			<p class="content">
				<span>内容：</span>
				<textarea name="msgContent" v-model="itemMdata.msgContent"></textarea>
			</p>

			<p class="btn">
				<button :id="msgbuttonId" :style="[itemMdata.buttonEdit.buttonStyle,{borderRadius:itemMdata.buttonEdit.borderRadius + 'px'},itemMdata.buttonEdit.iStyle]">{{itemMdata.buttonEdit.tText}}</button>
			</p>
		</div>
	</div>

</template>

<script>
	import api from '@/api/$ajax.js'
	const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
	var root = 'http://api.xiaohucloud.cn'

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
		props: ['itemMdata'],
		mounted() {
			siteForm.msgBtn(this.itemMdata, this.msgSubmitId);
			siteForm.vailImg(this.msgSubmitId, root, this.param.token);
		},
		created() {
			console.log(this.itemMdata);
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
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
				background: url(../../../../../static/image/bg03.png)no-repeat;
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
		.detail {}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>