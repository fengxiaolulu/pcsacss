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
				<span>输入框样式：</span>
				<p>
					<span>边框颜色：</span>
					<input type="text" v-model="itemMdata.inputStyle.borderColor" />
				</p>
				<p>
					<span>边框宽度：</span>
					<input type="text" v-model="itemMdata.inputStyle.borderWidth" />
				</p>
				<p>
					<span>边框弧度：</span>
					<input type="text" v-model="itemMdata.inputStyle.borderRadius" />
				</p>
				<p>
					<span>边框背景色：</span>
					<input type="text" v-model="itemMdata.inputStyle.background" />
				</p>
				<p>
					<span>边框字体颜色：</span>
					<input type="text" v-model="itemMdata.inputStyle.color" />
				</p>
			</div>
		</div>
		<div class="two" v-show="two_show">
			<div class="width">
				<span>留言项参数宽度：</span>
				<p @click="width_hid = false">
					<input type="radio" name="width" id="width1" />
					<label for="width1">默认</label>
				</p>
				<p @click="width_hid = true">
					<input type="radio" name="width" id="width2" checked="checked" />
					<label for="width2">自定义</label>
				</p>
			</div>
			<div class="width_hid" v-show="width_hid">
				<input type="text" value="60px" />
			</div>
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
				width_hid: true,
				color2: '#7d7e7e',
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
				this.itemMdata.buttonStyle2.width = '40%';
				this.itemMdata.buttonStyle3.width = '40%';
			},
			styletwo:function(){
				this.itemMdata.buttonStyle2.width = '100%';
				this.itemMdata.buttonStyle3.width = '100%';
			},
			changeone:function(){
				this.itemMdata.buttonStyle3.background = this.color;
				this.itemMdata.buttonStyle3.borderRadius = '0px';
				this.itemMdata.buttonStyle3.borderColor = this.color;
				this.itemMdata.buttonStyle3.color = '#fff';
				
				this.itemMdata.buttonStyle2.background = this.color2;
				this.itemMdata.buttonStyle2.borderRadius = '0px';
				this.itemMdata.buttonStyle2.borderColor = this.color2;
				this.itemMdata.buttonStyle2.color = '#fff';
			},
			changetwo:function(){
				this.itemMdata.buttonStyle3.background = this.color;
				this.itemMdata.buttonStyle3.borderRadius = '7px';
				this.itemMdata.buttonStyle3.borderColor = this.color;
				this.itemMdata.buttonStyle3.color = '#fff';
				
				this.itemMdata.buttonStyle2.background = this.color2;
				this.itemMdata.buttonStyle2.borderRadius = '7px';
				this.itemMdata.buttonStyle2.borderColor = this.color2;
				this.itemMdata.buttonStyle2.color = '#fff';
			},
			changethree:function(){
				this.itemMdata.buttonStyle3.background = '#fff';
				this.itemMdata.buttonStyle3.borderRadius = '7px';
				this.itemMdata.buttonStyle3.borderColor = this.color;
				this.itemMdata.buttonStyle3.color = this.color;
				
				this.itemMdata.buttonStyle2.background = '#fff';
				this.itemMdata.buttonStyle2.borderRadius = '7px';
				this.itemMdata.buttonStyle2.borderColor = this.color2;
				this.itemMdata.buttonStyle2.color = this.color2;
			},
			changefour:function(){
				this.itemMdata.buttonStyle3.background = '#fff';
				this.itemMdata.buttonStyle3.borderRadius = '0px';
				this.itemMdata.buttonStyle3.borderColor = this.color;
				this.itemMdata.buttonStyle3.color = this.color;
				
				this.itemMdata.buttonStyle2.background = '#fff';
				this.itemMdata.buttonStyle2.borderRadius = '0px';
				this.itemMdata.buttonStyle2.borderColor = this.color2;
				this.itemMdata.buttonStyle2.color = this.color2;
			},
			changefive:function(){
				this.itemMdata.buttonStyle3.background = this.color;
				this.itemMdata.buttonStyle3.borderRadius = '20px';
				this.itemMdata.buttonStyle3.borderColor = this.color;
				this.itemMdata.buttonStyle3.color = '#fff';
				
				this.itemMdata.buttonStyle2.background = this.color2;
				this.itemMdata.buttonStyle2.borderRadius = '20px';
				this.itemMdata.buttonStyle2.borderColor = this.color2;
				this.itemMdata.buttonStyle2.color = '#fff';
			},
			changesixth:function(){
				this.itemMdata.buttonStyle3.background = '#fff';
				this.itemMdata.buttonStyle3.borderRadius = '20px';
				this.itemMdata.buttonStyle3.borderColor = this.color;
				this.itemMdata.buttonStyle3.color = this.color;
				
				this.itemMdata.buttonStyle2.background = '#fff';
				this.itemMdata.buttonStyle2.borderRadius = '20px';
				this.itemMdata.buttonStyle2.borderColor = this.color2;
				this.itemMdata.buttonStyle2.color = this.color2;
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
				margin-top: 15px;
				span{
					float: left;
				}
				p{
					float: left;
					margin-right: 15px;
					margin-bottom: 10px;
					input{
						border: 1px solid #E3E3E3;
						text-align: center;
						line-height: 30px;
						width: 80px;
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
			.width{
				span{
					float: left;
				}
				p{
					float: left;
					margin-left: 10px;
				}
			}
			.width_hid{
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