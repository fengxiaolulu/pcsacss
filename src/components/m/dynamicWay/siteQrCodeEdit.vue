<template>
	<div class="siteQrCodeEdit">
		<ul class="left">
			<li @click="changeType(1)" :class="{active:typenumber == 1}">常规</li>
			<li @click="changeType(2)" :class="{active:typenumber == 2}">高级</li>
		</ul>
		<div class="right">
			<div v-show="typenumber == 1" class="one">
				<div class="leftOne">
					<img :src="itemMdata.imgUrl.url" :style="{background:itemMdata.imgColor}" />
					<input type="text" value="itemMdata.imgName" v-model="itemMdata.imgName" />
				</div>
				<div class="rightOne">
					<p class="name">
						<span>模块标题：</span>
						<input type="text" value="网站二维码" />
					</p>
					<p class="size">
						<span>尺寸：</span>
						<input type="text" value="itemMdata.imgWidth" v-model="itemMdata.imgWidth" />
					</p>
					<p class="icon">
						<span>图标：</span>
						<button @click="vbgFun(1)">添加图片</button>
					</p>
					<p class="color">
						<span>背景色：</span>
						<el-color-picker v-model="itemMdata.imgColor" size="small"></el-color-picker>
					</p>
				</div>
			</div>
			<div v-show="typenumber == 2" class="two">
				<p class="name">
					<span>模块标题：</span>
					<input type="text" value="单页管理" />
				</p>
				
				<div class="article">
					<div class="type">
						<span>单页添加：</span>
						
					</div>
					<div class="type_one">
						<el-radio-group v-model="itemMdata.setnumber"  @change="changeType(2)">
							<el-radio v-for="(siteQ,index) in itemMdata.siteQList" :key = "siteQ.id" :label="siteQ.id">{{siteQ.name}}</el-radio>
							
						</el-radio-group>
					</div>

				</div>
			</div>
		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.imgUrl"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="addVisibleNav = false">取 消</el-button>
		    <el-button type="primary" @click="addVisibleFun">保 存</el-button>
		  </span>
		</el-dialog>
	</div>
	
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	import api from '@/api/$ajax.js'
	export default {
		name: 'siteQrCodeEdit',
		props: ['itemMdata'],
		components: {
			mImageEdit
		},
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				addVisibleNav: false,
				flag:1,
				token:this.$route.query.token,
				typenumber:1
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			changeType(num) {
				this.typenumber = num;
				var v = this;
				if(num==2){
					api.get('/api/data/qrCodeList?token=' + this.token + "&ids=" + this.itemMdata.setnumber,true,{}, function(data) {				
						//v.itemMdata.singleDes = data.data;
						v.itemMdata.imgUrl.url = data.data[0].image
						
						//debugger;
					});
				}	
				
			},
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log(flag)
			},
			addVisibleFun() {
				this.addVisibleNav = false;
				//http://api.xiaohucloud.cn/api/data/qrCodeList?token=3a4f066fb631459b801252d88630358995ctg6
				/*
				api.get('/api/data/qrCodeList?token='+this.token,
					true,{},function(data){
						console.log(data)
						//v.itemMdata.time = data.data;
						//itemMdata.imgUrl.url
					}
				)
				*/
			},
			oneshow: function() {
				this.one_show = true;
				this.two_show = false;
			},
			twoshow: function() {
				this.one_show = false;
				this.two_show = true;
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	
	.siteQrCodeEdit {
		clear: both;
		overflow: auto;
		border-bottom: 1px solid #CCCCCC;
		.left {
			display: block;
			float: left;
			width: 15%;
			height: 430px;
			border-right: 1px solid #CCCCCC;
			li {
				box-sizing: border-box;
				width: 100%;
				height: 60px;
				line-height: 60px;
				padding-left: 35px;
			}
			li:nth-child(1) {
				border-bottom: 1px solid #CCCCCC;
			}
			.active {
				width: 98px;
				border-bottom: 1px solid #CCCCCC;
				border-left: 5px solid #409EFF;
				border-right: 1px solid #FFFFFF;
				color: #409EFF;
			}
		}
		.right {
			position: relative;
			float: right;
			width: 84.8%;
			height: 430px;
			.two {
				box-sizing: border-box;
				padding: 20px 40px;
				.name {
					input {
						border: 1px solid #E3E3E3;
						line-height: 30px;
						padding-left: 10px;
					}
				}
				.style {
					clear: both;
					overflow: hidden;
					margin-top: 20px;
					span {
						float: left;
					}
					ul {
						float: left;
						width: 90%;
						li {
							box-sizing: border-box;
							float: left;
							width: 13%;
							height: 50px;
							padding-left: 13px;
							border: 1px solid #E3E3E3;
							margin-bottom: 10px;
							margin-right: 15px;
							margin-left: 5px;
							position: relative;
							div {
								width: 60px;
								height: 48px;
								background: url(/static/image/mbg02.png) no-repeat;
								position: relative;
							}
							.icon {
								background: url(/static/image/mbg01.png) no-repeat;
								background-position: -54px -990px;
								width: 20px;
								height: 20px;
								position: absolute;
								right: -10px;
								top: 30px;
								display: none;
							}
							.style_one {
								background-position: -574px -1px;
							}
							.style_two {
								background-position: -574px -72px;
							}
							.style_three {
								background-position: -574px -140px;
							}
							.style_four {
								background-position: -574px -211px;
							}
							.style_five {
								background-position: -574px -281px;
							}
							.style_sixth {
								background-position: -574px -351px;
							}
							.style_seven {
								background-position: -574px -423px;
							}
						}
						li:hover {
							border: 1px solid #409EFF;
						}
						.active {
							border: 1px solid #409EFF;
							.icon {
								display: block;
							}
						}
					}
				}
				.article {
					margin-top: 20px;
					.type {
						clear: both;
						overflow: hidden;
						span {
							float: left;
						}
						p {
							float: left;
							margin-left: 10px;
						}
					}
					.type_one {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						.list {
							border: 1px solid #E3E3E3;
							width: 40%;
							height: 260px;
							float: left;
							overflow: auto;
							li {
								line-height: 35px;
								padding-left: 25px;
								color: #666666;
								cursor: pointer;
							}
							li:nth-child(2n) {
								background: #f1f5ff;
							}
							li:hover {
								color: #FFFFFF;
								background: #5874d8;
							}
						}
						.icon {
							display: block;
							width: 10%;
							height: 260px;
							float: left;
							line-height: 260px;
							text-align: center;
							font-size: 34px;
							color: #888888;
							font-weight: lighter;
						}
						.selected {
							float: left;
							width: 40%;
							height: 260px;
							border: 1px solid #E3E3E3;
							overflow: auto;
							li {
								line-height: 35px;
								padding-left: 25px;
								color: #666666;
								clear: both;
								overflow: hidden;
								span:nth-child(1) {
									float: left;
									width: 90%;
								}
								span:nth-child(2) {
									float: right;
									width: 10%;
									font-size: 12px;
									color: #999999;
									cursor: pointer;
								}
							}
							li:hover {
								color: #FFFFFF;
								background: #5874d8;
							}
							li:hover span {
								color: #FFFFFF;
							}
						}
					}
					.type_two {
						width: 90%;
						box-sizing: border-box;
						margin-top: 10px;
						border: 1px solid #E3E3E3;
						padding: 20px 10px;
						height: 260px;
						overflow: auto;
						p {
							float: left;
							margin-left: 15px;
							width: 110px;
							margin-bottom: 15px;
						}
					}
				}
			}
			.one {
				box-sizing: border-box;
				padding: 20px 40px;
				.leftOne {
					float: left;
					width: 150px;
					text-align: center;
					img {
						background: #000000;
						width: 150px;
					}
					input {
						clear: both;
						overflow: hidden;
						width: 160px;
						border: 1px solid #E3E3E3;
						text-align: center;
						line-height: 30px;
						margin-top: 15px;
					}
				}
				.rightOne {
					float: right;
					width: 60%;
					p {
						clear:both;
						overflow: hidden;
						line-height: 30px;
						margin-bottom: 20px;
						span {
							float: left;
							width: 70px;
							text-align: right;
						}
						input{
							float: left;
							border: 1px solid #E3E3E3;
							width: 170px;
							line-height: 30px;
							padding-left: 10px;
						}
						button{
							border: 1px solid #E3E3E3;
							padding: 3px 10px;
						}
					}
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