<template>
	<div class="freeContainer">
		<div class="freeContainertop">
			<p @click="oneshow" :class="{active:one_show}">常规</p>
			<!--p @click="twoshow" :class="{active:two_show}">标题栏</p-->
			<p @click="threeshow" :class="{active:three_show}">内容区</p>
		</div>
		<div class="one" v-show="one_show">
			<!--div class="title">
				<span>标题栏：</span>
				<p>
					<input type="radio" name="title" id="title1" checked="checked" />
					<label for="title1">显示</label>
				</p>
				<p>
					<input type="radio" name="title" id="title2" />
					<label for="title2">隐藏</label>
				</p>
			</div-->

			<div class="margin">
				<span>内边距：</span>
				<p @click="margin_hid = false">
					<input type="radio" name="margin" id="margin1" />
					<label for="margin1">默认</label>
				</p>
				<p @click="margin_hid = true">
					<input type="radio" name="margin" id="margin2" checked="checked" />
					<label for="margin2">自定义</label>
				</p>
				<div class="margin_hid" v-show="margin_hid">
					<p>
						<span>上：</span>
						<input type="text" @change="setValue('marginTop',conStyle.marginTop)" v-model="conStyle.marginTop" />px
					</p>
					<p>
						<span>下：</span>
						<input type="text" @change="setValue('marginBottom',conStyle.marginBottom)" v-model="conStyle.marginBottom" />px
					</p>
					<p>
						<span>左：</span>
						<input type="text" @change="setValue('marginLeft',conStyle.marginLeft)" v-model="conStyle.marginLeft" />px
					</p>
					<p>
						<span>右：</span>
						<input type="text" @change="setValue('marginRight',conStyle.marginRight)" v-model="conStyle.marginRight" />px
					</p>
				</div>
			</div>
			<div class="border">
				<span>边框：</span>
				<p @click="border_hid = false">
					<input type="radio" name="border" id="border1" />
					<label for="border1">默认</label>
				</p>
				<p @click="border_hid = false">
					<input type="radio" name="border" id="border2" />
					<label for="border2">隐藏</label>
				</p>
				<p @click="border_hid = true">
					<input type="radio" name="border" id="border3" checked="checked" />
					<label for="border3">自定义</label>
				</p>
				<ul class="border_hid" v-show="border_hid">
					<li>
						<span>颜色：</span>
						<el-color-picker v-model="itemMdata.conStyle.borderColor" size="medium"></el-color-picker>
					</li>
					<li>
						<span>宽度：</span>
						<input type="text" @change="setValue('borderWidth',conStyle.borderWidth)" v-model="conStyle.borderWidth" />px
					</li>
					<li>
						<span>样式：</span>
						<el-select v-model="itemMdata.conStyle.borderStyle" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li>
						<span>起效边：</span>
						<div class="right">
							<input type="checkbox" @change="isBorderFun('borderTop',isBorderTop)" v-model="isBorderTop" />
							<label for="borderstyle1">上</label>
							<input type="checkbox" @change="isBorderFun('borderBottom',isBorderBottom)" v-model="isBorderBottom" />
							<label for="borderstyle2">下</label>
							<input type="checkbox" @change="isBorderFun('borderLeft',isBorderLeft)" v-model="isBorderLeft" />
							<label for="borderstyle3">左</label>
							<input type="checkbox" @change="isBorderFun('borderRight',isBorderRight)" v-model="isBorderRight" />
							<label for="borderstyle4">右</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="two" v-show="two_show">
			<!--p class="title">
				<span>标题：</span>
				<input type="text" value="新闻中心" />
			</p>
			<div class="text">
				<span>标题文字：</span>
				<p @click="text_hid = false">
					<input type="radio" name="text" id="text1" />
					<label for="text1">默认</label>
				</p>
				<p @click="text_hid = false">
					<input type="radio" name="text" id="text2" />
					<label for="text2">隐藏</label>
				</p>
				<p @click="text_hid = true">
					<input type="radio" name="text" id="text3" checked="checked" />
					<label for="text3">自定义</label>
				</p>
				<ul class="text_hid" v-show="text_hid">
					<li>
						<span>大小：</span>
						<input type="text" value="16" />
					</li>
					<li>
						<span>加粗：</span>
						<input type="checkbox" />
					</li>
					<li>
						<span>样式：</span>
						<el-select v-model="value2" placeholder="请选择">
							<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li>
						<span>颜色：</span>
						<el-color-picker v-model="color2" size="medium"></el-color-picker>
					</li>
					<li>
						<span>位置：</span>
						<p>
							<input type="radio" name="position" id="position1" />
							<label for="position1">默认</label>
						</p>
						<p>
							<input type="radio" name="position" id="position2" checked="checked" />
							<label for="position2">自定义</label>
						</p>
						<div class="position_hid">
							<p>
								<span>左：</span>
								<input type="text" value="0px" />
							</p>
							<p>
								<span>上：</span>
								<input type="text" value="0px" />
							</p>
						</div>
					</li>
				</ul>
			</div-->

			<!--div class="bg">
				<span>背景：</span>
				<p @click="bg_hid = false">
					<input type="radio" name="bg" id="bg1" />
					<label for="bg1">默认</label>
				</p>
				<p @click="bg_hid = false">
					<input type="radio" name="bg" id="bg2" />
					<label for="bg2">隐藏</label>
				</p>
				<p @click="bg_hid = true">
					<input type="radio" name="bg" id="bg3" checked="checked" />
					<label for="bg3">自定义</label>
				</p>
				<div class="bg_hid" v-show="bg_hid">
					<p>
						<span>图片：</span>
						<button>添加图片</button>
					</p>
					<p>
						<span>背景色：</span>
						<el-color-picker v-model="itemMdata.conStyle.backgroundColor" size="medium"></el-color-picker>
					</p>
				</div>
			</div-->
			<!--div class="icon">
				<span>图标：</span>
				<p @click="icon_hid = false">
					<input type="radio" name="icon" id="icon1" />
					<label for="icon1">默认</label>
				</p>
				<p @click="icon_hid = false">
					<input type="radio" name="icon" id="icon2" />
					<label for="icon2">隐藏</label>
				</p>
				<p @click="icon_hid = true">
					<input type="radio" name="icon" id="icon3" checked="checked" />
					<label for="icon3">自定义</label>
				</p>
				<div class="icon_hid" v-show="icon_hid">
					<p>
						<span>图片：</span>
						<button>修改图片</button>
					</p>
					<img src="../../../static/image/default.png" />
				</div>
			</div-->
		</div>
		<div class="three" v-show="three_show">
			<div class="content">
				<div class="high">
					<span>宽度：</span>
					<p @click="width_hid = false">
						<input type="radio" name="width" id="width1" />
						<label for="width1">默认</label>
					</p>
					<p @click="width_hid = true">
						<input type="radio" name="width" id="width2" checked="checked" />
						<label for="width2">自定义</label>
					</p>
					<div class="width_hid" v-show="width_hid">
						<input type="text" v-model="itemMdata.conStyle.width" />
					</div>
				</div>
				<div class="high">
					<span>高度：</span>
					<p @click="high_hid = false">
						<input type="radio" name="high" id="high1" />
						<label for="high1">默认</label>
					</p>
					<p @click="high_hid = true">
						<input type="radio" name="high" id="high2" checked="checked" />
						<label for="high2">自定义</label>
					</p>
					<div class="high_hid" v-show="high_hid">
						<input type="text" v-model="itemMdata.conStyle.height" />
					</div>
				</div>
				<span>背景：</span>
				<p @click="content_hid = false">
					<input type="radio" name="content" id="content1" />
					<label for="content1">默认</label>
				</p>
				<p @click="content_hid = false">
					<input type="radio" name="content" id="content2" />
					<label for="content2">隐藏</label>
				</p>
				<p @click="content_hid = true">
					<input type="radio" name="content" id="content3" checked="checked" />
					<label for="content3">自定义</label>
				</p>
				<ul class="content_hid" v-show="content_hid">
					<!--li>
						<span>透明度：</span>
						<el-slider v-model="opacity"></el-slider>
						<span class="number">{{opacity}}%</span>
					</li-->
					<li>
						<span>图片：</span>
						<button @click="addVisibleNav = true">添加图片</button>
					</li>
					<li class="g-cf">
						<em v-if="itemMdata.mImage.url" class="on_con">
							<i class="close" @click="beforeRemoveImg()">X</i>
							<img :src="itemMdata.mImage.url" width="120" height="120" />
						</em>
					</li>
					<li>
						<span>背景色：</span>
						<el-color-picker show-alpha color-format="rgb" v-model="itemMdata.conStyle.backgroundColor" size="medium"></el-color-picker>
					</li>
				</ul>
			</div>
		</div>

		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<!--mImageEdit v-if="flag==1" :itemMdata="itemMdata.mImage0"></mImageEdit-->
					<mImageEdit :itemMdata="itemMdata.mImage" @recoent="recoent"></mImageEdit>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="addVisibleNav = false">取 消</el-button>
		    <el-button type="primary" @click="addVisibleNav=false">保 存</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue'
	export default {
		name: 'freeContainer',
		props: ['itemMdata', ''],
		data() {
			return {
				title: '编辑自由容器',
				dialogImageUrl: '',
				conStyle: {
					'marginTop': "",
					'marginBottom': "",
					'marginLeft': "",
					'marginRight': ""
				},
				dialogVisible: false,
				addVisibleNav: false,
				isBorderTop: true,
				isBorderBottom: true,
				isBorderLeft: true,
				isBorderRight: true,
				one_show: true,
				two_show: false,
				three_show: false,
				options: [{
					value: 'none',
					label: '无边框'
				}, {
					value: 'solid',
					label: '————'
				}, {
					value: 'dotted',
					label: '············'
				}, {
					value: 'dashed',
					label: '------------'
				}],
				value: '',
				margin_hid: true,
				border_hid: true,
				options2: [{
					value: '选项1',
					label: '微软雅黑'
				}, {
					value: '选项2',
					label: '宋体'
				}, {
					value: '选项3',
					label: '黑体'
				}, {
					value: '选项4',
					label: '幼圆'
				}],
				value2: '',
				text_hid: true,
				high_hid: true,
				width_hid: true,
				bg_hid: true,
				icon_hid: true,
				opacity: 0,
				content_hid: true
			}
		},
		components: {
			mImageEdit
		},
		created() {
			console.log(this.itemMdata, 'getData');
			//this.editDial.conStyle = {};
			this.$nextTick(() => {
				for(var k in this.itemMdata.conStyle) {
					this.conStyle[k] = String(this.itemMdata.conStyle[k]).replace(/[^0-9]/ig, "")
				}
				console.log(this.conStyle);
				
			});

		},
		methods: {
			formatTooltip(val) {
				return val / 100;
			},
			recoent(i) {
				this.itemMdata.conStyle.backgroundImage = 'url("' + i.url + '")';
			},
			beforeRemoveImg() {
				this.itemMdata.conStyle.backgroundImage = '';
				this.itemMdata.mImage.url = "";
				//return this.$confirm(`确定移除 ${ file.name }？`);
			},
			oneshow: function() {
				this.one_show = true;
				this.two_show = false;
				this.three_show = false;
			},
			twoshow: function() {
				this.one_show = false;
				this.two_show = true;
				this.three_show = false;
			},
			threeshow: function() {
				this.one_show = false;
				this.two_show = false;
				this.three_show = true;
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			setValue(key, value) {
				this.conStyle[key] = value;
				this.itemMdata.conStyle[key] = value + "px";
				console.log(key, value);
			},
			uploadIsibleNav() {
				this.addVisibleNav = true;
			},
			isBorderFun(key, value) {
				//this.itemMdata.conStyle.borderTop = "none";
				//this.itemMdata.conStyle.borderTopWidth =0;
				if(key == 'borderTop') {
					this.itemMdata.conStyle.borderTopWidth = !value ? 0 : this.itemMdata.conStyle.borderWidth;
				}
				if(key == 'borderBottom') {
					this.itemMdata.conStyle.borderBottomWidth = !value ? 0 : this.itemMdata.conStyle.borderWidth;
				}
				if(key == 'borderLeft') {
					this.itemMdata.conStyle.borderLeftWidth = !value ? 0 : this.itemMdata.conStyle.borderWidth;
				}
				if(key == 'borderRight') {
					this.itemMdata.conStyle.borderRightWidth = !value ? 0 : this.itemMdata.conStyle.borderWidth;
				}
				console.log(value);
			},
			...mapMutations([
				'orderList'
			])
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.freeContainer {
		overflow: auto;
		height: 350px;
		.freeContainertop {
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
			padding: 15px 30px;
			.title {
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
			}
			.margin {
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.margin_hid {
					width: 60%;
					clear: both;
					overflow: hidden;
					margin-left: 70px;
					p {
						width: 40%;
						line-height: 30px;
						margin-top: 10px;
						span {
							width: auto;
							float: left;
						}
						input {
							float: left;
							width: 60px;
							margin-right: 6px;
							text-align: center;
							border: 1px solid #E3E3E3;
							line-height: 30px;
						}
					}
				}
			}
			.border {
				clear: both;
				overflow: hidden;
				margin-top: 15px;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.border_hid {
					clear: both;
					overflow: hidden;
					margin-left: 50px;
					li {
						margin-top: 10px;
						line-height: 30px;
						input {
							border: 1px solid #E3E3E3;
							line-height: 30px;
							padding-left: 10px;
						}
						.right {
							input {
								margin-left: 10px;
							}
						}
					}
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 15px 30px;
			.title {
				margin-top: 10px;
				span {
					width: 70px;
					text-align: right;
					float: left;
					line-height: 30px;
				}
				input {
					border: 1px solid #E3E3E3;
					line-height: 30px;
					padding-left: 10px;
				}
			}
			.text {
				clear: both;
				overflow: hidden;
				margin-top: 20px;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.text_hid {
					clear: both;
					overflow: hidden;
					margin-left: 50px;
					li {
						margin-top: 10px;
						line-height: 30px;
						clear: both;
						overflow: hidden;
						input {
							border: 1px solid #E3E3E3;
							padding-left: 10px;
							line-height: 30px;
						}
						.position_hid {
							clear: both;
							overflow: hidden;
							margin-left: 30px;
							p {
								float: left;
								margin-right: 10px;
								margin-top: 5px;
								span {
									width: auto;
									text-align: left;
								}
								input {
									width: 60px;
									text-align: center;
									padding: 0;
								}
							}
						}
					}
				}
			}
			.high {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				line-height: 30px;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.high_hid {
					float: left;
					margin-left: 10px;
					input {
						width: 60px;
						text-align: center;
						padding: 0;
						border: 1px solid #E3E3E3;
						line-height: 30px;
					}
				}
			}
			.bg {
				margin-top: 10px;
				line-height: 30px;
				clear: both;
				overflow: hidden;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.bg_hid {
					clear: both;
					overflow: hidden;
					p {
						float: none;
						margin-left: 55px;
						margin-top: 10px;
						button {
							border: 1px solid #E3E3E3;
							text-align: center;
							padding: 3px 15px;
							color: #666666;
						}
					}
				}
			}
			.icon {
				margin-top: 10px;
				line-height: 30px;
				clear: both;
				overflow: hidden;
				span {
					width: 70px;
					text-align: right;
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.icon_hid {
					clear: both;
					overflow: hidden;
					margin-left: 45px;
					p {
						margin-top: 5px;
						float: none;
						button {
							border: 1px solid #E3E3E3;
							text-align: center;
							padding: 3px 15px;
							color: #666666;
						}
					}
					img {
						margin-top: 10px;
						width: 20%;
						margin-left: 80px;
					}
				}
			}
		}
		.three {
			box-sizing: border-box;
			padding: 15px 30px;
			.content {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				.high {
					overflow: hidden;
					height: 27px;
					line-height: 25px;
					margin-bottom: 10px;
					.width_hid,
					.high_hid {
						input {
							width: 80px;
							height: 25px;
							line-height: 25px;
							margin-left: 6px;
							border: 1px solid #ccc;
						}
					}
				}
				span {
					float: left;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.content_hid {
					clear: both;
					overflow: hidden;
					margin-left: 50px;
					li {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						line-height: 35px;
						div {
							float: left;
							width: 50%;
							height: 35px;
						}
						span {
							width: 60px;
							text-align: right;
						}
						button {
							border: 1px solid #E3E3E3;
							text-align: center;
							padding: 3px 15px;
							color: #666666;
						}
						.number {
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 50px;
							margin-left: 10px;
							line-height: 30px;
						}
					}
				}
			}
		}
	}
	
	em.on_con {
		display: block;
		position: relative;
		width: 120px;
		height: 120px;
	}
	
	.on_con .close {
		position: absolute;
		right: 0;
		top: 0;
		color: #FFFFFF;
		background: red;
		text-align: center !important;
		width: 15px !important;
		height: 17px;
		cursor: pointer;
		line-height: 17px;
		border-radius: 100%;
		text-align: center;
		opacity: 0.7;
		font-size: 11px;
		display: none;
	}
	
	.on_con:hover .close {
		display: block;
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