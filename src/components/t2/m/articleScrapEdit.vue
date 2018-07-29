<template>
	<div class="articleScrapEdit">
		<ul class="left">
			<li @click="changetype(1)" :class="{active:typenumber == 1}">常规</li>
			<li @click="changetype(2)" :class="{active:typenumber == 2}">高级</li>
		</ul>
		<div class="right">
			<div v-if="typenumber == 1" class="one">
				<p class="name">
					<span>模块标题：</span>
					<input type="text" value="文章列表" />
				</p>
				<div class="style">
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
						<!--<li>
							<div class="style_four"></div>
							<span class="icon"></span>
						</li>-->
						<!--<li>
							<div class="style_five"></div>
							<span class="icon"></span>
						</li>-->
						<li @click="stylesixth">
							<div class="style_sixth"></div>
							<span class="icon"></span>
						</li>
						<!--<li>
							<div class="style_seven"></div>
							<span class="icon"></span>
						</li>-->
					</ul>
				</div>
				<div class="title">
					<span>标题样式：</span>
					<p>
						<span>字体大小：</span>
						<input type="text" value="itemMdata.titleStyle.fontSize" v-model="itemMdata.titleStyle.fontSize" />
					</p>
					<p>
						<span>字体颜色：</span>
						<input type="text" value="itemMdata.titleStyle.color" v-model="itemMdata.titleStyle.color" />
					</p>
					<p>
						<span>字体行高：</span>
						<input type="text" value="itemMdata.titleStyle.lineHeight" v-model="itemMdata.titleStyle.lineHeight" />
					</p>
				</div>
				<div class="title">
					<span>摘要样式：</span>
					<p>
						<span>字体大小：</span>
						<input type="text" value="itemMdata.describeStyle.fontSize" v-model="itemMdata.describeStyle.fontSize" />
					</p>
					<p>
						<span>字体颜色：</span>
						<input type="text" value="itemMdata.describeStyle.color" v-model="itemMdata.describeStyle.color" />
					</p>
					<p>
						<span>字体行高：</span>
						<input type="text" value="itemMdata.describeStyle.lineHeight" v-model="itemMdata.describeStyle.lineHeight" />
					</p>
				</div>
				<div class="title">
					<span>列表间距：</span>
					<p>
						<span>上-</span>
						<input type="text" value="itemMdata.liStyle.marginTop" v-model="itemMdata.liStyle.marginTop" />
					</p>
					<p>
						<span>下-</span>
						<input type="text" value="itemMdata.liStyle.marginBottom" v-model="itemMdata.liStyle.marginBottom" />
					</p>
					<p>
						<span>左-</span>
						<input type="text" value="itemMdata.liStyle.marginLeft" v-model="itemMdata.liStyle.marginLeft" />
					</p>
					<p>
						<span>右-</span>
						<input type="text" value="itemMdata.liStyle.marginRight" v-model="itemMdata.liStyle.marginRight" />
					</p>
				</div>
				<div class="bg">
					<span>列表背景：</span>
					<input type="text" value="itemMdata.liStyle.background" v-model="itemMdata.liStyle.background" />
				</div>
				<div class="article">
					<div class="type">
						<span>文章添加：</span>
						<p @click="changeset(1)">
							<input type="radio" name="type" id="type1" checked="checked" />
							<label for="type1">直接添加</label>
						</p>
						<p @click="changeset(2)">
							<input type="radio" name="type" id="type2" />
							<label for="type2">使用筛选条件</label>
						</p>
					</div>
					<div class="type_one" v-if="setnumber == 1">
						<ul class="list">
							<li v-for="(article,index) in itemMdata.articleList">
								<p @click="removeArticle(article)">{{article.name}}</p>
							</li>
						</ul>
						<div class="icon">〉</div>
						<ul class="selected">
							<li v-for="(select,index) in itemMdata.articleSelected">
								<span>{{select.name}}</span>
								<span @click="deleteSelect(select)">X</span>
							</li>
						</ul>
					</div>
					<div class="type_two" v-if="setnumber == 2">
						<p>
							<input type="checkbox" id="checkbox1" />
							<label for="checkbox1">未分类</label>
						</p>
						<p v-for="(select,index) in itemMdata.newsCategory">
							<input type="checkbox" id="checkbox2" />
							<label for="checkbox2">{{select.category_name}}</label>
						</p>
						<!--<p>
							<input type="checkbox" id="checkbox1" />
							<label for="checkbox1">未分类</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox2" />
							<label for="checkbox2">新闻动态</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox3" />
							<label for="checkbox3">新闻资讯</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox4" />
							<label for="checkbox4">热门案例</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox5" />
							<label for="checkbox5">人事任免</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox6" />
							<label for="checkbox6">旅游胜景</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox7" />
							<label for="checkbox7">人文风物</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox8" />
							<label for="checkbox8">自然田园</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox9" />
							<label for="checkbox9">主题公园</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox10" />
							<label for="checkbox10">统计快讯</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox11" />
							<label for="checkbox11">招标投标</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox12" />
							<label for="checkbox12">年度规划</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox13" />
							<label for="checkbox13">年度规划</label>
						</p>
						<p>
							<input type="checkbox" id="checkbox14" />
							<label for="checkbox14">年度规划</label>
						</p>-->
					</div>
				</div>
			</div>
			<div v-if="typenumber == 2" class="two">
				<div class="basic">
					<p>基本设置</p>
					<div class="detail">
						<!--<div>
							<span>分类：</span>
							<input type="radio" name="set1" id="set1_1" checked="checked" />
							<label for="set1_1">显示</label>
							<input type="radio" name="set1" id="set1_2" />
							<label for="set1_2">隐藏</label>
						</div>-->
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
						<div class="con_page">
							<div class="effect">
								<span>是否开启分页：</span>
								<span class="sp">
						            <input type="radio" name="direction" id="direction1" v-model="itemMdata.page.isShow" value="1" />
						            <label for="direction1">是</label>
					            </span>
								<span class="sp">
						            <input type="radio" name="direction" id="direction2" v-model="itemMdata.page.isShow" value="0" />
						            <label for="direction2">否</label>
					            </span>
							</div>
							<div v-show="itemMdata.page.isShow==1" class="effect ac_in">
								<span>每页的条数：</span>
								<input type="text" v-model="itemMdata.page.pageNum" /> 条
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
							<div class="set5_hid" v-show="itemMdata.moreShow">
								<!--<p class="set_default" v-show="set_default">
									<input type="radio" id="set_default" />
									<label for="set_default">新页面打开</label>
								</p>-->
								<!--<p class="set_custom" v-show="set_custom">
									<input type="text" />
									<button>设置链接</button>
								</p>-->
								<p>
									<span>文字颜色：</span>
									<input type="text" v-model="itemMdata.moreStyle.color" />
								</p>
								<p>
									<span>文字大小：</span>
									<input type="text" v-model="itemMdata.moreStyle.fontSize" />
								</p>
								<p>
									<span>背景颜色：</span>
									<input type="text" v-model="itemMdata.moreStyle.background" />
								</p>
								<p>
									<span>宽度：</span>
									<input type="text" v-model="itemMdata.moreStyle.width" />
								</p>
								<p>
									<span>高度：</span>
									<input type="text" v-model="itemMdata.moreStyle.lineHeight" />
								</p>
								<p>
									<span>上外边距：</span>
									<input type="text" v-model="itemMdata.moreStyle.marginTop" />
								</p>
								<p>
									<span>下外边距：</span>
									<input type="text" v-model="itemMdata.moreStyle.marginBottom" />
								</p>
								<p>
									<span>左外边距：</span>
									<input type="text" v-model="itemMdata.moreStyle.marginLeft" />
								</p>
								<p>
									<span>右外边距：</span>
									<input type="text" v-model="itemMdata.moreStyle.marginRight" />
								</p>
							</div>
						</div>
						<div>
							<span>文章跳转方式：</span>
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
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import api from '@/api/$ajax.js'
	export default {
		name: 'articleScrapEdit',
		props: ['itemMdata'],
		created() {
			console.log(this.itemMdata);
			this.getData();
		},
		data() {
			return {
				title: "编辑文章列表",
				typenumber: '1',
				setnumber: '1',
				token: this.$route.query.token,
				set3_hid: true,
				newsCategory: [],
				set_default: true,
				set_custom: false,
				newArticle: ''
			}
		},
		methods: {
			changetype: function(number) {
				this.typenumber = number
			},
			changeset: function(number) {
				this.setnumber = number
			},
			setdefault: function() {
				this.set_default = true;
				this.set_custom = false;
			},
			setcustom: function() {
				this.set_default = false;
				this.set_custom = true;
			},
			sethid: function() {
				this.set_default = false;
				this.set_custom = false;
			},
			set3hid1: function() {
				this.set3_hid = true;
				this.itemMdata.page = true;
			},
			set3hid2: function() {
				this.set3_hid = false;
				this.itemMdata.page = false;
			},
			deleteSelect: function(select) {
				this.itemMdata.articleSelected.splice(this.itemMdata.articleSelected.indexOf(select), 1);
				this.itemMdata.page.talNum = this.itemMdata.articleSelected.length;
			},
			removeArticle: function(article) {
				var newArticle = JSON.parse(JSON.stringify(article));
				this.itemMdata.articleSelected.push(newArticle);
				this.itemMdata.page.talNum = this.itemMdata.articleSelected.length;
			},
			//			borderColor: function(index) {
			//				this.color = index;
			//				e.currentTarget.querySelector("span").style.display = "block";
			//				$(this).addClass("active").siblings().removeClass("active");
			//			},
			changeborder: function() {
				var style = document.querySelector('#style');
				var list = style.querySelectorAll('li');
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						$(this).addClass("active").siblings().removeClass("active");
					}
				}
			},
			getData() {
				var v = this;
				api.get('/api/data/newsList?token=' + this.token, true, {}, function(data) {
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.articleList = data.data;
					//$("#text").val(result);
				});
				api.get('/api/data/newsCategory?token=' + this.token, true, {}, function(data) {
					//var result = JSON.stringify(data); //json对象转成字符串
					v.itemMdata.newsCategory = data.data;
					//$("#text").val(result);
				});

			},
			styleone: function() {
				this.itemMdata.imgStyle.display = "none";
				this.itemMdata.timeStyle.display = "none";
				this.itemMdata.describeStyle.display = "none";
				this.itemMdata.textStyle.width = "100%";
				this.itemMdata.liStyle.float = "none";
				this.itemMdata.liStyle.marginTop = "10px";
				this.itemMdata.liStyle.marginBottom = "10px";
				this.itemMdata.liStyle.marginLeft = "0px";
				this.itemMdata.liStyle.marginRight = "0px";
				this.itemMdata.liStyle.width = "100%";
				this.itemMdata.textStyle.padding = "5px 10px";
				this.itemMdata.titleStyle.float = "none";
				this.itemMdata.titleStyle.width = "100%";
			},
			styletwo: function() {
				this.itemMdata.imgStyle.display = "block";
				this.itemMdata.imgStyle.margin = "5px 0px";
				this.itemMdata.imgStyle.width = "100%";
				this.itemMdata.liStyle.float = "left";
				this.itemMdata.liStyle.width = "46%";
				this.itemMdata.liStyle.marginTop = "10px";
				this.itemMdata.liStyle.marginBottom = "10px";
				this.itemMdata.liStyle.marginLeft = "6px";
				this.itemMdata.liStyle.marginRight = "6px";
				this.itemMdata.liStyle.clear = "none";
				this.itemMdata.describeStyle.display = "-webkit-box";
				this.itemMdata.timeStyle.display = "block";
				this.itemMdata.textStyle.width = "100%";
				this.itemMdata.textStyle.padding = "0px";
				this.itemMdata.textStyle.clear = "both";
				this.itemMdata.titleStyle.float = "none";
				this.itemMdata.titleStyle.width = "100%";
				this.itemMdata.timeStyle.float = "none";
			},
			stylethree: function() {
				this.itemMdata.imgStyle.display = "block";
				this.itemMdata.imgStyle.margin = "0px";
				this.itemMdata.imgStyle.float = "left";
				this.itemMdata.imgStyle.width = "40%";
				this.itemMdata.liStyle.float = "none";
				this.itemMdata.liStyle.width = "100%";
				this.itemMdata.liStyle.marginTop = "10px";
				this.itemMdata.liStyle.marginBottom = "10px";
				this.itemMdata.liStyle.marginLeft = "0px";
				this.itemMdata.liStyle.marginRight = "0px";
				this.itemMdata.liStyle.clear = "both";
				this.itemMdata.describeStyle.display = "-webkit-box";
				this.itemMdata.timeStyle.display = "block";
				this.itemMdata.textStyle.width = "58%";
				this.itemMdata.textStyle.float = "right";
				this.itemMdata.textStyle.padding = "0px";
				this.itemMdata.textStyle.clear = "none";
				this.itemMdata.titleStyle.float = "none";
				this.itemMdata.titleStyle.width = "100%";
				this.itemMdata.timeStyle.float = "none";
			},
			stylesixth: function() {
				this.itemMdata.imgStyle.display = "none";
				this.itemMdata.liStyle.float = "none";
				this.itemMdata.liStyle.width = "100%";
				this.itemMdata.liStyle.marginTop = "10px";
				this.itemMdata.liStyle.marginBottom = "10px";
				this.itemMdata.liStyle.marginLeft = "0px";
				this.itemMdata.liStyle.marginRight = "0px";
				this.itemMdata.liStyle.clear = "both";
				this.itemMdata.textStyle.width = "100%";
				this.itemMdata.textStyle.float = "none";
				this.itemMdata.textStyle.padding = "10px";
				this.itemMdata.timeStyle.display = "inline-block";
				this.itemMdata.timeStyle.float = "right";
				this.itemMdata.titleStyle.float = "left";
				this.itemMdata.titleStyle.width = "60%";
				this.itemMdata.describeStyle.display = "-webkit-box";
				this.itemMdata.describeStyle.clear = "both";
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.articleScrapEdit {
		clear: both;
		overflow: auto;
		border-bottom: 1px solid #CCCCCC;
		
		.effect {
			clear: both;
			span.sp {
				 display: inline-block; 
				 margin-right: 20px; 
			}
		}
		.ac_in {
			input {
				width: 50px;
				padding-left: 3px;
				margin-right: 5px;
				border: 1px solid #CCC;
			}
		}
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
								background: url(../../../../static/image/mbg02.png) no-repeat;
								position: relative;
							}
							.icon {
								background: url(../../../../static/image/mbg01.png) no-repeat;
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
				.title {
					clear: both;
					overflow: hidden;
					margin-top: 10px;
					span {
						float: left;
						line-height: 30px;
					}
					p {
						float: left;
						line-height: 30px;
						margin: 0 10px;
						input {
							width: 80px;
							text-align: center;
							line-height: 30px;
							border: 1px solid #E3E3E3;
						}
					}
				}
				.bg {
					clear: both;
					overflow: hidden;
					margin-top: 10px;
					span {
						float: left;
						line-height: 30px;
					}
					input {
						width: 120px;
						text-align: center;
						line-height: 30px;
						border: 1px solid #E3E3E3;
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
								p {
									margin-top: 10px;
								}
								input {
									width: 80px;
									text-align: center;
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