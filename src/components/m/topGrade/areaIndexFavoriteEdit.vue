<template>
	<div class="areaIndexFavoriteEdit">
		<div class="top">
			<p @click="changetype(1)" :class="{active:typenumber == 1}">常规</p>
			<p @click="changetype(2)" :class="{active:typenumber == 2}">内容区</p>
		</div>
		<div class="one" v-if="typenumber == 1">
			<p class="title">
				<span>标题：</span>
				<input type="text" value="当前位置" />
			</p>
			<div class="position">
				<span>位置：</span>
				<p @click="position_hid = false">
					<input type="radio" name="position" id="position1" />
					<label for="position1">默认</label>
				</p>
				<p @click="position_hid = true">
					<input type="radio" name="position" id="position2" checked="checked" />
					<label for="position2">自定义</label>
				</p>
				<div class="position_hid" v-show="position_hid">
					<p>
						<span>左：</span>
						<input type="text" value="itemMdata.Divstyle.marginLeft" v-model="itemMdata.Divstyle.marginLeft" />
					</p>
					<p>
						<span>上：</span>
						<input type="text" value="itemMdata.Divstyle.marginTop" v-model="itemMdata.Divstyle.marginTop" />
					</p>
				</div>
			</div>
			<div class="text">
				<span>文字：</span>
				<p @click="text_hid = false">
					<input type="radio" name="text" id="text1" />
					<label for="text1">默认</label>
				</p>
				<p @click="text_hid = true">
					<input type="radio" name="text" id="text3" checked="checked" />
					<label for="text3">自定义</label>
				</p>
				<ul class="text_hid" v-show="text_hid">
					<li>
						<span>大小：</span>
						<input type="text" value="itemMdata.Astyle.fontSize" v-model="itemMdata.Astyle.fontSize" />
					</li>
					<li @click="bold">
						<span>加粗：</span>
						<input type="checkbox" />
					</li>
					<li>
						<span>样式：</span>
						<el-select v-model="itemMdata.Astyle.fontFamily" placeholder="itemMdata.Astyle.fontFamily">
							<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li>
						<span>颜色：</span>
						<el-color-picker v-model="itemMdata.Astyle.color" size="medium"></el-color-picker>
					</li>
				</ul>
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
					<input type="text" value="itemMdata.Divstyle.lineHeight" v-model="itemMdata.Divstyle.lineHeight" />
				</div>
			</div>
			<div class="bg">
				<span>背景：</span>
				<p @click="bg_hid = false">
					<input type="radio" name="bg" id="bg1" />
					<label for="bg1">默认</label>
				</p>
				<p @click="bg_hid = true">
					<input type="radio" name="bg" id="bg3" checked="checked" />
					<label for="bg3">自定义</label>
				</p>
				<div class="bg_hid imgDo" v-show="bg_hid">
					<p>
						<span>图片：</span>
						<button @click="vbgFun(1)">添加图片</button>
					</p>
					<div class="imgBox">
						<img :src="itemMdata.mImage0.url" />
						<span @click="deleteList(itemMdata.mImage0.url)">X</span>
					</div>
					<p>
						<span>背景色：</span>
						<el-color-picker v-model="itemMdata.Divstyle.backgroundColor" size="medium"></el-color-picker>
					</p>
				</div>
			</div>
			<div class="icon">
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
				<div class="icon_hid imgDo" v-show="icon_hid">
					<p>
						<span>图片：</span>
						<button @click="vbgFun(2)">修改图片</button>
					</p>
					<div class="imgBox">
						<img :src="itemMdata.mImage1.url" />
						<span @click="deleteListIcon(itemMdata.mImage1.url)">X</span>
					</div>
				</div>
			</div>
		</div>
		<div class="two" v-if="typenumber == 2">
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
						<input type="text" value="itemMdata.Divstyle.paddingTop" v-model="itemMdata.Divstyle.paddingTop" />
					</p>
					<p>
						<span>下：</span>
						<input type="text" value="itemMdata.Divstyle.paddingBottom" v-model="itemMdata.Divstyle.paddingBottom" />
					</p>
					<p>
						<span>左：</span>
						<input type="text" value="itemMdata.Divstyle.paddingLeft" v-model="itemMdata.Divstyle.paddingLeft" />
					</p>
					<p>
						<span>右：</span>
						<input type="text" value="itemMdata.Divstyle.paddingRight" v-model="itemMdata.Divstyle.paddingRight" />
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
						<el-color-picker v-model="itemMdata.Divstyle.borderColor" size="medium"></el-color-picker>
					</li>
					<li>
						<span>宽度：</span>
						<input type="text" value="itemMdata.Divstyle.borderWidth" v-model="itemMdata.Divstyle.borderWidth" />
					</li>
					<li>
						<span>样式：</span>
						<el-select v-model="itemMdata.Divstyle.borderStyle" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</li>
					<li>
						<span>起效边：</span>
						<div class="right">
							<p @click="borderTop">
								<input type="checkbox" id="borderstyle1" checked="checked" />
								<label for="borderstyle1">上</label>
							</p>
							<p @click="borderBottom">
								<input type="checkbox" id="borderstyle2" checked="checked" />
								<label for="borderstyle2">下</label>
							</p>
							<p @click="borderLeft">
								<input type="checkbox" id="borderstyle3" checked="checked" />
								<label for="borderstyle3">左</label>
							</p>
							<p @click="borderRight">
								<input type="checkbox" id="borderstyle4" checked="checked" />
								<label for="borderstyle4">右</label>
							</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="align">
				<span>对齐方式：</span>
				<p>
					<input type="radio" name="align" id="align1" checked="checked" />
					<label for="align1">左对齐</label>
				</p>
				<p>
					<input type="radio" name="align" id="align2" />
					<label for="align2">居中</label>
				</p>
				<p>
					<input type="radio" name="align" id="align3" />
					<label for="align3">右对齐</label>
				</p>
			</div>
		</div>

		<el-dialog title="添加图片" :modal=false :visible.sync="addVisibleNav" width="60%">
			<div class="g-cf add_nav_cons">
				<div class="list_con">
					<mImageEdit v-if="flag==1" :itemMdata="itemMdata.mImage0"></mImageEdit>
					<mImageEdit v-if="flag==2" :itemMdata="itemMdata.mImage1"></mImageEdit>
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
	import mImageEdit from '@/components/m/frequently/mImageEdit.vue' //编辑图片组件
	export default {
		name: 'areaIndexFavoriteEdit',
		props: ['itemMdata'],
		components: {
			mImageEdit
		},
		data() {
			return {
				title: '',
				dialogImageUrl: '',
				dialogVisible: false,
				color1: '#409EFF',
				color2: '#409EFF',
				color3: '#409EFF',
				typenumber:'1',
				options: [{
					value: 'solid',
					label: '————'
				}, {
					value: 'dashed',
					label: '············'
				}, {
					value: 'dotted',
					label: '------------'
				}],
				value: '',
				flag:1,
				margin_hid: true,
				border_hid: true,
				position_hid: true,
				options2: [{
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
				value2: '',
				text_hid: true,
				high_hid: true,
				bg_hid: true,
				icon_hid: true,
				addVisibleNav: false,
				boldCur: false,
				borderTopcur: false,
				borderBottomcur: false,
				borderLeftcur: false,
				borderRightcur: false
			}
		},
		created() {
			console.log(this.itemMdata)
		},
		methods: {
			deleteList: function(list) {
				this.itemMdata.mImage0.url = '';
				
			},
			deleteListIcon(item){
				this.itemMdata.mImage1.url  = '';
			},
			changetype:function(number){
				this.typenumber = number
			},
			vbgFun(flag) {
				this.flag = flag;
				this.addVisibleNav = true;
				//console.log(flag)
			},
			addVisibleFun() {
				this.addVisibleNav = false;
			},
			bold: function() {
				this.boldCur = !this.boldCur;
				this.itemMdata.Astyle.fontWeight = this.boldCur ? 'bold' : 'normal';
			},
			borderTop: function() {
				this.borderTopcur = !this.borderTopcur;
				this.itemMdata.Divstyle.borderTopStyle = this.borderTopcur ? 'none' : this.itemMdata.Divstyle.borderStyle;
			},
			borderBottom: function() {
				this.borderBottomcur = !this.borderBottomcur;
				this.itemMdata.Divstyle.borderBottomStyle = this.borderBottomcur ? 'none' : this.itemMdata.Divstyle.borderStyle;
			},
			borderLeft: function() {
				this.borderLeftcur = !this.borderLeftcur;
				this.itemMdata.Divstyle.borderLeftStyle = this.borderLeftcur ? 'none' : this.itemMdata.Divstyle.borderStyle;
			},
			borderRight: function() {
				this.borderRightcur = !this.borderRightcur;
				this.itemMdata.Divstyle.borderRightStyle = this.borderRightcur ? 'none' : this.itemMdata.Divstyle.borderStyle;
			}
		},
		computed: {
			...mapGetters(["state"])
		}
	}
</script>

<style lang="scss" scoped>
	.areaIndexFavoriteEdit {
		box-sizing: border-box;
		height: 470px;
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
			.position {
				clear: both;
				overflow: hidden;
				margin-top: 10px;
				span {
					width: 70px;
					text-align: right;
					float: left;
					line-height: 30px;
				}
				p {
					float: left;
					margin-left: 10px;
					line-height: 30px;
				}
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
					img{
						width: 60px;
						margin-left: 22%;
						margin-top: 10px;
					}
				}
				.imgDo{
					.imgBox{
						position:relative;
						width: 60px;
						margin-left:60px;
						margin-top:10px;
						img{
							width: 60px;
							margin-left: 22%;
							margin-top: 0;
						}
						span{
							display:none;
							position:absolute;
							top:-10px;
							right:-22%;
							color:red;
						}

					}
					.imgBox:hover{
						span{
							display:inline-block;
						}
					}
					

				}
			}
			.imgDo{
				.imgBox{
					position:relative;
					width: 60px;
					margin-left:60px;
					margin-top:10px;
					img{
						width: 60px;
						margin-left: 22%;
						margin-top: 0;
					}
					span{
						display:none;
						position:absolute;
						top:-10px;
						right:-22%;
						color:red;
					}

				}
				.imgBox:hover{
					span{
						display:inline-block;
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
						width: 60px;
						margin-left: 80px;
					}
				}
				.imgDo{
					.imgBox{
						position:relative;
						width: 60px;
						margin-left:60px;
						margin-top:10px;
						img{
							width: 60px;
							margin-left: 22%;
							margin-top: 0;
						}
						span{
							display:none;
							position:absolute;
							top:-10px;
							right:-22%;
							color:red;
						}

					}
					.imgBox:hover{
						span{
							display:inline-block;
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
			.align {
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