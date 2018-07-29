<template>
	<div class="graphicEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">高级</p>
		</div>
		<div class="one" v-if="typenumber == 1">
			<p class="name">
				<span>模块标题：</span>
				<input type="text" value="关于网联" />
			</p>
			<div class="style">
				<p>模块样式：</p>
				<ul id="style" @click="changeborder">
					<li @click="styleone">
						<img src="/static/image/style01.jpg" />
						<span class="icon"></span>
					</li>
					<li @click="styletwo">
						<img src="/static/image/style02.jpg" />
						<span class="icon"></span>
					</li>
					<li @click="stylethree">
						<img src="/static/image/style03.jpg" />
						<span class="icon"></span>
					</li>
					<li @click="stylefour">
						<img src="/static/image/style04.jpg" />
						<span class="icon"></span>
					</li>
					<li @click="stylefive">
						<img src="/static/image/style05.jpg" />
						<span class="icon"></span>
					</li>					
				</ul>
			</div>
			<div class="content">
				<p>模块内容：</p>
				<div class="left">
					<div class="file">
						<span>图片文件：</span>
						<input type="button" value="添加图片" @click="vbgFun(1)" />
					</div>
					<div class="size">
						<span>图片尺寸：</span>
						<p>
							<span>宽：</span>
							<input type="text" @blur="imgStlyeW(itemMdata.imgStyle.width)" v-model="itemMdata.imgStyle.width" />
						</p>
						<p>
							<span>高：</span>
							<input type="text" @blur="imgStlyeH(itemMdata.imgStyle.height)" v-model="itemMdata.imgStyle.height" />
						</p>
					</div>
					<div class="margin">
						<span>图片间距：</span>
						<p @click="margin_hid = false">
							<input type="radio" name="margin" id="default" checked="checked" />
							<label for="default">默认</label>
						</p>
						<p @click="margin_hid = true">
							<input type="radio" name="margin" id="custom" />
							<label for="custom">自定义</label>
						</p>
						<div class="margin_hid" v-show="margin_hid">
							<span>水平：</span>
							<input type="text" value="itemMdata.imgStyle.margin" v-model="itemMdata.imgStyle.margin" />
						</div>
					</div>
					<div class="link">
						<span>图片链接：</span>
						<input type="button" value="添加链接" class="more" @click="editDial.setlink = true" />
						
					</div>
					<div class="text">
						<span>图片描述：</span>
						<input type="text" />
					</div>
					<div class="img">
						<img :src="itemMdata.mImage0.url" />
					</div>
				</div>
				<div class="right">
					<div class="components-container">
						<div class="editor-container">
							<UE :defaultMsg="itemMdata.defaultMsg" :config=config ref="ue"></UE>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="two" v-if="typenumber == 2">
			<div class="showmore">
				<div class="type">
					<span>显示“更多”：</span>
					<p @click="morehid1">
						<input type="radio" name="more" id="more1" checked="checked" />
						<label for="more1">否</label>
					</p>
					<p @click="morehid2">
						<input type="radio" name="more" id="more2" />
						<label for="more2">是</label>
					</p>
				</div>
				<div class="more_hid" v-show="more_hid">
					<div class="select">
						<span>“更多”链接：</span>
						<el-select v-model="itemMdata.moreUrl" placeholder="请选择">
							<el-option-group v-for="group in options3" :key="group.label" :label="group.label">
								<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-option-group>
						</el-select>
					</div>
					<div class="select">
						<span>打开方式：</span>
						<el-select v-model="itemMdata.moreTarget" placeholder="请选择">
							<el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
			<!--<div class="scroll">
				<div class="type">
					<span>开启滚动：</span>
					<p @click="scroll_hid = false">
						<input type="radio" name="scroll" id="scroll1" checked="checked" />
						<label for="scroll1">否</label>
					</p>
					<p @click="scroll_hid = true">
						<input type="radio" name="scroll" id="scroll2" />
						<label for="scroll2">是</label>
					</p>
				</div>
				<div class="scroll_hid" v-show="scroll_hid">
					<p>
						<span>滚动方向：</span>
						<el-select v-model="value5" placeholder="请选择">
							<el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</p>
					<p>
						<span>滚动速度：</span>
						<el-select v-model="value6" placeholder="请选择">
							<el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</p>
					<p>
						<span>滚动方式：</span>
						<el-select v-model="value7" placeholder="请选择">
							<el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</p>
					<p>
						<span>连续滚动：</span>
						<input type="radio" name="continuous" id="continuous1" checked="checked" />
						<label for="continuous1">是</label>
						<input type="radio" name="continuous" id="continuous2" />
						<label for="continuous2">否</label>
					</p>
				</div>
			</div>-->
		</div>
		<uiLink :itemMdata='itemMdata' :editDial="editDial"></uiLink>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.mImage0"></mImageEdit>
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
	import UE from '@/components/m/ueditor.vue'
	import uiLink from '@/components/m/uiLink.vue'

	export default {
		name: 'graphicEdit',
		props: ['itemMdata'],
		components: {
			UE,
			uiLink,
			mImageEdit
		},
		beforeDestroy() {
			this.getUEContent();
			console.log("beforeDestroy");
		},
		created() {
			console.log(this.itemMdata)
		},
		data() {
			return {
				title: "编辑图文展示",
				editDial: {
					artTitle: "设置链接地址",
					setlink: false
				},
				config: {
					/*toolbars: [
						['undo', 'redo', 'indent', 'italic', 'underline', 'strikethrough', 'selectall', 'horizontal', 'fontfamily', 'fontsize', 'forecolor', 'bold']
					],	*/				
					serverUrl: "https://jsonplaceholder.typicode.com/posts/",
					initialFrameWidth: null,
					initialFrameHeight: 180
				},
				options: [{
						value: '网站栏目',
						label: '网站栏目'
					}, {
						value: '网站产品',
						label: '网站产品'
					}, {
						value: '网站文章',
						label: '网站文章'
					}, {
						value: '网站图册',
						label: '网站图册'
					}, {
						value: '产品分类',
						label: '产品分类'
					},
					{
						value: '文章分类',
						label: '文章分类'
					}
				],
				value: '网站栏目',
				options2: [{
					value: '选项1',
					label: '网站首页'
				}, {
					value: '选项2',
					label: '产品中心'
				}, {
					value: '选项3',
					label: '公司简介'
				}, {
					value: '选项4',
					label: '客户案例'
				}, {
					value: '选项5',
					label: '联系我们'
				}],
				value2: '',
				link_hid: false,
				typenumber: '1',
				options3: [{
					label: '网站首页',
					options: [{
						value: 'https://www.baidu.com/',
						label: '网站顶端'
					}, {
						value: '/',
						label: '网站底部'
					}]
				}, {
					label: '关于我们',
					options: [{
						value: '//',
						label: '公司简介'
					}, {
						value: '///',
						label: '荣誉资质'
					}, {
						value: '////',
						label: '公司历程'
					}]
				}],
				value3: '',
				options4: [{
					value: '_blank',
					label: '新窗口'
				}, {
					value: '_self',
					label: '当前窗口'
				}],
				value4: '',
				options5: [{
						value: '选项1',
						label: '向上'
					}, {
						value: '选项2',
						label: '向下'
					},
					{
						value: '选项3',
						label: '向左'
					}, {
						value: '选项4',
						label: '向右'
					}
				],
				value5: '',
				options6: [{
						value: '选项1',
						label: '普通'
					}, {
						value: '选项2',
						label: '快速'
					},
					{
						value: '选项3',
						label: '慢速'
					}
				],
				value6: '',
				options7: [{
					value: '选项1',
					label: '移出'
				}, {
					value: '选项2',
					label: '移入'
				}],
				value7: '',
				more_hid: false,
				scroll_hid: false,
				margin_hid: false,
				bordercolor: '',
				addVisibleNav: false,
				flag: 1
			}
		},
		methods: {
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log(flag)
			},
			imgStlyeH(h) {
				console.log(h)
			},
			imgStlyeW(w) {
				console.log(w)
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			getUEContent() {
				let content = this.$refs.ue.getUEContent();
				/*this.$notify({
					title: '获取成功，可在控制台查看！',
					message: content,
					type: 'success'
				});*/
				this.itemMdata.defaultMsg = content;
				//console.log(content)
			},
			changetype: function(number) {
				this.typenumber = number
			},
			changeborder: function() {
				var style = document.querySelector('#style');
				var list = style.querySelectorAll('li');
				for(var i = 0; i < list.length; i++) {
					list[i].onclick = function() {
						$(this).addClass("active").siblings().removeClass("active");
					}
				}
			},
			styleone: function() {
				this.itemMdata.divStyleL.display = 'none';
				this.itemMdata.divStyleR.width = '100%';
			},
			styletwo: function() {
				this.itemMdata.divStyleL.display = 'block';
				this.itemMdata.divStyleL.width = '100%';
				//this.itemMdata.imgStyle.margin = '10px 0px';
				this.itemMdata.divStyleR.width = '100%';
			},
			stylethree: function() {
				this.itemMdata.divStyleL.display = 'block';
				this.itemMdata.divStyleL.width = '49%';
				this.itemMdata.divStyleL.float = 'left';
				//this.itemMdata.imgStyle.margin = '0px';
				this.itemMdata.divStyleR.width = '49%';
				this.itemMdata.divStyleR.float = 'right';
			},
			stylefour: function() {
				this.itemMdata.divStyleL.display = 'block';
				this.itemMdata.divStyleL.width = '30%';
				this.itemMdata.divStyleL.margin = '5px';
				this.itemMdata.divStyleL.float = 'left';
				this.itemMdata.divStyleR.width = '100%';
				this.itemMdata.divStyleR.float = 'none';
			},
			stylefive: function() {
				this.itemMdata.divStyleL.display = 'block';
				this.itemMdata.divStyleL.width = '49%';
				//this.itemMdata.imgStyle.margin = '0px';
				this.itemMdata.divStyleL.float = 'right';
				this.itemMdata.divStyleR.width = '49%';
				this.itemMdata.divStyleR.float = 'left';
			},
			morehid1: function() {
				this.more_hid = false;
				this.itemMdata.moreShow = false;
			},
			morehid2: function() {
				this.more_hid = true;
				this.itemMdata.moreShow = true;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.graphicEdit {
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
			height: 520px;
			padding: 20px;
			.name {
				input {
					border: 1px solid #E3E3E3;
					padding-left: 10px;
					line-height: 35px;
				}
			}
			.style {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				p {
					float: left;
				}
				ul {
					float: left;
					width: 90%;
					li {
						box-sizing: border-box;
						float: left;
						width: 10%;
						border: 1px solid #E3E3E3;
						margin-right: 10px;
						margin-left: 5px;
						padding: 5px 10px;
						position: relative;
						img {
							width: 100%;
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
			.content {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				position: relative;
				.left {
					box-sizing: border-box;
					float: left;
					width: 30%;
					border: 1px solid #E3E3E3;
					padding: 10px;
					font-size: 13px;
					.file {
						input {
							background: #e4e4e4;
							padding: 1px 10px;
							border: 1px solid #ccc;
						}
					}
					.size {
						clear: both;
						overflow: hidden;
						margin-top: 7px;
						span {
							float: left;
						}
						p {
							float: left;
							width: 30%;
							margin-left: 5px;
							input {
								border: 1px solid #E3E3E3;
								width: 40px;
								line-height: 20px;
								text-align: center;
							}
						}
					}
					.margin {
						clear: both;
						overflow: hidden;
						margin-top: 7px;
						span {
							float: left;
						}
						p {
							float: left;
							width: auto;
							margin-left: 10px;
						}
						.margin_hid {
							clear: both;
							overflow: hidden;
							margin-left: 75px;
							input {
								border: 1px solid #E3E3E3;
								width: 50px;
							}
						}
					}
					.link {
						margin-top: 5px;
						.more {
							background: #e4e4e4;
							padding: 1px 10px;
							border: 1px solid #ccc;
						}
						.link_hid {
							position: absolute;
							top: 0;
							left: 150px;
							right: 150px;
							background: #FFFFFF;
							z-index: 9999;
							border: 1px solid #E3E3E3;
							border-radius: 5px;
							box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.2);
							.title {
								border-bottom: 1px solid #CCC;
								clear: both;
								overflow: hidden;
								padding: 10px 15px;
								p:nth-child(1) {
									float: left;
									font-size: 16px;
								}
								p:nth-child(2) {
									float: right;
									font-size: 14px;
								}
							}
							.link_content {
								padding: 25px;
								font-size: 14px;
								.type {
									margin-bottom: 25px;
									clear: both;
									overflow: hidden;
									span {
										float: left;
									}
									p {
										float: left;
										margin-left: 15px;
									}
								}
								.type_detail p {
									margin-bottom: 15px;
								}
							}
						}
					}
					.text {
						clear: both;
						overflow: hidden;
						margin-top: 8px;
						input {
							float: right;
							border: 1px solid #E3E3E3;
							width: 166px;
						}
					}
					.img {
						width: 235px;
						height: 150px;
						margin: 10px 0;
						overflow: auto;
						img {
							width: 100%;
						}
					}
				}
				.right {
					float: right;
					width: 69%;
					border: 1px solid #E3E3E3;
					font-size: 13px;
					overflow:scroll;
					height:334px;
				}
			}
		}
		.two {
			box-sizing: border-box;
			height: 520px;
			padding: 20px;
			.showmore {
				.type {
					clear: both;
					overflow: hidden;
					span {
						width: 80px;
						float: left;
					}
					p {
						float: left;
						margin-left: 15px;
					}
				}
				.more_hid {
					clear: both;
					overflow: hidden;
					margin-top: 15px;
					.select {
						float: left;
						width: 38%;
					}
				}
			}
			.scroll {
				margin-top: 20px;
				.type {
					clear: both;
					overflow: hidden;
					span {
						width: 80px;
						float: left;
					}
					p {
						float: left;
						margin-left: 15px;
					}
				}
				.scroll_hid {
					margin-top: 15px;
					p {
						margin-bottom: 10px;
						input {
							margin-left: 10px;
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