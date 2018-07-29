<template>
	<div class="buttonEdit">
		<div class="buttonEdittop">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">文字</p>
		</div>
		<div class="one" v-if="typenumber == 1">
			<div class="name">
				<span>按钮名称：</span>
				<input type="text" value="itemMdata.tText" v-model="itemMdata.tText" />
			</div>
			<div class="size">
				<span>按钮大小：</span>
				<p>
					<span>宽：</span>
					<input type="text" placeholder="200" v-model="itemMdata.buttonStyle.width" @blur="buttonWidth()"/>
				</p>
				<p>
					<span>高：</span>
					<input type="text" placeholder="50" v-model="itemMdata.buttonStyle.height" @blur="buttonHeight()" />
				</p>
			</div>
			
			<div class="radius">
				<span>圆角弧度：</span>
				<div class="block">
					<el-slider v-model="itemMdata.borderRadius"@blur="borderRadius()"></el-slider>
				</div>
			</div>
			
			<div class="style">
				<p>样式：</p>
				<p class="default" @click="itemMdata.default_show = true">
					<input type="radio" name="radio" id="default" :checked="itemMdata.default_show==true" />
					<label for="default">默认</label>
				</p>
				<p class="custom" @click="itemMdata.default_show = false">
					<input type="radio" name="radio" id="custom" :checked="itemMdata.default_show==false" />
					<label for="custom">自定义</label>
				</p>
			</div>
			<div class="content">
				<div class="default_detail" v-if="itemMdata.default_show==false">
					<div class="look">
						<p>按钮样式：</p>
						<ul>
							<li @click="changeone" :class="{actived:itemMdata.borderActived==1}">
								<div class="look_one" :style="{background: color1}"></div>
							</li>
							<li @click="changetwo" :class="{actived:itemMdata.borderActived==2}">
								<div class="look_two" :style="{background: color1}"></div>
							</li>
							<li @click="changethree" :class="{actived:itemMdata.borderActived==3}">
								<div class="look_three" :style="{['border-color']: color1}"></div>
							</li>
							<li @click="changefour" :class="{actived:itemMdata.borderActived==4}">
								<div class="look_four" :style="{background: gradient}"></div>
							</li>
							<li @click="changefive" :class="{actived:itemMdata.borderActived==5}">
								<div class="look_five" :style="{background: gradient}"></div>
							</li>
						</ul>
					</div>
					<div class="color">
						<p>按钮顶部颜色：</p>
						<div class="block" style="{marginRight:20px;}">
							<el-color-picker show-alpha color-format="rgb" v-model="color2"></el-color-picker>
						</div>
						<p>按钮底部颜色：</p>
						<div class="block">
							<el-color-picker show-alpha color-format="rgb" v-model="color1"></el-color-picker>
						</div>
						
					</div>
					<div class="color">
						<p>按钮背景颜色：</p>
						<div class="block" style="{marginRight:20px;}">
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.buttonStyle.background"></el-color-picker>
						</div>
						<p>按钮边框颜色：</p>
						<div class="block">
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.buttonStyle.borderColor"></el-color-picker>
						</div>
						
						<p>按钮边框宽度：</p>
						<input type="text" v-model="itemMdata.buttonStyle.borderWidth" placeholder="1"/>
					
					</div>
					<div class="color">
						<p>是否设置悬浮：</p>
						<p class="default" @click="itemMdata.setHover = true">
							<input type="radio" name="setHover" :checked="itemMdata.setHover==true" />
							<label for="setHover">是</label>
						</p>
						<p class="custom" @click="itemMdata.setHover = false">
							<input type="radio" name="setHover" :checked="itemMdata.setHover==false" />
							<label for="setHover">否</label>
						</p>
					</div>
					<div class="color">
						
						<p>悬浮背景颜色：</p>
						<div class="block">
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.hoverStyle.background"></el-color-picker>
						</div>
						<p>悬浮边框颜色：</p>
						<div class="block">
							<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.hoverStyle.borderColor"></el-color-picker>
						</div>
						<p>悬浮边框宽度：</p>
						<input type="text" v-model="itemMdata.hoverStyle.borderWidth" placeholder="1"/>
					</div>
					
				</div>
				<div class="custom_detail"  v-if="itemMdata.default_show==false">
					<div class="img">
						<p>背景图片：</p>
						<button @click="vbgFun(1)">添加图片</button>
						<div class="imgDelete">
							<img :src="itemMdata.mImage0.url" />
							<div class="hid" @click="delData()"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="two" v-if="typenumber == 2">
			<div class="list">
				<span>字体：</span>
				<el-select v-model="itemMdata.iStyle.fontFamily" placeholder="itemMdata.iStyle.fontFamily">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="list">
				<span>大小：</span>
				<input class="input" type="text" value="itemMdata.iStyle.fontSize" v-model="itemMdata.iStyle.fontSize" />
			</div>
			<div class="list" @click="bold">
				<span>加粗：</span>
				<input type="checkbox" />
			</div>
			<div class="list" @click="underline">
				<span>下划线：</span>
				<input type="checkbox" />
			</div>
			<div class="list">
				<span>颜色：</span>
				<el-color-picker v-model="itemMdata.iStyle.color" size="medium"></el-color-picker>
			</div>
			<div class="list">
				<span>悬浮颜色：</span>
				<el-color-picker v-model="itemMdata.hoverStyle.color" size="medium"></el-color-picker>
			</div>
		</div>
		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" @recoent="recoent" :itemMdata="itemMdata.mImage0"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisibleNav = false">取 消</el-button>
				<el-button type="primary" @click="addVisibleFun" >保 存</el-button>
			</span>
		</el-dialog>
		<uiLink :itemMdata='itemMdata' :editDial="editDial"></uiLink>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from './mImageEdit.vue'
	import uiLink from '@/components/m/uiLink.vue'
	export default {
		name: 'buttonEdit',
		created() {
			this.itemMdata.hoverStyle = this.itemMdata.hoverStyle ||{};
			console.log(this.itemMdata);
			console.log(this.radius);
		},
		components: {
			uiLink,
			mImageEdit
		},
		props: ['itemMdata'],
		data() {
			return {
				title: '按钮编辑',
				default_show: true,
				custom_show: false,
				fileList2: [{
					name: 'background.jpeg',
					url: '/static/img/default.png'
				}],
				editDial: {
					artTitle: "设置链接地址",
					setlink: false
				},
				color1: '#409EFF',
				color2: '#409EFF',
				addVisibleNav: false,
				flag: 1,
				typenumber: '1',
				options: [{
					value: '微软雅黑',
					label: '微软雅黑'
				}, {
					value: '宋体',
					label: '宋体'
				}, {
					value: '黑体',
					label: '黑体'
				}, {
					value: '幼圆',
					label: '幼圆'
				}],
				boldCur: '',
				underlineCur: '',
				radius:0
			}
		},
		computed: {
			// 计算属性的 getter
			gradient: function() {
				// `this` 指向 vm 实例
				return '-webkit-linear-gradient(bottom,' + this.color1 + ' 10%, ' + this.color2 + ')'
			}
		},
		methods: {
		
			buttonWidth(){
				
				this.itemMdata.parentStyle.width = parseInt(this.itemMdata.buttonStyle.width)
				//console.log(this.itemMdata.parentStyle.width)
			},
			buttonHeight(){
				this.itemMdata.parentStyle.heigth = parseInt(this.itemMdata.buttonStyle.heigth)
			},
			delData(){
				this.itemMdata.mImage0.url = '';
				//console.log(this.itemMdata.mImage0)
				//this.itemMdata.mImage0.url = '';
			},
			changetype: function(number) {
				this.typenumber = number
			},
			bold: function() {
				this.boldCur = !this.boldCur;
				this.itemMdata.iStyle.fontWeight = this.boldCur ? 'bold' : 'normal';
			},
			underline: function() {
				this.underlineCur = !this.underlineCur;
				this.itemMdata.iStyle.textDecoration = this.underlineCur ? 'underline' : 'none';
			},
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log(flag)
			},
			recoent(i) {
				this.itemMdata.buttonStyle.backgroundImage = 'url("' + i.url + '")';
			},
			addVisibleFun() { 
				this.addVisibleNav = false;
			},
			defaultshow: function(number) {
				this.default_show = number;
				
			},
			changeone: function() {
				this.itemMdata.borderRadius = '10';
				this.itemMdata.buttonStyle.color = '#fff';
				this.itemMdata.buttonStyle.background = this.color1;
				this.itemMdata.buttonStyle.boxShadow = '';
				this.itemMdata.borderActived = 1;
			},
			changetwo: function() {
				this.itemMdata.borderRadius = '0';
				this.itemMdata.buttonStyle.color = '#fff';
				this.itemMdata.buttonStyle.background = this.color1;
				this.itemMdata.buttonStyle.boxShadow = '';
				this.itemMdata.borderActived = 2;
			},
			changethree: function() {
				this.itemMdata.borderRadius = '0';
				this.itemMdata.buttonStyle.color = '#000';
				this.itemMdata.buttonStyle.background = '#fff';
				this.itemMdata.buttonStyle.borderColor = this.color1;
				this.itemMdata.buttonStyle.boxShadow = '';
				this.itemMdata.borderActived = 3;
			},
			changefour: function() {
				this.itemMdata.borderRadius = '10';
				this.itemMdata.buttonStyle.color = '#fff';
				this.itemMdata.buttonStyle.borderColor = this.color1;
				this.itemMdata.buttonStyle.background = this.gradient;
				this.itemMdata.buttonStyle.boxShadow = '';
				this.itemMdata.borderActived = 4;
			},
			changefive: function() {
				this.itemMdata.borderRadius ='10';
				this.itemMdata.buttonStyle.color = '#fff';
				this.itemMdata.buttonStyle.background = this.gradient;
				this.itemMdata.buttonStyle.borderColor = this.color1;
				this.itemMdata.buttonStyle.boxShadow = '0 2px 5px 2px rgba(0, 0, 0, 0.2)';
				this.itemMdata.borderActived = 5;
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.clearflow{
		clear:both;
		overflow:hidden;
	}
	.fr{
		float:right;
	}
	.fl{
		float:left;
	}
	.imgDelete{
		display:inline-block;
		position:relative;
	}
	.imgDelete:hover .hid {
		display:block;
	}
	input[type=button]{
		background:rgb(64, 158, 255);
		padding:5px 10px;
		border-radius:5px;
		color:#fff;
	}
	.hid {
		position: absolute;
		right: 0;
		top: 0;
		
		width: 25px;
		height: 25px;
		background:url(/static/image/iconIndex2.png) -1028px 228px;
		display: none;
	}
	.buttonEdit {
		text-align: left;
		height: 480px;
		box-sizing: border-box;
		overflow: auto;
		padding-bottom: 0;
		.buttonEdittop {
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
			padding: 30px;
			box-sizing: border-box;
			.btnlink{
				margin:10px 0;
				input[type=text]{
					border:1px solid #ccc;
				}
			}
			.name {
				input {
					border: 1px solid #E3E3E3;
					width: 180px;
					line-height: 30px;
					padding-left: 10px;
				}
			}
			
			.size {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				line-height: 30px;
				span {
					float: left;
				}
				p {
					float: left;
					margin-left: 5px;
					margin-right: 10px;
				}
				input {
					border: 1px solid #E3E3E3;
					width: 80px;
					line-height: 30px;
					text-align: center;
				}
			}
			.radius {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				line-height: 40px;
				display: flex;
				span {
					float: left;
				}
				.block{
					width: 100px;
					margin-left: 10px;
				}				
			}
			.style {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				p {
					float: left;
					margin-right: 15px;
				}
			}
			.content {
				.default_detail {
					.look {
						clear: both;
						overflow: hidden;
						margin-bottom: 20px;
						p {
							float: left;
						}
						.actived{
							border: 1px solid #409eff;
						}
						ul {
							width: 85%;
							margin-left: 10px;
							float: left;
							li {
								float: left;
								width: 150px;
								height: 110px;
								border: 1px solid #E3E3E3;
								margin-right: 10px;
								margin-top: 15px;
								
								.look_one {
									width: 70%;
									margin-left: 15%;
									margin-top: 35px;
									height: 40px;
									border-radius: 5px;
								}
								.look_two {
									width: 70%;
									margin-left: 15%;
									margin-top: 35px;
									height: 40px;
								}
								.look_three {
									border-style: solid;
									border-width: 1px;
									width: 70%;
									margin-left: 15%;
									margin-top: 35px;
									height: 40px;
								}
								.look_four {
									/*FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0, startColorStr=#409eff, endColorStr=#1b70c7);
								background: -moz-linear-gradient(top, #409eff, #1b70c7);
								background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#409eff), to(#1b70c7));*/
									width: 70%;
									margin-left: 15%;
									margin-top: 35px;
									height: 40px;
									border-radius: 5px;
								}
								.look_five {
									/*FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0, startColorStr=#409eff, endColorStr=#1b70c7);
								background: -moz-linear-gradient(top, #409eff, #1b70c7);
								background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#409eff), to(#1b70c7));*/
									width: 70%;
									margin-left: 15%;
									margin-top: 35px;
									height: 40px;
									border-radius: 5px;
									box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.2);
								}
							}
							li:hover {
								border: 1px solid #409eff;
							}
						}
					}
					.color {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						line-height: 30px;
						p {
							float: left;
							
						}
						.block {
							float: left;
							margin: 0 15px;
						}
					}
					input[type=text]{
						border:1px solid #ccc;
						width:66px;
						height:28px;
						border-radius:5px;
					}
					
				}
				.custom_detail {
					.color {
						clear: both;
						overflow: hidden;
						margin-top: 20px;
						p {
							float: left;
						}
					}
					.img {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						p {
							float: left;
						}
						button {
							background: #409EFF;
							border-radius: 5px;
							width: 100px;
							line-height: 30px;
							text-align: center;
							color: #FFFFFF;
						}
						img {
							margin-top: 10px;
							width: 120px;
							margin-left: 60px;
						}
					}
				}
			}
		}
		.two {
			padding: 30px;
			box-sizing: border-box;
			.list {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				line-height: 40px;
				
				span {
					display: block;
					float: left;
					width: 70px;
					text-align: right;
				}
				.input {
					border: 1px solid #E3E3E3;
					width: 205px;
					line-height: 28px;
					padding-left: 10px;
					border-radius: 5px;
				}
			}
		}
	}
	
	.el-upload-list__item {
		width: 50% !important;
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