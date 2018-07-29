<template>
	<div class="articleScrapEdit">
		<ul class="left">
			<li @click="changetype(1)" :class="{active:typenumber == 1}">常规</li>
			<!--<li @click="changetype(2)" :class="{active:typenumber == 2}">高级</li>-->
		</ul>
		<div class="right">
			<div v-if="typenumber == 1" class="one">
				<p class="name">
					<span>模块标题：</span>
					<input type="text" value="单页管理" />
				</p>
				<!--div class="style">
					<span>模块样式：</span>
					<ul id="style" @click="changeborder">
						<li @click="styleone">
							<div class="style_one"></div>
							<span class="icon"></span>
						</li>
						<li @click="styletwo">
							<div class="style_two"></div>
							<span class="icon"></span>
						</li>
						<li @click="stylethree">
							<div class="style_three"></div>
							<span class="icon"></span>
						</li>
						<li @click="stylesixth">
							<div class="style_sixth"></div>
							<span class="icon"></span>
						</li>
					</ul>
				</div-->
				<div class="article">
					<div class="type">
						<span>单页添加：</span>
						<!--p @click="itemMdata.setnumber=1">
							<input type="radio" name="type" id="type1" :checked="itemMdata.setnumber==1" />
							<label for="type1">直接添加</label>
						</p>
						<p @click="itemMdata.setnumber=2">
							<input type="radio" name="type" id="type2" :checked="itemMdata.setnumber==2"/>
							<label for="type2">使用筛选条件</label>
						</p-->
					</div>
					<div class="type_one">
						<el-radio-group v-model="itemMdata.setnumber"  @change="changeType">
							<el-radio v-for="(article,index) in articleList" :key = "article.id" :label="article.id">{{article.name}}</el-radio>
							<!--el-radio label="2">功能</el-radio>
							<el-radio label="3">站外链接</el-radio-->
						</el-radio-group>
						<!--ul class="list">
							<li>
								<el-radio label="1">站内链接</el-radio>
								<p @click="removeArticle(article)">{{article.name}}</p>
							</li>
						</ul-->
						<!--div class="icon"></div>
						<ul class="selected">
							<li v-for="(select,index) in itemMdata.articleSelected">
								<span>{{select.name}}</span>
								<span @click="deleteSelect(select)">X</span>
							</li>
						</ul-->
					</div>

				</div>
			</div>
			<!-- div v-if="typenumber == 2" class="two">
				<div class="basic">
					<p>基本设置</p>
					<div class="detail">
						<div>
							<span>日期：</span>
							<p @click="itemMdata.timeStyle.display = 'block'">
								<input type="radio" name="set2" id="set2_1" checked="checked" />
								<label for="set2_1">显示</label>
							</p>
							<p @click="itemMdata.timeStyle.display = 'none'">
								<input type="radio" name="set2" id="set2_2" />
								<label for="set2_2">隐藏</label>
							</p>
						</div>
						<div>
							<span>分页：</span>
							<p @click="set3hid1">
								<input type="radio" name="set3" id="set3_1" checked="checked" />
								<label for="set3_1">显示</label>
							</p>
							<p @click="set3hid2">
								<input type="radio" name="set3" id="set3_2" />
								<label for="set3_2">隐藏</label>
							</p>
							<div class="set3_hid" v-show="set3_hid">
								<span>每页篇数：</span>
								<input type="text" value="20" />
							</div>
						</div>
						<div>
							<span>排序：</span>
							<input type="radio" name="set4" id="set4_1" checked="checked" />
							<label for="set4_1">最新发表在前</label>
							<input type="radio" name="set4" id="set4_2" />
							<label for="set4_2">最新发表在后</label>
						</div>
					</div>
				</div>
				<div class="skip">
					<p>跳转设置</p>
					<div class="detail">
						<div>
							<span>显示“更多”：</span>
							<p @click="itemMdata.moreShow = false">
								<input type="radio" name="set5" id="set5_1" checked="checked" @click="setdefault" />
								<label for="set5_1" @click="setdefault">默认</label>
							</p>
							<p @click="itemMdata.moreShow = false">
								<input type="radio" name="set5" id="set5_2" @click="sethid" />
								<label for="set5_2" @click="sethid">隐藏</label>
							</p>
							<p @click="itemMdata.moreShow = true">
								<input type="radio" name="set5" id="set5_3" @click="setcustom" />
								<label for="set5_3" @click="setcustom">自定义</label>
							</p>
							<div class="set5_hid">
								<p class="set_default" v-show="set_default">
									<input type="radio" id="set_default" />
									<label for="set_default">新页面打开</label>
								</p>
								<p class="set_custom" v-show="set_custom">
									<input type="text" />
									<button>设置链接</button>
								</p>
							</div>
						</div>
						<div>
							<span>单页跳转方式：</span>
							<p @click="itemMdata.articleSelected.target = '_blank'">
								<input type="radio" name="set6" id="set6_1" checked="checked" />
								<label for="set6_1">新窗口</label>
							</p>
							<p @click="itemMdata.articleSelected.target = '_self'">
								<input type="radio" name="set6" id="set6_2" />
								<label for="set6_2">当前窗口</label>
							</p>
						</div>
					</div>
				</div>
			</div-->
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import api from '@/api/$ajax.js'
	export default {
		name: 'singlePageEdit',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
			this.getData();
		},
		data() {
			return {
				title: "编辑单页管理",
				typenumber: '1',
				token: this.$route.query.token,
				set3_hid: true,
				id: 0,
				articleList: []
			}
		},
		methods: {
			changeType: function() {
				var v = this;
				api.get('/api/data/article?token=' + this.token + "&id=" + this.itemMdata.setnumber,true,{}, function(data) {				
					v.itemMdata.singleDes = data.data;
					//console.log(v.itemMdata.singleDes);
					//debugger;
				});
			},
			getData() {
				var v = this;
				api.get('/api/data/articleList?token=' + this.token, true, {}, function(data) {
					console.log(data)
					//var result = JSON.stringify(data); //json对象转成字符串
					v.articleList = data.data;
					//$("#text").val(result);
				});
			}
			/*,
						styleone: function() {
							this.itemMdata.imgStyle.display = "none";
							this.itemMdata.timeStyle.display = "none";
							this.itemMdata.describeStyle.display = "none";
							this.itemMdata.textStyle.width = "100%";
							this.itemMdata.liStyle.float = "none";
							this.itemMdata.liStyle.margin = "10px 0px";
							this.itemMdata.liStyle.width = "100%";
							this.itemMdata.textStyle.padding = "10px";
							this.itemMdata.titleStyle.float = "none";
							this.itemMdata.titleStyle.width = "100%";
						},
						styletwo: function() {
							this.itemMdata.imgStyle.display = "block";
							this.itemMdata.imgStyle.margin = "5px 0px";
							this.itemMdata.imgStyle.width = "100%";
							this.itemMdata.liStyle.float = "left";
							this.itemMdata.liStyle.width = "32%";
							this.itemMdata.liStyle.margin = "10px 6px";
							this.itemMdata.liStyle.clear = "none";
							this.itemMdata.describeStyle.display = "-webkit-box";
							this.itemMdata.timeStyle.display = "block";
							this.itemMdata.textStyle.width = "100%";
							this.itemMdata.textStyle.padding = "0px";
							this.itemMdata.titleStyle.float = "none";
							this.itemMdata.titleStyle.width = "100%";
							this.itemMdata.timeStyle.float = "none";
						},
						stylethree: function() {
							this.itemMdata.imgStyle.display = "block";
							this.itemMdata.imgStyle.margin = "0px";
							this.itemMdata.imgStyle.float = "left";
							this.itemMdata.imgStyle.width = "30%";
							this.itemMdata.liStyle.float = "none";
							this.itemMdata.liStyle.width = "100%";
							this.itemMdata.liStyle.margin = "10px 0px";
							this.itemMdata.liStyle.clear = "both";
							this.itemMdata.describeStyle.display = "-webkit-box";
							this.itemMdata.timeStyle.display = "block";
							this.itemMdata.textStyle.width = "68%";
							this.itemMdata.textStyle.float = "right";
							this.itemMdata.textStyle.padding = "0px";
							this.itemMdata.titleStyle.float = "none";
							this.itemMdata.titleStyle.width = "100%";
							this.itemMdata.timeStyle.float = "none";
						},
						stylesixth: function() {
							this.itemMdata.imgStyle.display = "none";
							this.itemMdata.liStyle.float = "none";
							this.itemMdata.liStyle.width = "100%";
							this.itemMdata.liStyle.margin = "10px 0px";
							this.itemMdata.liStyle.clear = "both";
							this.itemMdata.textStyle.width = "100%";
							this.itemMdata.textStyle.float = "none";
							this.itemMdata.textStyle.padding = "10px";
							this.itemMdata.timeStyle.display = "inline-block";
							this.itemMdata.timeStyle.float = "right";
							this.itemMdata.titleStyle.float = "left";
							this.itemMdata.titleStyle.width = "70%";
							this.itemMdata.describeStyle.display = "-webkit-box";
							this.itemMdata.describeStyle.clear = "both";
						}*/
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.articleScrapEdit {
		clear: both;
		overflow: auto;
		border-bottom: 1px solid #CCCCCC;
		.left {
			display: block;
			float: left;
			width: 15%;
			height: 530px;
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
				width: 144px;
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
			height: 530px;
			.one {
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
			.two {
				box-sizing: border-box;
				padding: 20px 40px;
				.basic {
					border-bottom: 1px dashed #E3E3E3;
					padding-bottom: 15px;
					margin-bottom: 15px;
					.detail {
						margin-top: 10px;
						div {
							margin-bottom: 10px;
							margin-top: 15px;
							clear: both;
							overflow: hidden;
							span {
								float: left;
							}
							p {
								float: left;
								margin-left: 10px;
							}
							input {
								margin-left: 10px;
							}
							.set3_hid {
								margin-left: 55px;
								margin-top: 10px;
								input {
									border: 1px solid #E3E3E3;
									text-align: center;
									width: 60px;
									margin-left: 0;
								}
							}
						}
					}
				}
				.skip {
					.detail {
						margin-top: 10px;
						div {
							margin-bottom: 5px;
							clear: both;
							overflow: hidden;
							span {
								float: left;
							}
							p {
								float: left;
								margin-left: 10px;
							}
							input {
								margin-left: 10px;
							}
							.set5_hid {
								margin-left: 85px;
								margin-top: 10px;
								input {
									border: 1px solid #E3E3E3;
									line-height: 30px;
								}
								button {
									background: #3a8ee6;
									color: #FFFFFF;
									line-height: 30px;
									padding: 0 8px;
									border-radius: 3px;
								}
							}
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