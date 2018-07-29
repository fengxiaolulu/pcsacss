<template>
	<div class="msgSubmit hove_con" :style="parentStyle" :id="msgSubmitId">
		<div class="detail">
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
</template>

<script>
	import api from '@/api/$ajax.js'
	const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
	var root = 'http://api.xiaohucloud.cn'
	//var root ="http://119.29.226.11:81"
	// 引用axios
	//var url = window.location.host;
	//console.log(url)
	if(window.location.host.indexOf(".com") != -1) {
		root = 'http://api.xiaohucloud.com'
	}
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
		props: ['itemMdata', "index"],
		created() {
			console.log(this.itemMdata)
			this.parentStyle.top = this.itemMdata.parentStyle.top + "px";
			this.parentStyle.left = this.itemMdata.parentStyle.left + "px";
			this.parentStyle.position = "absolute";
			this.parentStyle.width = this.itemMdata.parentStyle.width + "px";
			this.parentStyle.height = this.itemMdata.parentStyle.height + "px";
		},
		mounted() {
			siteForm.msgBtn(this.itemMdata, this.msgSubmitId);
			siteForm.vailImg(this.msgSubmitId,root,this.param.token);
			hoverAction.buttonHover(this.msgbuttonId, this.itemMdata.buttonEdit)
		},
		methods: {
			putData() {
				var v = this;
				api.post('/api/data/addMessage?token=60279086c17e4b9bb0b41c9aaf14dd4bJx3Mtb&userName=' + this.ruleForm.name + '&mobilePhone=' + this.ruleForm.telphone + '&email=' + this.ruleForm.email + '&content=' + this.ruleForm.desc, true, {}, function(data) {
					console.log(data);
					//v.itemMdata.msgList = data.data;

					//var result = JSON.stringify(data); //json对象转成字符串
					//$("#text").val(result);
				});
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
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
				this.$refs[formName].resetFields();
			},
			enterStyle(e) {
				console.log(32)
				this.itemMdata.buttonEdit.hoverS = 1;
			},
			leaveStyle(e) {
				this.itemMdata.buttonEdit.hoverS = 2;
			},
			linkUrl() {
				if(this.itemMdata.link) {
					if(this.itemMdata.link.indexOf("http") != -1) {
						location.href = this.itemMdata.link;
					} else {
						this.$router.push(this.preview + this.itemMdata.link);
						//location.href = this.preview + this.itemMdata.link;
					}
				}
				console.log(this.preview + this.itemMdata.link);
			}
		},
		data() {
			return {
				rules: {
					telphone: [{
							required: true,
							trigger: 'blur',
							validator: validPhone
						} //这里需要用到全局变量
					]
				},
				root:root,
				msgSubmitId: 'msgSubmitId' + this.index,
				msgbuttonId: 'msgbuttonId' + this.index,
				token: this.$route.query.token,
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
		.detail {
			button {
				text-align: center;
				font-size: 16px;
				border-width: 1px;
				border-style: solid;
				font-weight: bold;
			}
		}
	}
	
	.hove_con:hover {
		.edit_con {
			display: block;
		}
	}
</style>