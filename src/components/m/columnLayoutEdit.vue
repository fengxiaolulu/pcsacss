<template>
	<div class="columnLayoutEdit">
		<div class="top">
			<p @click="oneshow" :class="{active:one_show}">常规</p>
			<p @click="twoshow" :class="{active:two_show}">高级</p>
		</div>
		<div class="one" v-show="one_show">
			<!--p class="name">
				<span>模块标题：</span>
				<input type="text" value="通栏模块" />
			</p-->
			<div class="bg">
				<span>通栏背景：</span>
				<p @click="bg_hid = false">
					<input type="radio" name="bg" id="bg1" />
					<label for="bg1">默认</label>
				</p>
				<p @click="bg_hid = true">
					<input type="radio" name="bg" id="bg2" checked="checked" />
					<label for="bg2">自定义</label>
				</p>
				<div class="bg_hid" v-show="bg_hid">
					<p>
						<span>图片：</span>
						<button @click="visibleNav(1)">添加图片</button>
						<div v-if="itemMdata.mImage0.url" class="on_con">
							<span class="close" @click="beforeRemoveImg('zinStyle')"></span>
							<img :src="itemMdata.mImage0.url" />
						</div>
					</p>
					<p>
						<span>背景色：</span>
						<el-color-picker  v-model="itemMdata.zinStyle.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
						<!--<el-color-picker show-alpha :predefine="['#555','#666']" v-model="itemMdata.zinStyle.backgroundColor" @active-change="activeChange" color-format="rgb" size="medium"></el-color-picker>-->
					</p>
					<!--p>
						<span>透明度：</span>
						<input type="text" v-model="itemMdata.layoutStyle.opacity" value="0" />
					</p-->
				</div>
			</div>
			<div class="effect">
				<div class="choose">
					<span>效果：</span>
					<p @click="effect_hid = false">
						<input type="radio" name="choose" id="choose1" />
						<label for="choose1">无</label>
					</p>
					<p @click="effect_hid = false">
						<input type="radio" name="choose" id="choose2" />
						<label for="choose2">差速</label>
					</p>
					<p @click="effect_hid = true">
						<input type="radio" name="choose" id="choose3" checked="checked" />
						<label for="choose3">轮播</label>
					</p>
				</div>
				<div class="effect_hid" v-show="effect_hid">
					<div class="style">
						<span>样式：</span>
						<ul>
							<!--li>
								<label>
								    <input type="radio" name="style" v-model="item.mValue" />
								    <div :class="[item.mClass]"></div>
							    </label>
								<p>{{item.mText}}</p>
							</li-->
							<li :class="{'active':item.cur}" @click="selctCurFun(item,index)" v-for="(item,index) in selctCur">
								<div :class="[item.mClass]"></div>
								<p>{{item.mText}}</p>
							</li>
							<!--li>
								<div class="style_two"></div>
								<p>圆点轮播</p>
							</li>
							<li>
								<div class="style_three"></div>
								<p>箭头滑动</p>
							</li>
							<li>
								<div class="style_four"></div>
								<p>方块滑动</p>
							</li-->
						</ul>
					</div>
					<div class="page">
						<span>页数：</span>
						<input type="text" value="3" />
					</div>
				</div>
			</div>
		</div>
		<div class="two" v-show="two_show">
			<div class="border">
				<span>通栏边框：</span>
				<p @click="border_hid = false">
					<input type="radio" name="border" id="border1" />
					<label for="border1">隐藏</label>
				</p>
				<p @click="border_hid = true">
					<input type="radio" name="border" id="border2" checked="checked" />
					<label for="border2">显示</label>
				</p>
				<div class="border_hid" v-show="border_hid">
					<div class="border1">
						<span>宽度：</span>
						<input type="text" v-model="itemMdata.conStyle.borderWidth" />
					</div>
					<div class="border2">
						<span>样式：</span>
						<!--el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select-->
						<el-select v-model="itemMdata.conStyle.borderStyle" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="border3">
						<span>颜色：</span>
						<p>
							<input type="radio" name="color" id="color1" />
							<label for="color1">默认</label>
						</p>
						<p>
							<input type="radio" name="color" id="color2" checked="checked" />
							<label for="color2">自定义</label>
						</p>
						<div class="color_hid">
							<el-color-picker v-model="itemMdata.conStyle.borderColor" size="medium"></el-color-picker>
						</div>
					</div>
					<!--div class="border4">
						<span>边框位置：</span>
						<p>
							<input type="checkbox" checked="checked" /> 上
						</p>
						<p>
							<input type="checkbox" checked="checked" /> 下
						</p>
					</div-->
				</div>
			</div>
			<div class="margin">
				<span>内容边距：</span>
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
			<div class="width">
				<span>内容宽度：</span>
				<p @click="width_hid = false">
					<input type="radio" name="width" id="width1" />
					<label for="width1">默认</label>
				</p>
				<p @click="width_hid = true">
					<input type="radio" name="width" id="width2" checked="checked" />
					<label for="width2">自定义</label>
				</p>
				<div class="width_hid" v-show="width_hid">
					<input type="text" v-model="itemMdata.layoutOuterStyle.width" />
				</div>
			</div>
			<div class="width">
				<span>内容高度：</span>
				<p @click="height_hid = false">
					<input type="radio" name="height" id="height1" />
					<label for="height1">默认</label>
				</p>
				<p @click="height_hid = true">
					<input type="radio" name="height" id="height2" checked="checked" />
					<label for="height2">自定义</label>
				</p>
				<div class="height_hid" v-show="height_hid">
					<input type="text" v-model="itemMdata.conStyle.height" />
				</div>
			</div>
			<div class="bg2">
				<span>中间背景：</span>
				<p @click="bg2_hid = false">
					<input type="radio" name="bg2" id="bg2_1" />
					<label for="bg2_1">默认</label>
				</p>
				<p @click="bg2_hid = true">
					<input type="radio" name="bg2" id="bg2_2" checked="checked" />
					<label for="bg2_2">自定义</label>
				</p>
				<div class="bg2_hid" v-show="bg2_hid">
					<p>
						<span>图片：</span>
						<button @click="visibleNav(2)">添加图片</button>
						<div v-if="itemMdata.mImage1.url" class="on_con">
							<span class="close" @click="beforeRemoveImg('layoutOuterStyle')"></span>
							<img :src="itemMdata.mImage1.url" />
						</div>
					</p>
					<p>
						<span>背景色：</span>
						<el-color-picker show-alpha v-model="itemMdata.layoutOuterStyle.backgroundColor" color-format="rgb" size="medium"></el-color-picker>
					</p>
					<!--p>
						<span>透明度：</span>
						<input type="text" value="0" />
					</p-->
				</div>
			</div>
			<div class="carousel">
				<span>轮播设置：</span>
				<p @click="carousel_hid = false">
					<input type="radio" name="carousel" id="carousel1" />
					<label for="carousel1">手动轮播</label>
				</p>
				<p @click="carousel_hid = true">
					<input type="radio" name="carousel" id="carousel2" checked="checked" />
					<label for="carousel2">自动轮播</label>
				</p>
				<div class="carousel_hid" v-show="carousel_hid">
					<p>
						<span>展示时间：</span>
						<input type="text" value="4" />
						<span>秒</span>
					</p>
					<p>
						<span>切换速度：</span>
						<input type="text" value="1" />
						<span>秒</span>
					</p>
				</div>
			</div>
		</div>

		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.mImage0" v-on:recoent="recoent"></mImageEdit>
					<mImageEdit v-if="flag==2" :itemMdata="itemMdata.mImage1" v-on:recoent="recoent"></mImageEdit>
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
		name: 'columnLayoutEdit',
		props: ['itemMdata'],
		components: {
			mImageEdit
		},
		data() {
			return {
				title: '编辑通栏排版',
				dialogImageUrl: '',
				dialogVisible: false,
				one_show: true,
				two_show: false,
				color: '#409EFF',
				color2: '#409EFF',
				conStyle: {
					'marginTop': "",
					'marginBottom': "",
					'marginLeft': "",
					'marginRight': ""
				},
				color3: '#409EFF',
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
				selctCur: [{
					mClass: 'style_one',
					mText: "数字切换",
					cur: true,
					mValue: 1
				}, {
					mClass: 'style_two',
					mText: "圆点切换",
					cur: false,
					mValue: 2
				}, {
					mClass: 'style_three',
					mText: "方块切换",
					cur: false,
					mValue: 3
				}, {
					mClass: 'style_four',
					mText: "箭头切换",
					cur: false,
					mValue: 4
				}],
				bg_hid: true,
				addVisibleNav: false,
				predefineColors: [
					'#ff4500',
					'#ff8c00',
					'#ffd700',
					'#90ee90',
					'#00ced1',
					'#1e90ff',
					'#c71585'
				],
				effect_hid: true,
				border_hid: true,
				margin_hid: true,
				width_hid: true,
				height_hid:true,
				bg2_hid: true,
				flag: 0,
				carousel_hid: true
			}
		},
		created() {
			this.$nextTick(() => {
				for(var k in this.itemMdata.conStyle) {
					this.conStyle[k] = String(this.itemMdata.conStyle[k]).replace(/[^0-9]/ig, "")
				}
				console.log(this.conStyle);
			});
		},
		methods: {
			oneshow: function() {
				this.one_show = true;
				this.two_show = false;
			},
			activeChange(v) {
				this.itemMdata.zinStyle.backgroundColor = v;
			},
			selctCurFun(item, index) {
				for(var g = 0; g < this.selctCur.length; g++) {
					this.selctCur[g].cur = false;
				}
				item.cur = true;
				if(this.itemMdata.itemInner.length){
					if(this.itemMdata.itemInner[0].tName=='multiCarousel'){
						this.itemMdata.itemInner[0].curIndex = index;
					}				
				}			
			},
			visibleNav(i) {
				this.flag = i;
				this.addVisibleNav = true;
			},
			twoshow: function() {
				this.one_show = false;
				this.two_show = true;
			},
			beforeRemoveImg(flag) {
				if(flag == "zinStyle") {
					this.itemMdata.zinStyle.backgroundImage = '';
					this.itemMdata.mImage0.url = "";
				} else {
					this.itemMdata.layoutOuterStyle.backgroundImage = '';
					this.itemMdata.mImage1.url = "";
				}
				//return this.$confirm(`确定移除 ${ file.name }？`);
			},
			recoent(i) {
				console.log(i);
				if(i.flag == "zinStyle") {
					this.itemMdata.zinStyle.backgroundImage = 'url("' + i.url + '")';
				} else {
					this.itemMdata.layoutOuterStyle.backgroundImage = 'url("' + i.url + '")';
				}
			},
			setValue(key, value) {
				this.conStyle[key] = value;
				this.itemMdata.conStyle[key] = value + "px";
				console.log(key, value);
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

<style lang="scss" scoped>
	.columnLayoutEdit {
		box-sizing: border-box;
		height: 334px;
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
			.bg {
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
				.bg_hid {
					clear: both;
					overflow: hidden;
					margin-left: 100px;
					p {
						float: none;
						margin-top: 10px;
						line-height: 30px;
						button {
							border: 1px solid #E3E3E3;
							text-align: center;
							padding: 2px 10px;
						}
						input {
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 60px;
							line-height: 30px;
						}
					}
				}
			}
			.effect {
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
				.effect_hid {
					clear: both;
					overflow: hidden;
					.style {
						clear: both;
						overflow: hidden;
						margin-top: 10px;
						span {
							float: left;
						}
						ul {
							float: left;
							width: 88%;
							li {
								float: left;
								width: 23%;
								margin-left: 5px;
							}
							div {
								border: 1px solid #E3E3E3;
								width: 108px;
								height: 43px;
								background: url(../../../static/image/mbg01.png)no-repeat;
							}
							p {
								text-align: center;
								float: none;
								font-size: 12px;
								margin-top: 5px;
								margin-left: 0;
								color: #666666;
							}
							.style_one {
								background-position: -865px -1264px;
							}
							.style_two {
								background-position: -865px -1324px;
							}
							.style_three {
								background-position: -865px -1384px;
							}
							.style_four  {
								background-position: -865px -1204px;
							}
							li:hover,
							li.active {
								div {
									border: 1px solid #409EFF;
								}
							}
						}
					}
					.page {
						margin-top: 10px;
						line-height: 30px;
						input {
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 60px;
							margin-left: 5px;
							line-height: 30px;
						}
					}
				}
			}
		}
		.two {
			box-sizing: border-box;
			padding: 20px;
			.border {
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
				.border_hid {
					clear: both;
					overflow: hidden;
					margin-left: 50px;
					.border1 {
						margin-top: 10px;
						input {
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 60px;
							margin-right: 4px;
							line-height: 30px;
						}
					}
					.border2 {
						margin-top: 10px;
						line-height: 30px;
					}
					.border3 {
						margin-top: 10px;
						clear: both;
						overflow: hidden;
						.color_hid {
							float: left;
							margin-left: 10px;
						}
					}
				}
			}
			.margin {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
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
					clear: both;
					overflow: hidden;
					margin-left: 60px;
					p {
						margin-top: 10px;
						margin-left: 20px;
						span {
							width: auto;
						}
						input {
							border: 1px solid #E3E3E3;
							width: 60px;
							margin-right: 4px;
							text-align: center;
						}
					}
				}
			}
			.width,.height{
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				line-height: 30px;
				span {
					float: left;
					width: 70px;
					text-align: right;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.width_hid,.height_hid {
					float: left;
					margin-left: 10px;
					input {
						border: 1px solid #E3E3E3;
						text-align: center;
						width: 70px;
						line-height: 30px;
					}
				}
			}
			.bg2 {
				margin-top: 10px;
				span {
					float: left;
					width: 70px;
					text-align: right;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.bg2_hid {
					clear: both;
					overflow: hidden;
					margin-left: 50px;
					p {
						float: none;
						margin-top: 10px;
						line-height: 30px;
						button {
							border: 1px solid #E3E3E3;
							text-align: center;
							padding: 2px 5px;
							color: #666666;
						}
						input {
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 60px;
						}
					}
				}
			}
			.carousel {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				clear: both;
				overflow: hidden;
				span {
					float: left;
					width: 70px;
					text-align: right;
				}
				p {
					float: left;
					margin-left: 10px;
				}
				.carousel_hid {
					clear: both;
					overflow: hidden;
					margin-left: 70px;
					p {
						clear: both;
						overflow: hidden;
						float: none;
						margin-top: 10px;
						span {
							width: auto;
							margin-left: 5px;
						}
						input {
							float: left;
							margin-right: 4px;
							border: 1px solid #E3E3E3;
							text-align: center;
							width: 60px;
						}
					}
				}
			}
		}
	}
	
	.on_con img {
		width: 100px;
		height: 100px;
	}
	
	.on_con {
		width: 100px;
		height: 100px;
		margin-left: 80px;
		margin-top: 20px;
		position: relative;
		
	}
	
	.on_con .close {
		position: absolute;
		right: 0;
		top: 0;
		width: 25px !important;
		height: 25px;
		background:url(/static/image/iconIndex2.png) -1028px 218px;
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