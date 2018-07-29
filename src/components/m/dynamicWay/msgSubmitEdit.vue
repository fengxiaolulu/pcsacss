<template>
	<div class="productNavEdit">
		<div class="top">
			<p @click="oneshow" :class="{active:one_show}">常规</p>
			<p @click="twoshow" :class="{active:two_show}">高级</p>
		</div>
		<div class="one" v-show="one_show">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" value="留言提交" />
			</p>
			<div class="style">
				<span>模块样式：</span>
				<ul>
					<li @click="styleone">
						<img src="/static/image/msgSubmitStyleImg1.jpg" />
					</li>
					<li @click="styletwo">
						<img src="/static/image/msgSubmitStyleImg2.jpg" />
					</li>
				</ul>
			</div>
			<div v-show="itemMdata.buttonEdit.buttonStyle.width == '100%'" class="showVer">
				<span>设置验证码：</span>
				<span @click="itemMdata.showVer= true">
					<input type="radio" name="verShow" id="verShow1" :checked="itemMdata.showVer== true"/>
					<label for="verShow1">显示</label>
				</span>
				<span @click="itemMdata.showVer= false">
					<input type="radio" name="verShow" id="verShow2" :checked="itemMdata.showVer== false" />
					<label for="verShow2">隐藏</label>
				</span>
				<p>
					<span>表单项：</span>
					<span @click="itemMdata.buttonStyle.float='left'">
						<input type="radio" name="formItemP" id="formItemP1" :checked="itemMdata.buttonStyle.float=='left'"/>
						<label for="formItemP1">横向</label>
					</span>
					<span @click="itemMdata.buttonStyle.float='none'">
						<input type="radio" name="formItemP" id="formItemP2" :checked="itemMdata.buttonStyle.float=='none'"/>
						<label for="formItemP2">纵向</label>
					</span>
				</p>
			</div>
			<div>
				<p>
					<span>字体颜色：</span>
					<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.buttonStyle.color"></el-color-picker>
				</p>
				<p>
					<span>背景颜色：</span>
					<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.buttonStyle.backgroundColor"></el-color-picker>
				</p>
			</div>
			<!--<div class="buttonstyle">
				<span>按钮样式：</span>
				<ul>
					<li @click="changeone">
						<div class="button_one" :style="{background: color}"></div>
					</li>
					<li @click="changetwo">
						<div class="button_two" :style="{background: color}"></div>
					</li>
					<li @click="changethree">
						<div class="button_three" :style="{['border-color']: color}"></div>
					</li>
					<li @click="changefour">
						<div class="button_four" :style="{['border-color']: color}"></div>
					</li>
					<li @click="changefive">
						<div class="button_five" :style="{background: color}"></div>
					</li>
					<li @click="changesixth">
						<div class="button_sixth" :style="{['border-color']: color}"></div>
					</li>
				</ul>
				<div class="color">
					<span>按钮颜色：</span>
					<el-color-picker v-model="color" size="small"></el-color-picker>
				</div>
			</div>-->
		</div>
		<div class="two" v-show="two_show">
			<div class="width">
				<span>留言项参数：</span>
				<p @click="itemMdata.width_hid = false">
					<input type="radio" name="width" id="width1" :checked="itemMdata.width_hid == false"  />
					<label for="width1">默认</label>
				</p>
				<p @click="itemMdata.width_hid = true">
					<input type="radio" name="width" id="width2" :checked="itemMdata.width_hid == true" />
					<label for="width2">自定义</label>
				</p>
				<div class="width_hid" v-show="itemMdata.width_hid">
					<input type="text" v-model="itemMdata.buttonStyle.width" placeholder="宽度:1px"/>
					<input type="text" v-model="itemMdata.buttonStyle.height" placeholder="高度:1px"/>
					<input type="text" v-model="itemMdata.buttonStyle.borderRadius" placeholder="弧度:1px"/>
				</div>
			</div>
			<!--<div class="btnWidth">
				<span>按钮宽度：</span>
				<p @click="btnWidth_hid = false">
					<input type="radio" name="btnWidth" id="btnWidth1" />
					<label for="btnWidth1">默认</label>
				</p>
				<p @click="btnWidth_hid = true">
					<input type="radio" name="btnWidth" id="btnWidth2" checked="checked" />
					<label for="btnWidth2">自定义</label>
				</p>
				<div class="btnWidth_hid" v-show="btnWidth_hid">
					<input type="text" value="250px" />
				</div>
			</div>-->
			
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	export default {
		name: 'msgSubmitEdit',
		props: ['itemMdata'],
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				one_show: true,
				two_show: false,
				color: '#409EFF',
				
				btnWidth_hid:true
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			
			oneshow: function() {
				this.one_show = true;
				this.two_show = false;
			},
			twoshow: function() {
				this.one_show = false;
				this.two_show = true;
			},
			styleone:function(){
				this.itemMdata.buttonEdit.buttonStyle.width = '200px';
			},
			styletwo:function(){
				this.itemMdata.buttonEdit.buttonStyle.width = '100%';
				this.itemMdata.buttonEdit.buttonStyle.background = '#5A203B';
				this.itemMdata.buttonEdit.buttonStyle.borderColor = '#5A203B';
				this.itemMdata.buttonEdit.iStyle.color="#fff";
				this.itemMdata.buttonEdit.buttonStyle.lineHeight="40px";
				console.log(this.itemMdata.buttonEdit.buttonStyle.width)
			},
			changeone:function(){
				this.itemMdata.buttonStyle.background = this.color;
				this.itemMdata.buttonStyle.borderRadius = '0px';
				this.itemMdata.buttonStyle.borderColor = this.color;
				this.itemMdata.buttonStyle.color = '#fff';
			},
			changetwo:function(){
				this.itemMdata.buttonStyle.background = this.color;
				this.itemMdata.buttonStyle.borderRadius = '7px';
				this.itemMdata.buttonStyle.borderColor = this.color;
				this.itemMdata.buttonStyle.color = '#fff';
			},
			changethree:function(){
				this.itemMdata.buttonStyle.background = '#fff';
				this.itemMdata.buttonStyle.borderRadius = '7px';
				this.itemMdata.buttonStyle.borderColor = this.color;
				this.itemMdata.buttonStyle.color = this.color;
			},
			changefour:function(){
				this.itemMdata.buttonStyle.background = '#fff';
				this.itemMdata.buttonStyle.borderRadius = '0px';
				this.itemMdata.buttonStyle.borderColor = this.color;
				this.itemMdata.buttonStyle.color = this.color;
			},
			changefive:function(){
				this.itemMdata.buttonStyle.background = this.color;
				this.itemMdata.buttonStyle.borderRadius = '20px';
				this.itemMdata.buttonStyle.borderColor = this.color;
				this.itemMdata.buttonStyle.color = '#fff';
			},
			changesixth:function(){
				this.itemMdata.buttonStyle.background = '#fff';
				this.itemMdata.buttonStyle.borderRadius = '20px';
				this.itemMdata.buttonStyle.borderColor = this.color;
				this.itemMdata.buttonStyle.color = this.color;
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.productNavEdit {
		box-sizing: border-box;
		height: 450px;
		overflow: auto;
		.top {
			clear: both;
			overflow: hidden;
			padding-left: 10px;
			background: #F5F5F5;
			border-bottom: 1px solid #CCCCCC;
			p {
				float: left;
				padding: 0 15px;
				line-height: 35px;
				border: 1px solid #E3E3E3;
			}
			.active {
				background: #FFFFFF;
				color: #409EFF;
			}
		}
		.one {
			box-sizing: border-box;
			padding: 20px;
			.name {
				span {
					width: 70px;
					text-align: right;
				}
				input {
					border: 1px solid #E3E3E3;
					padding-left: 10px;
					line-height: 30px;
				}
			}
			.style {
				clear: both;
				overflow: hidden;
				span{
					float: left;
				}
				ul {
					width: 85%;
					float: left;
					li {
						float: left;
						width: 87px;
						height: 86px;
						border: 1px solid #E3E3E3;
						text-align: center;
						margin-left: 5px;
						margin-right: 15px;
						margin-top: 10px;
						div {
							width: 80%;
							margin-left: 10%;
							height: 30px;
							margin-top: 35px;
						}
					}
					li:hover {
						border: 1px solid #3a8ee6;
					}
				}
			}
			.buttonstyle{
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				span{
					float: left;
				}
				ul{
					float: left;
					width: 85%;	
					margin-bottom: 15px;				
					li{
						border: 1px solid #E3E3E3;
						float: left;
						width: 140px;
						height: 70px;
						margin-top: 10px;
						margin-right: 10px;
						margin-left: 5px;
						div{
							margin-top: 18px;
							width: 80%;
							margin-left: 10%;
							height: 30px;
						}
						.button_one{
							background: #409EFF;
						}
						.button_two{
							background: #409EFF;
							border-radius: 7px;
						}
						.button_three{
							border-style: solid;
							border-width: 1px;
							border-color: #409EFF;
							border-radius: 7px;
						}
						.button_four{
							border-style: solid;
							border-width: 1px;
							border-color: #409EFF;
						}
						.button_five{
							background: #409EFF;
							border-radius: 20px;
						}
						.button_sixth{
							border-style: solid;
							border-width: 1px;
							border-color: #409EFF;
							border-radius: 20px;
						}
					}
					li:hover {
						border: 1px solid #3a8ee6;
					}
				}
				.color {
					clear: both;
				    overflow: hidden;
					display: flex;
					line-height: 30px;
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 20px;		
			.width,.btnWidth{
				clear:both;
				overflow:hidden;
				span{
					float: left;
				}
				p{
					float: left;
					margin-left: 10px;
				}
			}
			.width_hid,.btnWidth_hid{
				float: left;
				margin-left: 10px;
				input{
					border: 1px solid #E3E3E3;
					width: 60px;
					line-height: 30px;
					text-align: center;
				}
			}	
		}
	}
	
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
		background-color: #f1f1f1;
	}
	
	::-webkit-scrollbar-thumb {
		background-color: #b2b2b2;
		width: 16px;
		-webkit-border-radius: 16px;
		-moz-border-radius: 16px;
		border-radius: 16px;
	}
</style>